import { existsSync, readFileSync } from "fs";
import path from "path";
import { extractDeliverablePaths } from "./hub";
import { pathwayNodeForLesson } from "./pathway";

export type PlaygroundRecipe = {
  systemPrompt: string;
  userPromptTemplate: string;
  outputPath: string;
  hint?: string;
};

export type WorkspaceDayOverlay = {
  weekId: string;
  week: number;
  day: number;
  labSteps: string[];
  deliverable: string;
  files: string[];
  playground?: PlaygroundRecipe;
};

type OverlayFile = {
  version: number;
  days: WorkspaceDayOverlay[];
};

let cached: OverlayFile | null = null;

function loadOverlays(repoRoot = process.cwd()): OverlayFile {
  if (cached) return cached;
  const file = path.join(repoRoot, "curriculum", "pathways", "workspace-overlays.json");
  if (!existsSync(file)) {
    cached = { version: 1, days: [] };
    return cached;
  }
  cached = JSON.parse(readFileSync(file, "utf8")) as OverlayFile;
  return cached;
}

export function getWorkspaceOverlay(
  week: number,
  day: number,
  repoRoot = process.cwd(),
): WorkspaceDayOverlay | null {
  const overlays = loadOverlays(repoRoot);
  return overlays.days.find((entry) => entry.week === week && entry.day === day) ?? null;
}

/** Authored overlay or generic fallback from curriculum deliverable + paths. */
export function resolveWorkspaceDay(
  week: number,
  day: number,
  opts: {
    deliverable: string;
    rawMarkdown: string;
    objective?: string;
  },
  repoRoot = process.cwd(),
): WorkspaceDayOverlay {
  const authored = getWorkspaceOverlay(week, day, repoRoot);
  if (authored) return authored;

  const node = pathwayNodeForLesson(week, day, repoRoot);
  const weekId = node?.weekId ?? `week-${String(week).padStart(2, "0")}`;
  const paths = extractDeliverablePaths(opts.rawMarkdown);
  const weekFolder = `notes/week-${String(week).padStart(2, "0")}`;
  const defaultFile = `${weekFolder}/day-${String(day).padStart(2, "0")}-workspace.md`;
  const files =
    paths.length > 0
      ? paths.map((p) => (p.endsWith(".md") || p.includes(".") ? p : `${p.replace(/\/$/, "")}/notes.md`))
      : [defaultFile];

  const mentionsApi = /API|LLM|prompt|OpenAI|Anthropic|chat completion/i.test(opts.rawMarkdown);
  const playground: PlaygroundRecipe | undefined = mentionsApi
    ? {
        systemPrompt:
          "You are a helpful AI tutor assistant for a learner on an AI Expert Fast Track. Be clear and concise.",
        userPromptTemplate:
          opts.objective
            ? `Help me practice this lesson objective: ${opts.objective}\n\nRespond as if I am experimenting with an LLM API.`
            : "Help me practice calling an LLM with a clear system and user message.",
        outputPath: `${weekFolder}/day-${String(day).padStart(2, "0")}-playground-log.md`,
        hint: "Run a prompt experiment here, then save the transcript into your workspace.",
      }
    : undefined;

  return {
    weekId,
    week,
    day,
    labSteps: [
      `Open the reading links for this lesson (they open in a new tab).`,
      `Create or edit your workspace file(s) listed below.`,
      `Capture the deliverable: ${opts.deliverable || "complete the day's outcome"}.`,
      playground
        ? `Optional: use the in-app AI playground, then save the output.`
        : `Review your notes, then mark the lesson complete when finished.`,
    ],
    deliverable: opts.deliverable || "Workspace notes for this lesson",
    files: playground ? [...new Set([...files, playground.outputPath])] : files,
    playground,
  };
}
