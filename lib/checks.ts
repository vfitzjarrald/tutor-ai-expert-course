import { existsSync, readFileSync } from "fs";
import path from "path";

export const PHASE_GATE_THRESHOLD = 80;
export const EXPERT_THRESHOLD = 85;

export type QuizChoice = {
  letter: string;
  text: string;
  correct: boolean;
};

export type QuizQuestion = {
  id: string;
  number: number;
  phase: number;
  stem: string;
  choices: QuizChoice[];
  explanation: string;
};

export type QuizScope = "all" | `phase-${number}`;

function checksPath(repoRoot = process.cwd()) {
  return path.join(repoRoot, "curriculum", "CHECKS.md");
}

export function loadQuizQuestions(repoRoot = process.cwd()): QuizQuestion[] {
  const file = checksPath(repoRoot);
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8");

  const phaseBlocks = [...md.matchAll(/###\s+Phase\s+(\d+)\s+[—–-]\s+Q(\d+)–Q(\d+)/g)];
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < phaseBlocks.length; i++) {
    const block = phaseBlocks[i];
    const phase = Number(block[1]);
    const start = block.index ?? 0;
    const end = i + 1 < phaseBlocks.length ? (phaseBlocks[i + 1].index ?? md.length) : md.length;
    const chunk = md.slice(start, end);

    const qMatches = [...chunk.matchAll(/\*\*Q(\d+)\.\*\*\s*([\s\S]*?)(?=\*\*Q\d+\.\*\*|\*Explanation:|$)/g)];
    for (const qm of qMatches) {
      const number = Number(qm[1]);
      const body = qm[2].trim();
      const stemLine = body.split("\n").find((l) => l.trim() && !l.trim().startsWith("- ")) ?? "";
      const stem = stemLine.trim();

      const choices: QuizChoice[] = [];
      for (const line of body.split("\n")) {
        const m = line.match(/^-\s+([A-D])\)\s+(.+?)(\s*✓)?\s*$/);
        if (!m) continue;
        choices.push({
          letter: m[1],
          text: m[2].replace(/\s*✓\s*$/, "").trim(),
          correct: Boolean(m[3]),
        });
      }

      const explMatch = chunk.match(
        new RegExp(`\\*\\*Q${number}\\.\\*\\*[\\s\\S]*?\\*Explanation:\\*\\s*(.+)`),
      );

      questions.push({
        id: `q${number}`,
        number,
        phase,
        stem,
        choices,
        explanation: explMatch?.[1]?.trim() ?? "",
      });
    }
  }

  return questions.sort((a, b) => a.number - b.number);
}

export function questionsForScope(scope: QuizScope, repoRoot = process.cwd()): QuizQuestion[] {
  const all = loadQuizQuestions(repoRoot);
  if (scope === "all") return all;
  const phase = Number(scope.replace("phase-", ""));
  return all.filter((q) => q.phase === phase);
}

export function scoreAnswers(
  questions: QuizQuestion[],
  answers: Record<string, string>,
): { correct: number; total: number; scorePct: number } {
  let correct = 0;
  for (const q of questions) {
    const chosen = answers[q.id];
    const right = q.choices.find((c) => c.correct)?.letter;
    if (chosen && right && chosen === right) correct += 1;
  }
  const total = questions.length;
  const scorePct = total === 0 ? 0 : Math.round((correct / total) * 1000) / 10;
  return { correct, total, scorePct };
}

export function thresholdForScope(scope: QuizScope): number {
  return scope === "all" ? EXPERT_THRESHOLD : PHASE_GATE_THRESHOLD;
}

export function gateWeekForPhase(phase: number): number | null {
  const map: Record<number, number> = {
    1: 8,
    2: 16,
    3: 24,
    4: 32,
    5: 40,
    6: 52,
    7: 78,
  };
  return map[phase] ?? null;
}

export function isGateWeek(week: number): boolean {
  return [8, 16, 24, 32, 40, 52, 78].includes(week);
}
