import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { hash, compare } from "bcryptjs";
import type { UserRole } from "./db";

export type StoreUser = {
  id: string;
  username: string;
  password_hash: string;
  role: UserRole;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string | null;
};

type ProgressRow = {
  user_id: string;
  week: number;
  day: number;
  completed: boolean;
  completed_at: string | null;
};

type NoteRow = {
  user_id: string;
  week: number;
  day: number;
  body: string;
  updated_at: string;
};

type QuizAttemptRow = {
  id: string;
  user_id: string;
  scope: string;
  score_pct: number;
  answers: Record<string, string>;
  created_at: string;
};

type GateItemRow = {
  user_id: string;
  phase: number;
  item_key: string;
  done: boolean;
  updated_at: string;
};

type StoreData = {
  users: StoreUser[];
  progress: ProgressRow[];
  notes: NoteRow[];
  quiz_attempts?: QuizAttemptRow[];
  gate_items?: GateItemRow[];
};

function storePath() {
  return path.join(process.cwd(), "data", "local-store.json");
}

function emptyStore(): StoreData {
  return { users: [], progress: [], notes: [], quiz_attempts: [], gate_items: [] };
}

function readStore(): StoreData {
  const file = storePath();
  if (!existsSync(file)) return emptyStore();
  const data = JSON.parse(readFileSync(file, "utf8")) as StoreData;
  if (!data.quiz_attempts) data.quiz_attempts = [];
  if (!data.gate_items) data.gate_items = [];
  return data;
}

function writeStore(data: StoreData) {
  const dir = path.dirname(storePath());
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(storePath(), JSON.stringify(data, null, 2), "utf8");
}

export function isLocalStoreMode() {
  const url = process.env.DATABASE_URL ?? "";
  return !url || url.includes("placeholder");
}

export async function localEnsureAdminSeeded() {
  const data = readStore();
  if (data.users.some((u) => u.role === "admin")) return;

  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) return;

  data.users.push({
    id: randomUUID(),
    username,
    password_hash: await hash(password, 12),
    role: "admin",
    display_name: "Admin",
    is_active: true,
    created_at: new Date().toISOString(),
    created_by: null,
  });
  writeStore(data);
}

