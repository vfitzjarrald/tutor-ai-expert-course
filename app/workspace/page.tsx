import Link from "next/link";
import { WorkspaceEditor } from "@/components/WorkspaceInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getUserLearningTrack } from "@/lib/users";
import { getWorkspaceFile, listWorkspaceFiles } from "@/lib/workspace";

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
  const requested = (params.path ?? "").trim();
  const activePath = requested || files[0]?.path || "notes/week-01/day-01-diagram.md";
  const file = await getWorkspaceFile(session.id, activePath);

  return (
    <div>
      <PageHero
        eyebrow={track === "workspace" ? "Workspace Path" : "My Workspace"}
        title="My Workspace"
        description="Save lesson deliverables here — notes, configs, and playground logs. No local git repo required on the Workspace Path."
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

      <WorkspaceEditor
        initialPath={activePath}
        initialBody={file?.body ?? ""}
        files={files}
        suggestedPaths={requested ? [requested] : []}
      />
    </div>
  );
}
