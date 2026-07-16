import { readFileSync, existsSync } from "fs";
import path from "path";
import { getPhaseForWeek, padWeek, TOTAL_WEEKS } from "./schedule";

export type LessonDay = {
  day: number;
  title: string;
  objective: string;
  deliverable: string;
  rawMarkdown: string;
};

export type WeekLesson = {
  week: number;
  title: string;
  phaseLabel: string;
  timeLabel: string;
  outcomes: string;
  days: LessonDay[];
  fullMarkdown: string;
};

function weeksDir(repoRoot = process.cwd()) {
  return path.join(repoRoot, "curriculum", "weeks");
}

export function weekFilePath(week: number, repoRoot = process.cwd()) {
  return path.join(weeksDir(repoRoot), `week-${padWeek(week)}.md`);
}

export function listWeekNumbers(repoRoot = process.cwd()): number[] {
  const out: number[] = [];
  for (let w = 1; w <= TOTAL_WEEKS; w++) {
    if (existsSync(weekFilePath(w, repoRoot))) out.push(w);
  }
  return out;
}

export function getWeekTitle(week: number, repoRoot = process.cwd()): string {
  const file = weekFilePath(week, repoRoot);
  if (!existsSync(file)) return `Week ${padWeek(week)}`;
  const md = readFileSync(file, "utf8");
  const m = md.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim() ?? `Week ${padWeek(week)}`;
}

function splitDays(markdown: string): LessonDay[] {
  const dayRegex = /###\s+Day\s+(\d+)\s+[—–-]\s+(.+?)\s*\((\d+)\s*min\)/g;
  const matches = [...markdown.matchAll(dayRegex)];
  const days: LessonDay[] = [];

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const start = match.index ?? 0;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? markdown.length) : markdown.length;
    const chunk = markdown.slice(start, end).trim();
    const day = Number(match[1]);
    const title = match[2].trim();
    const objectiveMatch = chunk.match(/\*\*Objective:\*\*\s*(.+)/);
    const deliverableMatch = chunk.match(/\*\*Deliverable:\*\*\s*(.+)/);
    days.push({
      day,
      title,
      objective: objectiveMatch?.[1]?.trim() ?? "",
      deliverable: deliverableMatch?.[1]?.trim() ?? "",
      rawMarkdown: chunk,
    });
  }

  return days;
}

export function loadWeek(week: number, repoRoot = process.cwd()): WeekLesson | null {
  const file = weekFilePath(week, repoRoot);
  if (!existsSync(file)) return null;
  const fullMarkdown = readFileSync(file, "utf8");

  const titleMatch = fullMarkdown.match(/^#\s+(.+)$/m);
  const phaseMatch = fullMarkdown.match(/\*\*Phase:\*\*\s*(.+)/);
  const timeMatch = fullMarkdown.match(/\*\*Time:\*\*\s*(.+)/);
  const outcomesMatch = fullMarkdown.match(/##\s+Weekly outcomes\s*\n([\s\S]*?)(?=\n---|\n###\s+Day)/);

  const phase = getPhaseForWeek(week);

  return {
    week,
    title: titleMatch?.[1]?.trim() ?? `Week ${padWeek(week)}`,
    phaseLabel: phaseMatch?.[1]?.trim() ?? `Phase ${phase.id} — ${phase.name}`,
    timeLabel: timeMatch?.[1]?.trim() ?? "5 business days × 60 min",
    outcomes: outcomesMatch?.[1]?.trim() ?? "",
    days: splitDays(fullMarkdown),
    fullMarkdown,
  };
}

export function loadDay(week: number, day: number, repoRoot = process.cwd()): LessonDay | null {
  const lesson = loadWeek(week, repoRoot);
  if (!lesson) return null;
  return lesson.days.find((d) => d.day === day) ?? null;
}

export function getScheduleOutline(repoRoot = process.cwd()) {
  return listWeekNumbers(repoRoot).map((week) => ({
    week,
    title: getWeekTitle(week, repoRoot),
    phase: getPhaseForWeek(week),
  }));
}
