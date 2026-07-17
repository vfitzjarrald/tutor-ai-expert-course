import Link from "next/link";
import { QuizForm } from "@/components/LearningInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { questionsForScope, type QuizScope } from "@/lib/checks";
import { getLatestQuizScores } from "@/lib/learning";
import { PHASES } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function PlacementPage({
  searchParams,
}: {
  searchParams: Promise<{ phase?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const params = await searchParams;
  const phase = Math.min(6, Math.max(1, Number(params.phase) || 1));
  const scope = `phase-${phase}` as QuizScope;
  const questions = questionsForScope(scope);
  const scores = await getLatestQuizScores(session.id);
  const latest = scores.get(`placement-${scope}`);

  return (
    <div>
      <PageHero
        eyebrow="Fast Track placement"
        title={`Phase ${phase} placement`}
        description="Score at least 80% to bypass skippable foundation lessons. Phase gates and recognized-expert evidence are never skipped."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {PHASES.filter((item) => item.id <= 6).map((item) => {
          const score = scores.get(`placement-phase-${item.id}`);
          return (
            <Link
              key={item.id}
              href={`/placement?phase=${item.id}`}
              className={item.id === phase ? "btn-primary text-sm" : "btn-secondary text-sm"}
            >
              Phase {item.id}
              {score ? ` · ${score.scorePct}%` : ""}
            </Link>
          );
        })}
      </div>

      {latest ? (
        <div className="card mb-6 text-sm">
          Latest placement: <span className="font-semibold text-heading">{latest.scorePct}%</span>
          {latest.scorePct >= 80
            ? " — foundations bypassed; gate still required"
            : " — foundations remain in your path"}
        </div>
      ) : null}

      <div className="card mb-6 text-sm">
        Placement is optional. You can retake a phase check at any time; the latest score controls
        whether its skippable lessons remain in your queue.
      </div>

      {questions.length ? (
        <QuizForm questions={questions} scope={scope} threshold={80} placement />
      ) : (
        <div className="card">No placement questions found for this phase.</div>
      )}
    </div>
  );
}
