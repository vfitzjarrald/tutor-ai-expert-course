import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { loadResources } from "@/lib/resources";
import { getCoursePosition, getPhaseForWeek, PHASES, resolveStartDate } from "@/lib/schedule";
import { getUserCourseStartDate } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const params = await searchParams;
  const start = resolveStartDate(await getUserCourseStartDate(session.id));
  const position = getCoursePosition(new Date(), start);
  const currentPhase = getPhaseForWeek(position.week).id;
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
        description="Curated references by phase. Each lesson day also embeds the links you need for that hour."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {PHASES.map((p) => (
          <Link
            key={p.id}
            href={`/resources?phase=${p.id}`}
            className={!showAll && phaseFilter === p.id ? "btn-primary text-sm" : "btn-secondary text-sm"}
          >
            Phase {p.id}
          </Link>
        ))}
        <Link href="/resources?phase=0" className={showAll ? "btn-primary text-sm" : "btn-secondary text-sm"}>
          All
        </Link>
      </div>

      <div className="overflow-x-auto card p-0">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-xs uppercase tracking-wide text-text-muted">
              <th className="px-4 py-3">Resource</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Phase</th>
              <th className="px-4 py-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.phase}-${r.title}`} className="border-b border-border align-top">
                <td className="px-4 py-3">
                  <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                    {r.title}
                  </a>
                </td>
                <td className="px-4 py-3 capitalize text-text-muted">{r.type}</td>
                <td className="px-4 py-3">{r.phase}</td>
                <td className="px-4 py-3 text-text-muted">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
