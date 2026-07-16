import Link from "next/link";
import { QuizForm } from "@/components/LearningInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import {
  loadQuizQuestions,
  questionsForScope,
  thresholdForScope,
  type QuizScope,
} from "@/lib/checks";
import { getLatestQuizScore, getLatestQuizScores } from "@/lib/learning";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function ChecksPage({
  searchParams,
}: {
  searchParams: Promise<{ scope?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const params = await searchParams;
  const scopeRaw = params.scope ?? "all";
  const scope: QuizScope =
    scopeRaw === "all" || /^phase-[1-7]$/.test(scopeRaw) ? (scopeRaw as QuizScope) : "all";

  const questions = questionsForScope(scope);
  const threshold = thresholdForScope(scope);
  const latest = await getLatestQuizScore(session.id, scope);
  const allScores = await getLatestQuizScores(session.id);
  const allQuestions = loadQuizQuestions();

  return (
    <div>
      <PageHero
        eyebrow="Knowledge checks"
        title="Quiz"
        description="Phase gates need ≥80% on that phase’s questions. The expert checkpoint (Week 78) needs ≥85% on all 12."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/checks?scope=all" className={scope === "all" ? "btn-primary text-sm" : "btn-secondary text-sm"}>
          All 12 (expert)
        </Link>
        {PHASES.filter((p) => p.id <= 6).map((p) => {
          const s = `phase-${p.id}` as QuizScope;
          const score = allScores.get(s);
          return (
            <Link
              key={p.id}
              href={`/checks?scope=${s}`}
              className={scope === s ? "btn-primary text-sm" : "btn-secondary text-sm"}
            >
              Phase {p.id}
              {score ? ` · ${score.scorePct}%` : ""}
            </Link>
          );
        })}
      </div>

      {latest ? (
        <div className="card mb-6 text-sm">
          Latest for this scope: <span className="font-semibold text-heading">{latest.scorePct}%</span>
          {latest.scorePct >= threshold ? " — threshold met" : ` — need ≥${threshold}%`}
        </div>
      ) : null}

      {questions.length === 0 ? (
        <div className="card">No questions found. Check curriculum/CHECKS.md.</div>
      ) : (
        <QuizForm questions={questions} scope={scope} threshold={threshold} />
      )}

      <p className="mt-8 text-xs text-text-muted">
        Loaded {allQuestions.length} questions from curriculum/CHECKS.md.
      </p>
    </div>
  );
}
