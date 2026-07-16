import { getDb } from "./db";
import {
  isLocalStoreMode,
  localGetGateStates,
  localLatestQuizScore,
  localLatestQuizScores,
  localSaveQuizAttempt,
  localSetGateItem,
} from "./local-store";
import type { QuizScope } from "./checks";

export async function saveQuizAttempt(
  userId: string,
  scope: QuizScope,
  scorePct: number,
  answers: Record<string, string>,
) {
  if (isLocalStoreMode()) {
    await localSaveQuizAttempt(userId, scope, scorePct, answers);
    return;
  }
  const sql = getDb();
  const answersJson = JSON.stringify(answers);
  await sql`
    INSERT INTO quiz_attempts (user_id, scope, score_pct, answers)
    VALUES (${userId}, ${scope}, ${scorePct}, ${answersJson}::jsonb)
  `;
}

export async function getLatestQuizScore(userId: string, scope: QuizScope) {
  if (isLocalStoreMode()) return localLatestQuizScore(userId, scope);

  const sql = getDb();
  const rows = await sql`
    SELECT score_pct, created_at::text
    FROM quiz_attempts
    WHERE user_id = ${userId} AND scope = ${scope}
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const row = rows[0] as { score_pct: number; created_at: string } | undefined;
  return row ? { scorePct: Number(row.score_pct), createdAt: row.created_at } : null;
}

export async function getLatestQuizScores(userId: string) {
  if (isLocalStoreMode()) return localLatestQuizScores(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT DISTINCT ON (scope) scope, score_pct, created_at::text
    FROM quiz_attempts
    WHERE user_id = ${userId}
    ORDER BY scope, created_at DESC
  `;
  const map = new Map<string, { scorePct: number; createdAt: string }>();
  for (const row of rows as Array<{ scope: string; score_pct: number; created_at: string }>) {
    map.set(row.scope, { scorePct: Number(row.score_pct), createdAt: row.created_at });
  }
  return map;
}

export async function getGateStates(userId: string) {
  if (isLocalStoreMode()) return localGetGateStates(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT phase, item_key, done
    FROM gate_items
    WHERE user_id = ${userId}
  `;
  const map = new Map<string, boolean>();
  for (const row of rows as Array<{ phase: number; item_key: string; done: boolean }>) {
    map.set(`${row.phase}:${row.item_key}`, row.done);
  }
  return map;
}

export async function setGateItem(userId: string, phase: number, itemKey: string, done: boolean) {
  if (isLocalStoreMode()) {
    await localSetGateItem(userId, phase, itemKey, done);
    return;
  }
  const sql = getDb();
  await sql`
    INSERT INTO gate_items (user_id, phase, item_key, done, updated_at)
    VALUES (${userId}, ${phase}, ${itemKey}, ${done}, NOW())
    ON CONFLICT (user_id, phase, item_key)
    DO UPDATE SET done = EXCLUDED.done, updated_at = NOW()
  `;
}
