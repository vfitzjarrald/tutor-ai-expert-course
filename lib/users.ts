import { getDb, type DbUser, type UserRole } from "./db";
import { hashPassword } from "./password";
import {
  localCreateLearner,
  localEnsureAdminSeeded,
  localFindUserByUsername,
  localGetUserCourseStartDate,
  localListUsers,
  localResetUserPassword,
  localSetUserActive,
  localSetUserCourseStartDate,
  isLocalStoreMode,
} from "./local-store";

export async function ensureAdminSeeded() {
  if (isLocalStoreMode()) {
    await localEnsureAdminSeeded();
    return;
  }

  const sql = getDb();
  const admins = await sql`SELECT id FROM users WHERE role = 'admin' LIMIT 1`;
  if (admins.length > 0) return;

  const username = process.env.ADMIN_USERNAME?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password) {
    console.warn("No admin user and ADMIN_USERNAME/ADMIN_PASSWORD not set — skipping seed");
    return;
  }

  const passwordHash = await hashPassword(password);
  await sql`
    INSERT INTO users (username, password_hash, role, display_name)
    VALUES (${username}, ${passwordHash}, 'admin', 'Admin')
  `;
}

export async function findUserByUsername(username: string): Promise<DbUser | null> {
  if (isLocalStoreMode()) {
    const user = await localFindUserByUsername(username);
    return user as DbUser | null;
  }

  const sql = getDb();
  const rows = await sql`
    SELECT id, username, password_hash, role, display_name, is_active, created_at::text, created_by
    FROM users
    WHERE lower(username) = lower(${username})
    LIMIT 1
  `;
  return (rows[0] as DbUser | undefined) ?? null;
}

export async function listUsers() {
  type ListedUser = {
    id: string;
    username: string;
    role: UserRole;
    display_name: string | null;
    is_active: boolean;
    created_at: string;
    created_by: string | null;
  };

  if (isLocalStoreMode()) {
    return (await localListUsers()) as ListedUser[];
  }

  const sql = getDb();
  const rows = await sql`
    SELECT id, username, role, display_name, is_active, created_at::text, created_by
    FROM users
    ORDER BY created_at ASC
  `;
  return rows as ListedUser[];
}

export async function createLearner(opts: {
  username: string;
  password: string;
  displayName?: string;
  createdBy: string;
}) {
  if (isLocalStoreMode()) {
    return localCreateLearner(opts);
  }

  const sql = getDb();
  const passwordHash = await hashPassword(opts.password);
  const rows = await sql`
    INSERT INTO users (username, password_hash, role, display_name, created_by)
    VALUES (
      ${opts.username.trim()},
      ${passwordHash},
      'learner',
      ${opts.displayName?.trim() || null},
      ${opts.createdBy}
    )
    RETURNING id, username, role, display_name, is_active, created_at::text
  `;
  return rows[0];
}

export async function setUserActive(userId: string, isActive: boolean) {
  if (isLocalStoreMode()) {
    await localSetUserActive(userId, isActive);
    return;
  }
  const sql = getDb();
  await sql`UPDATE users SET is_active = ${isActive} WHERE id = ${userId} AND role = 'learner'`;
}

export async function resetUserPassword(userId: string, password: string) {
  if (isLocalStoreMode()) {
    await localResetUserPassword(userId, password);
    return;
  }
  const sql = getDb();
  const passwordHash = await hashPassword(password);
  await sql`UPDATE users SET password_hash = ${passwordHash} WHERE id = ${userId}`;
}

export function generatePassword(length = 14): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

function parseDateOnly(raw: string): Date | null {
  const [y, m, d] = raw.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function formatDateOnly(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function getUserCourseStartDate(userId: string): Promise<Date | null> {
  if (isLocalStoreMode()) return localGetUserCourseStartDate(userId);

  const sql = getDb();
  const rows = await sql`
    SELECT course_start_date::text
    FROM users
    WHERE id = ${userId}
    LIMIT 1
  `;
  const raw = (rows[0] as { course_start_date: string | null } | undefined)?.course_start_date;
  if (!raw) return null;
  return parseDateOnly(raw.slice(0, 10));
}

export async function setUserCourseStartDate(userId: string, date: Date) {
  if (isLocalStoreMode()) {
    await localSetUserCourseStartDate(userId, date);
    return;
  }

  const sql = getDb();
  const value = formatDateOnly(date);
  await sql`
    UPDATE users
    SET course_start_date = ${value}::date
    WHERE id = ${userId}
  `;
}
