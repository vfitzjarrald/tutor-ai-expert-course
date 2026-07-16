import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { EXPERT_THRESHOLD, PHASE_GATE_THRESHOLD, isGateWeek } from "@/lib/checks";
import { loadWeek } from "@/lib/curriculum";
import { gatesByPhase } from "@/lib/gates";
import { getGateStates, getLatestQuizScore } from "@/lib/learning";
import { getCompletionStats, getDayProgress } from "@/lib/progress";
import { getCoursePosition, getPhaseForWeek, padWeek, resolveStartDate } from "@/lib/schedule";
import { ensureAdminSeeded, getUserCourseStartDate } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    await ensureAdminSeeded();
  } catch {
    // ignore until DB configured
  }

  const session = await getSession();
  if (!session) return null;

  const start = resolveStartDate(await getUserCourseStartDate(session.id));
  const position = getCoursePosition(new Date(), start);
  const week = loadWeek(position.week);
  const day = week?.days.find((d) => d.day === position.day);
  const phase = getPhaseForWeek(position.week);
  const progress = await getDayProgress(session.id, position.week, position.day);
  const stats = await getCompletionStats(session.id);

  const quizScope = phase.id === 7 ? "all" : (`phase-${phase.id}` as const);
  const quiz = await getLatestQuizScore(session.id, quizScope);
  const threshold = phase.id === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
  const gateItems = gatesByPhase().get(phase.id) ?? [];
  const gateStates = await getGateStates(session.id);
  const gateDone = gateItems.filter((i) => gateStates.get(`${i.phase}:${i.key}`)).length;

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} · Week ${padWeek(position.week)}`}
        title="Today’s lesson"
        description={
          position.isBusinessDay
            ? `Day ${position.day} of this week’s block — about 60 minutes.`
            : "Weekend: no scheduled lesson. Review notes, quiz, or gates."
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
          <p className="mt-2 text-2xl text-heading">{stats.percent}%</p>
          <p className="text-sm">
            {stats.completed} / {stats.total} days
          </p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quiz readiness</p>
          <p className="mt-2 text-2xl text-heading">{quiz ? `${quiz.scorePct}%` : "—"}</p>
          <p className="text-sm">
            {quiz && quiz.scorePct >= threshold ? "Threshold met" : `Need ≥${threshold}%`}
          </p>
          <Link href={`/checks?scope=${quizScope}`} className="nav-link mt-2 inline-block text-sm">
            Knowledge checks
          </Link>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Phase gate</p>
          <p className="mt-2 text-2xl text-heading">
            {gateItems.length ? `${gateDone}/${gateItems.length}` : "—"}
          </p>
          <p className="text-sm">{isGateWeek(position.week) ? "Gate week" : `Week ${gateItems[0]?.week ?? "—"}`}</p>
          <Link href="/gates" className="nav-link mt-2 inline-block text-sm">
            Open gates
          </Link>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Phase hub</p>
          <p className="mt-2 text-lg text-heading">{phase.name}</p>
          <div className="mt-3 flex flex-col gap-1">
            <Link href={`/phases/${phase.id}`} className="nav-link text-sm">
              Labs & capstone
            </Link>
            <Link href={`/resources?phase=${phase.id}`} className="nav-link text-sm">
              Resources
            </Link>
          </div>
        </div>
      </div>

      {week && day ? (
        <div className="card">
          <p className="page-hero-step">
            Week {padWeek(position.week)} · Day {day.day}
            {progress.completed ? " · Complete" : ""}
          </p>
          <h2 className="text-xl text-heading">{day.title}</h2>
          <p className="mt-2 text-sm">{week.title}</p>
          {day.objective ? (
            <p className="mt-4">
              <span className="font-semibold text-heading">Objective: </span>
              {day.objective}
            </p>
          ) : null}
          {day.deliverable ? (
            <p className="mt-2">
              <span className="font-semibold text-heading">Deliverable: </span>
              {day.deliverable}
            </p>
          ) : null}
          <div className="mt-6">
            <Link href={`/weeks/${position.week}/days/${day.day}`} className="btn-primary inline-block">
              Open today’s lesson
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <p>Could not load week {position.week}. Check curriculum files.</p>
        </div>
      )}
    </div>
  );
}
