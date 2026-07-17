import assert from "assert";
import {
  eligibleWaiverSkillIds,
  getDiagnosticPhase,
  scoreDiagnostic,
  validateDiagnosticBank,
} from "../lib/diagnostics";
import { shouldRequirePhaseDiagnostic } from "../lib/progress";

const errors = validateDiagnosticBank();
assert.deepStrictEqual(errors, [], errors.join("\n"));

for (let phase = 1; phase <= 7; phase++) {
  const diagnostic = getDiagnosticPhase(phase);
  assert(diagnostic, `Phase ${phase} diagnostic missing`);
  const baselineCoverage = new Map<string, number>();
  const reassessmentCoverage = new Map<string, number>();
  for (const question of diagnostic.baseline) {
    baselineCoverage.set(question.skillId, (baselineCoverage.get(question.skillId) ?? 0) + 1);
  }
  for (const question of diagnostic.reassessment) {
    reassessmentCoverage.set(
      question.skillId,
      (reassessmentCoverage.get(question.skillId) ?? 0) + 1,
    );
  }
  assert.deepStrictEqual(
    [...baselineCoverage].sort(),
    [...reassessmentCoverage].sort(),
    `Phase ${phase} forms must use the same skill blueprint`,
  );
}

const phaseOne = getDiagnosticPhase(1);
assert(phaseOne);
const firstSkill = phaseOne.baseline[0].skillId;
const firstSkillQuestions = phaseOne.baseline.filter((question) => question.skillId === firstSkill);
assert(firstSkillQuestions.length >= 5);
const fourOfFiveAnswers: Record<string, string> = {};
for (const [index, question] of firstSkillQuestions.entries()) {
  const correct = question.choices.find((choice) => choice.correct);
  assert(correct);
  fourOfFiveAnswers[question.id] =
    index === firstSkillQuestions.length - 1
      ? question.choices.find((choice) => !choice.correct)?.letter ?? ""
      : correct.letter;
}
const score = scoreDiagnostic(firstSkillQuestions, fourOfFiveAnswers);
assert.strictEqual(score.skillScores[0].scorePct, 80);
assert.strictEqual(score.skillScores[0].mastered, true);
assert.deepStrictEqual(eligibleWaiverSkillIds(1, [firstSkill]), [firstSkill]);
assert.deepStrictEqual(eligibleWaiverSkillIds(7, ["paper-reproduction-kt"]), []);

assert.strictEqual(shouldRequirePhaseDiagnostic(1, false, false), true);
assert.strictEqual(shouldRequirePhaseDiagnostic(1, true, false), false);
assert.strictEqual(shouldRequirePhaseDiagnostic(1, false, true), false);
assert.strictEqual(shouldRequirePhaseDiagnostic(null, false, false), false);

console.log("smoke-diagnostics: bank valid, forms matched, mastery and phase blocking verified");
