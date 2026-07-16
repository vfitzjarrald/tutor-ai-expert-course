import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getDb, type DbUser, type UserRole } from "./db";
import { localGetUserById, useLocalStore } from "./local-store";
import { hashPassword, verifyPassword } from "./password";

export type SessionUser = {
  id: string;
  username: string;
  role: UserRole;
  displayName: string | null;
};

const COOKIE_NAME = "course_session";
const SESSION_DAYS = 30;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("SESSION_SECRET must be set (min 16 chars)");
  }
  return new TextEncoder().encode(secret);
}

export { hashPassword, verifyPassword };

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    sub: user.id,
    username: user.username,
    role: user.role,
    displayName: user.displayName,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (!payload.sub || typeof payload.username !== "string" || typeof payload.role !== "string") {
      return null;
    }
    if (payload.role !== "admin" && payload.role !== "learner") {
      return null;
    }
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
      displayName: typeof payload.displayName === "string" ? payload.displayName : null,
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(user: SessionUser) {
  const token = await createSessionToken(user);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifySessionToken(token);
  if (!session) return null;

  if (useLocalStore()) {
    const row = await localGetUserById(session.id);
    if (!row || !row.is_active) return null;
    return {
      id: row.id,
      username: row.username,
      role: row.role,
      displayName: row.display_name,
    };
  }

  const sql = getDb();
  const rows = await sql`
    SELECT id, username, role, display_name, is_active
    FROM users
    WHERE id = ${session.id}
    LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: string;
        username: string;
        role: UserRole;
        display_name: string | null;
        is_active: boolean;
      }
    | undefined;
  if (!row || !row.is_active) return null;
  return {
    id: row.id,
    username: row.username,
    role: row.role,
    displayName: row.display_name,
  };
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireSession();
  if (session.role !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return session;
}

export function toSessionUser(user: Pick<DbUser, "id" | "username" | "role" | "display_name">): SessionUser {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    displayName: user.display_name,
  };
}

export { COOKIE_NAME };
