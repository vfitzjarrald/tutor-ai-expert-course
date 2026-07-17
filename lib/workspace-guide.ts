import { loadDay, loadWeek } from "./curriculum";
import { getLearnerQueue } from "./progress";
import type { PathwayNodeState } from "./pathway";
import {
  resolveWorkspaceDay,
  type PlaygroundRecipe,
  type WorkspaceDayOverlay,
} from "./workspace-overlays";

export type WorkspaceLessonStatus = "done" | "waived" | "today" | "upcoming" | "locked";

export type WorkspaceGuideLesson = {
  nodeId: string;
  week: number;
  day: number;
  phase: number;
  title: string;
  weekTitle: string;
  objective: string;
  deliverable: string;
  labSteps: string[];
  files: string[];
  playground?: PlaygroundRecipe;
  status: WorkspaceLessonStatus;
};

export type WorkspaceFileLessonRef = {
  week: number;
  day: number;
  nodeId: string;
};

export type WorkspaceGuide = {
  lessons: WorkspaceGuideLesson[];
  upNext: WorkspaceGuideLesson[];
  phaseLessons: WorkspaceGuideLesson[];
  currentPhase: number | null;
  fileIndex: Record<string, WorkspaceFileLessonRef>;
  defaultPath: string | null;
};

function lessonStatus(
  state: PathwayNodeState,
  todayId: string | null,
  tomorrowId: string | null,
): WorkspaceLessonStatus {
  if (state.completed) return "done";
  if (state.waivedByDiagnostic) return "waived";
  if (state.locked) return "locked";
  if (todayId && state.node.id === todayId) return "today";
  if (tomorrowId && state.node.id === tomorrowId) return "upcoming";
  return "upcoming";
}

function enrichLesson(
  state: PathwayNodeState,
  status: WorkspaceLessonStatus,
  weekCache: Map<number, ReturnType<typeof loadWeek>>,
  repoRoot = process.cwd(),
): WorkspaceGuideLesson | null {
  const { node } = state;
  let weekLesson = weekCache.get(node.week);
  if (weekLesson === undefined) {
    weekLesson = loadWeek(node.week, repoRoot);
    weekCache.set(node.week, weekLesson);
  }
  if (!weekLesson) return null;
  const day = weekLesson.days.find((entry) => entry.day === node.day) ?? loadDay(node.week, node.day, repoRoot);
  if (!day) return null;

  const overlay: WorkspaceDayOverlay = resolveWorkspaceDay(
    node.week,
    node.day,
    {
      deliverable: day.deliverable,
      rawMarkdown: day.rawMarkdown,
      objective: day.objective,
    },
    repoRoot,
  );

  return {
    nodeId: node.id,
    week: node.week,
    day: node.day,
    phase: node.phase,
    title: day.title,
    weekTitle: weekLesson.title,
    objective: day.objective,
    deliverable: overlay.deliverable,
    labSteps: overlay.labSteps,
    files: overlay.files,
    playground: overlay.playground,
    status,
  };
}

/** Pure builder for tests and pages — takes pathway states from evaluateRequiredPath / queue. */
export function buildWorkspaceGuideFromStates(
  states: PathwayNodeState[],
  opts: {
    todayId?: string | null;
    tomorrowId?: string | null;
    currentPhase?: number | null;
  } = {},
  repoRoot = process.cwd(),
): WorkspaceGuide {
  const todayId = opts.todayId ?? null;
  const tomorrowId = opts.tomorrowId ?? null;
  const weekCache = new Map<number, ReturnType<typeof loadWeek>>();

  const lessons: WorkspaceGuideLesson[] = [];
  for (const state of states) {
    const status = lessonStatus(state, todayId, tomorrowId);
    const lesson = enrichLesson(state, status, weekCache, repoRoot);
    if (lesson) lessons.push(lesson);
  }

  const inferredPhase =
    opts.currentPhase ??
    lessons.find((lesson) => lesson.status === "today")?.phase ??
    lessons.find((lesson) => lesson.status === "upcoming" || lesson.status === "locked")?.phase ??
    lessons[lessons.length - 1]?.phase ??
    null;

  const phaseLessons =
    inferredPhase == null ? [] : lessons.filter((lesson) => lesson.phase === inferredPhase);

  const upNext = lessons.filter(
    (lesson) => lesson.status === "today" || lesson.status === "upcoming",
  ).slice(0, 2);

  // Prefer today + actionable upcoming; if only locked remain in phase, still show phase.
  const upNextOrPhase =
    upNext.length > 0
      ? upNext
      : phaseLessons.filter((lesson) => lesson.status !== "done" && lesson.status !== "waived").slice(0, 2);

  const fileIndex: Record<string, WorkspaceFileLessonRef> = {};
  for (const lesson of lessons) {
    for (const filePath of lesson.files) {
      if (!fileIndex[filePath]) {
        fileIndex[filePath] = { week: lesson.week, day: lesson.day, nodeId: lesson.nodeId };
      }
    }
  }

  const defaultPath =
    upNextOrPhase[0]?.files[0] ??
    phaseLessons.find((lesson) => lesson.status === "today")?.files[0] ??
    phaseLessons.find((lesson) => lesson.status !== "done" && lesson.status !== "waived")?.files[0] ??
    phaseLessons[0]?.files[0] ??
    null;

  return {
    lessons,
    upNext: upNextOrPhase,
    phaseLessons,
    currentPhase: inferredPhase,
    fileIndex,
    defaultPath,
  };
}

export async function buildWorkspaceGuide(userId: string, repoRoot = process.cwd()): Promise<WorkspaceGuide> {
  const queue = await getLearnerQueue(userId, 2);
  return buildWorkspaceGuideFromStates(
    queue.states,
    {
      todayId: queue.today?.id ?? queue.lessonAfterDiagnostic?.id ?? null,
      tomorrowId: queue.tomorrow?.id ?? null,
      currentPhase:
        queue.today?.phase ??
        queue.lessonAfterDiagnostic?.phase ??
        queue.tomorrow?.phase ??
        null,
    },
    repoRoot,
  );
}

export function findGuideLesson(
  guide: WorkspaceGuide,
  path: string,
): WorkspaceGuideLesson | null {
  const ref = guide.fileIndex[path];
  if (!ref) return null;
  return (
    guide.lessons.find(
      (lesson) => lesson.week === ref.week && lesson.day === ref.day,
    ) ?? null
  );
}

export function statusLabel(status: WorkspaceLessonStatus): string {
  switch (status) {
    case "done":
      return "Done";
    case "waived":
      return "Waived";
    case "today":
      return "Today";
    case "upcoming":
      return "Up next";
    case "locked":
      return "Locked";
  }
}
