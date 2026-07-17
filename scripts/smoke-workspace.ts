import assert from "assert";
import { isValidWorkspacePath } from "../lib/workspace";
import { getWorkspaceOverlay, resolveWorkspaceDay } from "../lib/workspace-overlays";
import { isLearningTrack, trackLabel } from "../lib/learning-track";
import { loadDay } from "../lib/curriculum";

function testTracks() {
  assert.equal(isLearningTrack("dev"), true);
  assert.equal(isLearningTrack("workspace"), true);
  assert.equal(isLearningTrack("other"), false);
  assert.equal(trackLabel("workspace"), "Workspace Path");
  assert.equal(trackLabel(null), "Choose a path");
}

function testPaths() {
  assert.equal(isValidWorkspacePath("notes/week-01/day-01.md"), true);
  assert.equal(isValidWorkspacePath("capstone/src/tutor/policies/tutor_policy.yaml"), true);
  assert.equal(isValidWorkspacePath("../etc/passwd"), false);
  assert.equal(isValidWorkspacePath("notes/../secret"), false);
  assert.equal(isValidWorkspacePath("/notes/x.md"), false);
}

function testOverlays() {
  const d1 = getWorkspaceOverlay(1, 1);
  assert.ok(d1, "week 1 day 1 overlay");
  assert.ok(d1!.files.length >= 1);
  assert.ok(!d1!.playground);

  const d2 = getWorkspaceOverlay(1, 2);
  assert.ok(d2?.playground?.outputPath.includes("day-02"));

  const phase1Days = [1, 7, 8].flatMap((week) =>
    [1, 2, 3, 4, 5].map((day) => getWorkspaceOverlay(week, day)),
  );
  assert.equal(phase1Days.filter(Boolean).length, 15, "15 Phase 1 overlays");

  const day = loadDay(10, 1);
  assert.ok(day);
  const fallback = resolveWorkspaceDay(10, 1, {
    deliverable: day!.deliverable,
    rawMarkdown: day!.rawMarkdown,
    objective: day!.objective,
  });
  assert.ok(fallback.files.length >= 1);
  assert.ok(fallback.labSteps.length >= 2);
  assert.ok(fallback.deliverable);
}

testTracks();
testPaths();
testOverlays();
console.log("smoke-workspace: ok");
