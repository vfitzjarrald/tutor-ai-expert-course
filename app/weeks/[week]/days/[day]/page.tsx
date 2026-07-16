import Link from "next/link";
import { notFound } from "next/navigation";
import { CompleteToggle, NoteEditor } from "@/components/CourseInteractive";
import { PathHints } from "@/components/LearningInteractive";
import { Markdown } from "@/components/Markdown";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { isGateWeek } from "@/lib/checks";
import { loadDay, loadWeek } from "@/lib/curriculum";
import { extractDeliverablePaths } from "@/lib/hub";
import { getDayNote, getDayProgress } from "@/lib/progress";
import { getPhaseForWeek, padWeek } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function DayPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const { week: weekParam, day: dayParam } = await params;
  const weekNum = Number(weekParam);
  const dayNum = Number(dayParam);
  if (!weekNum || weekNum < 1 || weekNum > 78 || !dayNum || dayNum < 1 || dayNum > 5) {
    notFound();
  }

  const week = loadWeek(weekNum);
  const day = loadDay(weekNum, dayNum);
  if (!week || !day) notFound();

  const phase = getPhaseForWeek(weekNum);
  const progress = await getDayProgress(session.id, weekNum, dayNum);
  const note = await getDayNote(session.id, weekNum, dayNum);
  const paths = extractDeliverablePaths(day.rawMarkdown);

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} · Week ${padWeek(weekNum)} · Day ${dayNum}`}
        title={day.title}
        description={week.title}
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <CompleteToggle week={weekNum} day={dayNum} completed={progress.completed} />
        <Link href={`/weeks/${weekNum}`} className="btn-secondary">
          Week overview
        </Link>
        <Link href={`/resources?phase=${phase.id}`} className="btn-secondary">
          Resources
        </Link>
        {isGateWeek(weekNum) ? (
          <Link href="/gates" className="btn-secondary">
            Phase gate
          </Link>
        ) : null}
        {dayNum > 1 ? (
          <Link href={`/weeks/${weekNum}/days/${dayNum - 1}`} className="nav-link">
            ← Previous day
          </Link>
        ) : null}
        {dayNum < 5 ? (
          <Link href={`/weeks/${weekNum}/days/${dayNum + 1}`} className="nav-link">
            Next day →
          </Link>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <article className="card">
          <Markdown content={day.rawMarkdown} />
        </article>
        <aside className="space-y-6">
          <div className="card">
            <NoteEditor week={weekNum} day={dayNum} initialBody={note.body} />
          </div>
          <PathHints paths={paths} noteBody={note.body} week={weekNum} day={dayNum} />
          {day.deliverable ? (
            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Deliverable</p>
              <p className="mt-2 text-heading">{day.deliverable}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
