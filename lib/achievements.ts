import {
  ACHIEVEMENTS,
  AI_EXPERT_ACHIEVEMENT_ID,
  EXPERT_PD_HOURS,
  PEARSON_ACHIEVEMENT_ID,
  getAchievement,
  type AchievementDefinition,
} from "@/config/achievements";
import { EXPERT_THRESHOLD, PHASE_GATE_THRESHOLD } from "@/lib/checks";
import { getDb } from "@/lib/db";
import { getDiagnosticAttempts } from "@/lib/diagnostic-progress";
import { gatesByPhase } from "@/lib/gates";
import { getGateStates } from "@/lib/learning";
import {
  isLocalStoreMode,
  localGetExpertCertificate,
  localGetExternalCredential,
  localGetPendingAchievements,
  localGetUserAchievements,
  localIssueExpertCertificate,
  localMarkAchievementsCelebrated,
  localSaveExternalCredential,
  localUpsertAchievements,
  localBestQuizScores,
  type LocalUserAchievementRow,
} from "@/lib/local-store";
import { loadPathway } from "@/lib/pathway";
import { getProgressMap, type ProgressEntry } from "@/lib/progress";
import { getUserById } from "@/lib/users";

export type AchievementSourceType =
  | "diagnostic"
  | "week_complete"
  | "phase_gate"
  | "expert"
  | "external_credential";

export type EligibleAchievement = {
  achievementId: string;
  sourceType: AchievementSourceType;
  sourceRef?: string;
  evidence: Record<string, unknown>;
};

export type UserAchievement = {
  id: string;
  achievementId: string;
  sourceType: string;
  sourceRef: string | null;
  evidence: Record<string, unknown>;
  earnedAt: string;
  celebratedAt: string | null;
};

export type ExpertCertificate = {
  id: string;
  userId: string;
  recipientName: string;
  issuedAt: string;
  pdHours: number;
};

export type ExternalCredential = {
  id: string;
  provider: string;
  credentialId: string;
  issuedOn: string;
  attestedAt: string;
  notes: string | null;
};

function weekComplete(progress: Map<string, ProgressEntry>, week: number) {
  return [1, 2, 3, 4, 5].every((day) => progress.get(`${week}-${day}`)?.completed);
}

function bestQuizScore(
  scores: Map<string, { scorePct: number; createdAt: string }>,
  scope: string,
) {
  return scores.get(scope)?.scorePct ?? null;
}

/** Pure evaluator used by sync and smoke tests. */
export function evaluateEligibleAchievements(input: {
  progress: Map<string, ProgressEntry>;
  diagnosticSkillBest: Map<string, number>;
  quizBest: Map<string, number>;
  gateStates: Map<string, boolean>;
  earnedIds: Set<string>;
  hasPearsonCredential: boolean;
}): EligibleAchievement[] {
  const { skills } = loadPathway();
  const weekById = new Map(skills.weeks.map((week) => [week.id, week]));
  const gates = gatesByPhase();
  const eligible: EligibleAchievement[] = [];

  for (const badge of ACHIEVEMENTS) {
    if (input.earnedIds.has(badge.id)) continue;
    if (badge.id === PEARSON_ACHIEVEMENT_ID) {
      if (input.hasPearsonCredential) {
        eligible.push({
          achievementId: badge.id,
          sourceType: "external_credential",
          sourceRef: "pearson",
          evidence: { provider: "pearson-genai-foundations" },
        });
      }
      continue;
    }
    if (badge.id === AI_EXPERT_ACHIEVEMENT_ID) continue;

    const week = badge.pathwayWeekId ? weekById.get(badge.pathwayWeekId) : null;
    if (!week) continue;

    if (badge.category === "gate") {
      const items = gates.get(week.phase) ?? [];
      const checklistComplete =
        items.length > 0 && items.every((item) => input.gateStates.get(`${item.phase}:${item.key}`));
      const quizScope = week.phase === 7 ? "all" : `phase-${week.phase}`;
      const threshold = week.phase === 7 ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
      const quizScore = input.quizBest.get(quizScope) ?? null;
      const lessonsDone = weekComplete(input.progress, week.week);
      if (lessonsDone && checklistComplete && quizScore != null && quizScore >= threshold) {
        eligible.push({
          achievementId: badge.id,
          sourceType: "phase_gate",
          sourceRef: `phase-${week.phase}`,
          evidence: {
            week: week.week,
            quizScope,
            quizScore,
            checklistCount: items.length,
          },
        });
      }
      continue;
    }

    const diagnosticScore = input.diagnosticSkillBest.get(week.id);
    const canUseDiagnostic =
      week.phase <= 6 &&
      week.skippable &&
      !week.gate &&
      diagnosticScore != null &&
      diagnosticScore >= 80;

    if (canUseDiagnostic) {
      eligible.push({
        achievementId: badge.id,
        sourceType: "diagnostic",
        sourceRef: week.id,
        evidence: { skillId: week.id, scorePct: diagnosticScore },
      });
      continue;
    }

    if (weekComplete(input.progress, week.week)) {
      eligible.push({
        achievementId: badge.id,
        sourceType: "week_complete",
        sourceRef: `week-${week.week}`,
        evidence: { week: week.week, pathwayWeekId: week.id },
      });
    }
  }

  if (!input.earnedIds.has(AI_EXPERT_ACHIEVEMENT_ID)) {
    const required = ACHIEVEMENTS.filter(
      (item) => item.requiredForExpert && item.id !== AI_EXPERT_ACHIEVEMENT_ID,
    );
    const haveAllPrior = required.every(
      (item) => input.earnedIds.has(item.id) || eligible.some((row) => row.achievementId === item.id),
    );
    const expertWeekDone = weekComplete(input.progress, 78);
    const expertItems = gates.get(7) ?? [];
    const expertChecklist =
      expertItems.length > 0 &&
      expertItems.every((item) => input.gateStates.get(`${item.phase}:${item.key}`));
    const expertQuiz = input.quizBest.get("all");
    if (
      haveAllPrior &&
      expertWeekDone &&
      expertChecklist &&
      expertQuiz != null &&
      expertQuiz >= EXPERT_THRESHOLD
    ) {
      eligible.push({
        achievementId: AI_EXPERT_ACHIEVEMENT_ID,
        sourceType: "expert",
        sourceRef: "week-78",
        evidence: { quizScore: expertQuiz, pdHours: EXPERT_PD_HOURS },
      });
    }
  }

  return eligible;
}

