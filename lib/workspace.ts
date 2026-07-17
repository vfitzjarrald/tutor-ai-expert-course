import { getDb } from "./db";
import {
  isLocalStoreMode,
  localGetWorkspaceFile,
  localListWorkspaceFiles,
  localSaveWorkspaceFile,
  localWorkspacePathsNonEmpty,
} from "./local-store";

const PATH_RE = /^(?:notes|capstone|labs|checkpoints)\/[A-Za-z0-9._\-\/]+$/;

export function isValidWorkspacePath(path: string): boolean {
  if (!path || path.length > 240) return false;
  if (path.includes("..") || path.includes("\\") || path.startsWith("/")) return false;
  return PATH_RE.test(path);
}

export async function listWorkspaceFiles(userId: string): Promise<Array<{ path: string; updatedAt: string }>> {
  if (isLocalStoreMode()) return localListWorkspaceFiles(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT path, updated_at::text AS updated_at
    FROM workspace_files
    WHERE user_id = ${userId}
    ORDER BY path ASC
  `;
  return (rows as Array<{ path: string; updated_at: string }>).map((row) => ({
    path: row.path,
    updatedAt: row.updated_at,
  }));
}

export async function getWorkspaceFile(
  userId: string,
  path: string,
): Promise<{ path: string; body: string; updatedAt: string } | null> {
  if (!isValidWorkspacePath(path)) return null;
  if (isLocalStoreMode()) return localGetWorkspaceFile(userId, path);
  const sql = getDb();
  const rows = await sql`
    SELECT path, body, updated_at::text AS updated_at
    FROM workspace_files
    WHERE user_id = ${userId} AND path = ${path}
    LIMIT 1
  `;
  const row = rows[0] as { path: string; body: string; updated_at: string } | undefined;
  if (!row) return null;
  return { path: row.path, body: row.body, updatedAt: row.updated_at };
}

export async function saveWorkspaceFile(userId: string, path: string, body: string) {
  if (!isValidWorkspacePath(path)) throw new Error("Invalid workspace path");
  const trimmed = body.slice(0, 200_000);
  if (isLocalStoreMode()) {
    await localSaveWorkspaceFile(userId, path, trimmed);
    return;
  }
  const sql = getDb();
  await sql`
    INSERT INTO workspace_files (user_id, path, body, updated_at)
    VALUES (${userId}, ${path}, ${trimmed}, NOW())
    ON CONFLICT (user_id, path)
    DO UPDATE SET body = EXCLUDED.body, updated_at = NOW()
  `;
}

export async function workspacePathsNonEmpty(
  userId: string,
  paths: string[],
): Promise<Map<string, boolean>> {
  if (isLocalStoreMode()) return localWorkspacePathsNonEmpty(userId, paths);
  const result = new Map<string, boolean>();
  for (const p of paths) result.set(p, false);
  const valid = paths.filter(isValidWorkspacePath);
  if (valid.length === 0) return result;
  const sql = getDb();
  const rows = await sql`
    SELECT path, length(trim(body)) > 0 AS has_body
    FROM workspace_files
    WHERE user_id = ${userId}
  `;
  const wanted = new Set(valid);
  for (const row of rows as Array<{ path: string; has_body: boolean }>) {
    if (wanted.has(row.path)) result.set(row.path, Boolean(row.has_body));
  }
  return result;
}
