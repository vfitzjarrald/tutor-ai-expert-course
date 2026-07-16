import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { loadWeek } from "@/lib/curriculum";
import { getCompletionStats, getDayProgress } from "@/lib/progress";
import { getCoursePosition, getPhaseForWeek, padWeek, readStartDate } from "@/lib/schedule";
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

  const start = readStartDate();
  const position = getCoursePosition(new Date(), start);
  const week = loadWeek(position.week);
  const day = week?.days.find((d) => d.day === position.day);
  const phase = getPhaseForWeek(position.week);
  const progress = await getDayProgress(session.id, position.week, position.day);
  const stats = await getCompletionStats(session.id);

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} · Week ${padWeek(position.week)}`}
        title="Today’s lesson"
        description={
          position.isBusinessDay
            ? `Day ${position.day} of this week’s block — about 60 minutes.`
            : "Weekend: no scheduled lesson. Review notes or get ahead for Monday."
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
          <p className="mt-2 text-2xl text-heading">{stats.percent}%</p>
          <p className="text-sm">
            {stats.completed} / {stats.total} days complete
          </p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Course start</p>
          <p className="mt-2 text-2xl text-heading">
            {start.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </p>
          <p className="text-sm">Monday of Week 01</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Quick links</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/calendar" className="nav-link">
              Calendar
            </Link>
            <Link href="/schedule" className="nav-link">
              Full schedule
            </Link>
            {session.role === "admin" ? (
              <Link href="/admin/users" className="nav-link">
                Manage learners
              </Link>
            ) : null}
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
            <Link
              href={`/weeks/${position.week}/days/${day.day}`}
              className="btn-primary inline-block"
            >
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
