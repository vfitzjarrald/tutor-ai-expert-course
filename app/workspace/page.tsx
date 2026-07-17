import Link from "next/link";
import { WorkspaceEditor } from "@/components/WorkspaceInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getUserLearningTrack } from "@/lib/users";
import { getWorkspaceFile, listWorkspaceFiles, workspacePathsNonEmpty } from "@/lib/workspace";
import { buildWorkspaceGuide, findGuideLesson } from "@/lib/workspace-guide";

export const dynamic = "force-dynamic";

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ path?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const track = await getUserLearningTrack(session.id);
  const params = await searchParams;
  const files = await listWorkspaceFiles(session.id);
  const guide = await buildWorkspaceGuide(session.id);
  const requested = (params.path ?? "").trim();
  const activePath =
    requested || guide.defaultPath || files[0]?.path || "notes/week-01/day-01-diagram.md";
  const file = await getWorkspaceFile(session.id, activePath);
  const activeLesson = findGuideLesson(guide, activePath);

  const statusPaths = [
    ...new Set([
      ...guide.phaseLessons.flatMap((lesson) => lesson.files),
      ...guide.upNext.flatMap((lesson) => lesson.files),
      activePath,
    ]),
  ];
  const fileStatusMap = await workspacePathsNonEmpty(session.id, statusPaths);
  const fileStatus = Object.fromEntries(fileStatusMap);

  return (
    <div>
      <PageHero
        eyebrow={track === "workspace" ? "Workspace Path" : "My Workspace"}
        title="My Workspace"
        description="Lab instructions live next to your files — pick a lesson on the left, follow the steps, and save your deliverable here. No local git required on the Workspace Path."
      />

      {track !== "workspace" ? (
        <div className="card mb-6 border-primary/20 bg-primary/5 text-sm">
          You are on the <strong className="text-heading">Dev Path</strong>. Workspace is still available for notes;
          switch to Workspace Path on{" "}
          <Link href="/account" className="nav-link">
            Account
          </Link>{" "}
          to make in-app labs the primary flow.
        </div>
      ) : null}

      {guide.upNext[0] ? (
        <div className="card mb-6 flex flex-wrap items-center justify-between gap-3 border-primary/20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Catch up here</p>
            <p className="mt-1 text-sm text-heading">
              Week {String(guide.upNext[0].week).padStart(2, "0")} · Day {guide.upNext[0].day} —{" "}
              {guide.upNext[0].title}
            </p>
            <p className="mt-1 text-xs text-text-muted">{guide.upNext[0].deliverable}</p>
          </div>
          <Link
            href={`/workspace?path=${encodeURIComponent(guide.upNext[0].files[0] ?? "")}`}
            className="btn-primary text-sm"
          >
            Open first deliverable file
          </Link>
        </div>
      ) : null}

      <WorkspaceEditor
        initialPath={activePath}
        initialBody={file?.body ?? ""}
        files={files}
        upNext={guide.upNext}
        phaseLessons={guide.phaseLessons}
        currentPhase={guide.currentPhase}
        activeLesson={activeLesson}
        fileStatus={fileStatus}
      />
    </div>
  );
}
