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
  course_start_date?: string | null;
  learning_track?: "dev" | "workspace" | null;
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

type LessonTaskRow = {
  user_id: string;
  pathway_node_id: string;
  task_key: string;
  done: boolean;
  updated_at: string;
};

export type LocalDiagnosticAttemptRow = {
  id: string;
  user_id: string;
  phase: number;
  attempt_kind: "baseline" | "reassessment";
  bank_version: number;
  score_pct: number;
  answers: Record<string, string>;
  skill_scores: Array<{
    skillId: string;
    correct: number;
    total: number;
    scorePct: number;
    mastered: boolean;
  }>;
  created_at: string;
};

type DiagnosticWaiverRow = {
  user_id: string;
  pathway_week_id: string;
  source_attempt_id: string;
  awarded_at: string;
};

export type LocalUserAchievementRow = {
  id: string;
  user_id: string;
  achievement_id: string;
  source_type: string;
  source_ref: string | null;
  evidence: Record<string, unknown>;
  earned_at: string;
  celebrated_at: string | null;
};

type ExternalCredentialRow = {
  id: string;
  user_id: string;
  provider: string;
  credential_id: string;
  issued_on: string;
  attested_at: string;
  notes: string | null;
};

type ExpertCertificateRow = {
  id: string;
  user_id: string;
  recipient_name: string;
  issued_at: string;
  pd_hours: number;
};

type WorkspaceFileRow = {
  user_id: string;
  path: string;
  body: string;
  updated_at: string;
};

type PlaygroundRunRow = {
  id: string;
  user_id: string;
  created_at: string;
};

type StoreData = {
  users: StoreUser[];
  progress: ProgressRow[];
  notes: NoteRow[];
  quiz_attempts?: QuizAttemptRow[];
  gate_items?: GateItemRow[];
  lesson_task_progress?: LessonTaskRow[];
  diagnostic_attempts?: LocalDiagnosticAttemptRow[];
  diagnostic_waivers?: DiagnosticWaiverRow[];
  user_achievements?: LocalUserAchievementRow[];
  external_credentials?: ExternalCredentialRow[];
  expert_certificates?: ExpertCertificateRow[];
  workspace_files?: WorkspaceFileRow[];
  playground_runs?: PlaygroundRunRow[];
};

function storePath() {
  return path.join(process.cwd(), "data", "local-store.json");
}

function emptyStore(): StoreData {
  return {
    users: [],
    progress: [],
    notes: [],
    quiz_attempts: [],
    gate_items: [],
    lesson_task_progress: [],
    diagnostic_attempts: [],
    diagnostic_waivers: [],
    user_achievements: [],
    external_credentials: [],
    expert_certificates: [],
    workspace_files: [],
    playground_runs: [],
  };
}

