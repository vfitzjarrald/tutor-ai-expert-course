import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getScheduleOutline } from "@/lib/curriculum";
import { getLearnerQueue, getProgressMap, progressKey } from "@/lib/progress";
import { PHASES, padWeek } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const session = await getSession();
  if (!session) return null;

  const outline = getScheduleOutline();
  const progress = await getProgressMap(session.id);
  const queue = await getLearnerQueue(session.id, 1);
  const currentWeek = queue.today?.week ?? null;
  const nextTask = queue.today;

  return (
    <div>
      <PageHero
        eyebrow="Full course"
        title="Schedule"
        description="Seven phases · 78 weeks · five lesson days each week. Current week follows your first incomplete lesson."
      />

      {nextTask ? (
        <div className="card mb-8">
          <p className="page-hero-step">Next task</p>
          <p className="text-heading">
            Week {padWeek(nextTask.week)} · Day {nextTask.day}
          </p>
          <Link href={`/weeks/${nextTask.week}/days/${nextTask.day}`} className="btn-primary mt-4 inline-block">
            Continue learning
          </Link>
        </div>
      ) : (
        <div className="card mb-8">
          <p className="text-heading">All lessons complete</p>
          <p className="mt-1 text-sm text-text-muted">Browse any week below to review.</p>
        </div>
      )}

      <div className="space-y-10">
        {PHASES.map((phase) => {
          const weeks = outline.filter((w) => w.week >= phase.weekStart && w.week <= phase.weekEnd);
          return (
            <section key={phase.id} className="card">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="page-hero-step">
                    Phase {phase.id} · Weeks {padWeek(phase.weekStart)}–{padWeek(phase.weekEnd)}
                  </p>
                  <h2 className="text-xl text-heading">{phase.name}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/phases/${phase.id}`} className="btn-secondary text-sm">
                    Phase hub
                  </Link>
                  <Link href={`/resources?phase=${phase.id}`} className="btn-secondary text-sm">
                    Resources
                  </Link>
                  <Link href="/gates" className="btn-secondary text-sm">
                    Gates
                  </Link>
                </div>
              </div>
              <ul className="divide-y divide-border">
                {weeks.map((w) => {
                  const doneCount = [1, 2, 3, 4, 5].filter(
                    (d) => progress.get(progressKey(w.week, d))?.completed,
                  ).length;
                  const isCurrent = currentWeek === w.week;
                  return (
                    <li
                      key={w.week}
                      className={`flex flex-wrap items-center justify-between gap-2 py-3 ${
                        isCurrent ? "bg-primary/5 -mx-2 px-2 rounded" : ""
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Link href={`/weeks/${w.week}`} className="nav-link text-base">
                          {w.title}
                        </Link>
                        {isCurrent ? (
                          <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Current
                          </span>
                        ) : null}
                        {isCurrent && nextTask ? (
                          <Link
                            href={`/weeks/${nextTask.week}/days/${nextTask.day}`}
                            className="nav-link text-xs"
                          >
                            Open next day →
                          </Link>
                        ) : null}
                      </div>
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
