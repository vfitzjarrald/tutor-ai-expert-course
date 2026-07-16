import { existsSync, readFileSync } from "fs";
import path from "path";

export type GateItem = {
  phase: number;
  week: number;
  key: string;
  label: string;
};

function gatesPath(repoRoot = process.cwd()) {
  return path.join(repoRoot, "checkpoints", "phase-gates.md");
}

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[`'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export function loadGateItems(repoRoot = process.cwd()): GateItem[] {
  const file = gatesPath(repoRoot);
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const items: GateItem[] = [];

  const headerRe = /^##\s+Phase\s+(\d+)\s+\(Week\s+(\d+)\)\s*$/gm;
  const headers = [...md.matchAll(headerRe)];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const phase = Number(header[1]);
    const week = Number(header[2]);
    const start = (header.index ?? 0) + header[0].length;
    const end = i + 1 < headers.length ? (headers[i + 1].index ?? md.length) : md.length;
    const body = md.slice(start, end);

    for (const line of body.split("\n")) {
      const m = line.match(/^-\s+\[[^\]]*\]\s+(.+)$/);
      if (!m) continue;
      const label = m[1].trim();
      items.push({
        phase,
        week,
        key: `${phase}-${slugify(label)}`,
        label,
      });
    }
  }

  return items;
}

export function gatesByPhase(repoRoot = process.cwd()) {
  const items = loadGateItems(repoRoot);
  const map = new Map<number, GateItem[]>();
  for (const item of items) {
    const list = map.get(item.phase) ?? [];
    list.push(item);
    map.set(item.phase, list);
  }
  return map;
}
