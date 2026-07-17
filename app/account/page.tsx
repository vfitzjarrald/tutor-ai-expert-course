import { redirect } from "next/navigation";
import Link from "next/link";
import { ResetMyProgressForm } from "@/components/CourseInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getLatestQuizScores, getGateStates } from "@/lib/learning";
import { getLearnerQueue } from "@/lib/progress";
import { padWeek, resolveStartDate } from "@/lib/schedule";
import { getUserCourseStartDate } from "@/lib/users";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userStart = await getUserCourseStartDate(session.id);
  const calendarStart = resolveStartDate(userStart);
  const queue = await getLearnerQueue(session.id, 1);
  const quizzes = await getLatestQuizScores(session.id);
  const gates = await getGateStates(session.id);
  const gateDone = [...gates.values()].filter(Boolean).length;

  return (
    <div>
      <PageHero
        eyebrow="Your account"
        title={session.displayName || session.username}
        description={`Recognized Expert Fast Track · about ${queue.config.targetWeeks} weeks. Progression follows completed lessons and phase diagnostics, not the calendar.`}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Current task</p>
          {queue.diagnosticDue ? (
            <>
              <p className="mt-2 text-lg text-heading">Phase {queue.diagnosticDue.phase} diagnostic</p>
              <Link
                href={`/diagnostics/${queue.diagnosticDue.phase}`}
                className="nav-link mt-2 inline-block text-sm"
              >
                Start diagnostic
              </Link>
            </>
          ) : queue.today ? (
            <>
              <p className="mt-2 text-lg text-heading">
                Week {padWeek(queue.today.week)} · Day {queue.today.day}
              </p>
              <Link
                href={`/weeks/${queue.today.week}/days/${queue.today.day}`}
                className="nav-link mt-2 inline-block text-sm"
              >
                Open lesson
              </Link>
            </>
          ) : (
            <p className="mt-2 text-lg text-heading">Course complete</p>
          )}
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
          <p className="mt-2 text-2xl text-heading">{queue.stats.percent}%</p>
          <p className="text-sm">
            {queue.stats.completedLessons} completed · {queue.stats.waivedLessons} waived
          </p>
          <p className="text-xs text-text-muted">{queue.stats.remaining} remaining</p>
          <Link href="/diagnostics" className="nav-link mt-2 inline-block text-sm">
            Diagnostics & growth
          </Link>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quiz scopes</p>
          <p className="mt-2 text-2xl text-heading">{quizzes.size}</p>
          <p className="text-sm">Latest attempts on record</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Gate items done</p>
          <p className="mt-2 text-2xl text-heading">{gateDone}</p>
          <p className="text-sm">{gates.size} tracked</p>
        </div>
      </div>

      <div className="card mb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Calendar projection start
        </p>
        <p className="mt-2 text-heading">{formatDate(calendarStart)}</p>
        <p className="mt-1 text-sm text-text-muted">
          Optional planning dates only — does not control what “Do today” shows.
          {userStart ? " Personal start date set." : " Using global course start."}
        </p>
      </div>

      <div className="card border-red-200">
        <h2 className="text-lg text-heading">Start over</h2>
        <p className="mt-2 text-sm">
          Clears day completion checkmarks, quiz attempts, and phase gate checklists so{" "}
          <strong className="text-heading">My AI Day</strong> returns to the first Fast Track lesson.
          Diagnostic baselines and waivers are cleared, gates stay mandatory, and the calendar projection resets to today.
        </p>
        <p className="mt-2 text-sm font-semibold text-heading">Your day notes are kept.</p>
        <div className="mt-6">
          <ResetMyProgressForm username={session.username} />
        </div>
      </div>
    </div>
  );
}
