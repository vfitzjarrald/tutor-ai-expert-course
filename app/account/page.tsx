import { redirect } from "next/navigation";
import { ResetMyProgressForm } from "@/components/CourseInteractive";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getLatestQuizScores, getGateStates } from "@/lib/learning";
import { getCompletionStats } from "@/lib/progress";
import { resolveStartDate } from "@/lib/schedule";
import { getUserCourseStartDate } from "@/lib/users";

export const dynamic = "force-dynamic";

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const userStart = await getUserCourseStartDate(session.id);
  const start = resolveStartDate(userStart);
  const stats = await getCompletionStats(session.id);
  const quizzes = await getLatestQuizScores(session.id);
  const gates = await getGateStates(session.id);
  const gateDone = [...gates.values()].filter(Boolean).length;

  return (
    <div>
      <PageHero
        eyebrow="Your account"
        title={session.displayName || session.username}
        description="Manage your learner progress. Admins also use this page as a learner."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Course start</p>
          <p className="mt-2 text-lg text-heading">{formatDate(start)}</p>
          <p className="text-sm">{userStart ? "Personal start date" : "Global course start"}</p>
        </div>
        <div className="card">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Progress</p>
          <p className="mt-2 text-2xl text-heading">{stats.percent}%</p>
          <p className="text-sm">
            {stats.completed} / {stats.total} days
          </p>
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

      <div className="card border-red-200">
        <h2 className="text-lg text-heading">Start over</h2>
        <p className="mt-2 text-sm">
          Resets your calendar to <strong className="text-heading">Week 1</strong> (personal start date =
          today), and clears day completion checkmarks, quiz attempts, and phase gate checklists.
        </p>
        <p className="mt-2 text-sm font-semibold text-heading">Your day notes are kept.</p>
        <div className="mt-6">
          <ResetMyProgressForm username={session.username} />
        </div>
      </div>
    </div>
  );
}
