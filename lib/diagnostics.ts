import { existsSync, readFileSync } from "fs";
import path from "path";
import { loadPathway } from "./pathway";

export const DIAGNOSTIC_MASTERY_THRESHOLD = 80;

export type DiagnosticAttemptKind = "baseline" | "reassessment";

export type DiagnosticChoice = {
  letter: string;
  text: string;
  correct: boolean;
};

export type DiagnosticQuestion = {
  id: string;
  skillId: string;
  stem: string;
  choices: DiagnosticChoice[];
  explanation: string;
};

export type PublicDiagnosticQuestion = Omit<DiagnosticQuestion, "choices"> & {
  choices: Array<Omit<DiagnosticChoice, "correct">>;
};

export type DiagnosticPhase = {
  id: number;
  title: string;
  baseline: DiagnosticQuestion[];
  reassessment: DiagnosticQuestion[];
};

type DiagnosticBank = {
  version: number;
  phases: DiagnosticPhase[];
};

export type DiagnosticSkillScore = {
  skillId: string;
  correct: number;
  total: number;
  scorePct: number;
  mastered: boolean;
};

export type DiagnosticScore = {
  correct: number;
  total: number;
  scorePct: number;
  skillScores: DiagnosticSkillScore[];
  masteredSkillIds: string[];
};

function diagnosticPath(repoRoot = process.cwd()) {
  return path.join(repoRoot, "curriculum", "DIAGNOSTICS.json");
}

export function loadDiagnosticBank(repoRoot = process.cwd()): DiagnosticBank {
  const file = diagnosticPath(repoRoot);
  if (!existsSync(file)) throw new Error("Diagnostic question bank is missing");
  return JSON.parse(readFileSync(file, "utf8")) as DiagnosticBank;
}

export function getDiagnosticPhase(phase: number, repoRoot = process.cwd()) {
  return loadDiagnosticBank(repoRoot).phases.find((item) => item.id === phase) ?? null;
}

export function getDiagnosticQuestions(
  phase: number,
  kind: DiagnosticAttemptKind,
  repoRoot = process.cwd(),
) {
  const diagnostic = getDiagnosticPhase(phase, repoRoot);
  return diagnostic?.[kind] ?? [];
}

export function publicDiagnosticQuestions(
  questions: DiagnosticQuestion[],
): PublicDiagnosticQuestion[] {
  return questions.map((question) => ({
    id: question.id,
    skillId: question.skillId,
    stem: question.stem,
    explanation: question.explanation,
    choices: question.choices.map(({ letter, text }) => ({ letter, text })),
  }));
}

export function scoreDiagnostic(
  questions: DiagnosticQuestion[],
  answers: Record<string, string>,
): DiagnosticScore {
  const bySkill = new Map<string, { correct: number; total: number }>();
  let correct = 0;

  for (const question of questions) {
    const right = question.choices.find((choice) => choice.correct)?.letter;
    const isCorrect = Boolean(right && answers[question.id] === right);
    if (isCorrect) correct += 1;
    const skill = bySkill.get(question.skillId) ?? { correct: 0, total: 0 };
    skill.total += 1;
    if (isCorrect) skill.correct += 1;
    bySkill.set(question.skillId, skill);
  }

  const skillScores = [...bySkill].map(([skillId, result]) => {
    const scorePct =
      result.total === 0 ? 0 : Math.round((result.correct / result.total) * 1000) / 10;
    return {
      skillId,
      ...result,
      scorePct,
      mastered: scorePct >= DIAGNOSTIC_MASTERY_THRESHOLD,
    };
  });
  const total = questions.length;
  return {
    correct,
    total,
    scorePct: total === 0 ? 0 : Math.round((correct / total) * 1000) / 10,
    skillScores,
    masteredSkillIds: skillScores.filter((score) => score.mastered).map((score) => score.skillId),
  };
}

export function validateDiagnosticBank(repoRoot = process.cwd()) {
  const bank = loadDiagnosticBank(repoRoot);
  const { skills } = loadPathway(repoRoot);
  const pathwayById = new Map(skills.weeks.map((week) => [week.id, week]));
  const errors: string[] = [];
  const questionIds = new Set<string>();

  for (let phase = 1; phase <= 7; phase++) {
    const item = bank.phases.find((candidate) => candidate.id === phase);
    if (!item) {
      errors.push(`Missing Phase ${phase}`);
      continue;
    }
    for (const kind of ["baseline", "reassessment"] as const) {
      const questions = item[kind];
      if (!questions.length) errors.push(`Phase ${phase} ${kind} has no questions`);
      for (const question of questions) {
        if (questionIds.has(question.id)) errors.push(`Duplicate question id: ${question.id}`);
        questionIds.add(question.id);
        const skill = pathwayById.get(question.skillId);
        if (!skill) errors.push(`${question.id} references unknown skill ${question.skillId}`);
        else if (skill.phase !== phase) {
          errors.push(`${question.id} maps to Phase ${skill.phase}, not Phase ${phase}`);
        }
        if (question.choices.length !== 4) errors.push(`${question.id} must have four choices`);
        if (question.choices.filter((choice) => choice.correct).length !== 1) {
          errors.push(`${question.id} must have exactly one correct choice`);
        }
      }
    }

    const skippable = skills.weeks.filter(
      (week) => week.phase === phase && week.required && week.skippable && !week.gate,
    );
    for (const skill of skippable) {
      for (const kind of ["baseline", "reassessment"] as const) {
        const count = item[kind].filter((question) => question.skillId === skill.id).length;
        if (count < 5) errors.push(`Phase ${phase} ${kind} needs 5 questions for ${skill.id}`);
      }
    }
  }
  return errors;
}

export function eligibleWaiverSkillIds(phase: number, masteredSkillIds: string[], repoRoot = process.cwd()) {
  const { skills } = loadPathway(repoRoot);
  const eligible = new Set(
    skills.weeks
      .filter(
        (week) =>
          week.phase === phase &&
          phase <= 6 &&
          week.required &&
          week.skippable &&
          !week.gate,
      )
      .map((week) => week.id),
  );
  return masteredSkillIds.filter((id) => eligible.has(id));
}
