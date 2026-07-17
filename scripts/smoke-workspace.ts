import assert from "assert";
import { isValidWorkspacePath } from "../lib/workspace";
import { getWorkspaceOverlay, resolveWorkspaceDay } from "../lib/workspace-overlays";
import { isLearningTrack, trackLabel } from "../lib/learning-track";
import { loadDay } from "../lib/curriculum";
import { evaluateRequiredPath, type PathwayNodeState } from "../lib/pathway";
import { buildWorkspaceGuideFromStates, findGuideLesson } from "../lib/workspace-guide";

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

function testGuide() {
  const emptyProgress = new Map<string, { completed: boolean }>();
  const pathway = evaluateRequiredPath(emptyProgress, new Set());
  const guide = buildWorkspaceGuideFromStates(pathway.states, {
    todayId: pathway.today?.id ?? null,
    tomorrowId: pathway.tomorrow?.id ?? null,
    currentPhase: pathway.today?.phase ?? 1,
  });

  assert.ok(guide.lessons.length > 0, "guide has lessons");
  assert.equal(guide.lessons[0].week, 1);
  assert.equal(guide.lessons[0].day, 1);
  assert.equal(guide.lessons[0].status, "today");
  assert.ok(guide.upNext.length >= 1);
  assert.equal(guide.currentPhase, 1);
  assert.ok(guide.phaseLessons.every((lesson) => lesson.phase === 1));
  assert.ok(guide.defaultPath);
  assert.ok(guide.lessons[0].labSteps.length >= 1, "today lesson has lab steps");
  assert.ok(guide.lessons[0].deliverable.length > 0);

  const overlay = getWorkspaceOverlay(1, 2);
  assert.ok(overlay);
  const ref = guide.fileIndex[overlay!.files[0]];
  assert.ok(ref, "fileIndex maps overlay path");
  assert.equal(ref.week, 1);
  assert.equal(ref.day, 2);

  const lesson = findGuideLesson(guide, overlay!.files[0]);
  assert.ok(lesson);
  assert.equal(lesson!.day, 2);
  assert.ok(lesson!.labSteps.length >= 1);

  // Waive rag-foundations → today should jump into week 7
  const waived = evaluateRequiredPath(emptyProgress, new Set(["rag-foundations"]));
  const afterWaiver = buildWorkspaceGuideFromStates(waived.states as PathwayNodeState[], {
    todayId: waived.today?.id ?? null,
    tomorrowId: waived.tomorrow?.id ?? null,
    currentPhase: waived.today?.phase ?? 1,
  });
  assert.equal(afterWaiver.upNext[0]?.week, 7, "after waiver, up next is week 7");
  const waivedLesson = afterWaiver.lessons.find((entry) => entry.week === 1 && entry.day === 1);
  assert.equal(waivedLesson?.status, "waived");
}

testTracks();
testPaths();
testOverlays();
testGuide();
console.log("smoke-workspace: ok");
