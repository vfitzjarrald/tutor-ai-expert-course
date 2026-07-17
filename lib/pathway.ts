import { existsSync, readFileSync } from "fs";
import path from "path";
import { getWeekTitle } from "./curriculum";

export type PathwayWeek = {
  id: string;
  week: number;
  phase: number;
  required: boolean;
  skippable: boolean;
  gate: boolean;
  tags: string[];
  prereqs: string[];
};

export type PathwayNode = {
  id: string;
  weekId: string;
  title: string;
  week: number;
  day: number;
  phase: number;
  required: boolean;
  skippable: boolean;
  gate: boolean;
  tags: string[];
  prereqs: string[];
};

export type FastTrackConfig = {
  id: string;
  name: string;
  targetWeeks: number;
  lessonMinutes: number;
  requiredWeekIds: string[];
  optionalWeekIds: string[];
  placementThreshold: number;
  expertThreshold: number;
};

type SkillFile = {
  version: number;
  description: string;
  weeks: PathwayWeek[];
};

function pathwayDir(repoRoot = process.cwd()) {
  return path.join(repoRoot, "curriculum", "pathways");
}

export function loadPathway(repoRoot = process.cwd()): {
  skills: SkillFile;
  config: FastTrackConfig;
} {
  const skillsFile = path.join(pathwayDir(repoRoot), "skills.json");
  const trackFile = path.join(pathwayDir(repoRoot), "fast-track.json");
  if (!existsSync(skillsFile) || !existsSync(trackFile)) {
    throw new Error("Fast Track pathway files are missing");
  }
  return {
    skills: JSON.parse(readFileSync(skillsFile, "utf8")) as SkillFile,
    config: JSON.parse(readFileSync(trackFile, "utf8")) as FastTrackConfig,
  };
}

function expandWeek(week: PathwayWeek, repoRoot = process.cwd()): PathwayNode[] {
  const nodes: PathwayNode[] = [];
  for (let day = 1; day <= 5; day++) {
    nodes.push({
      id: `${week.id}-d${day}`,
      weekId: week.id,
      title: getWeekTitle(week.week, repoRoot),
      week: week.week,
      day,
      phase: week.phase,
      required: week.required,
      skippable: week.skippable,
      gate: week.gate,
      tags: week.tags,
      prereqs:
        day === 1
          ? week.prereqs.map((id) => `${id}-d5`)
          : [`${week.id}-d${day - 1}`],
    });
  }
  return nodes;
}

export function getPathwayNodes(repoRoot = process.cwd()): {
  required: PathwayNode[];
  optional: PathwayNode[];
  all: PathwayNode[];
  config: FastTrackConfig;
} {
  const { skills, config } = loadPathway(repoRoot);
  const byId = new Map(skills.weeks.map((week) => [week.id, week]));

  const expandIds = (ids: string[]) =>
    ids.flatMap((id) => {
      const week = byId.get(id);
      if (!week) throw new Error(`Pathway references unknown week id: ${id}`);
      return expandWeek(week, repoRoot);
    });

  const required = expandIds(config.requiredWeekIds);
  const optional = expandIds(config.optionalWeekIds);
  return { required, optional, all: [...required, ...optional], config };
}

export function validatePathway(repoRoot = process.cwd()): string[] {
  const { skills, config } = loadPathway(repoRoot);
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const week of skills.weeks) {
    if (ids.has(week.id)) errors.push(`Duplicate week id: ${week.id}`);
    ids.add(week.id);
  }
  for (const week of skills.weeks) {
    for (const prereq of week.prereqs) {
      if (!ids.has(prereq)) errors.push(`${week.id} has unknown prerequisite ${prereq}`);
    }
  }
  for (const id of [...config.requiredWeekIds, ...config.optionalWeekIds]) {
    if (!ids.has(id)) errors.push(`Track references unknown week id: ${id}`);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const byId = new Map(skills.weeks.map((week) => [week.id, week]));
  function visit(id: string) {
    if (visiting.has(id)) {
      errors.push(`Cycle detected at ${id}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const prereq of byId.get(id)?.prereqs ?? []) visit(prereq);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of ids) visit(id);

  for (const gateWeek of [8, 16, 24, 32, 40, 52, 78]) {
    const gate = skills.weeks.find((week) => week.week === gateWeek);
    if (!gate?.required || !gate.gate || !config.requiredWeekIds.includes(gate.id)) {
      errors.push(`Gate week ${gateWeek} must be required and present in Fast Track`);
    }
  }

  return errors;
}

export type PathwayProgress = Map<string, { completed: boolean }>;

export type PathwayNodeState = {
  node: PathwayNode;
  completed: boolean;
  waivedByDiagnostic: boolean;
  locked: boolean;
};

export function evaluateRequiredPath(
  progress: PathwayProgress,
  waivedWeekIds: Set<string>,
  repoRoot = process.cwd(),
) {
  const { required, optional, config } = getPathwayNodes(repoRoot);
  const done = new Set<string>();
  const states: PathwayNodeState[] = [];

  for (const node of required) {
    const completed = Boolean(progress.get(`${node.week}-${node.day}`)?.completed);
    const waivedByDiagnostic =
      node.skippable && !node.gate && node.phase <= 6 && waivedWeekIds.has(node.weekId);
    const locked = !node.prereqs.every((id) => done.has(id));
    if (completed || waivedByDiagnostic) done.add(node.id);
    states.push({ node, completed, waivedByDiagnostic, locked });
  }

  const remaining = states.filter((state) => !state.completed && !state.waivedByDiagnostic);
  const actionable = remaining.filter((state) => !state.locked);
  const today = actionable[0]?.node ?? null;
  const todayIndex = today ? remaining.findIndex((state) => state.node.id === today.id) : -1;
  const completedLessons = states.filter((state) => state.completed).length;
  const waivedLessons = states.filter(
    (state) => state.waivedByDiagnostic && !state.completed,
  ).length;
  const completedRequired = completedLessons + waivedLessons;
  return {
    states,
    actionable,
    today,
    tomorrow: todayIndex >= 0 ? remaining[todayIndex + 1]?.node ?? null : null,
    completedRequired,
    completedLessons,
    waivedLessons,
    requiredTotal: required.length,
    remainingRequired: required.length - completedRequired,
    percent: Math.round((completedRequired / required.length) * 1000) / 10,
    courseComplete: completedRequired === required.length,
    optional,
    config,
  };
}

export function pathwayNodeForLesson(week: number, day: number, repoRoot = process.cwd()) {
  return getPathwayNodes(repoRoot).all.find((node) => node.week === week && node.day === day) ?? null;
}

export function nextRequiredPathwayNode(week: number, day: number, repoRoot = process.cwd()) {
  const required = getPathwayNodes(repoRoot).required;
  const index = required.findIndex((node) => node.week === week && node.day === day);
  return index >= 0 ? required[index + 1] ?? null : null;
}