async function buildDiagnosticSkillBest(userId: string) {
  const attempts = await getDiagnosticAttempts(userId);
  const best = new Map<string, number>();
  for (const attempt of attempts) {
    for (const skill of attempt.skillScores) {
      const current = best.get(skill.skillId) ?? 0;
      if (skill.scorePct > current) best.set(skill.skillId, skill.scorePct);
    }
  }
  return best;
}

async function buildQuizBest(userId: string) {
  if (isLocalStoreMode()) return localBestQuizScores(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT scope, MAX(score_pct) AS score_pct
    FROM quiz_attempts
    WHERE user_id = ${userId}
    GROUP BY scope
  `;
  const best = new Map<string, number>();
  for (const row of rows as Array<{ scope: string; score_pct: number }>) {
    best.set(row.scope, Number(row.score_pct));
  }
  return best;
}

function mapAchievement(row: {
  id: string;
  achievement_id: string;
  source_type: string;
  source_ref: string | null;
  evidence: Record<string, unknown>;
  earned_at: string;
  celebrated_at: string | null;
}): UserAchievement {
  return {
    id: row.id,
    achievementId: row.achievement_id,
    sourceType: row.source_type,
    sourceRef: row.source_ref,
    evidence: row.evidence ?? {},
    earnedAt: row.earned_at,
    celebratedAt: row.celebrated_at,
  };
}

export async function getUserAchievements(userId: string) {
  if (isLocalStoreMode()) {
    return (await localGetUserAchievements(userId)).map((row) =>
      mapAchievement({
        id: row.id,
        achievement_id: row.achievement_id,
        source_type: row.source_type,
        source_ref: row.source_ref,
        evidence: row.evidence,
        earned_at: row.earned_at,
        celebrated_at: row.celebrated_at,
      }),
    );
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id::text, achievement_id, source_type, source_ref, evidence,
      earned_at::text, celebrated_at::text
    FROM user_achievements
    WHERE user_id = ${userId}
    ORDER BY earned_at ASC
  `;
  return (rows as Array<Parameters<typeof mapAchievement>[0]>).map(mapAchievement);
}

export async function getPendingCelebrations(userId: string) {
  if (isLocalStoreMode()) {
    return (await localGetPendingAchievements(userId)).map((row) =>
      mapAchievement({
        id: row.id,
        achievement_id: row.achievement_id,
        source_type: row.source_type,
        source_ref: row.source_ref,
        evidence: row.evidence,
        earned_at: row.earned_at,
        celebrated_at: row.celebrated_at,
      }),
    );
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id::text, achievement_id, source_type, source_ref, evidence,
      earned_at::text, celebrated_at::text
    FROM user_achievements
    WHERE user_id = ${userId} AND celebrated_at IS NULL
    ORDER BY earned_at ASC
  `;
  return (rows as Array<Parameters<typeof mapAchievement>[0]>).map(mapAchievement);
}

export async function markAchievementsCelebrated(userId: string, achievementIds: string[]) {
  if (!achievementIds.length) return;
  if (isLocalStoreMode()) {
    await localMarkAchievementsCelebrated(userId, achievementIds);
    return;
  }
  const sql = getDb();
  await sql`
    UPDATE user_achievements
    SET celebrated_at = NOW()
    WHERE user_id = ${userId}
      AND celebrated_at IS NULL
      AND achievement_id = ANY(${achievementIds})
  `;
}

async function upsertAchievements(userId: string, awards: EligibleAchievement[]) {
  if (!awards.length) return [];
  if (isLocalStoreMode()) {
    const rows = await localUpsertAchievements(
      userId,
      awards.map((award) => ({
        achievement_id: award.achievementId,
        source_type: award.sourceType,
        source_ref: award.sourceRef ?? null,
        evidence: award.evidence,
      })),
    );
    return rows.map((row: LocalUserAchievementRow) =>
      mapAchievement({
        id: row.id,
        achievement_id: row.achievement_id,
        source_type: row.source_type,
        source_ref: row.source_ref,
        evidence: row.evidence,
        earned_at: row.earned_at,
        celebrated_at: row.celebrated_at,
      }),
    );
  }
  const sql = getDb();
  const inserted: UserAchievement[] = [];
  for (const award of awards) {
    const evidenceJson = JSON.stringify(award.evidence);
    const rows = await sql`
      INSERT INTO user_achievements (
        user_id, achievement_id, source_type, source_ref, evidence
      )
      VALUES (
        ${userId}, ${award.achievementId}, ${award.sourceType},
        ${award.sourceRef ?? null}, ${evidenceJson}::jsonb
      )
      ON CONFLICT (user_id, achievement_id) DO NOTHING
      RETURNING id::text, achievement_id, source_type, source_ref, evidence,
        earned_at::text, celebrated_at::text
    `;
    if (rows[0]) inserted.push(mapAchievement(rows[0] as Parameters<typeof mapAchievement>[0]));
  }
  return inserted;
}

export async function syncUserAchievements(userId: string) {
  const [progress, diagnosticSkillBest, quizBest, gateStates, existing, pearson] =
    await Promise.all([
      getProgressMap(userId),
      buildDiagnosticSkillBest(userId),
      buildQuizBest(userId),
      getGateStates(userId),
      getUserAchievements(userId),
      getPearsonCredential(userId),
    ]);

  const earnedIds = new Set(existing.map((row) => row.achievementId));
  const eligible = evaluateEligibleAchievements({
    progress,
    diagnosticSkillBest,
    quizBest: quizBest,
    gateStates,
    earnedIds,
    hasPearsonCredential: Boolean(pearson),
  });
  const newlyAwarded = await upsertAchievements(userId, eligible);

  if (
    newlyAwarded.some((row) => row.achievementId === AI_EXPERT_ACHIEVEMENT_ID) ||
    earnedIds.has(AI_EXPERT_ACHIEVEMENT_ID)
  ) {
    await ensureExpertCertificate(userId);
  }

  return {
    existing,
    newlyAwarded,
    all: await getUserAchievements(userId),
  };
}

export async function getPearsonCredential(userId: string) {
  if (isLocalStoreMode()) {
    const row = await localGetExternalCredential(userId, "pearson-genai-foundations");
    return row
      ? {
          id: row.id,
          provider: row.provider,
          credentialId: row.credential_id,
          issuedOn: row.issued_on,
          attestedAt: row.attested_at,
          notes: row.notes,
        }
      : null;
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id::text, provider, credential_id, issued_on::text, attested_at::text, notes
    FROM external_credentials
    WHERE user_id = ${userId} AND provider = 'pearson-genai-foundations'
    LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: string;
        provider: string;
        credential_id: string;
        issued_on: string;
        attested_at: string;
        notes: string | null;
      }
    | undefined;
  return row
    ? {
        id: row.id,
        provider: row.provider,
        credentialId: row.credential_id,
        issuedOn: row.issued_on,
        attestedAt: row.attested_at,
        notes: row.notes,
      }
    : null;
}

export async function submitPearsonCredential(
  userId: string,
  credentialId: string,
  issuedOn: string,
  notes?: string,
) {
  if (isLocalStoreMode()) {
    await localSaveExternalCredential(userId, {
      provider: "pearson-genai-foundations",
      credential_id: credentialId,
      issued_on: issuedOn,
      notes: notes ?? null,
    });
  } else {
    const sql = getDb();
    await sql`
      INSERT INTO external_credentials (user_id, provider, credential_id, issued_on, notes)
      VALUES (${userId}, 'pearson-genai-foundations', ${credentialId}, ${issuedOn}::date, ${notes ?? null})
      ON CONFLICT (user_id, provider)
      DO UPDATE SET
        credential_id = EXCLUDED.credential_id,
        issued_on = EXCLUDED.issued_on,
        notes = EXCLUDED.notes,
        attested_at = NOW()
    `;
  }
  return syncUserAchievements(userId);
}

export async function ensureExpertCertificate(userId: string) {
  const existing = await getExpertCertificateForUser(userId);
  if (existing) return existing;
  const user = await getUserById(userId);
  const recipientName = user?.display_name?.trim() || user?.username || "Learner";
  if (isLocalStoreMode()) {
    const row = await localIssueExpertCertificate(userId, recipientName, EXPERT_PD_HOURS);
    return {
      id: row.id,
      userId: row.user_id,
      recipientName: row.recipient_name,
      issuedAt: row.issued_at,
      pdHours: row.pd_hours,
    };
  }
  const sql = getDb();
  const rows = await sql`
    INSERT INTO expert_certificates (user_id, recipient_name, pd_hours)
    VALUES (${userId}, ${recipientName}, ${EXPERT_PD_HOURS})
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id::text, user_id::text, recipient_name, issued_at::text, pd_hours
  `;
  if (rows[0]) {
    const row = rows[0] as {
      id: string;
      user_id: string;
      recipient_name: string;
      issued_at: string;
      pd_hours: number;
    };
    return {
      id: row.id,
      userId: row.user_id,
      recipientName: row.recipient_name,
      issuedAt: row.issued_at,
      pdHours: Number(row.pd_hours),
    };
  }
  return getExpertCertificateForUser(userId);
}

export async function getExpertCertificateForUser(userId: string) {
  if (isLocalStoreMode()) {
    const row = await localGetExpertCertificate(userId);
    return row
      ? {
          id: row.id,
          userId: row.user_id,
          recipientName: row.recipient_name,
          issuedAt: row.issued_at,
          pdHours: row.pd_hours,
        }
      : null;
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id::text, user_id::text, recipient_name, issued_at::text, pd_hours
    FROM expert_certificates
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: string;
        user_id: string;
        recipient_name: string;
        issued_at: string;
        pd_hours: number;
      }
    | undefined;
  return row
    ? {
        id: row.id,
        userId: row.user_id,
        recipientName: row.recipient_name,
        issuedAt: row.issued_at,
        pdHours: Number(row.pd_hours),
      }
    : null;
}

export async function getExpertCertificateById(certificateId: string) {
  if (isLocalStoreMode()) {
    const { localGetExpertCertificateById } = await import("@/lib/local-store");
    const row = await localGetExpertCertificateById(certificateId);
    return row
      ? {
          id: row.id,
          userId: row.user_id,
          recipientName: row.recipient_name,
          issuedAt: row.issued_at,
          pdHours: row.pd_hours,
        }
      : null;
  }
  const sql = getDb();
  const rows = await sql`
    SELECT id::text, user_id::text, recipient_name, issued_at::text, pd_hours
    FROM expert_certificates
    WHERE id = ${certificateId}
    LIMIT 1
  `;
  const row = rows[0] as
    | {
        id: string;
        user_id: string;
        recipient_name: string;
        issued_at: string;
        pd_hours: number;
      }
    | undefined;
  return row
    ? {
        id: row.id,
        userId: row.user_id,
        recipientName: row.recipient_name,
        issuedAt: row.issued_at,
        pdHours: Number(row.pd_hours),
      }
    : null;
}

export function achievementProgressSummary(
  earnedIds: Set<string>,
  definitions: AchievementDefinition[] = ACHIEVEMENTS,
) {
  const required = definitions.filter((item) => item.requiredForExpert);
  const bonus = definitions.filter((item) => !item.requiredForExpert);
  const requiredEarned = required.filter((item) => earnedIds.has(item.id)).length;
  const bonusEarned = bonus.filter((item) => earnedIds.has(item.id)).length;
  return {
    requiredTotal: required.length,
    requiredEarned,
    bonusTotal: bonus.length,
    bonusEarned,
    isExpert: earnedIds.has(AI_EXPERT_ACHIEVEMENT_ID),
  };
}

export function requirementHints(badge: AchievementDefinition, earnedIds: Set<string>) {
  if (earnedIds.has(badge.id)) return "Earned";
  return badge.howToEarn;
}

export { getAchievement };
