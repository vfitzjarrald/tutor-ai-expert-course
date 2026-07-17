import assert from "assert";
import {
  evaluateRequiredPath,
  getPathwayNodes,
  validatePathway,
  type PathwayProgress,
} from "../lib/pathway";

const errors = validatePathway();
assert.deepStrictEqual(errors, [], errors.join("\n"));

const { required, optional, config } = getPathwayNodes();
assert.strictEqual(required.length, 135);
assert.strictEqual(optional.length, 15);
assert.strictEqual(config.targetWeeks, 30);

const empty = evaluateRequiredPath(new Map(), new Set());
assert.strictEqual(empty.today?.week, 1);
assert.strictEqual(empty.today?.day, 1);
assert.strictEqual(empty.tomorrow?.day, 2);

const phaseOneWaivers = new Set(["rag-foundations", "rag-pipeline"]);
const waived = evaluateRequiredPath(new Map(), phaseOneWaivers);
assert.strictEqual(waived.today?.week, 8, "Skill waivers must not skip the Phase 1 gate");
assert.strictEqual(waived.today?.day, 1);
assert.strictEqual(waived.waivedLessons, 10);

const partialWaiver = evaluateRequiredPath(new Map(), new Set(["rag-foundations"]));
assert.strictEqual(partialWaiver.today?.week, 7, "Only the mastered skill should be waived");

const completed = new Map<string, { completed: boolean }>() as PathwayProgress;
for (const node of required) completed.set(`${node.week}-${node.day}`, { completed: true });
const finished = evaluateRequiredPath(completed, new Set());
assert.strictEqual(finished.courseComplete, true);
assert.strictEqual(finished.today, null);

console.log(
  `smoke-pathway: ${required.length} required lessons, ${optional.length} optional lessons, DAG valid`,
);
