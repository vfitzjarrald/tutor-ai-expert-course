import assert from "assert";
import {
  ACHIEVEMENTS,
  AI_EXPERT_ACHIEVEMENT_ID,
  EXPERT_PD_HOURS,
  PEARSON_ACHIEVEMENT_ID,
  bonusAchievements,
  requiredAchievements,
} from "../config/achievements";
import { evaluateEligibleAchievements } from "../lib/achievements";
import { gatesByPhase } from "../lib/gates";
import { loadPathway } from "../lib/pathway";

assert.strictEqual(requiredAchievements().length, 27);
assert.strictEqual(bonusAchievements().length, 4);
assert.ok(ACHIEVEMENTS.some((item) => item.id === PEARSON_ACHIEVEMENT_ID));
assert.ok(ACHIEVEMENTS.some((item) => item.id === AI_EXPERT_ACHIEVEMENT_ID));

const { skills, config } = loadPathway();
for (const week of skills.weeks.filter((item) => item.required)) {
  assert.ok(
    ACHIEVEMENTS.some((badge) => badge.pathwayWeekId === week.id && badge.requiredForExpert),
    `Missing required badge for ${week.id}`,
  );
}
assert.strictEqual(
  config.requiredWeekIds.length * 5 * (config.lessonMinutes / 60),
  EXPERT_PD_HOURS,
);

const emptyProgress = new Map();
const diagnosticOnly = evaluateEligibleAchievements({
  progress: emptyProgress,
  diagnosticSkillBest: new Map([
    ["rag-foundations", 80],
    ["rag-pipeline", 100],
  ]),
  quizBest: new Map(),
  gateStates: new Map(),
  earnedIds: new Set(),
  hasPearsonCredential: false,
});
assert.deepStrictEqual(
  diagnosticOnly.map((item) => item.achievementId).sort(),
  ["rag-foundations", "rag-pipeline"],
);

const pearsonOnly = evaluateEligibleAchievements({
  progress: emptyProgress,
  diagnosticSkillBest: new Map(),
  quizBest: new Map(),
  gateStates: new Map(),
  earnedIds: new Set(),
  hasPearsonCredential: true,
});
assert.deepStrictEqual(
  pearsonOnly.map((item) => item.achievementId),
  [PEARSON_ACHIEVEMENT_ID],
);
assert.ok(!pearsonOnly.some((item) => item.sourceType === "diagnostic"));

const progress = new Map<string, { completed: boolean; completedAt: string | null }>();
for (const weekId of [...config.requiredWeekIds, ...config.optionalWeekIds]) {
  const week = skills.weeks.find((item) => item.id === weekId)!;
  for (let day = 1; day <= 5; day++) {
    progress.set(`${week.week}-${day}`, { completed: true, completedAt: null });
  }
}

const withoutGates = evaluateEligibleAchievements({
  progress,
  diagnosticSkillBest: new Map(),
  quizBest: new Map([
    ["phase-1", 90],
    ["phase-2", 90],
    ["phase-3", 90],
    ["phase-4", 90],
    ["phase-5", 90],
    ["phase-6", 90],
    ["all", 90],
  ]),
  gateStates: new Map(),
  earnedIds: new Set(),
  hasPearsonCredential: false,
});
assert.ok(withoutGates.some((item) => item.achievementId === "rag-foundations"));
assert.ok(!withoutGates.some((item) => item.achievementId === "rag-gate"));
assert.ok(!withoutGates.some((item) => item.achievementId === AI_EXPERT_ACHIEVEMENT_ID));

const gateStates = new Map<string, boolean>();
for (const [phase, items] of gatesByPhase()) {
  for (const item of items) gateStates.set(`${phase}:${item.key}`, true);
}
const withGates = evaluateEligibleAchievements({
  progress,
  diagnosticSkillBest: new Map(),
  quizBest: new Map([
    ["phase-1", 90],
    ["phase-2", 90],
    ["phase-3", 90],
    ["phase-4", 90],
    ["phase-5", 90],
    ["phase-6", 90],
    ["all", 90],
  ]),
  gateStates,
  earnedIds: new Set(),
  hasPearsonCredential: false,
});
assert.ok(withGates.some((item) => item.achievementId === "rag-gate"));
assert.ok(withGates.some((item) => item.achievementId === AI_EXPERT_ACHIEVEMENT_ID));
assert.ok(!withGates.some((item) => item.achievementId === PEARSON_ACHIEVEMENT_ID));

const already = evaluateEligibleAchievements({
  progress: emptyProgress,
  diagnosticSkillBest: new Map([["rag-foundations", 100]]),
  quizBest: new Map(),
  gateStates: new Map(),
  earnedIds: new Set(["rag-foundations"]),
  hasPearsonCredential: false,
});
assert.ok(!already.some((item) => item.achievementId === "rag-foundations"));

console.log(
  `smoke-achievements: ${ACHIEVEMENTS.length} badges, ${EXPERT_PD_HOURS} PD hours, diagnostic + pearson + gate rules verified`,
);