function readStore(): StoreData {
  const file = storePath();
  if (!existsSync(file)) return emptyStore();
  const data = JSON.parse(readFileSync(file, "utf8")) as StoreData;
  if (!data.quiz_attempts) data.quiz_attempts = [];
  if (!data.gate_items) data.gate_items = [];
  if (!data.lesson_task_progress) data.lesson_task_progress = [];
  if (!data.diagnostic_attempts) data.diagnostic_attempts = [];
  if (!data.diagnostic_waivers) data.diagnostic_waivers = [];
  if (!data.user_achievements) data.user_achievements = [];
  if (!data.external_credentials) data.external_credentials = [];
  if (!data.expert_certificates) data.expert_certificates = [];
  if (!data.workspace_files) data.workspace_files = [];
  if (!data.playground_runs) data.playground_runs = [];
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
  return {
    completed,
    total,
    remaining: Math.max(0, total - completed),
    percent: Math.round((completed / total) * 1000) / 10,
  };
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

export async function localGetLessonTaskStates(userId: string, pathwayNodeId: string) {
  const data = readStore();
  const map = new Map<string, boolean>();
  for (const row of data.lesson_task_progress ?? []) {
    if (row.user_id === userId && row.pathway_node_id === pathwayNodeId) {
      map.set(row.task_key, row.done);
    }
  }
  return map;
}

export async function localSetLessonTask(
  userId: string,
  pathwayNodeId: string,
  taskKey: string,
  done: boolean,
) {
  const data = readStore();
  data.lesson_task_progress = data.lesson_task_progress ?? [];
  const index = data.lesson_task_progress.findIndex(
    (row) =>
      row.user_id === userId &&
      row.pathway_node_id === pathwayNodeId &&
      row.task_key === taskKey,
  );
  const row = {
    user_id: userId,
    pathway_node_id: pathwayNodeId,
    task_key: taskKey,
    done,
    updated_at: new Date().toISOString(),
  };
  if (index >= 0) data.lesson_task_progress[index] = row;
  else data.lesson_task_progress.push(row);
  writeStore(data);
}

export async function localSaveDiagnosticAttempt(
  userId: string,
  attempt: Omit<LocalDiagnosticAttemptRow, "id" | "user_id" | "created_at">,
  waiverSkillIds: string[],
) {
  const data = readStore();
  data.diagnostic_attempts = data.diagnostic_attempts ?? [];
  data.diagnostic_waivers = data.diagnostic_waivers ?? [];
  if (
    attempt.attempt_kind === "baseline" &&
    data.diagnostic_attempts.some(
      (row) =>
        row.user_id === userId &&
        row.phase === attempt.phase &&
        row.attempt_kind === "baseline",
    )
  ) {
    throw new Error("BASELINE_EXISTS");
  }
  const row: LocalDiagnosticAttemptRow = {
    ...attempt,
    id: randomUUID(),
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  data.diagnostic_attempts.push(row);
  for (const skillId of waiverSkillIds) {
    if (
      !data.diagnostic_waivers.some(
        (waiver) => waiver.user_id === userId && waiver.pathway_week_id === skillId,
      )
    ) {
      data.diagnostic_waivers.push({
        user_id: userId,
        pathway_week_id: skillId,
        source_attempt_id: row.id,
        awarded_at: row.created_at,
      });
    }
  }
  writeStore(data);
  return row;
}

export async function localGetDiagnosticAttempts(userId: string, phase?: number) {
  return (readStore().diagnostic_attempts ?? [])
    .filter((row) => row.user_id === userId && (phase == null || row.phase === phase))
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
}

export async function localGetDiagnosticWaivers(userId: string) {
  return new Set(
    (readStore().diagnostic_waivers ?? [])
      .filter((row) => row.user_id === userId)
      .map((row) => row.pathway_week_id),
  );
}

export async function localGetUserAchievements(userId: string) {
  return (readStore().user_achievements ?? [])
    .filter((row) => row.user_id === userId)
    .sort((a, b) => a.earned_at.localeCompare(b.earned_at));
}

export async function localGetPendingAchievements(userId: string) {
  return (await localGetUserAchievements(userId)).filter((row) => !row.celebrated_at);
}

export async function localUpsertAchievements(
  userId: string,
  awards: Array<{
    achievement_id: string;
    source_type: string;
    source_ref: string | null;
    evidence: Record<string, unknown>;
  }>,
) {
  const data = readStore();
  data.user_achievements = data.user_achievements ?? [];
  const inserted: LocalUserAchievementRow[] = [];
  for (const award of awards) {
    if (
      data.user_achievements.some(
        (row) => row.user_id === userId && row.achievement_id === award.achievement_id,
      )
    ) {
      continue;
    }
    const row: LocalUserAchievementRow = {
      id: randomUUID(),
      user_id: userId,
      achievement_id: award.achievement_id,
      source_type: award.source_type,
      source_ref: award.source_ref,
      evidence: award.evidence,
      earned_at: new Date().toISOString(),
      celebrated_at: null,
    };
    data.user_achievements.push(row);
    inserted.push(row);
  }
  writeStore(data);
  return inserted;
}

export async function localMarkAchievementsCelebrated(userId: string, achievementIds: string[]) {
  const data = readStore();
  const idSet = new Set(achievementIds);
  for (const row of data.user_achievements ?? []) {
    if (row.user_id === userId && idSet.has(row.achievement_id) && !row.celebrated_at) {
      row.celebrated_at = new Date().toISOString();
    }
  }
  writeStore(data);
}

export async function localGetExternalCredential(userId: string, provider: string) {
  return (
    (readStore().external_credentials ?? []).find(
      (row) => row.user_id === userId && row.provider === provider,
    ) ?? null
  );
}

export async function localSaveExternalCredential(
  userId: string,
  credential: {
    provider: string;
    credential_id: string;
    issued_on: string;
    notes: string | null;
  },
) {
  const data = readStore();
  data.external_credentials = data.external_credentials ?? [];
  const existing = data.external_credentials.findIndex(
    (row) => row.user_id === userId && row.provider === credential.provider,
  );
  const row: ExternalCredentialRow = {
    id: existing >= 0 ? data.external_credentials[existing].id : randomUUID(),
    user_id: userId,
    provider: credential.provider,
    credential_id: credential.credential_id,
    issued_on: credential.issued_on,
    attested_at: new Date().toISOString(),
    notes: credential.notes,
  };
  if (existing >= 0) data.external_credentials[existing] = row;
  else data.external_credentials.push(row);
  writeStore(data);
  return row;
}

export async function localGetExpertCertificate(userId: string) {
  return (readStore().expert_certificates ?? []).find((row) => row.user_id === userId) ?? null;
}

export async function localGetExpertCertificateById(certificateId: string) {
  return (readStore().expert_certificates ?? []).find((row) => row.id === certificateId) ?? null;
}

export async function localIssueExpertCertificate(
  userId: string,
  recipientName: string,
  pdHours: number,
) {
  const data = readStore();
  data.expert_certificates = data.expert_certificates ?? [];
  const existing = data.expert_certificates.find((row) => row.user_id === userId);
  if (existing) return existing;
  const row: ExpertCertificateRow = {
    id: randomUUID(),
    user_id: userId,
    recipient_name: recipientName,
    issued_at: new Date().toISOString(),
    pd_hours: pdHours,
  };
  data.expert_certificates.push(row);
  writeStore(data);
  return row;
}

export async function localBestQuizScores(userId: string) {
  const map = new Map<string, number>();
  for (const row of (readStore().quiz_attempts ?? []).filter((attempt) => attempt.user_id === userId)) {
    const current = map.get(row.scope) ?? 0;
    if (row.score_pct > current) map.set(row.scope, row.score_pct);
  }
  return map;
}

export async function localGetUserCourseStartDate(userId: string): Promise<Date | null> {
  const data = readStore();
  const user = data.users.find((u) => u.id === userId);
  if (!user?.course_start_date) return null;
  const [y, m, d] = user.course_start_date.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

export async function localSetUserCourseStartDate(userId: string, date: Date) {
  const data = readStore();
  const user = data.users.find((u) => u.id === userId);
  if (!user) return;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  user.course_start_date = `${y}-${m}-${d}`;
  writeStore(data);
}

export async function localGetLearningTrack(userId: string): Promise<"dev" | "workspace" | null> {
  const user = readStore().users.find((u) => u.id === userId);
  const track = user?.learning_track;
  return track === "dev" || track === "workspace" ? track : null;
}

export async function localSetLearningTrack(userId: string, track: "dev" | "workspace") {
  const data = readStore();
  const user = data.users.find((u) => u.id === userId);
  if (!user) return;
  user.learning_track = track;
  writeStore(data);
}

export async function localListWorkspaceFiles(userId: string) {
  return (readStore().workspace_files ?? [])
    .filter((row) => row.user_id === userId)
    .map((row) => ({ path: row.path, updatedAt: row.updated_at }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export async function localGetWorkspaceFile(userId: string, filePath: string) {
  const row = (readStore().workspace_files ?? []).find(
    (entry) => entry.user_id === userId && entry.path === filePath,
  );
  if (!row) return null;
  return { path: row.path, body: row.body, updatedAt: row.updated_at };
}

export async function localSaveWorkspaceFile(userId: string, filePath: string, body: string) {
  const data = readStore();
  if (!data.workspace_files) data.workspace_files = [];
  const existing = data.workspace_files.find(
    (row) => row.user_id === userId && row.path === filePath,
  );
  const updatedAt = new Date().toISOString();
  if (existing) {
    existing.body = body;
    existing.updated_at = updatedAt;
  } else {
    data.workspace_files.push({
      user_id: userId,
      path: filePath,
      body,
      updated_at: updatedAt,
    });
  }
  writeStore(data);
}

export async function localWorkspacePathsNonEmpty(userId: string, paths: string[]) {
  const map = new Map<string, boolean>();
  for (const p of paths) map.set(p, false);
  for (const row of (readStore().workspace_files ?? []).filter((entry) => entry.user_id === userId)) {
    if (map.has(row.path)) map.set(row.path, row.body.trim().length > 0);
  }
  return map;
}

export async function localCountPlaygroundRunsSince(userId: string, sinceIso: string) {
  return (readStore().playground_runs ?? []).filter(
    (row) => row.user_id === userId && row.created_at >= sinceIso,
  ).length;
}

export async function localRecordPlaygroundRun(userId: string) {
  const data = readStore();
  if (!data.playground_runs) data.playground_runs = [];
  data.playground_runs.push({
    id: randomUUID(),
    user_id: userId,
    created_at: new Date().toISOString(),
  });
  writeStore(data);
}

export async function localResetLearnerProgress(userId: string, opts: { keepNotes: boolean }) {
  const data = readStore();
  data.progress = data.progress.filter((p) => p.user_id !== userId);
  data.quiz_attempts = (data.quiz_attempts ?? []).filter((a) => a.user_id !== userId);
  data.gate_items = (data.gate_items ?? []).filter((g) => g.user_id !== userId);
  data.lesson_task_progress = (data.lesson_task_progress ?? []).filter(
    (row) => row.user_id !== userId,
  );
  data.diagnostic_attempts = (data.diagnostic_attempts ?? []).filter(
    (row) => row.user_id !== userId,
  );
  data.diagnostic_waivers = (data.diagnostic_waivers ?? []).filter(
    (row) => row.user_id !== userId,
  );
  if (!opts.keepNotes) {
    data.notes = data.notes.filter((n) => n.user_id !== userId);
  }
  const user = data.users.find((u) => u.id === userId);
  if (user) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    user.course_start_date = `${y}-${m}-${d}`;
  }
  writeStore(data);
}

