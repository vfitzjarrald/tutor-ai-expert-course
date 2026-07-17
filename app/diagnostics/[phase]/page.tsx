import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagnosticForm } from "@/components/LearningInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getDiagnosticSummaries } from "@/lib/diagnostic-progress";
import {
  getDiagnosticPhase,
  publicDiagnosticQuestions,
} from "@/lib/diagnostics";
import { loadPathway } from "@/lib/pathway";
import { getLearnerQueue } from "@/lib/progress";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function DiagnosticPhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const session = await getSession();
  if (!session) return null;
  const phaseId = Number((await params).phase);
  if (!Number.isInteger(phaseId) || phaseId < 1 || phaseId > 7) notFound();

  const diagnostic = getDiagnosticPhase(phaseId);
  const phase = PHASES.find((item) => item.id === phaseId);
  if (!diagnostic || !phase) notFound();
  const [summaries, queue] = await Promise.all([
    getDiagnosticSummaries(session.id),
    getLearnerQueue(session.id, 1),
  ]);
  const summary = summaries.get(phaseId);
  const phaseStarted = queue.states.some(
    (state) => state.node.phase === phaseId && state.completed,
  );
  const due = queue.diagnosticDue?.phase === phaseId;
  const canTake = Boolean(summary?.baseline || due || phaseStarted);
  const isReassessment = Boolean(summary?.baseline);
  const questions = publicDiagnosticQuestions(
    isReassessment ? diagnostic.reassessment : diagnostic.baseline,
  );
  const { skills } = loadPathway();
  const phaseSkills = skills.weeks.filter(
    (skill) => skill.phase === phaseId && skill.required && !skill.gate,
  );
  const skillName = new Map(phaseSkills.map((skill) => [skill.id, skill.id.replaceAll("-", " ")]));

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phaseId} diagnostic · ${isReassessment ? "Growth reassessment" : "Upfront baseline"}`}
        title={diagnostic.title || phase.name}
        description={
          isReassessment
            ? "Measure growth against your preserved baseline. Reassessments never remove or add prior-knowledge waivers."
            : "Show what you know before this phase. Each eligible skill scoring at least 80% is waived; gates and expert evidence remain required."
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/diagnostics" className="btn-secondary text-sm">
          All diagnostics
        </Link>
        <Link href={`/phases/${phaseId}`} className="btn-secondary text-sm">
          Phase overview
        </Link>
      </div>

      <section className="card mb-6">
        <h2 className="text-lg text-heading">Content covered</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {phaseSkills.map((skill) => (
            <div key={skill.id} className="rounded-lg border border-border p-3">
              <p className="font-semibold capitalize text-heading">{skillName.get(skill.id)}</p>
              <p className="mt-1 text-xs text-text-muted">{skill.tags.join(" · ")}</p>
              <p className="mt-1 text-xs">
                {skill.skippable && phaseId <= 6
                  ? "Eligible for prior-knowledge waiver"
                  : "Measured only · remains required"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {summary?.baseline ? (
        <section className="card mb-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Baseline</p>
              <p className="mt-1 text-2xl text-heading">{summary.baseline.scorePct}%</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Latest</p>
              <p className="mt-1 text-2xl text-heading">
                {summary.latestReassessment
                  ? `${summary.latestReassessment.scorePct}%`
                  : "Not reassessed"}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Growth</p>
              <p className="mt-1 text-2xl text-heading">
                {summary.growth == null
                  ? "—"
                  : `${summary.growth > 0 ? "+" : ""}${summary.growth} pts`}
              </p>
            </div>
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <h3 className="font-semibold text-heading">Baseline by skill</h3>
            <ul className="mt-2 space-y-2">
              {summary.baseline.skillScores.map((score) => {
                const waived = summary.waivedSkillIds.includes(score.skillId);
                return (
                  <li key={score.skillId} className="flex flex-wrap justify-between gap-2 text-sm">
                    <span className="capitalize text-heading">{skillName.get(score.skillId) ?? score.skillId}</span>
                    <span className={waived ? "font-semibold text-primary" : "text-text-muted"}>
                      {score.scorePct}% · {waived ? "waived" : "remains in path"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {!canTake ? (
        <div className="card">
          <h2 className="text-lg text-heading">Diagnostic locked</h2>
          <p className="mt-2 text-sm text-text-muted">
            Complete the prior phase first. This diagnostic will become your primary My AI Day task
            before Phase {phaseId} begins.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-5 rounded-card border border-primary/20 bg-primary/5 p-4 text-sm">
            {isReassessment
              ? "This matched form measures the same skills with different scenarios. Your original baseline and waivers stay unchanged."
              : `This is your one-time Phase ${phaseId} baseline. Submit when you are ready; it cannot be overwritten.`}
          </div>
          <DiagnosticForm
            phase={phaseId}
            questions={questions}
            isReassessment={isReassessment}
          />
        </>
      )}
    </div>
  );
}
