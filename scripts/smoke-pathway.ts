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

const empty = evaluateRequiredPath(new Map(), new Map());
assert.strictEqual(empty.today?.week, 1);
assert.strictEqual(empty.today?.day, 1);
assert.strictEqual(empty.tomorrow?.day, 2);

const phaseOnePlacement = new Map([[1, 80]]);
const placed = evaluateRequiredPath(new Map(), phaseOnePlacement);
assert.strictEqual(placed.today?.week, 8, "Placement must skip foundations but not the Phase 1 gate");
assert.strictEqual(placed.today?.day, 1);

const completed = new Map<string, { completed: boolean }>() as PathwayProgress;
for (const node of required) completed.set(`${node.week}-${node.day}`, { completed: true });
const finished = evaluateRequiredPath(completed, new Map());
assert.strictEqual(finished.courseComplete, true);
assert.strictEqual(finished.today, null);

console.log(
  `smoke-pathway: ${required.length} required lessons, ${optional.length} optional lessons, DAG valid`,
);
