import { getDb } from "./db";
import {
  localGetCompletionStats,
  localGetDayNote,
  localGetDayProgress,
  localGetProgressMap,
  localSetDayCompleted,
  localUpsertDayNote,
  useLocalStore,
} from "./local-store";

export async function getProgressMap(userId: string) {
  if (useLocalStore()) return localGetProgressMap(userId);

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
  if (useLocalStore()) return localGetDayProgress(userId, week, day);

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
  if (useLocalStore()) {
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
  if (useLocalStore()) return localGetDayNote(userId, week, day);

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
  if (useLocalStore()) {
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
  if (useLocalStore()) return localGetCompletionStats(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT COUNT(*)::int AS completed
    FROM day_progress
    WHERE user_id = ${userId} AND completed = TRUE
  `;
  const completed = (rows[0] as { completed: number }).completed;
  const total = 78 * 5;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 1000) / 10,
  };
}

export function progressKey(week: number, day: number) {
  return `${week}-${day}`;
}
