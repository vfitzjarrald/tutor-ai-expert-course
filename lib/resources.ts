import { existsSync, readFileSync } from "fs";
import path from "path";

export type ResourceItem = {
  phase: number;
  title: string;
  type: string;
  url: string;
  note: string;
};

function resourcesPath(repoRoot = process.cwd()) {
  return path.join(repoRoot, "curriculum", "RESOURCES.md");
}

export function loadResources(repoRoot = process.cwd()): ResourceItem[] {
  const file = resourcesPath(repoRoot);
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8");
  const items: ResourceItem[] = [];

  const sections = [
    ...md.matchAll(/##\s+Phase\s+(\d+)\s+[—–-]\s+([^\n]+)\n([\s\S]*?)(?=\n##\s+Phase|\n##\s+See|\s*$)/g),
  ];

  for (const sec of sections) {
    const phase = Number(sec[1]);
    const body = sec[3];
    for (const line of body.split("\n")) {
      if (!line.startsWith("|") || line.includes("Resource |") || line.includes("|---")) continue;
      const cells = line
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cells.length < 3) continue;
      const [title, type, linkCell, note = ""] = cells;
      const urlMatch = linkCell.match(/\((https?:\/\/[^)]+)\)/) || linkCell.match(/^(https?:\/\/\S+)/);
      const url = urlMatch?.[1] ?? linkCell;
      if (!title || title === "Resource") continue;
      items.push({ phase, title, type, url, note });
    }
  }

  return items;
}

export function resourcesForPhase(phase: number, repoRoot = process.cwd()) {
  return loadResources(repoRoot).filter((r) => r.phase === phase);
}
