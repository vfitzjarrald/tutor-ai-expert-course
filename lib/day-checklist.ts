import { createHash } from "crypto";
import { getDb } from "./db";
import {
  isLocalStoreMode,
  localGetLessonTaskStates,
  localSetLessonTask,
} from "./local-store";

export type DayChecklistItem = {
  key: string;
  label: string;
};

function taskKey(label: string, index: number) {
  return `${index + 1}-${createHash("sha1").update(label).digest("hex").slice(0, 10)}`;
}

export function extractDayChecklist(
  rawMarkdown: string,
  fallback?: { objective?: string; deliverable?: string },
): DayChecklistItem[] {
  const lab = rawMarkdown.match(
    /####\s+Lab steps\s*\n([\s\S]*?)(?=\n\*\*Deliverable:\*\*|\n###|\n####\s+)/i,
  )?.[1];
  const labels = (lab ?? "")
    .split("\n")
    .map((line) => line.match(/^\s*\d+\.\s+(.+?)\s*$/)?.[1]?.trim())
    .filter((label): label is string => Boolean(label));

  if (labels.length === 0) {
    if (fallback?.objective) labels.push(fallback.objective);
    if (fallback?.deliverable) labels.push(`Deliver: ${fallback.deliverable}`);
  }

  return labels.slice(0, 8).map((label, index) => ({ key: taskKey(label, index), label }));
}

export async function getLessonTaskStates(userId: string, pathwayNodeId: string) {
  if (isLocalStoreMode()) return localGetLessonTaskStates(userId, pathwayNodeId);
  const sql = getDb();
  const rows = await sql`
    SELECT task_key, done
    FROM lesson_task_progress
    WHERE user_id = ${userId} AND pathway_node_id = ${pathwayNodeId}
  `;
  const map = new Map<string, boolean>();
  for (const row of rows as Array<{ task_key: string; done: boolean }>) {
    map.set(row.task_key, row.done);
  }
  return map;
}

export async function setLessonTask(
  userId: string,
  pathwayNodeId: string,
  taskKeyValue: string,
  done: boolean,
) {
  if (isLocalStoreMode()) {
    await localSetLessonTask(userId, pathwayNodeId, taskKeyValue, done);
    return;
  }
  const sql = getDb();
  await sql`
    INSERT INTO lesson_task_progress (user_id, pathway_node_id, task_key, done, updated_at)
    VALUES (${userId}, ${pathwayNodeId}, ${taskKeyValue}, ${done}, NOW())
    ON CONFLICT (user_id, pathway_node_id, task_key)
    DO UPDATE SET done = EXCLUDED.done, updated_at = NOW()
  `;
}
