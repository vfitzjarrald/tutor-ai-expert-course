import { loadQuizQuestions } from "../lib/checks";
import { loadGateItems } from "../lib/gates";
import { loadResources } from "../lib/resources";
import { extractDeliverablePaths } from "../lib/hub";
import { readFileSync } from "fs";

const qs = loadQuizQuestions();
console.log(
  "questions",
  qs.length,
  qs.slice(0, 2).map((q) => ({
    n: q.number,
    phase: q.phase,
    choices: q.choices.length,
    correct: q.choices.find((c) => c.correct)?.letter,
  })),
);
console.log("gates", loadGateItems().length);
console.log("resources", loadResources().length);
console.log("paths", extractDeliverablePaths(readFileSync("curriculum/weeks/week-01.md", "utf8")));
