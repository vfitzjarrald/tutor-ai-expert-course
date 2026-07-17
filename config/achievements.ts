export type AchievementCategory = "skill" | "gate" | "expert" | "bonus" | "industry";
export type AchievementMotif =
  | "spark"
  | "pipeline"
  | "gate"
  | "map"
  | "graph"
  | "student"
  | "retrieval"
  | "agent"
  | "product"
  | "shield"
  | "research"
  | "oss"
  | "teach"
  | "portfolio"
  | "expert"
  | "multimodal"
  | "experiment"
  | "writing"
  | "pearson";

export type AchievementDefinition = {
  id: string;
  title: string;
  description: string;
  phase: number | null;
  category: AchievementCategory;
  motif: AchievementMotif;
  pathwayWeekId?: string;
  week?: number;
  requiredForExpert: boolean;
  howToEarn: string;
};

export const PEARSON_ACHIEVEMENT_ID = "pearson-genai-foundations";
export const AI_EXPERT_ACHIEVEMENT_ID = "expert-gate";
export const EXPERT_PD_HOURS = 135;
export const PEARSON_CERT_URL =
  "https://certiport.pearsonvue.com/Certifications/CCS/Certification/Certify/Generative-AI-Foundations";

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: "rag-foundations",
    title: "LLM Tutor Foundations",
    description: "Temperature, policy, and tutor failure modes for reliable pedagogical assistants.",
    phase: 1,
    category: "skill",
    motif: "spark",
    pathwayWeekId: "rag-foundations",
    week: 1,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 1 diagnostic, or complete Week 1.",
  },
  {
    id: "rag-pipeline",
    title: "RAG Tutor Pipeline",
    description: "Retrieve, augment, generate, and validate citations for grounded tutoring.",
    phase: 1,
    category: "skill",
    motif: "pipeline",
    pathwayWeekId: "rag-pipeline",
    week: 7,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 1 diagnostic, or complete Week 7.",
  },
  {
    id: "rag-gate",
    title: "RAG Evaluation Gate",
    description: "Ship a cited RAG tutor with evaluation evidence and faithfulness checks.",
    phase: 1,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "rag-gate",
    week: 8,
    requiredForExpert: true,
    howToEarn: "Complete Week 8, pass the Phase 1 quiz (≥80%), and finish the Phase 1 gate checklist.",
  },
  {
    id: "its-foundations",
    title: "Intelligent Tutoring Systems",
    description: "Sense–decide–act–assess loops and mastery-learning design.",
    phase: 2,
    category: "skill",
    motif: "teach",
    pathwayWeekId: "its-foundations",
    week: 9,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 2 diagnostic, or complete Week 9.",
  },
  {
    id: "knowledge-maps",
    title: "Knowledge Maps",
    description: "Atomic skills, prerequisite DAGs, misconceptions, and schema validation.",
    phase: 2,
    category: "skill",
    motif: "map",
    pathwayWeekId: "knowledge-maps",
    week: 10,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 2 diagnostic, or complete Week 10.",
  },
  {
    id: "knowledge-map-gate",
    title: "Knowledge Map Gate",
    description: "Validated skill graph and sequencer that returns the next ready skill.",
    phase: 2,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "knowledge-map-gate",
    week: 16,
    requiredForExpert: true,
    howToEarn: "Complete Week 16, pass the Phase 2 quiz (≥80%), and finish the Phase 2 gate checklist.",
  },
  {
    id: "graph-foundations",
    title: "Neo4j & Cypher Foundations",
    description: "Model curriculum and learner state as traversable graph relationships.",
    phase: 3,
    category: "skill",
    motif: "graph",
    pathwayWeekId: "graph-foundations",
    week: 17,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 3 diagnostic, or complete Week 17.",
  },
  {
    id: "student-modeling",
    title: "Bayesian Student Modeling",
    description: "Estimate mastery and route remediation with knowledge tracing.",
    phase: 3,
    category: "skill",
    motif: "student",
    pathwayWeekId: "student-modeling",
    week: 21,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 3 diagnostic, or complete Week 21.",
  },
  {
    id: "student-model-gate",
    title: "Graph & KT Gate",
    description: "Loaded curriculum graph plus mastery estimates ready for tutoring decisions.",
    phase: 3,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "student-model-gate",
    week: 24,
    requiredForExpert: true,
    howToEarn: "Complete Week 24, pass the Phase 3 quiz (≥80%), and finish the Phase 3 gate checklist.",
  },
  {
    id: "graphrag-foundations",
    title: "Hybrid Retrieval Foundations",
    description: "Combine graph structure with retrieval for multi-hop explanations.",
    phase: 4,
    category: "skill",
    motif: "retrieval",
    pathwayWeekId: "graphrag-foundations",
    week: 25,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 4 diagnostic, or complete Week 25.",
  },
  {
    id: "graphrag-evaluation",
    title: "GraphRAG Evaluation",
    description: "Benchmark GraphRAG against vanilla RAG with labeled faithfulness evidence.",
    phase: 4,
    category: "skill",
    motif: "research",
    pathwayWeekId: "graphrag-evaluation",
    week: 29,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 4 diagnostic, or complete Week 29.",
  },
  {
    id: "graphrag-gate",
    title: "GraphRAG Gate",
    description: "Prove GraphRAG beats the baseline on your labeled evaluation set.",
    phase: 4,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "graphrag-gate",
    week: 32,
    requiredForExpert: true,
    howToEarn: "Complete Week 32, pass the Phase 4 quiz (≥80%), and finish the Phase 4 gate checklist.",
  },
  {
    id: "agent-foundations",
    title: "Agent Foundations",
    description: "Tool-using agent loops for tutoring actions beyond plain chat.",
    phase: 5,
    category: "skill",
    motif: "agent",
    pathwayWeekId: "agent-foundations",
    week: 33,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 5 diagnostic, or complete Week 33.",
  },
  {
    id: "mcp-integration",
    title: "MCP Agent Integration",
    description: "Connect the tutor to external tools and data through MCP.",
    phase: 5,
    category: "skill",
    motif: "agent",
    pathwayWeekId: "mcp-integration",
    week: 37,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 5 diagnostic, or complete Week 37.",
  },
  {
    id: "agent-gate",
    title: "Agent Security Gate",
    description: "Ship a secure tutor agent with two or more MCP tools.",
    phase: 5,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "agent-gate",
    week: 40,
    requiredForExpert: true,
    howToEarn: "Complete Week 40, pass the Phase 5 quiz (≥80%), and finish the Phase 5 gate checklist.",
  },
  {
    id: "product-integration",
    title: "Product Integration",
    description: "Embed tutoring intelligence into a coherent product experience.",
    phase: 6,
    category: "skill",
    motif: "product",
    pathwayWeekId: "product-integration",
    week: 41,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 6 diagnostic, or complete Week 41.",
  },
  {
    id: "observability",
    title: "AI Observability",
    description: "Trace, evaluate, and monitor tutor quality in production conditions.",
    phase: 6,
    category: "skill",
    motif: "research",
    pathwayWeekId: "observability",
    week: 45,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 6 diagnostic, or complete Week 45.",
  },
  {
    id: "production-hardening",
    title: "Production Hardening",
    description: "Safety, reliability, and deployment readiness for learner-facing systems.",
    phase: 6,
    category: "skill",
    motif: "shield",
    pathwayWeekId: "production-hardening",
    week: 49,
    requiredForExpert: true,
    howToEarn: "Score ≥80% on this skill in a Phase 6 diagnostic, or complete Week 49.",
  },
  {
    id: "production-gate",
    title: "Production Capstone Gate",
    description: "Production tutor with observability and a completed safety review.",
    phase: 6,
    category: "gate",
    motif: "gate",
    pathwayWeekId: "production-gate",
    week: 52,
    requiredForExpert: true,
    howToEarn: "Complete Week 52, pass the Phase 6 quiz (≥80%), and finish the Phase 6 gate checklist.",
  },
  {
    id: "paper-reproduction-kt",
    title: "KT Research Reproduction",
    description: "Study and plan a knowledge-tracing paper reproduction.",
    phase: 7,
    category: "skill",
    motif: "research",
    pathwayWeekId: "paper-reproduction-kt",
    week: 53,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 53.",
  },
  {
    id: "paper-reproduction-kt-build",
    title: "KT Reproduction Build",
    description: "Implement and document the knowledge-tracing reproduction.",
    phase: 7,
    category: "skill",
    motif: "research",
    pathwayWeekId: "paper-reproduction-kt-build",
    week: 54,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 54.",
  },
  {
    id: "paper-reproduction-graphrag",
    title: "GraphRAG Research Reproduction",
    description: "Reproduce GraphRAG research with evidence and reflection.",
    phase: 7,
    category: "skill",
    motif: "research",
    pathwayWeekId: "paper-reproduction-graphrag",
    week: 55,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 55.",
  },
  {
    id: "oss-contribution",
    title: "Open Source Contributor",
    description: "Contribute meaningful work to an open-source AI or tutoring project.",
    phase: 7,
    category: "skill",
    motif: "oss",
    pathwayWeekId: "oss-contribution",
    week: 58,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 58.",
  },
  {
    id: "teaching-design",
    title: "AI Teaching Designer",
    description: "Design public teaching materials that communicate AI concepts clearly.",
    phase: 7,
    category: "skill",
    motif: "teach",
    pathwayWeekId: "teaching-design",
    week: 71,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 71.",
  },
  {
    id: "teaching-delivery",
    title: "AI Teaching Practitioner",
    description: "Deliver a public teaching artifact that others can learn from.",
    phase: 7,
    category: "skill",
    motif: "teach",
    pathwayWeekId: "teaching-delivery",
    week: 72,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 72.",
  },
  {
    id: "portfolio",
    title: "Expert Portfolio",
    description: "Assemble phase-gate evidence into a coherent expert portfolio.",
    phase: 7,
    category: "skill",
    motif: "portfolio",
    pathwayWeekId: "portfolio",
    week: 76,
    requiredForExpert: true,
    howToEarn: "Complete all five lessons in Week 76.",
  },
  {
    id: AI_EXPERT_ACHIEVEMENT_ID,
    title: "AI Expert",
    description: "Recognized Expert Fast Track complete: evidence, teaching, and production mastery.",
    phase: 7,
    category: "expert",
    motif: "expert",
    pathwayWeekId: "expert-gate",
    week: 78,
    requiredForExpert: true,
    howToEarn:
      "Earn every required badge, complete Week 78, finish the Phase 7 gate checklist, and score ≥85% on the expert quiz.",
  },
  {
    id: "multimodal-depth",
    title: "Multimodal AI",
    description: "Optional depth in multimodal tutoring and media-aware AI workflows.",
    phase: 4,
    category: "bonus",
    motif: "multimodal",
    pathwayWeekId: "multimodal-depth",
    week: 31,
    requiredForExpert: false,
    howToEarn: "Complete all five lessons in optional Week 31.",
  },
  {
    id: "experiment-depth",
    title: "AI Experimentation",
    description: "Optional depth in rigorous AI experimentation and analysis.",
    phase: 7,
    category: "bonus",
    motif: "experiment",
    pathwayWeekId: "experiment-depth",
    week: 60,
    requiredForExpert: false,
    howToEarn: "Complete all five lessons in optional Week 60.",
  },
  {
    id: "public-writing-depth",
    title: "Public AI Writing",
    description: "Optional depth in public technical writing about AI systems.",
    phase: 7,
    category: "bonus",
    motif: "writing",
    pathwayWeekId: "public-writing-depth",
    week: 64,
    requiredForExpert: false,
    howToEarn: "Complete all five lessons in optional Week 64.",
  },
  {
    id: PEARSON_ACHIEVEMENT_ID,
    title: "Pearson Generative AI Foundations",
    description:
      "Industry credential for generative AI literacy, prompting, and responsible use. Does not waive Fast Track skills or gates.",
    phase: null,
    category: "industry",
    motif: "pearson",
    requiredForExpert: false,
    howToEarn: "Submit your Pearson Generative AI Foundations credential ID and issue date.",
  },
];

export function getAchievement(id: string) {
  return ACHIEVEMENTS.find((item) => item.id === id) ?? null;
}

export function requiredAchievements() {
  return ACHIEVEMENTS.filter((item) => item.requiredForExpert);
}

export function bonusAchievements() {
  return ACHIEVEMENTS.filter((item) => !item.requiredForExpert);
}

export function achievementsByPhase(phase: number) {
  return ACHIEVEMENTS.filter((item) => item.phase === phase && item.requiredForExpert);
}
