"use server";

import { redirect } from "next/navigation";
import {
  clearSessionCookie,
  setSessionCookie,
  toSessionUser,
  verifyPassword,
  requireAdmin,
  requireSession,
} from "@/lib/auth";
import { ensureAdminSeeded, findUserByUsername, createLearner, setUserActive, resetUserPassword, generatePassword } from "@/lib/users";
import { setDayCompleted, upsertDayNote } from "@/lib/progress";

export type ActionResult = { ok: true; message?: string; password?: string } | { ok: false; error: string };

export async function loginAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    await ensureAdminSeeded();
  } catch {
    // DB may not be ready; login will fail below with clearer error
  }

  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { ok: false, error: "Username and password are required." };
  }

  try {
    const user = await findUserByUsername(username);
    if (!user || !user.is_active) {
      return { ok: false, error: "Invalid username or password." };
    }
    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return { ok: false, error: "Invalid username or password." };
    }
    await setSessionCookie(toSessionUser(user));
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      error: "Could not reach the database. Check DATABASE_URL and run npm run db:migrate.",
    };
  }

  redirect("/");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/login");
}

export async function createUserAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    const admin = await requireAdmin();
    const username = String(formData.get("username") ?? "").trim();
    const displayName = String(formData.get("displayName") ?? "").trim();
    const generate = formData.get("generate") === "on";
    let password = String(formData.get("password") ?? "");

    if (!username) {
      return { ok: false, error: "Username is required." };
    }
    if (generate || !password) {
      password = generatePassword();
    }
    if (password.length < 8) {
      return { ok: false, error: "Password must be at least 8 characters." };
    }

    await createLearner({
      username,
      password,
      displayName: displayName || undefined,
      createdBy: admin.id,
    });

    return {
      ok: true,
      message: `Created learner “${username}”. Share this password securely:`,
      password,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { ok: false, error: "That username is already taken." };
    }
    if (message === "UNAUTHORIZED" || message === "FORBIDDEN") {
      return { ok: false, error: "Admin access required." };
    }
    console.error(err);
    return { ok: false, error: "Could not create user." };
  }
}

export async function toggleUserActiveAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const userId = String(formData.get("userId") ?? "");
  const next = String(formData.get("next") ?? "") === "true";
  if (!userId) return;
  await setUserActive(userId, next);
}

export async function resetPasswordAction(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = String(formData.get("userId") ?? "");
    if (!userId) return { ok: false, error: "Missing user." };
    const password = generatePassword();
    await resetUserPassword(userId, password);
    return { ok: true, message: "New password generated:", password };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not reset password." };
  }
}

export async function toggleDayCompleteAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const week = Number(formData.get("week"));
  const day = Number(formData.get("day"));
  const completed = String(formData.get("completed") ?? "") === "true";
  if (!week || !day) return;
  await setDayCompleted(session.id, week, day, completed);
}

export async function saveNoteAction(formData: FormData): Promise<ActionResult> {
  try {
    const session = await requireSession();
    const week = Number(formData.get("week"));
    const day = Number(formData.get("day"));
    const body = String(formData.get("body") ?? "");
    if (!week || !day) return { ok: false, error: "Invalid day." };
    await upsertDayNote(session.id, week, day, body);
    return { ok: true, message: "Saved" };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not save note." };
  }
}

export async function submitQuizAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult & { scorePct?: number; correct?: number; total?: number }> {
  try {
    const session = await requireSession();
    const scopeRaw = String(formData.get("scope") ?? "all");
    const scope = (scopeRaw === "all" || scopeRaw.startsWith("phase-") ? scopeRaw : "all") as import("@/lib/checks").QuizScope;
    const { questionsForScope, scoreAnswers, thresholdForScope } = await import("@/lib/checks");
    const { saveQuizAttempt } = await import("@/lib/learning");

    const questions = questionsForScope(scope);
    const answers: Record<string, string> = {};
    for (const q of questions) {
      const val = String(formData.get(`answer-${q.id}`) ?? "");
      if (val) answers[q.id] = val;
    }
    const result = scoreAnswers(questions, answers);
    await saveQuizAttempt(session.id, scope, result.scorePct, answers);
    const threshold = thresholdForScope(scope);
    const passed = result.scorePct >= threshold;
    return {
      ok: true,
      message: passed
        ? `Passed with ${result.scorePct}% (need ≥${threshold}%).`
        : `Scored ${result.scorePct}% — need ≥${threshold}% to clear this gate.`,
      scorePct: result.scorePct,
      correct: result.correct,
      total: result.total,
    };
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not save quiz attempt." };
  }
}

export async function toggleGateItemAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const phase = Number(formData.get("phase"));
  const itemKey = String(formData.get("itemKey") ?? "");
  const done = String(formData.get("done") ?? "") === "true";
  if (!phase || !itemKey) return;
  const { setGateItem } = await import("@/lib/learning");
  await setGateItem(session.id, phase, itemKey, done);
}
