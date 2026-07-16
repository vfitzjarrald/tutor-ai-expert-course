import Link from "next/link";
import { PageHero } from "@/components/SiteChrome";
import { getSession } from "@/lib/auth";
import { getWeekTitle } from "@/lib/curriculum";
import { getProgressMap, progressKey } from "@/lib/progress";
import {
  dateForWeekDay,
  getCoursePosition,
  isBusinessDay,
  padWeek,
  readStartDate,
  TOTAL_WEEKS,
  weekdayToCourseDay,
} from "@/lib/schedule";

export const dynamic = "force-dynamic";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const session = await getSession();
  if (!session) return null;

  const params = await searchParams;
  const start = readStartDate();
  const today = getCoursePosition(new Date(), start);
  const now = new Date();
  const year = Number(params.year) || now.getFullYear();
  const month = Number(params.month) || now.getMonth() + 1; // 1-12

  const first = new Date(year, month - 1, 1, 12);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = (first.getDay() + 6) % 7; // Mon=0 … Sun=6 for grid

  const progress = await getProgressMap(session.id);

  // Map calendar dates → course week/day by walking from start
  const dateMeta = new Map<string, { week: number; day: number; title: string }>();
  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    for (let d = 1; d <= 5; d++) {
      const dt = dateForWeekDay(w, d, start);
      const key = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
      dateMeta.set(key, { week: w, day: d, title: getWeekTitle(w) });
    }
  }

  const prev = new Date(year, month - 2, 1);
  const next = new Date(year, month, 1);
  const monthLabel = first.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const cells: Array<null | { date: Date; key: string }> = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d, 12);
    cells.push({ date, key: `${year}-${month}-${d}` });
  }

  return (
    <div>
      <PageHero
        eyebrow="Course calendar"
        title={monthLabel}
        description="Mon–Fri lesson days mapped from your course start date. Completed days are highlighted."
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          href={`/calendar?year=${prev.getFullYear()}&month=${prev.getMonth() + 1}`}
          className="btn-secondary"
        >
          Previous
        </Link>
        <Link
          href={`/calendar?year=${next.getFullYear()}&month=${next.getMonth() + 1}`}
          className="btn-secondary"
        >
          Next
        </Link>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border text-center text-xs font-semibold uppercase tracking-wide text-text-muted">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="bg-surface py-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-border">
        {cells.map((cell, idx) => {
          if (!cell) {
            return <div key={`e-${idx}`} className="min-h-[4.5rem] bg-surface" />;
          }
          const meta = dateMeta.get(cell.key);
          const biz = isBusinessDay(cell.date);
          const courseDay = weekdayToCourseDay(cell.date);
          const done = meta ? progress.get(progressKey(meta.week, meta.day))?.completed : false;
          const isToday =
            cell.date.getFullYear() === today.date.getFullYear() &&
            cell.date.getMonth() === today.date.getMonth() &&
            cell.date.getDate() === today.date.getDate();

          const className = [
            "cal-day",
            !biz ? "cal-day-muted" : "",
            done ? "cal-day-done" : "",
            isToday ? "cal-day-today" : "",
          ]
            .filter(Boolean)
            .join(" ");

          const inner = (
            <>
              <span className="text-xs font-semibold text-heading">{cell.date.getDate()}</span>
              {meta && courseDay ? (
                <span className="mt-1 line-clamp-2 text-[10px] leading-tight text-text">
                  W{padWeek(meta.week)} D{meta.day}
                </span>
              ) : null}
            </>
          );

          if (meta && courseDay) {
            return (
              <Link
                key={cell.key}
                href={`/weeks/${meta.week}/days/${meta.day}`}
                className={className}
                title={meta.title}
              >
                {inner}
              </Link>
            );
          }

          return (
            <div key={cell.key} className={className}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
