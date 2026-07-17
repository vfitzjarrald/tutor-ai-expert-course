import Link from "next/link";
import { GateChecklist } from "@/components/LearningInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { PHASE_GATE_THRESHOLD, EXPERT_THRESHOLD, questionsForScope } from "@/lib/checks";
import { gatesByPhase } from "@/lib/gates";
import { getDiagnosticSummaries } from "@/lib/diagnostic-progress";
import { getGateStates, getLatestQuizScores } from "@/lib/learning";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function GatesPage() {
  const session = await getSession();
  if (!session) return null;

  const byPhase = gatesByPhase();
  const statesMap = await getGateStates(session.id);
  const states: Record<string, boolean> = {};
  for (const [k, v] of statesMap) states[k] = v;
  const scores = await getLatestQuizScores(session.id);
  const diagnostics = await getDiagnosticSummaries(session.id);

  return (
    <div>
      <PageHero
        eyebrow="Milestones"
        title="Phase gates"
        description="Check off deliverables as you finish them. Quiz thresholds come from Knowledge Checks."
      />

      <div className="space-y-8">
        {PHASES.map((phase) => {
          const items = byPhase.get(phase.id) ?? [];
          if (items.length === 0) return null;
          const quizScope = phase.id === 7 ? "all" : (`phase-${phase.id}` as const);
          const quizScore = scores.get(quizScope);
          const threshold = phase.id === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
          const qCount = questionsForScope(quizScope).length;
          const quizMet = quizScore != null && quizScore.scorePct >= threshold;
          const doneCount = items.filter((i) => states[`${i.phase}:${i.key}`]).length;
          const diagnostic = diagnostics.get(phase.id);

          return (
            <section key={phase.id} className="card">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="page-hero-step">
                    Phase {phase.id} · Week {items[0]?.week}
                  </p>
                  <h2 className="text-xl text-heading">{phase.name}</h2>
                  <p className="mt-1 text-sm text-text-muted">
                    Checklist {doneCount}/{items.length}
                    {qCount > 0
                      ? ` · Quiz ${quizScore ? `${quizScore.scorePct}%` : "not taken"} (need ≥${threshold}%)`
                      : ""}
                  </p>
                  {diagnostic?.baseline ? (
                    <p className="mt-1 text-xs text-text-muted">
                      Diagnostic baseline {diagnostic.baseline.scorePct}%
                      {diagnostic.latestReassessment
                        ? ` · latest ${diagnostic.latestReassessment.scorePct}% · growth ${
                            diagnostic.growth != null && diagnostic.growth > 0 ? "+" : ""
                          }${diagnostic.growth ?? 0} pts`
                        : " · growth reassessment available"}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {qCount > 0 ? (
                    <Link href={`/checks?scope=${quizScope}`} className="btn-secondary text-sm">
                      {quizMet ? "Quiz met" : "Take quiz"}
                    </Link>
                  ) : null}
                  <Link href={`/phases/${phase.id}`} className="btn-secondary text-sm">
                    Phase hub
                  </Link>
                  {diagnostic?.baseline ? (
                    <Link href={`/diagnostics/${phase.id}`} className="btn-secondary text-sm">
                      {diagnostic.latestReassessment ? "Reassess growth" : "Measure growth"}
                    </Link>
                  ) : null}
                </div>
              </div>
              <GateChecklist items={items} states={states} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
