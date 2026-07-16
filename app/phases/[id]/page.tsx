import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { PHASE_GATE_THRESHOLD, EXPERT_THRESHOLD } from "@/lib/checks";
import { getWeekTitle } from "@/lib/curriculum";
import { gatesByPhase } from "@/lib/gates";
import { capstoneForPhase, getPhaseInfo, loadLabReadme } from "@/lib/hub";
import { getGateStates, getLatestQuizScore } from "@/lib/learning";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function PhaseHubPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return null;

  const { id } = await params;
  const phaseId = Number(id);
  const phase = getPhaseInfo(phaseId);
  if (!phase) notFound();

  const weeks = [];
  for (let w = phase.weekStart; w <= phase.weekEnd; w++) {
    weeks.push({ week: w, title: getWeekTitle(w) });
  }

  const labMd = loadLabReadme(phaseId);
  const modules = capstoneForPhase(phaseId);
  const gateItems = gatesByPhase().get(phaseId) ?? [];
  const gateStates = await getGateStates(session.id);
  const doneCount = gateItems.filter((i) => gateStates.get(`${i.phase}:${i.key}`)).length;

  const quizScope = phaseId === 7 ? "all" : (`phase-${phaseId}` as const);
  const quiz = await getLatestQuizScore(session.id, quizScope);
  const threshold = phaseId === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} of 7`}
        title={phase.name}
        description={`Weeks ${phase.weekStart}–${phase.weekEnd}. Build in the repo; track progress here.`}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {PHASES.map((p) => (
          <Link
            key={p.id}
            href={`/phases/${p.id}`}
            className={p.id === phaseId ? "btn-primary text-sm" : "btn-secondary text-sm"}
          >
            {p.id}
          </Link>
        ))}
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quiz</p>
          <p className="mt-2 text-2xl text-heading">{quiz ? `${quiz.scorePct}%` : "—"}</p>
          <p className="text-sm">Need ≥{threshold}%</p>
          <Link href={`/checks?scope=${quizScope}`} className="nav-link mt-2 inline-block">
            Open checks
          </Link>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Gate checklist</p>
          <p className="mt-2 text-2xl text-heading">
            {doneCount}/{gateItems.length || "—"}
          </p>
          <Link href="/gates" className="nav-link mt-2 inline-block">
            Open gates
          </Link>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Resources</p>
          <p className="mt-2 text-sm">Phase library + embedded day links</p>
          <Link href={`/resources?phase=${phaseId}`} className="nav-link mt-2 inline-block">
            Browse resources
          </Link>
        </div>
      </div>

      <section className="card mb-8">
        <h2 className="mb-4 text-lg text-heading">Weeks</h2>
        <ul className="divide-y divide-border">
          {weeks.map((w) => (
            <li key={w.week} className="py-2">
              <Link href={`/weeks/${w.week}`} className="nav-link text-base">
                {w.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {modules.length > 0 ? (
        <section className="card mb-8">
          <h2 className="mb-3 text-lg text-heading">Capstone modules</h2>
          <ul className="space-y-2 text-sm">
            {modules.map((m) => (
              <li key={m.module}>
                <code className="rounded bg-surface px-2 py-1 text-heading">{m.module}</code>
                <span className="ml-2 text-text-muted">{m.status}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-text-muted">Work in the `capstone/` folder in Cursor — not in the browser.</p>
        </section>
      ) : null}

      {labMd ? (
        <section className="card">
          <h2 className="mb-4 text-lg text-heading">Lab sandbox</h2>
          <Markdown content={labMd} />
        </section>
      ) : (
        <section className="card text-sm text-text-muted">
          No dedicated lab README for this phase yet. Follow lab steps inside each week’s day lessons.
        </section>
      )}
    </div>
  );
}
