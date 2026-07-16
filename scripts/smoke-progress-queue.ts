/**
 * Smoke tests for completion-driven lesson queue.
 * Run: npx tsx scripts/smoke-progress-queue.ts
 */
import assert from "assert";
import {
  findIncompleteLessons,
  type ProgressEntry,
  progressKey,
} from "../lib/progress";
import {
  nextLessonPosition,
  previousLessonPosition,
  lessonOrdinal,
  positionFromOrdinal,
  TOTAL_LESSONS,
} from "../lib/schedule";

function mapFromCompleted(pairs: Array<[number, number]>) {
  const map = new Map<string, ProgressEntry>();
  for (const [week, day] of pairs) {
    map.set(progressKey(week, day), { completed: true, completedAt: "x" });
  }
  return map;
}

function main() {
  // Empty → W1D1, W1D2
  const empty = findIncompleteLessons(new Map(), 2);
  assert.deepStrictEqual(empty, [
    { week: 1, day: 1 },
    { week: 1, day: 2 },
  ]);

  // Complete W1D1 → today W1D2, tomorrow W1D3
  const afterD1 = findIncompleteLessons(mapFromCompleted([[1, 1]]), 2);
  assert.deepStrictEqual(afterD1, [
    { week: 1, day: 2 },
    { week: 1, day: 3 },
  ]);

  // Complete W1D5 → W2D1
  const afterW1 = findIncompleteLessons(
    mapFromCompleted([
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ]),
    2,
  );
  assert.deepStrictEqual(afterW1, [
    { week: 2, day: 1 },
    { week: 2, day: 2 },
  ]);

  // Gap: mark W1D1 incomplete while later days done → front of queue
  const withGap = findIncompleteLessons(
    mapFromCompleted([
      [1, 2],
      [1, 3],
    ]),
    2,
  );
  assert.deepStrictEqual(withGap, [
    { week: 1, day: 1 },
    { week: 1, day: 4 },
  ]);

  // All complete
  const all = new Map<string, ProgressEntry>();
  for (let w = 1; w <= 78; w++) {
    for (let d = 1; d <= 5; d++) {
      all.set(progressKey(w, d), { completed: true, completedAt: "x" });
    }
  }
  assert.deepStrictEqual(findIncompleteLessons(all, 2), []);

  // Adjacent navigation
  assert.deepStrictEqual(nextLessonPosition(1, 5), { week: 2, day: 1 });
  assert.deepStrictEqual(previousLessonPosition(2, 1), { week: 1, day: 5 });
  assert.strictEqual(previousLessonPosition(1, 1), null);
  assert.strictEqual(nextLessonPosition(78, 5), null);
  assert.strictEqual(lessonOrdinal(1, 1), 0);
  assert.strictEqual(lessonOrdinal(78, 5), TOTAL_LESSONS - 1);
  assert.deepStrictEqual(positionFromOrdinal(5), { week: 2, day: 1 });

  console.log("smoke-progress-queue: all assertions passed");
}

main();
