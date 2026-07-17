import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getDiagnosticSummaries } from "@/lib/diagnostic-progress";
import { getLearnerQueue } from "@/lib/progress";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function DiagnosticsPage() {
  const session = await getSession();
  if (!session) return null;

  const [summaries, queue] = await Promise.all([
    getDiagnosticSummaries(session.id),
    getLearnerQueue(session.id, 1),
  ]);

  return (
    <div>
      <PageHero
        eyebrow="Baseline · prior knowledge · growth"
        title="Phase diagnostics"
        description="Complete a diagnostic before each new phase. Your first score is preserved as a baseline; demonstrated skill mastery can waive only eligible lessons, never gates or expert evidence."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {PHASES.map((phase) => {
          const summary = summaries.get(phase.id);
          const phaseStarted = queue.states.some(
            (state) => state.node.phase === phase.id && state.completed,
          );
          const due = queue.diagnosticDue?.phase === phase.id;
          const available = Boolean(summary?.baseline || due || phaseStarted);
          return (
            <section key={phase.id} className="card">
              <p className="page-hero-step">
                Phase {phase.id} · Weeks {phase.weekStart}–{phase.weekEnd}
              </p>
              <h2 className="text-xl text-heading">{phase.name}</h2>
              {summary?.baseline ? (
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-text-muted">Baseline</p>
                    <p className="font-semibold text-heading">{summary.baseline.scorePct}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Waived skills</p>
                    <p className="font-semibold text-heading">{summary.waivedSkillIds.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">Growth</p>
                    <p className="font-semibold text-heading">
                      {summary.growth == null
                        ? "—"
                        : `${summary.growth > 0 ? "+" : ""}${summary.growth} pts`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-text-muted">
                  {due
                    ? "Required now before this phase begins."
                    : phaseStarted
                      ? "This phase is in progress; establish a current benchmark."
                      : "Unlocks when this phase becomes your next segment."}
                </p>
              )}
              <div className="mt-5">
                {available ? (
                  <Link href={`/diagnostics/${phase.id}`} className={due ? "btn-primary" : "btn-secondary"}>
                    {summary?.baseline
                      ? "View results / reassess"
                      : due
                        ? "Start required diagnostic"
                        : "Take benchmark"}
                  </Link>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                    Locked
                  </span>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
