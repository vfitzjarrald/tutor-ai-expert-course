import { getDb } from "./db";
import {
  isLocalStoreMode,
  localGetDiagnosticAttempts,
  localGetDiagnosticWaivers,
  localSaveDiagnosticAttempt,
} from "./local-store";
import type {
  DiagnosticAttemptKind,
  DiagnosticScore,
  DiagnosticSkillScore,
} from "./diagnostics";

export type DiagnosticAttempt = {
  id: string;
  phase: number;
  attemptKind: DiagnosticAttemptKind;
  bankVersion: number;
  scorePct: number;
  answers: Record<string, string>;
  skillScores: DiagnosticSkillScore[];
  createdAt: string;
};

function mapAttempt(row: {
  id: string;
  phase: number;
  attempt_kind: DiagnosticAttemptKind;
  bank_version: number;
  score_pct: number;
  answers: Record<string, string>;
  skill_scores: DiagnosticSkillScore[];
  created_at: string;
}): DiagnosticAttempt {
  return {
    id: row.id,
    phase: Number(row.phase),
    attemptKind: row.attempt_kind,
    bankVersion: Number(row.bank_version),
    scorePct: Number(row.score_pct),
    answers: row.answers ?? {},
    skillScores: row.skill_scores ?? [],
    createdAt: row.created_at,
  };
}

export async function saveDiagnosticAttempt(
  userId: string,
  phase: number,
  attemptKind: DiagnosticAttemptKind,
  bankVersion: number,
  score: DiagnosticScore,
  answers: Record<string, string>,
  waiverSkillIds: string[],
) {
  if (isLocalStoreMode()) {
    const row = await localSaveDiagnosticAttempt(
      userId,
      {
        phase,
        attempt_kind: attemptKind,
        bank_version: bankVersion,
        score_pct: score.scorePct,
        answers,
        skill_scores: score.skillScores,
      },
      attemptKind === "baseline" ? waiverSkillIds : [],
    );
    return mapAttempt(row);
  }

  const sql = getDb();
  const answersJson = JSON.stringify(answers);
  const skillScoresJson = JSON.stringify(score.skillScores);
  let results;
  try {
    results = await sql.transaction((tx) => {
      const attemptQuery = tx`
        INSERT INTO diagnostic_attempts (
          user_id, phase, attempt_kind, bank_version, score_pct, answers, skill_scores
        )
        VALUES (
          ${userId}, ${phase}, ${attemptKind}, ${bankVersion}, ${score.scorePct},
          ${answersJson}::jsonb, ${skillScoresJson}::jsonb
        )
        RETURNING id::text, phase, attempt_kind, bank_version, score_pct,
          answers, skill_scores, created_at::text
      `;
      const waiverQueries =
        attemptKind === "baseline"
          ? waiverSkillIds.map(
              (skillId) => tx`
                INSERT INTO diagnostic_waivers (user_id, pathway_week_id, source_attempt_id)
                SELECT ${userId}, ${skillId}, id
                FROM diagnostic_attempts
                WHERE user_id = ${userId} AND phase = ${phase} AND attempt_kind = 'baseline'
                ON CONFLICT (user_id, pathway_week_id) DO NOTHING
              `,
            )
          : [];
      return [attemptQuery, ...waiverQueries];
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (attemptKind === "baseline" && /unique|duplicate/i.test(message)) {
      throw new Error("BASELINE_EXISTS");
    }
    throw error;
  }
  return mapAttempt(results[0][0] as Parameters<typeof mapAttempt>[0]);
}

export async function getDiagnosticAttempts(userId: string, phase?: number) {
  if (isLocalStoreMode()) {
    const rows = await localGetDiagnosticAttempts(userId, phase);
    return rows.map(mapAttempt);
  }
  const sql = getDb();
  const rows =
    phase == null
      ? await sql`
          SELECT id::text, phase, attempt_kind, bank_version, score_pct,
            answers, skill_scores, created_at::text
          FROM diagnostic_attempts
          WHERE user_id = ${userId}
          ORDER BY created_at ASC
        `
      : await sql`
          SELECT id::text, phase, attempt_kind, bank_version, score_pct,
            answers, skill_scores, created_at::text
          FROM diagnostic_attempts
          WHERE user_id = ${userId} AND phase = ${phase}
          ORDER BY created_at ASC
        `;
  return (rows as Array<Parameters<typeof mapAttempt>[0]>).map(mapAttempt);
}

export async function getDiagnosticWaivers(userId: string) {
  if (isLocalStoreMode()) return localGetDiagnosticWaivers(userId);
  const sql = getDb();
  const rows = await sql`
    SELECT pathway_week_id
    FROM diagnostic_waivers
    WHERE user_id = ${userId}
  `;
  return new Set((rows as Array<{ pathway_week_id: string }>).map((row) => row.pathway_week_id));
}

export async function getDiagnosticSummaries(userId: string) {
  const [attempts, waivers] = await Promise.all([
    getDiagnosticAttempts(userId),
    getDiagnosticWaivers(userId),
  ]);
  return new Map(
    Array.from({ length: 7 }, (_, index) => index + 1).map((phase) => {
      const phaseAttempts = attempts.filter((attempt) => attempt.phase === phase);
      const baseline =
        phaseAttempts.find((attempt) => attempt.attemptKind === "baseline") ?? null;
      const reassessments = phaseAttempts.filter(
        (attempt) => attempt.attemptKind === "reassessment",
      );
      const latestReassessment = reassessments.at(-1) ?? null;
      return [
        phase,
        {
          baseline,
          latestReassessment,
          growth:
            baseline && latestReassessment
              ? Math.round((latestReassessment.scorePct - baseline.scorePct) * 10) / 10
              : null,
          waivedSkillIds: baseline
            ? baseline.skillScores
                .filter((score) => score.mastered && waivers.has(score.skillId))
                .map((score) => score.skillId)
            : [],
        },
      ] as const;
    }),
  );
}