export async function localFindUserByUsername(username: string) {
  await localEnsureAdminSeeded();
  const data = readStore();
  return data.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function localListUsers() {
  await localEnsureAdminSeeded();
  return readStore().users.map(({ password_hash: _, ...rest }) => rest);
}

export async function localCreateLearner(opts: {
  username: string;
  password: string;
  displayName?: string;
  createdBy: string;
}) {
  const data = readStore();
  if (data.users.some((u) => u.username.toLowerCase() === opts.username.trim().toLowerCase())) {
    throw new Error("duplicate");
  }
  const user: StoreUser = {
    id: randomUUID(),
    username: opts.username.trim(),
    password_hash: await hash(opts.password, 12),
    role: "learner",
    display_name: opts.displayName?.trim() || null,
    is_active: true,
    created_at: new Date().toISOString(),
    created_by: opts.createdBy,
  };
  data.users.push(user);
  writeStore(data);
  const { password_hash: _, ...rest } = user;
  return rest;
}

export async function localSetUserActive(userId: string, isActive: boolean) {
  const data = readStore();
  const user = data.users.find((u) => u.id === userId && u.role === "learner");
  if (user) {
    user.is_active = isActive;
    writeStore(data);
  }
}

export async function localResetUserPassword(userId: string, password: string) {
  const data = readStore();
  const user = data.users.find((u) => u.id === userId);
  if (user) {
    user.password_hash = await hash(password, 12);
    writeStore(data);
  }
}

export async function localGetUserById(id: string) {
  const data = readStore();
  return data.users.find((u) => u.id === id) ?? null;
}

export async function localVerifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function localGetProgressMap(userId: string) {
  const data = readStore();
  const map = new Map<string, { completed: boolean; completedAt: string | null }>();
  for (const row of data.progress.filter((p) => p.user_id === userId)) {
    map.set(`${row.week}-${row.day}`, { completed: row.completed, completedAt: row.completed_at });
  }
  return map;
}

export async function localGetDayProgress(userId: string, week: number, day: number) {
  const data = readStore();
  const row = data.progress.find((p) => p.user_id === userId && p.week === week && p.day === day);
  return { completed: row?.completed ?? false, completedAt: row?.completed_at ?? null };
}

export async function localSetDayCompleted(userId: string, week: number, day: number, completed: boolean) {
  const data = readStore();
  const idx = data.progress.findIndex((p) => p.user_id === userId && p.week === week && p.day === day);
  const row: ProgressRow = {
    user_id: userId,
    week,
    day,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  };
  if (idx >= 0) data.progress[idx] = row;
  else data.progress.push(row);
  writeStore(data);
}

export async function localGetDayNote(userId: string, week: number, day: number) {
  const data = readStore();
  const row = data.notes.find((n) => n.user_id === userId && n.week === week && n.day === day);
  return { body: row?.body ?? "", updatedAt: row?.updated_at ?? null };
}

export async function localUpsertDayNote(userId: string, week: number, day: number, body: string) {
  const data = readStore();
  const idx = data.notes.findIndex((n) => n.user_id === userId && n.week === week && n.day === day);
  const row: NoteRow = {
    user_id: userId,
    week,
    day,
    body,
    updated_at: new Date().toISOString(),
  };
  if (idx >= 0) data.notes[idx] = row;
  else data.notes.push(row);
  writeStore(data);
}

export async function localGetCompletionStats(userId: string) {
  const data = readStore();
  const completed = data.progress.filter((p) => p.user_id === userId && p.completed).length;
  const total = 78 * 5;
  return { completed, total, percent: Math.round((completed / total) * 1000) / 10 };
}

export async function localSaveQuizAttempt(
  userId: string,
  scope: string,
  scorePct: number,
  answers: Record<string, string>,
) {
  const data = readStore();
  data.quiz_attempts = data.quiz_attempts ?? [];
  data.quiz_attempts.push({
    id: randomUUID(),
    user_id: userId,
    scope,
    score_pct: scorePct,
    answers,
    created_at: new Date().toISOString(),
  });
  writeStore(data);
}

export async function localLatestQuizScore(userId: string, scope: string) {
  const data = readStore();
  const rows = (data.quiz_attempts ?? [])
    .filter((a) => a.user_id === userId && a.scope === scope)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  return rows[0] ? { scorePct: rows[0].score_pct, createdAt: rows[0].created_at } : null;
}

export async function localLatestQuizScores(userId: string) {
  const data = readStore();
  const map = new Map<string, { scorePct: number; createdAt: string }>();
  for (const row of (data.quiz_attempts ?? [])
    .filter((a) => a.user_id === userId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at))) {
    map.set(row.scope, { scorePct: row.score_pct, createdAt: row.created_at });
  }
  return map;
}

export async function localGetGateStates(userId: string) {
  const data = readStore();
  const map = new Map<string, boolean>();
  for (const row of data.gate_items ?? []) {
    if (row.user_id === userId) map.set(`${row.phase}:${row.item_key}`, row.done);
  }
  return map;
}

export async function localSetGateItem(userId: string, phase: number, itemKey: string, done: boolean) {
  const data = readStore();
  data.gate_items = data.gate_items ?? [];
  const idx = data.gate_items.findIndex(
    (g) => g.user_id === userId && g.phase === phase && g.item_key === itemKey,
  );
  const row = {
    user_id: userId,
    phase,
    item_key: itemKey,
    done,
    updated_at: new Date().toISOString(),
  };
  if (idx >= 0) data.gate_items[idx] = row;
  else data.gate_items.push(row);
  writeStore(data);
}

