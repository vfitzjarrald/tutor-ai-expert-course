"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearSessionCookie,
  setSessionCookie,
  toSessionUser,
  verifyPassword,
  requireAdmin,
  requireSession,
} from "@/lib/auth";
import {
  ensureAdminSeeded,
  findUserByUsername,
  createLearner,
  setUserActive,
  resetUserPassword,
  generatePassword,
  listUsers,
} from "@/lib/users";
import { resetLearnerProgress, setDayCompleted, upsertDayNote } from "@/lib/progress";

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
    const placement = String(formData.get("placement") ?? "") === "true";
    const { questionsForScope, scoreAnswers, thresholdForScope } = await import("@/lib/checks");
    const { saveQuizAttempt } = await import("@/lib/learning");

    const questions = questionsForScope(scope);
    const answers: Record<string, string> = {};
    for (const q of questions) {
      const val = String(formData.get(`answer-${q.id}`) ?? "");
      if (val) answers[q.id] = val;
    }
    const result = scoreAnswers(questions, answers);
    const savedScope = placement && scope !== "all" ? `placement-${scope}` : scope;
    await saveQuizAttempt(session.id, savedScope, result.scorePct, answers);
    const threshold = thresholdForScope(scope);
    const passed = result.scorePct >= threshold;
    return {
      ok: true,
      message: passed
        ? placement
          ? `Placement cleared with ${result.scorePct}%. Skippable Phase ${scope.replace("phase-", "")} foundations are bypassed; the phase gate remains required.`
          : `Passed with ${result.scorePct}% (need ≥${threshold}%).`
        : placement
          ? `Scored ${result.scorePct}% — need ≥${threshold}% to skip the phase foundations.`
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

export type DiagnosticActionResult =
  | {
      ok: true;
      message: string;
      scorePct: number;
      masteredSkillIds: string[];
      attemptKind: "baseline" | "reassessment";
    }
  | { ok: false; error: string };

export async function submitDiagnosticAction(
  _prev: DiagnosticActionResult | null,
  formData: FormData,
): Promise<DiagnosticActionResult> {
  try {
    const session = await requireSession();
    const phase = Number(formData.get("phase"));
    if (!Number.isInteger(phase) || phase < 1 || phase > 7) {
      return { ok: false, error: "Invalid diagnostic phase." };
    }
    const {
      eligibleWaiverSkillIds,
      getDiagnosticQuestions,
      loadDiagnosticBank,
      scoreDiagnostic,
    } = await import("@/lib/diagnostics");
    const {
      getDiagnosticAttempts,
      saveDiagnosticAttempt,
    } = await import("@/lib/diagnostic-progress");
    const attempts = await getDiagnosticAttempts(session.id, phase);
    const hasBaseline = attempts.some((attempt) => attempt.attemptKind === "baseline");
    const queue = await (await import("@/lib/progress")).getLearnerQueue(session.id, 1);
    const phaseStarted = queue.states.some(
      (state) => state.node.phase === phase && state.completed,
    );
    if (!hasBaseline && queue.diagnosticDue?.phase !== phase && !phaseStarted) {
      return { ok: false, error: "Complete the prior phase before taking this diagnostic." };
    }
    const attemptKind = hasBaseline ? "reassessment" : "baseline";
    const questions = getDiagnosticQuestions(phase, attemptKind);
    if (!questions.length) return { ok: false, error: "Diagnostic questions are unavailable." };

    const answers: Record<string, string> = {};
    for (const question of questions) {
      const answer = String(formData.get(`answer-${question.id}`) ?? "");
      if (answer) answers[question.id] = answer;
    }
    if (Object.keys(answers).length !== questions.length) {
      return { ok: false, error: "Answer every question before submitting." };
    }

    const score = scoreDiagnostic(questions, answers);
    const waiverSkillIds =
      attemptKind === "baseline"
        ? eligibleWaiverSkillIds(phase, score.masteredSkillIds)
        : [];
    await saveDiagnosticAttempt(
      session.id,
      phase,
      attemptKind,
      loadDiagnosticBank().version,
      score,
      answers,
      waiverSkillIds,
    );
    revalidatePath("/");
    revalidatePath("/diagnostics");
    revalidatePath(`/diagnostics/${phase}`);
    revalidatePath("/schedule");
    return {
      ok: true,
      message:
        attemptKind === "baseline"
          ? `${score.scorePct}% baseline saved. ${waiverSkillIds.length} skill waiver${waiverSkillIds.length === 1 ? "" : "s"} earned.`
          : `${score.scorePct}% reassessment saved.`,
      scorePct: score.scorePct,
      masteredSkillIds: waiverSkillIds,
      attemptKind,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "BASELINE_EXISTS") {
      return { ok: false, error: "Your baseline is already saved. Refresh to take a reassessment." };
    }
    console.error(error);
    return { ok: false, error: "Could not save the diagnostic." };
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

export async function toggleLessonTaskAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  const pathwayNodeId = String(formData.get("pathwayNodeId") ?? "");
  const taskKey = String(formData.get("taskKey") ?? "");
  const done = String(formData.get("done") ?? "") === "true";
  if (!pathwayNodeId || !taskKey) return;
  const { setLessonTask } = await import("@/lib/day-checklist");
  await setLessonTask(session.id, pathwayNodeId, taskKey, done);
}

export async function resetMyProgressAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    const session = await requireSession();
    const confirm = String(formData.get("confirm") ?? "").trim();
    if (confirm.toLowerCase() !== session.username.toLowerCase()) {
      return { ok: false, error: `Type your username (${session.username}) to confirm.` };
    }
    await resetLearnerProgress(session.id, { keepNotes: true });
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Could not reset progress." };
  }
  redirect("/");
}

export async function resetLearnerProgressAction(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = String(formData.get("userId") ?? "");
    const confirm = String(formData.get("confirm") ?? "").trim();
    if (!userId) return { ok: false, error: "Missing user." };

    const users = await listUsers();
    const target = users.find((u) => u.id === userId);
    if (!target) return { ok: false, error: "User not found." };
    if (confirm.toLowerCase() !== target.username.toLowerCase()) {
      return { ok: false, error: `Type “${target.username}” to confirm.` };
    }

    await resetLearnerProgress(userId, { keepNotes: true });
    return { ok: true, message: `Reset progress for ${target.username}. Calendar starts at Week 1; notes were kept.` };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    if (message === "UNAUTHORIZED" || message === "FORBIDDEN") {
      return { ok: false, error: "Admin access required." };
    }
    console.error(err);
    return { ok: false, error: "Could not reset progress." };
  }
}
