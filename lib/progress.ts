import { getDb } from "./db";
import {
  localGetCompletionStats,
  localGetDayNote,
  localGetDayProgress,
  localGetProgressMap,
  localResetLearnerProgress,
  localSetDayCompleted,
  localUpsertDayNote,
  isLocalStoreMode,
} from "./local-store";
import {
  DAYS_PER_WEEK,
  TOTAL_LESSONS,
  TOTAL_WEEKS,
  type LessonPosition,
  remainingLessons,
} from "./schedule";
import { getLatestQuizScores } from "./learning";
import { evaluateRequiredPath } from "./pathway";
import { setUserCourseStartDate } from "./users";

export type ProgressEntry = { completed: boolean; completedAt: string | null };

/** Pure helper: first N incomplete lessons in course order. */
export function findIncompleteLessons(
  progress: Map<string, ProgressEntry>,
  limit = 2,
): LessonPosition[] {
  const out: LessonPosition[] = [];
  if (limit <= 0) return out;

  for (let week = 1; week <= TOTAL_WEEKS; week++) {
    for (let day = 1; day <= DAYS_PER_WEEK; day++) {
      if (!progress.get(`${week}-${day}`)?.completed) {
        out.push({ week, day });
        if (out.length >= limit) return out;
      }
    }
  }
  return out;
}

export async function getProgressMap(userId: string) {
  if (isLocalStoreMode()) return localGetProgressMap(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT week, day, completed, completed_at::text
    FROM day_progress
    WHERE user_id = ${userId}
  `;
  const map = new Map<string, { completed: boolean; completedAt: string | null }>();
  for (const row of rows as Array<{ week: number; day: number; completed: boolean; completed_at: string | null }>) {
    map.set(`${row.week}-${row.day}`, {
      completed: row.completed,
      completedAt: row.completed_at,
    });
  }
  return map;
}

export async function getDayProgress(userId: string, week: number, day: number) {
  if (isLocalStoreMode()) return localGetDayProgress(userId, week, day);

  const sql = getDb();
  const rows = await sql`
    SELECT completed, completed_at::text
    FROM day_progress
    WHERE user_id = ${userId} AND week = ${week} AND day = ${day}
    LIMIT 1
  `;
  const row = rows[0] as { completed: boolean; completed_at: string | null } | undefined;
  return {
    completed: row?.completed ?? false,
    completedAt: row?.completed_at ?? null,
  };
}

export async function setDayCompleted(userId: string, week: number, day: number, completed: boolean) {
  if (isLocalStoreMode()) {
    await localSetDayCompleted(userId, week, day, completed);
    return;
  }

  const sql = getDb();
  if (completed) {
    await sql`
      INSERT INTO day_progress (user_id, week, day, completed, completed_at)
      VALUES (${userId}, ${week}, ${day}, TRUE, NOW())
      ON CONFLICT (user_id, week, day)
      DO UPDATE SET completed = TRUE, completed_at = NOW()
    `;
  } else {
    await sql`
      INSERT INTO day_progress (user_id, week, day, completed, completed_at)
      VALUES (${userId}, ${week}, ${day}, FALSE, NULL)
      ON CONFLICT (user_id, week, day)
      DO UPDATE SET completed = FALSE, completed_at = NULL
    `;
  }
}

export async function getDayNote(userId: string, week: number, day: number) {
  if (isLocalStoreMode()) return localGetDayNote(userId, week, day);

  const sql = getDb();
  const rows = await sql`
    SELECT body, updated_at::text
    FROM day_notes
    WHERE user_id = ${userId} AND week = ${week} AND day = ${day}
    LIMIT 1
  `;
  const row = rows[0] as { body: string; updated_at: string } | undefined;
  return {
    body: row?.body ?? "",
    updatedAt: row?.updated_at ?? null,
  };
}

export async function upsertDayNote(userId: string, week: number, day: number, body: string) {
  if (isLocalStoreMode()) {
    await localUpsertDayNote(userId, week, day, body);
    return;
  }

  const sql = getDb();
  await sql`
    INSERT INTO day_notes (user_id, week, day, body, updated_at)
    VALUES (${userId}, ${week}, ${day}, ${body}, NOW())
    ON CONFLICT (user_id, week, day)
    DO UPDATE SET body = EXCLUDED.body, updated_at = NOW()
  `;
}

export async function getCompletionStats(userId: string) {
  if (isLocalStoreMode()) return localGetCompletionStats(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT COUNT(*)::int AS completed
    FROM day_progress
    WHERE user_id = ${userId} AND completed = TRUE
  `;
  const completed = (rows[0] as { completed: number }).completed;
  const total = TOTAL_LESSONS;
  return {
    completed,
    total,
    remaining: remainingLessons(completed),
    percent: Math.round((completed / total) * 1000) / 10,
  };
}

export function progressKey(week: number, day: number) {
  return `${week}-${day}`;
}

export async function getLearnerQueue(userId: string, limit = 2) {
  const map = await getProgressMap(userId);
  const quizScores = await getLatestQuizScores(userId);
  const placements = new Map<number, number>();
  for (let phase = 1; phase <= 6; phase++) {
    const score = quizScores.get(`placement-phase-${phase}`);
    if (score) placements.set(phase, score.scorePct);
  }
  const pathway = evaluateRequiredPath(map, placements);
  const incomplete = pathway.actionable.slice(0, limit).map((state) => state.node);
  return {
    today: pathway.today,
    tomorrow: pathway.tomorrow,
    incomplete,
    courseComplete: pathway.courseComplete,
    states: pathway.states,
    optional: pathway.optional,
    config: pathway.config,
    placements,
    stats: {
      completed: pathway.completedRequired,
      total: pathway.requiredTotal,
      remaining: pathway.remainingRequired,
      percent: pathway.percent,
    },
  };
}

export async function resetLearnerProgress(userId: string, opts: { keepNotes: boolean }) {
  if (isLocalStoreMode()) {
    await localResetLearnerProgress(userId, opts);
    return;
  }

  const sql = getDb();
  await sql`DELETE FROM day_progress WHERE user_id = ${userId}`;
  await sql`DELETE FROM quiz_attempts WHERE user_id = ${userId}`;
  await sql`DELETE FROM gate_items WHERE user_id = ${userId}`;
  await sql`DELETE FROM lesson_task_progress WHERE user_id = ${userId}`;
  if (!opts.keepNotes) {
    await sql`DELETE FROM day_notes WHERE user_id = ${userId}`;
  }

  const today = new Date();
  today.setHours(12, 0, 0, 0);
  await setUserCourseStartDate(userId, today);
}
