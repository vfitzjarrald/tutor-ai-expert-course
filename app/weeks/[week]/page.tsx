import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { loadWeek } from "@/lib/curriculum";
import { getProgressMap, progressKey } from "@/lib/progress";
import { getPhaseForWeek, padWeek } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function WeekPage({ params }: { params: Promise<{ week: string }> }) {
  const session = await getSession();
  if (!session) return null;

  const { week: weekParam } = await params;
  const weekNum = Number(weekParam);
  if (!weekNum || weekNum < 1 || weekNum > 78) notFound();

  const lesson = loadWeek(weekNum);
  if (!lesson) notFound();

  const phase = getPhaseForWeek(weekNum);
  const progress = await getProgressMap(session.id);

  return (
    <div>
      <PageHero
        eyebrow={`Phase ${phase.id} — ${phase.name}`}
        title={lesson.title}
        description={lesson.timeLabel}
      />

      {lesson.outcomes ? (
        <div className="card mb-6">
          <h2 className="mb-2 text-lg text-heading">Weekly outcomes</h2>
          <p className="whitespace-pre-wrap text-sm">{lesson.outcomes}</p>
        </div>
      ) : null}

      <div className="space-y-3">
        {lesson.days.map((day) => {
          const done = progress.get(progressKey(weekNum, day.day))?.completed;
          return (
            <Link
              key={day.day}
              href={`/weeks/${weekNum}/days/${day.day}`}
              className={`card block transition-colors hover:border-primary ${done ? "border-primary/40 bg-[#E8F4FC]/40" : ""}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Day {day.day}
                    {done ? " · Complete" : ""}
                  </p>
                  <h3 className="text-lg text-heading">{day.title}</h3>
                  {day.objective ? <p className="mt-1 text-sm">{day.objective}</p> : null}
                </div>
                <span className="text-xs text-text-muted">Open →</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex gap-3">
        {weekNum > 1 ? (
          <Link href={`/weeks/${weekNum - 1}`} className="btn-secondary">
            Week {padWeek(weekNum - 1)}
          </Link>
        ) : null}
        {weekNum < 78 ? (
          <Link href={`/weeks/${weekNum + 1}`} className="btn-secondary">
            Week {padWeek(weekNum + 1)}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
