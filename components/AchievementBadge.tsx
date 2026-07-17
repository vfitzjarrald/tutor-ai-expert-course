import type { AchievementDefinition, AchievementMotif } from "@/config/achievements";

const PHASE_COLORS: Record<number, string> = {
  1: "#2EA3F2",
  2: "#7C5CFF",
  3: "#22D3EE",
  4: "#3B82F6",
  5: "#8B5CF6",
  6: "#0EA5E9",
  7: "#D4A017",
};

function motifPath(motif: AchievementMotif) {
  switch (motif) {
    case "spark":
      return "M50 28v8M50 64v8M28 50h8M64 50h8M34 34l6 6M66 66l-6-6M34 66l6-6M66 34l-6 6M50 42a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z";
    case "pipeline":
      return "M28 50h16l8-12 8 24 8-12h16";
    case "gate":
      return "M30 70V38l20-10 20 10v32M42 70V52h16v18";
    case "map":
      return "M32 36h36v28H32zM40 44h8v8h-8zM52 52h8v8h-8zM40 36v36";
    case "graph":
      return "M34 66V40M50 66V30M66 66V48M30 70h40";
    case "student":
      return "M50 34a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM34 70c2-10 10-16 16-16s14 6 16 16";
    case "retrieval":
      return "M36 36h28v10H36zM36 52h18v10H36zM60 54l10 10";
    case "agent":
      return "M36 40h28v24H36zM44 48h4v4h-4zM52 48h4v4h-4zM46 58h8M50 28v8";
    case "product":
      return "M34 42h32v28H34zM42 34h16v8H42z";
    case "shield":
      return "M50 28l22 8v18c0 14-10 24-22 28-12-4-22-14-22-28V36l22-8Z";
    case "research":
      return "M42 34h16v10H42zM38 48h24v22H38zM46 56h8";
    case "oss":
      return "M40 40c0-6 4-10 10-10s10 4 10 10c0 8-10 10-10 18M50 72h0";
    case "teach":
      return "M30 42l20-10 20 10-20 10-20-10Zm0 0v16c8 6 32 6 40 0V42";
    case "portfolio":
      return "M34 40h32v28H34zM42 34h16v6H42zM42 50h16M42 58h10";
    case "expert":
      return "M50 28l5 12h13l-10 8 4 13-12-8-12 8 4-13-10-8h13z";
    case "multimodal":
      return "M34 38h14v14H34zM52 38h14v14H52zM34 56h32v10H34z";
    case "experiment":
      return "M42 30h16v10l8 28H34l8-28V30Zm0 38h16";
    case "writing":
      return "M36 32h28v36H36zM42 42h16M42 50h16M42 58h10";
    case "pearson":
      return "M38 34h24v10H38zM34 48h32v20H34zM42 56h16";
    default:
      return "M50 36a14 14 0 1 1 0 28 14 14 0 0 1 0-28Z";
  }
}

export function AchievementBadge({
  achievement,
  earned = false,
  size = 96,
  showTitle = false,
}: {
  achievement: AchievementDefinition;
  earned?: boolean;
  size?: number;
  showTitle?: boolean;
}) {
  const ring =
    achievement.category === "expert"
      ? "url(#expertGrad)"
      : achievement.category === "industry"
        ? "#7C5CFF"
        : PHASE_COLORS[achievement.phase ?? 1] ?? "#2EA3F2";
  const grayscale = earned ? undefined : { filter: "grayscale(1)", opacity: 0.45 };

  return (
    <div className="inline-flex flex-col items-center gap-2" style={grayscale}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={`${achievement.title}${earned ? " earned" : " locked"}`}
      >
        <defs>
          <linearGradient id="expertGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2EA3F2" />
            <stop offset="45%" stopColor="#7C5CFF" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>
          <radialGradient id="badgeGlow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E8F4FC" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#badgeGlow)" stroke={ring} strokeWidth="4" />
        <circle cx="50" cy="50" r="38" fill="#fff" stroke={ring} strokeWidth="2" opacity="0.95" />
        <path
          d={motifPath(achievement.motif)}
          fill="none"
          stroke={achievement.category === "expert" ? "#7C5CFF" : ring}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!earned ? (
          <g>
            <circle cx="72" cy="72" r="12" fill="#666" />
            <path d="M68 72v-3a4 4 0 0 1 8 0v3M66 72h12v8H66z" fill="#fff" />
          </g>
        ) : null}
        {achievement.category === "expert" ? (
          <path d="M50 12l3 7h8l-6 5 2 8-7-4-7 4 2-8-6-5h8z" fill="#D4A017" />
        ) : null}
      </svg>
      {showTitle ? (
        <p className={`text-center text-xs font-semibold ${earned ? "text-heading" : "text-text-muted"}`}>
          {achievement.title}
        </p>
      ) : null}
    </div>
  );
}
