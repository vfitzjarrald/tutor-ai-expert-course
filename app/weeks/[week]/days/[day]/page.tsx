import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteToggle, NoteEditor } from "@/components/CourseInteractive";
import { PathHints } from "@/components/LearningInteractive";
import { Markdown } from "@/components/Markdown";
import { PageHero } from "@/components/SiteChrome";
import {
  AiPlaygroundPanel,
  WorkspaceLessonPanel,
} from "@/components/WorkspaceInteractive";
import { getSession } from "@/lib/auth";
import { isGateWeek } from "@/lib/checks";
import { loadDay, loadWeek } from "@/lib/curriculum";
import { extractDeliverablePaths } from "@/lib/hub";
import { getDayNote, getDayProgress } from "@/lib/progress";
import { nextRequiredPathwayNode, pathwayNodeForLesson } from "@/lib/pathway";
import { getPhaseForWeek, nextLessonPosition, padWeek, previousLessonPosition } from "@/lib/schedule";
import { getUserLearningTrack } from "@/lib/users";
import { workspacePathsNonEmpty } from "@/lib/workspace";
import { getWorkspaceOverlay, resolveWorkspaceDay } from "@/lib/workspace-overlays";

export const dynamic = "force-dynamic";

export default async function DayPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const { week: weekParam, day: dayParam } = await params;
  const weekNum = Number(weekParam);
  const dayNum = Number(dayParam);
  if (!weekNum || weekNum < 1 || weekNum > 78 || !dayNum || dayNum < 1 || dayNum > 5) {
    notFound();
  }

  const week = loadWeek(weekNum);
  const day = loadDay(weekNum, dayNum);
  if (!week || !day) notFound();

  const track = await getUserLearningTrack(session.id);
  const isWorkspace = track === "workspace";
  const overlay = isWorkspace
    ? resolveWorkspaceDay(weekNum, dayNum, {
        deliverable: day.deliverable,
        rawMarkdown: day.rawMarkdown,
        objective: day.objective,
      })
    : null;
  const authoredOverlay = getWorkspaceOverlay(weekNum, dayNum);
  const playgroundRecipe = overlay?.playground ?? authoredOverlay?.playground;

  const phase = getPhaseForWeek(weekNum);
  const progress = await getDayProgress(session.id, weekNum, dayNum);
  const note = await getDayNote(session.id, weekNum, dayNum);
  const paths = extractDeliverablePaths(day.rawMarkdown);
  const prev = previousLessonPosition(weekNum, dayNum);
  const pathwayNode = pathwayNodeForLesson(weekNum, dayNum);
  const nextPathway = pathwayNode?.required ? nextRequiredPathwayNode(weekNum, dayNum) : null;
  const next = nextPathway ?? nextLessonPosition(weekNum, dayNum);
  const nextHref = pathwayNode?.required ? "/" : next ? `/weeks/${next.week}/days/${next.day}` : "/";

  const fileStatusMap = overlay
    ? await workspacePathsNonEmpty(session.id, overlay.files)
    : new Map<string, boolean>();
  const fileStatus = Object.fromEntries(fileStatusMap);

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} · Week ${padWeek(weekNum)} · Day ${dayNum}${
          isWorkspace ? " · Workspace Path" : track === "dev" ? " · Dev Path" : ""
        }`}
        title={day.title}
        description={week.title}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CompleteToggle
          week={weekNum}
          day={dayNum}
          completed={progress.completed}
          nextHref={next ? nextHref : null}
        />
        <Link href={`/weeks/${weekNum}`} className="btn-secondary">
          Week overview
        </Link>
        {isWorkspace ? (
          <Link href="/workspace" className="btn-secondary">
            My Workspace
          </Link>
        ) : null}
        <Link href={`/resources?phase=${phase.id}`} className="btn-secondary">
          Resources
        </Link>
        {isGateWeek(weekNum) ? (
          <Link href="/gates" className="btn-secondary">
            Phase gate
          </Link>
        ) : null}
        {prev ? (
          <Link href={`/weeks/${prev.week}/days/${prev.day}`} className="nav-link">
            ← Previous lesson
          </Link>
        ) : null}
        {next ? (
          <Link href={`/weeks/${next.week}/days/${next.day}`} className="nav-link">
            Next lesson →
          </Link>
        ) : (
          <Link href="/" className="nav-link">
            Today →
          </Link>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <article className="card">
            <Markdown content={day.rawMarkdown} />
          </article>
          {isWorkspace && overlay ? (
            <div className="card border-primary/20 bg-primary/5 text-sm">
              <p className="font-semibold text-heading">Workspace Path lab</p>
              <p className="mt-2 text-text-muted">
                Ignore “commit to repo / Cursor” wording above. Complete the steps in My Workspace instead — save
                files in the app, then mark the lesson complete.
              </p>
            </div>
          ) : null}
          {playgroundRecipe ? (
            <AiPlaygroundPanel recipe={playgroundRecipe} optional={!isWorkspace} />
          ) : null}
        </div>
        <aside className="space-y-6">
          <div className="card">
            <NoteEditor week={weekNum} day={dayNum} initialBody={note.body} />
          </div>
          {isWorkspace && overlay ? (
            <WorkspaceLessonPanel
              files={overlay.files}
              fileStatus={fileStatus}
              deliverable={overlay.deliverable}
              labSteps={overlay.labSteps}
            />
          ) : (
            <>
              <PathHints paths={paths} noteBody={note.body} week={weekNum} day={dayNum} />
              {day.deliverable ? (
                <div className="card">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Deliverable</p>
                  <p className="mt-2 text-heading">{day.deliverable}</p>
                </div>
              ) : null}
              <div className="card text-sm text-text-muted">
                Prefer not to use a local repo? Switch to{" "}
                <Link href="/account" className="nav-link">
                  Workspace Path
                </Link>{" "}
                on Account.
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
