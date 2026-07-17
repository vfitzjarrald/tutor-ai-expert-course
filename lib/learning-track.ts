export type LearningTrack = "dev" | "workspace";

export function isLearningTrack(value: unknown): value is LearningTrack {
  return value === "dev" || value === "workspace";
}

export function trackLabel(track: LearningTrack | null | undefined): string {
  if (track === "workspace") return "Workspace Path";
  if (track === "dev") return "Dev Path";
  return "Choose a path";
}

export function trackShortLabel(track: LearningTrack): string {
  return track === "workspace" ? "Build in app workspace" : "Build in my own systems";
}
