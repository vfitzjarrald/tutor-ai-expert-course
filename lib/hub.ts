import { existsSync, readFileSync } from "fs";
import path from "path";
import { PHASES, type PhaseInfo } from "./schedule";

const LAB_README_BY_PHASE: Record<number, string> = {
  1: "labs/phase-01-rag/README.md",
};

export type CapstoneModule = {
  phase: number;
  module: string;
  status: string;
};

export function getPhaseInfo(id: number): PhaseInfo | undefined {
  return PHASES.find((p) => p.id === id);
}

export function loadLabReadme(phase: number, repoRoot = process.cwd()): string | null {
  const rel = LAB_README_BY_PHASE[phase];
  if (!rel) return null;
  const file = path.join(repoRoot, rel);
  if (!existsSync(file)) return null;
  return readFileSync(file, "utf8");
}

export function loadCapstoneModules(repoRoot = process.cwd()): CapstoneModule[] {
  const file = path.join(repoRoot, "capstone", "README.md");
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8");
  const modules: CapstoneModule[] = [];
  for (const line of md.split("\n")) {
    const m = line.match(/^\|\s*(\d+)\s*\|\s*`?([^`|]+)`?\s*\|\s*([^|]+)\|/);
    if (!m) continue;
    modules.push({
      phase: Number(m[1]),
      module: m[2].trim(),
      status: m[3].trim(),
    });
  }
  return modules;
}

export function capstoneForPhase(phase: number, repoRoot = process.cwd()) {
  return loadCapstoneModules(repoRoot).filter((m) => m.phase === phase);
}

export function extractDeliverablePaths(markdown: string): string[] {
  const matches = markdown.matchAll(/`((?:notes|capstone|labs|checkpoints)\/[^`\s]+)`/g);
  const set = new Set<string>();
  for (const m of matches) {
    let p = m[1].replace(/\/+$/, "");
    // Collapse accidental double slashes from lesson templates
    p = p.replace(/\/{2,}/g, "/");
    if (p.length > 3) set.add(p);
  }
  return [...set].sort();
}
