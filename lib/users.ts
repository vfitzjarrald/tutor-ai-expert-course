import { getDb, type DbUser, type UserRole } from "./db";
import { hashPassword } from "./password";
import {
  localCreateLearner,
  localEnsureAdminSeeded,
  localFindUserByUsername,
  localListUsers,
  localResetUserPassword,
  localSetUserActive,
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
