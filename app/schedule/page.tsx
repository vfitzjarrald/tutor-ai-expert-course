import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getScheduleOutline } from "@/lib/curriculum";
import { getProgressMap, progressKey } from "@/lib/progress";
import { PHASES, padWeek } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const session = await getSession();
  if (!session) return null;

  const outline = getScheduleOutline();
  const progress = await getProgressMap(session.id);

  return (
    <div>
      <PageHero
        eyebrow="Full course"
        title="Schedule"
        description="Seven phases · 78 weeks · five lesson days each week."
      />

      <div className="space-y-10">
        {PHASES.map((phase) => {
          const weeks = outline.filter((w) => w.week >= phase.weekStart && w.week <= phase.weekEnd);
          return (
            <section key={phase.id} className="card">
              <p className="page-hero-step">
                Phase {phase.id} · Weeks {padWeek(phase.weekStart)}–{padWeek(phase.weekEnd)}
              </p>
              <h2 className="mb-4 text-xl text-heading">{phase.name}</h2>
              <ul className="divide-y divide-border">
                {weeks.map((w) => {
                  const doneCount = [1, 2, 3, 4, 5].filter(
                    (d) => progress.get(progressKey(w.week, d))?.completed,
                  ).length;
                  return (
                    <li key={w.week} className="flex flex-wrap items-center justify-between gap-2 py-3">
                      <Link href={`/weeks/${w.week}`} className="nav-link text-base">
                        {w.title}
                      </Link>
                      <span className="text-xs text-text-muted">{doneCount}/5 days</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
