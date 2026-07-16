import { readFileSync } from "fs";
import path from "path";

export const TOTAL_WEEKS = 78;
export const DAYS_PER_WEEK = 5;

export type CoursePosition = {
  week: number;
  day: number;
  date: Date;
  isBusinessDay: boolean;
};

export type PhaseInfo = {
  id: number;
  name: string;
  weekStart: number;
  weekEnd: number;
};

export const PHASES: PhaseInfo[] = [
  { id: 1, name: "AI & RAG Foundations", weekStart: 1, weekEnd: 8 },
  { id: 2, name: "Knowledge Maps", weekStart: 9, weekEnd: 16 },
  { id: 3, name: "Graph DB & Student Modeling", weekStart: 17, weekEnd: 24 },
  { id: 4, name: "GraphRAG", weekStart: 25, weekEnd: 32 },
  { id: 5, name: "MCP & Agents", weekStart: 33, weekEnd: 40 },
  { id: 6, name: "Capstone & Production", weekStart: 41, weekEnd: 52 },
  { id: 7, name: "Expert Mastery", weekStart: 53, weekEnd: 78 },
];

export function getPhaseForWeek(week: number): PhaseInfo {
  return PHASES.find((p) => week >= p.weekStart && week <= p.weekEnd) ?? PHASES[0];
}

export function readStartDate(repoRoot = process.cwd()): Date {
  const file = path.join(repoRoot, "curriculum", "start-date.txt");
  const raw = readFileSync(file, "utf8").trim();
  const [y, m, d] = raw.split("-").map(Number);
  if (!y || !m || !d) {
    throw new Error(`Invalid start-date.txt: ${raw}`);
  }
  // Local noon avoids DST edge issues for date-only math
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
}

export function isBusinessDay(date: Date): boolean {
  const day = date.getDay(); // 0 Sun … 6 Sat
  return day >= 1 && day <= 5;
}

/** Mon=1 … Fri=5; weekend returns null */
export function weekdayToCourseDay(date: Date): number | null {
  const d = date.getDay();
  if (d < 1 || d > 5) return null;
  return d;
}

/** Count Mon–Fri days from start through `asOf` inclusive when asOf is a business day. */
export function countBusinessDaysInclusive(start: Date, asOf: Date): number {
  const a = startOfLocalDay(start);
  const b = startOfLocalDay(asOf);
  if (b < a) return 0;

  let count = 0;
  const cursor = new Date(a);
  while (cursor <= b) {
    if (isBusinessDay(cursor)) count += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return count;
}

export function getCoursePosition(asOf: Date = new Date(), startDate?: Date): CoursePosition {
  const start = startDate ?? readStartDate();
  const date = startOfLocalDay(asOf);
  const businessDays = countBusinessDaysInclusive(start, date);
  const dayInWeek = weekdayToCourseDay(date);

  if (businessDays <= 0) {
    return { week: 1, day: 1, date, isBusinessDay: Boolean(dayInWeek) };
  }

  const week = Math.min(TOTAL_WEEKS, Math.max(1, Math.ceil(businessDays / DAYS_PER_WEEK)));
  const day = dayInWeek ?? 5;

  return {
    week,
    day,
    date,
    isBusinessDay: Boolean(dayInWeek),
  };
}

export function dateForWeekDay(week: number, day: number, startDate?: Date): Date {
  const start = startDate ?? readStartDate();
  const offset = (week - 1) * DAYS_PER_WEEK + (day - 1);
  let remaining = offset;
  const cursor = startOfLocalDay(start);
  while (remaining > 0) {
    cursor.setDate(cursor.getDate() + 1);
    if (isBusinessDay(cursor)) remaining -= 1;
  }
  return cursor;
}

export function padWeek(week: number): string {
  return String(week).padStart(2, "0");
}
