import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { EXPERT_THRESHOLD, PHASE_GATE_THRESHOLD, isGateWeek } from "@/lib/checks";
import { loadWeek } from "@/lib/curriculum";
import { gatesByPhase } from "@/lib/gates";
import { getGateStates, getLatestQuizScore } from "@/lib/learning";
import { getLearnerQueue } from "@/lib/progress";
import { getPhaseForWeek, padWeek } from "@/lib/schedule";
import { ensureAdminSeeded } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    await ensureAdminSeeded();
  } catch {
    // ignore until DB configured
  }

  const session = await getSession();
  if (!session) return null;

  const queue = await getLearnerQueue(session.id, 2);
  const todayPos = queue.today;
  const tomorrowPos = queue.tomorrow;

  const todayWeek = todayPos ? loadWeek(todayPos.week) : null;
  const todayDay = todayWeek?.days.find((d) => d.day === todayPos?.day);
  const tomorrowWeek = tomorrowPos ? loadWeek(tomorrowPos.week) : null;
  const tomorrowDay = tomorrowWeek?.days.find((d) => d.day === tomorrowPos?.day);

  const focusWeek = todayPos?.week ?? 78;
  const phase = getPhaseForWeek(focusWeek);
  const quizScope = phase.id === 7 ? "all" : (`phase-${phase.id}` as const);
  const quiz = await getLatestQuizScore(session.id, quizScope);
  const threshold = phase.id === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
  const gateItems = gatesByPhase().get(phase.id) ?? [];
  const gateStates = await getGateStates(session.id);
  const gateDone = gateItems.filter((i) => gateStates.get(`${i.phase}:${i.key}`)).length;

  return (
    <div>
      <PageHero
        eyebrow={
          queue.courseComplete
            ? "Course complete"
            : `Phase ${phase.id} · Week ${padWeek(focusWeek)}`
        }
        title="Do today"
        description={
          queue.courseComplete
            ? "You’ve finished every lesson. Review gates, quizzes, or revisit any week."
            : "Your next incomplete lesson — about 60 minutes. Progress follows what you finish, not the calendar."
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
          <p className="mt-2 text-2xl text-heading">{queue.stats.percent}%</p>
          <p className="text-sm">
            {queue.stats.completed} done · {queue.stats.remaining} remaining
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
          <p className="text-sm">{isGateWeek(focusWeek) ? "Gate week" : `Week ${gateItems[0]?.week ?? "—"}`}</p>
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

      {queue.courseComplete ? (
        <div className="card">
          <h2 className="text-xl text-heading">All lessons complete</h2>
          <p className="mt-2 text-sm">
            Use Schedule to revisit any day, or tighten phase gates and expert checks.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/gates" className="btn-primary inline-block">
              Review gates
            </Link>
            <Link href="/checks?scope=all" className="btn-secondary inline-block">
              Expert knowledge check
            </Link>
            <Link href="/schedule" className="btn-secondary inline-block">
              Browse schedule
            </Link>
          </div>
        </div>
      ) : todayWeek && todayDay && todayPos ? (
        <div className="space-y-6">
          <div className="card">
            <p className="page-hero-step">
              Do today · Week {padWeek(todayPos.week)} · Day {todayDay.day}
            </p>
            <h2 className="text-xl text-heading">{todayDay.title}</h2>
            <p className="mt-2 text-sm">{todayWeek.title}</p>
            {todayDay.objective ? (
              <p className="mt-4">
                <span className="font-semibold text-heading">Objective: </span>
                {todayDay.objective}
              </p>
            ) : null}
            {todayDay.deliverable ? (
              <p className="mt-2">
                <span className="font-semibold text-heading">Deliverable: </span>
                {todayDay.deliverable}
              </p>
            ) : null}
            <div className="mt-6">
              <Link
                href={`/weeks/${todayPos.week}/days/${todayDay.day}`}
                className="btn-primary inline-block"
              >
                Open today’s lesson
              </Link>
            </div>
          </div>

          {tomorrowPos && tomorrowWeek && tomorrowDay ? (
            <div className="card border-dashed">
              <p className="page-hero-step">
                Do tomorrow · Week {padWeek(tomorrowPos.week)} · Day {tomorrowDay.day}
              </p>
              <h2 className="text-lg text-heading">{tomorrowDay.title}</h2>
              <p className="mt-1 text-sm text-text-muted">{tomorrowWeek.title}</p>
              <div className="mt-4">
                <Link
                  href={`/weeks/${tomorrowPos.week}/days/${tomorrowDay.day}`}
                  className="nav-link text-sm"
                >
                  Preview next lesson →
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="card">
          <p>Could not load the next lesson. Check curriculum files.</p>
        </div>
      )}
    </div>
  );
}
