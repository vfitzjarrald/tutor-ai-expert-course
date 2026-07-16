import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getLearnerQueue } from "@/lib/progress";
import { loadResources } from "@/lib/resources";
import { getPhaseForWeek, PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const params = await searchParams;
  const queue = await getLearnerQueue(session.id, 1);
  const focusWeek = queue.today?.week ?? 1;
  const currentPhase = getPhaseForWeek(focusWeek).id;
  const rawPhase = params.phase;
  const phaseFilter = rawPhase === undefined ? currentPhase : Number(rawPhase);
  const showAll = phaseFilter === 0;
  const all = loadResources();
  const rows = showAll ? all : all.filter((r) => r.phase === phaseFilter);

  return (
    <div>
      <PageHero
        eyebrow="Library"
        title="Resources"
        description="Curated links from the curriculum. Default filter follows your current (first incomplete) lesson."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/resources?phase=0"
          className={showAll ? "btn-primary text-sm" : "btn-secondary text-sm"}
        >
          All
        </Link>
        {PHASES.map((p) => (
          <Link
            key={p.id}
            href={`/resources?phase=${p.id}`}
            className={
              !showAll && phaseFilter === p.id ? "btn-primary text-sm" : "btn-secondary text-sm"
            }
          >
            Phase {p.id}
            {p.id === currentPhase && !showAll && phaseFilter === p.id ? " · current" : ""}
          </Link>
        ))}
      </div>

      <ul className="space-y-3">
        {rows.map((r, idx) => (
          <li key={`${r.phase}-${r.title}-${idx}`} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="page-hero-step">
                  Phase {r.phase}
                  {r.type ? ` · ${r.type}` : ""}
                </p>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-base font-semibold"
                >
                  {r.title}
                </a>
                {r.note ? <p className="mt-2 text-sm text-text-muted">{r.note}</p> : null}
              </div>
            </div>
          </li>
        ))}
        {rows.length === 0 ? (
          <li className="card text-sm text-text-muted">No resources for this filter.</li>
        ) : null}
      </ul>
    </div>
  );
}
