import {
  BarChart,
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CollapsibleSection,
  computeDAGLayout,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Spacer,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  UsageBar,
  useCanvasAction,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type TabId =
  | "overview"
  | "knowledge-map"
  | "curriculum"
  | "resources"
  | "lessons"
  | "checks"
  | "stay-expert";

type Phase = {
  id: string;
  name: string;
  weeks: string;
  hours: number;
  outcome: string;
    color: "blue" | "green" | "purple" | "orange" | "pink";
};

type Resource = {
  title: string;
  type: "book" | "course" | "paper" | "docs" | "repo" | "video" | "tool";
  url: string;
  phase: string;
  note: string;
};

type LessonDay = {
  day: number;
  title: string;
  minutes: number;
  objective: string;
  activities: string[];
  resources: string[];
};

type LessonWeek = {
  week: number;
  phase: string;
  theme: string;
  days: LessonDay[];
};

type QuizQuestion = {
  id: string;
  phase: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

type ExpertFeed = {
  name: string;
  type: string;
  url: string;
  cadence: string;
  why: string;
};

const WEEK_INDEX = [
  { week: 1, theme: "How LLMs work & tutor use cases" },
  { week: 2, theme: "Prompting patterns for tutors" },
  { week: 3, theme: "Evaluation design for tutors" },
  { week: 4, theme: "Safety & academic integrity" },
  { week: 5, theme: "Embeddings & semantic search" },
  { week: 6, theme: "Chunking & metadata" },
  { week: 7, theme: "RAG tutor pipeline" },
  { week: 8, theme: "RAGAS & Phase 1 gate" },
  { week: 9, theme: "Intelligent Tutoring Systems foundations" },
  { week: 10, theme: "Knowledge maps & prerequisite graphs" },
  { week: 11, theme: "Misconception-driven hint selection" },
  { week: 12, theme: "Adaptive hint level policies" },
  { week: 13, theme: "Worked examples vs Socratic modes" },
  { week: 14, theme: "Curriculum authoring workflow" },
  { week: 15, theme: "Knowledge map QA & educator review" },
  { week: 16, theme: "Phase 2 gate — map + sequencer demo" },
  { week: 17, theme: "Neo4j setup & Cypher basics" },
  { week: 18, theme: "Learning graph data model" },
  { week: 19, theme: "Prerequisite path queries" },
  { week: 20, theme: "Student mastery in graph" },
  { week: 21, theme: "Bayesian Knowledge Tracing theory" },
  { week: 22, theme: "pyBKT implementation" },
  { week: 23, theme: "Knowledge tracing survey methods" },
  { week: 24, theme: "Phase 3 gate — graph + KT demo" },
  { week: 25, theme: "Hybrid BM25 + vector search" },
  { week: 26, theme: "Reranking with cross-encoders" },
  { week: 27, theme: "Context ordering (Lost in the Middle)" },
  { week: 28, theme: "GraphRAG indexing pipeline" },
  { week: 29, theme: "Community summaries for curriculum" },
  { week: 30, theme: "GraphRAG query modes" },
  { week: 31, theme: "Multimodal content retrieval (optional)" },
  { week: 32, theme: "Phase 4 gate — GraphRAG beats baseline" },
  { week: 33, theme: "MCP architecture deep dive" },
  { week: 34, theme: "Build first MCP server" },
  { week: 35, theme: "Cursor MCP integration" },
  { week: 36, theme: "Copilot Studio agent patterns" },
  { week: 37, theme: "ReAct tutor agent loop" },
  { week: 38, theme: "Tool permission matrix" },
  { week: 39, theme: "Guardrails for tool use" },
  { week: 40, theme: "Phase 5 gate — 2 MCP tools live" },
  { week: 41, theme: "Capstone sprint 1 — integration" },
  { week: 42, theme: "Capstone sprint 2 — UX" },
  { week: 43, theme: "Capstone sprint 3 — adaptivity" },
  { week: 44, theme: "Capstone sprint 4 — polish" },
  { week: 45, theme: "Observability with Langfuse" },
  { week: 46, theme: "Human eval loop" },
  { week: 47, theme: "A/B test hint strategies" },
  { week: 48, theme: "Safety red team round 2" },
  { week: 49, theme: "Performance & cost optimization" },
  { week: 50, theme: "Documentation & runbook" },
  { week: 51, theme: "Stakeholder demo prep" },
  { week: 52, theme: "Phase 6 gate — production capstone" },
  { week: 53, theme: "Paper reproduction 1 — KT" },
  { week: 54, theme: "Paper reproduction 1 — implementation" },
  { week: 55, theme: "Paper reproduction 2 — GraphRAG" },
  { week: 56, theme: "Paper reproduction 2 — writeup" },
  { week: 57, theme: "OSS contribution scouting" },
  { week: 58, theme: "OSS PR submission" },
  { week: 59, theme: "OSS PR iteration" },
  { week: 60, theme: "Novel experiment design" },
  { week: 61, theme: "Novel experiment run" },
  { week: 62, theme: "Novel experiment analysis" },
  { week: 63, theme: "Blog post draft — tutor architecture" },
  { week: 64, theme: "Blog post publish" },
  { week: 65, theme: "Internal tech talk" },
  { week: 66, theme: "Conference abstract draft" },
  { week: 67, theme: "Peer review practice" },
  { week: 68, theme: "Open curriculum graph release" },
  { week: 69, theme: "MCP server open-source" },
  { week: 70, theme: "Expert eval golden set v2" },
  { week: 71, theme: "Teaching workshop design" },
  { week: 72, theme: "Teaching workshop delivery" },
  { week: 73, theme: "Mentor office hours" },
  { week: 74, theme: "Research reading group lead" },
  { week: 75, theme: "Industry case study writeup" },
  { week: 76, theme: "Portfolio site update" },
  { week: 77, theme: "Expert retrospective" },
  { week: 78, theme: "Recognized expert checkpoint" },
];

function weekLessonPath(week: number): string {
  return `curriculum/weeks/week-${String(week).padStart(2, "0")}.md`;
}

function phaseForWeek(week: number): string {
  if (week <= 8) return "p1";
  if (week <= 16) return "p2";
  if (week <= 24) return "p3";
  if (week <= 32) return "p4";
  if (week <= 40) return "p5";
  if (week <= 52) return "p6";
  return "p7";
}

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "knowledge-map", label: "Knowledge Map" },
  { id: "curriculum", label: "Curriculum" },
  { id: "resources", label: "Resource Library" },
  { id: "lessons", label: "Lessons" },
  { id: "checks", label: "Knowledge Checks" },
  { id: "stay-expert", label: "Stay an Expert" },
];

const PHASES: Phase[] = [
  {
    id: "p1",
    name: "Phase 1 — AI & RAG Foundations",
    weeks: "Weeks 1–8",
    hours: 40,
    outcome: "Build a grounded Q&A tutor with eval harness",
    color: "blue",
  },
  {
    id: "p2",
    name: "Phase 2 — Tutor Architecture & Knowledge Maps",
    weeks: "Weeks 9–16",
    hours: 40,
    outcome: "Model curriculum as a prerequisite graph with adaptive paths",
    color: "green",
  },
  {
    id: "p3",
    name: "Phase 3 — Graph Databases & Student Modeling",
    weeks: "Weeks 17–24",
    hours: 40,
    outcome: "Query learning graphs and estimate mastery state",
    color: "purple",
  },
  {
    id: "p4",
    name: "Phase 4 — Advanced RAG & GraphRAG",
    weeks: "Weeks 25–32",
    hours: 40,
    outcome: "Hybrid retrieval over docs + concept graph",
    color: "orange",
  },
  {
    id: "p5",
    name: "Phase 5 — MCP & Agentic Tutors",
    weeks: "Weeks 33–40",
    hours: 40,
    outcome: "Ship an MCP-connected tutor with tools and guardrails",
    color: "pink",
  },
  {
    id: "p6",
    name: "Phase 6 — Capstone & Production",
    weeks: "Weeks 41–52",
    hours: 60,
    outcome: "End-to-end tutor product with metrics and safety review",
    color: "blue",
  },
  {
    id: "p7",
    name: "Phase 7 — Expert Mastery Track",
    weeks: "Weeks 53–78",
    hours: 130,
    outcome: "Research fluency, open-source contributions, conference-level depth",
    color: "green",
  },
];

const TOTAL_WEEKS = 78;
const MINUTES_PER_DAY = 60;
const DAYS_PER_WEEK = 5;
const TOTAL_HOURS = Math.round((TOTAL_WEEKS * DAYS_PER_WEEK * MINUTES_PER_DAY) / 60);

const MILESTONES = [
  { week: 8, label: "Competent", desc: "Working RAG tutor + basic eval" },
  { week: 24, label: "Proficient", desc: "Knowledge map + graph DB + student model" },
  { week: 40, label: "Advanced", desc: "GraphRAG + MCP agent tutor" },
  { week: 52, label: "Expert-ready", desc: "Production capstone shipped" },
  { week: 78, label: "Recognized expert", desc: "Research + OSS + teaching others" },
];

const DAG_NODES = [
  { id: "llm", label: "LLM Foundations" },
  { id: "prompt", label: "Prompting & Eval" },
  { id: "embed", label: "Embeddings" },
  { id: "rag", label: "RAG Pipeline" },
  { id: "chunk", label: "Chunking Strategy" },
  { id: "its", label: "ITS Pedagogy" },
  { id: "kmap", label: "Knowledge Maps" },
  { id: "graphdb", label: "Graph Databases" },
  { id: "student", label: "Student Modeling" },
  { id: "graphrag", label: "GraphRAG" },
  { id: "mcp", label: "MCP Protocol" },
  { id: "agents", label: "Agentic Tutors" },
  { id: "prod", label: "Production & Safety" },
  { id: "capstone", label: "Capstone System" },
];

const DAG_EDGES = [
  { from: "llm", to: "prompt" },
  { from: "prompt", to: "embed" },
  { from: "embed", to: "chunk" },
  { from: "chunk", to: "rag" },
  { from: "rag", to: "its" },
  { from: "its", to: "kmap" },
  { id: "kmap-graph", from: "kmap", to: "graphdb" },
  { from: "graphdb", to: "student" },
  { from: "rag", to: "graphrag" },
  { from: "graphdb", to: "graphrag" },
  { from: "graphrag", to: "mcp" },
  { from: "student", to: "agents" },
  { from: "mcp", to: "agents" },
  { from: "agents", to: "prod" },
  { from: "prod", to: "capstone" },
];

const RESOURCES: Resource[] = [
  { title: "Deep Learning — Goodfellow, Bengio, Courville", type: "book", url: "https://www.deeplearningbook.org/", phase: "p1", note: "Ch. 6–8 for representation learning context" },
  { title: "Prompt Engineering Guide (DAIR.AI)", type: "docs", url: "https://www.promptingguide.ai/", phase: "p1", note: "Systematic prompting patterns" },
  { title: "OpenAI Evals", type: "repo", url: "https://github.com/openai/evals", phase: "p1", note: "Reference eval framework patterns" },
  { title: "Anthropic Prompt Engineering", type: "docs", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", phase: "p1", note: "Production-grade prompt design" },
  { title: "Lilian Weng — LLM Powered Autonomous Agents", type: "paper", url: "https://lilianweng.github.io/posts/2023-06-23-agent/", phase: "p1", note: "Agent mental model early" },
  { title: "LangChain RAG Tutorial", type: "docs", url: "https://python.langchain.com/docs/tutorials/rag/", phase: "p1", note: "Hands-on RAG baseline" },
  { title: "LlamaIndex RAG Guide", type: "docs", url: "https://docs.llamaindex.ai/en/stable/optimizing/production_rag/", phase: "p1", note: "Production RAG patterns" },
  { title: "Pinecone Learning Center — Chunking", type: "docs", url: "https://www.pinecone.io/learn/chunking-strategies/", phase: "p1", note: "Chunk size tradeoffs" },
  { title: "MTEB Leaderboard", type: "tool", url: "https://huggingface.co/spaces/mteb/leaderboard", phase: "p1", note: "Pick embedding models empirically" },
  { title: "RAGAS Documentation", type: "docs", url: "https://docs.ragas.io/", phase: "p1", note: "RAG-specific metrics" },
  { title: "Intelligent Tutoring Systems — VanLehn", type: "paper", url: "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", phase: "p2", note: "Canonical ITS survey" },
  { title: "Knowledge Space Theory — Doignon & Falmagne", type: "book", url: "https://link.springer.com/book/10.1007/978-1-4612-5082-8", phase: "p2", note: "Formal prerequisite structures" },
  { title: "CMU Open Learning Initiative", type: "course", url: "https://oli.cmu.edu/", phase: "p2", note: "Real adaptive courseware examples" },
  { title: "Bloom's 2 Sigma Problem", type: "paper", url: "https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf", phase: "p2", note: "Why tutoring beats classroom" },
  { title: "Neo4j GraphAcademy — Fundamentals", type: "course", url: "https://graphacademy.neo4j.com/categories/fundamentals/", phase: "p3", note: "Free Cypher + modeling" },
  { title: "Graph Data Modeling (Neo4j)", type: "docs", url: "https://neo4j.com/developer/data-modeling/", phase: "p3", note: "Concept–prerequisite–resource schema" },
  { title: "Bayesian Knowledge Tracing — Corbett & Anderson", type: "paper", url: "https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf", phase: "p3", note: "Classic mastery estimation" },
  { title: "pyBKT Library", type: "repo", url: "https://github.com/CAHLR/pyBKT", phase: "p3", note: "Implement BKT in Python" },
  { title: "Knowledge Tracing: A Survey", type: "paper", url: "https://arxiv.org/abs/2201.08434", phase: "p3", note: "Modern KT methods (DKT, SAKT)" },
  { title: "Microsoft GraphRAG", type: "repo", url: "https://github.com/microsoft/graphrag", phase: "p4", note: "Community summaries over graphs" },
  { title: "Hybrid Search — Weaviate", type: "docs", url: "https://weaviate.io/developers/weaviate/concepts/search/hybrid-search", phase: "p4", note: "BM25 + vector fusion" },
  { title: "Cohere Rerank Docs", type: "docs", url: "https://docs.cohere.com/docs/rerank", phase: "p4", note: "Cross-encoder reranking" },
  { title: "ColBERT — Late Interaction", type: "paper", url: "https://arxiv.org/abs/2004.12832", phase: "p4", note: "Efficient retrieval architecture" },
  { title: "Lost in the Middle", type: "paper", url: "https://arxiv.org/abs/2307.03172", phase: "p4", note: "Context ordering for tutors" },
  { title: "Model Context Protocol Spec", type: "docs", url: "https://modelcontextprotocol.io/specification/2025-03-26", phase: "p5", note: "Official MCP specification" },
  { title: "MCP TypeScript SDK", type: "repo", url: "https://github.com/modelcontextprotocol/typescript-sdk", phase: "p5", note: "Build MCP servers" },
  { title: "Cursor MCP Docs", type: "docs", url: "https://docs.cursor.com/context/model-context-protocol", phase: "p5", note: "Integrate tools in Cursor" },
  { title: "Microsoft Copilot Studio + MCP", type: "docs", url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/", phase: "p5", note: "Enterprise agent patterns" },
  { title: "ReAct Paper", type: "paper", url: "https://arxiv.org/abs/2210.03629", phase: "p5", note: "Reasoning + acting loop" },
  { title: "Guardrails AI", type: "tool", url: "https://www.guardrailsai.com/docs", phase: "p5", note: "Output validation for tutors" },
  { title: "OWASP LLM Top 10", type: "docs", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", phase: "p6", note: "Security checklist" },
  { title: "Helicone / Langfuse", type: "tool", url: "https://langfuse.com/docs", phase: "p6", note: "LLM observability" },
  { title: "A/B Testing for ML — Google", type: "docs", url: "https://developers.google.com/machine-learning/testing-debugging", phase: "p6", note: "Experiment design" },
  { title: "EdNet Dataset", type: "repo", url: "https://github.com/riiid/ednet", phase: "p6", note: "Large-scale tutoring interaction data" },
  { title: "ASSISTments Data", type: "tool", url: "https://www.assistments.org/", phase: "p6", note: "KT benchmark datasets" },
  { title: "NeurIPS / ACL Education NLP", type: "paper", url: "https://educationaldatamining.org/", phase: "p7", note: "Track EDM conference proceedings" },
  { title: "LearnSphere", type: "tool", url: "https://learnsphere.org/", phase: "p7", note: "Educational data analysis platform" },
  { title: "Open edX Tutor Architecture", type: "repo", url: "https://github.com/openedx/edx-platform", phase: "p7", note: "Production LMS patterns" },
];

const LESSON_WEEKS: LessonWeek[] = [
  {
    week: 1,
    phase: "p1",
    theme: "How LLMs work & tutor use cases",
    days: [
      { day: 1, title: "Transformer intuition", minutes: 30, objective: "Explain tokens, context window, and completion vs chat", activities: ["Watch 3Blue1Brown attention video (15m)", "Sketch input→output for a hint-generation task", "Write 3 tutor scenarios LLMs can/cannot do today"], resources: ["3Blue1Brown Attention", "Anthropic — What is an LLM?"] },
      { day: 2, title: "Chat API anatomy", minutes: 30, objective: "Call an LLM with system/user/assistant roles", activities: ["Set up API key in a sandbox", "Send a Socratic tutor system prompt", "Log token usage"], resources: ["OpenAI Chat Completions", "Anthropic Messages API"] },
      { day: 3, title: "Temperature & sampling", minutes: 30, objective: "Tune creativity vs consistency for tutoring", activities: ["Same question at temp 0, 0.7, 1.0", "Compare hint quality", "Document when to use low temp"], resources: ["Prompt Engineering Guide — LLM Settings"] },
      { day: 4, title: "Failure modes", minutes: 30, objective: "List hallucination, sycophancy, over-helping", activities: ["Prompt tutor to give answer vs guide", "Record 5 failure transcripts", "Draft mitigation rules"], resources: ["OpenAI Safety Best Practices"] },
      { day: 5, title: "Week 1 mini-project", minutes: 30, objective: "CLI tutor that refuses to give final answers", activities: ["Implement guardrailed tutor prompt", "Test on 10 sample problems", "Peer-review rubric: helpful vs cheating"], resources: ["Your Week 1 notes"] },
    ],
  },
  {
    week: 2,
    phase: "p1",
    theme: "Prompting patterns for tutors",
    days: [
      { day: 1, title: "System prompt design", minutes: 30, objective: "Structure role, constraints, tone, escalation", activities: ["Template: persona + pedagogy + boundaries", "A/B two system prompts", "Score with binary rubric"], resources: ["Anthropic Prompt Engineering"] },
      { day: 2, title: "Few-shot exemplars", minutes: 30, objective: "Show ideal hint sequences in-context", activities: ["Write 3 gold hint chains", "Measure consistency across 5 items", "Trim shots to fit context"], resources: ["Prompt Engineering Guide — Few-shot"] },
      { day: 3, title: "Chain-of-thought for tutors", minutes: 30, objective: "Separate hidden reasoning from student-visible hints", activities: ["Use XML tags for private scratchpad", "Verify student never sees full solution", "Log reasoning leaks"], resources: ["OpenAI CoT Cookbook"] },
      { day: 4, title: "Structured outputs", minutes: 30, objective: "JSON schema for hint level, misconception tag", activities: ["Define schema: hint_level, concept_id, next_question", "Validate with parser", "Handle malformed JSON"], resources: ["OpenAI Structured Outputs"] },
      { day: 5, title: "Eval harness v0", minutes: 30, objective: "10 golden conversations with pass/fail", activities: ["Build YAML test cases", "Script automated checks", "Track pass rate baseline"], resources: ["OpenAI Evals patterns"] },
    ],
  },
  {
    week: 5,
    phase: "p1",
    theme: "Embeddings & vector search",
    days: [
      { day: 1, title: "Embedding intuition", minutes: 30, objective: "Similarity search for curriculum content", activities: ["Embed 20 flashcards", "Visualize nearest neighbors", "Compare two embedding models"], resources: ["MTEB Leaderboard", "OpenAI Embeddings Guide"] },
      { day: 2, title: "Vector DB setup", minutes: 30, objective: "Store and query chunks locally", activities: ["Spin up Chroma or pgvector", "Ingest sample textbook PDF", "Query top-k"], resources: ["Chroma Docs", "pgvector README"] },
      { day: 3, title: "Chunking experiments", minutes: 30, objective: "Find chunk size for your domain", activities: ["Try 256/512/1024 tokens", "Measure retrieval hit@3 manually", "Document winner"], resources: ["Pinecone Chunking Strategies"] },
      { day: 4, title: "Metadata filters", minutes: 30, objective: "Filter by grade, unit, difficulty", activities: ["Add metadata to chunks", "Query with filters", "Test cross-unit leakage"], resources: ["LlamaIndex Metadata Filters"] },
      { day: 5, title: "RAG tutor v0", minutes: 30, objective: "Ground hints in retrieved passages", activities: ["Pipeline: retrieve → prompt → answer", "Require citations in output", "Eval against ungrounded baseline"], resources: ["LangChain RAG Tutorial"] },
    ],
  },
  {
    week: 10,
    phase: "p2",
    theme: "Knowledge maps & prerequisite graphs",
    days: [
      { day: 1, title: "Competency frameworks", minutes: 30, objective: "Map standards to assessable skills", activities: ["Pick one subject (e.g. algebra)", "List 15 atomic skills", "Tag each with difficulty"], resources: ["Bloom's Taxonomy", "CMU OLI examples"] },
      { day: 2, title: "Prerequisite edges", minutes: 30, objective: "Define directed acyclic skill graph", activities: ["Draw graph on paper", "Check for cycles", "Identify entry nodes"], resources: ["Knowledge Space Theory overview"] },
      { day: 3, title: "Misconception nodes", minutes: 30, objective: "Link errors to remediation content", activities: ["Add misconception tags to 5 skills", "Write diagnostic questions", "Map remediation resources"], resources: ["VanLehn ITS survey § misconceptions"] },
      { day: 4, title: "JSON knowledge map schema", minutes: 30, objective: "Machine-readable curriculum graph", activities: ["Define nodes/edges schema", "Serialize your map", "Validate with script"], resources: ["Your schema + Neo4j modeling docs"] },
      { day: 5, title: "Path recommendation", minutes: 30, objective: "Next-best skill given mastery set", activities: ["Implement topological next-skill", "Simulate 3 student profiles", "Compare to random order"], resources: ["NetworkX topological sort"] },
    ],
  },
  {
    week: 18,
    phase: "p3",
    theme: "Neo4j for learning graphs",
    days: [
      { day: 1, title: "Graph data model", minutes: 30, objective: "Nodes: Skill, Resource, Misconception", activities: ["Whiteboard schema", "Write Cypher CREATE statements", "Load sample data"], resources: ["Neo4j GraphAcademy Fundamentals"] },
      { day: 2, title: "Prerequisite queries", minutes: 30, objective: "Find learning path between A and B", activities: ["Shortest path Cypher", "All prerequisites of skill X", "Compare path lengths"], resources: ["Neo4j Path Queries"] },
      { day: 3, title: "Student state in graph", minutes: 30, objective: "MASTERED / IN_PROGRESS relationships", activities: ["Model Student node", "Update mastery after quiz", "Query ready-to-learn skills"], resources: ["Your knowledge map schema"] },
      { day: 4, title: "Graph + vector hybrid", minutes: 30, objective: "Retrieve resources for current skill node", activities: ["Link Resource nodes to Skills", "Combine graph filter + vector search", "Benchmark relevance"], resources: ["Neo4j Vector Index Docs"] },
      { day: 5, title: "Mini lab review", minutes: 30, objective: "Demo graph-driven lesson sequence", activities: ["Record 3-min demo", "Write README", "List 3 scaling concerns"], resources: ["Week 18 project repo"] },
    ],
  },
  {
    week: 30,
    phase: "p5",
    theme: "MCP for tutor tool access",
    days: [
      { day: 1, title: "MCP architecture", minutes: 30, objective: "Hosts, clients, servers, transports", activities: ["Read MCP spec intro", "Diagram your tutor + tools", "List 5 tools a tutor needs"], resources: ["modelcontextprotocol.io spec"] },
      { day: 2, title: "First MCP server", minutes: 30, objective: "Expose get_skill_graph tool", activities: ["Scaffold TS/Python server", "Implement list_tools + call_tool", "Test with MCP Inspector"], resources: ["MCP TypeScript SDK examples"] },
      { day: 3, title: "Cursor integration", minutes: 30, objective: "Connect tutor dev environment to MCP", activities: ["Add server to Cursor MCP config", "Invoke from agent chat", "Debug auth issues"], resources: ["Cursor MCP Docs"] },
      { day: 4, title: "Copilot Studio agents", minutes: 30, objective: "Compare enterprise agent orchestration", activities: ["Review Copilot Studio topics", "Map MCP tools to actions", "Note governance features"], resources: ["Microsoft Copilot Studio docs"] },
      { day: 5, title: "Guarded tool use", minutes: 30, objective: "Allowlist tools per student level", activities: ["Implement permission matrix", "Test escalation paths", "Log all tool calls"], resources: ["OWASP LLM Top 10"] },
    ],
  },
  {
    week: 45,
    phase: "p6",
    theme: "Production tutor — eval & observability",
    days: [
      { day: 1, title: "Tutor metrics dashboard", minutes: 30, objective: "Track hint quality, latency, cost", activities: ["Instrument Langfuse/Helicone", "Define 5 KPIs", "Build weekly report template"], resources: ["Langfuse Docs"] },
      { day: 2, title: "Human eval loop", minutes: 30, objective: "Educator rubric on sampled sessions", activities: ["Sample 20 sessions/week", "Rubric: pedagogy, accuracy, safety", "Feed failures to prompt backlog"], resources: ["RAGAS + custom rubric"] },
      { day: 3, title: "A/B test hint strategy", minutes: 30, objective: "Socratic vs worked-example-first", activities: ["Design experiment", "Split traffic", "Pre-register success metric"], resources: ["Google ML Testing Guide"] },
      { day: 4, title: "Safety red team", minutes: 30, objective: "Jailbreaks, answer leakage, bias", activities: ["Run 30 adversarial prompts", "Document mitigations", "Update system prompt"], resources: ["OWASP LLM Top 10"] },
      { day: 5, title: "Capstone checkpoint", minutes: 30, objective: "Architecture doc + demo video", activities: ["Update system diagram", "Record stakeholder demo", "Publish internal runbook"], resources: ["Your capstone repo"] },
    ],
  },
];

const QUIZ: QuizQuestion[] = [
  { id: "q1", phase: "p1", question: "In a tutoring context, why keep temperature low (0–0.3) for hint generation?", options: ["Faster inference", "More consistent, less random pedagogical drift", "Required by API", "Increases context window"], correct: 1, explanation: "Low temperature reduces variance so hints stay predictable and aligned with policy." },
  { id: "q2", phase: "p1", question: "What is the primary purpose of chunking in RAG for tutors?", options: ["Reduce API cost only", "Balance retrieval precision with enough context for explanations", "Replace embeddings", "Eliminate hallucinations entirely"], correct: 1, explanation: "Chunk size trades off whether you retrieve the right passage vs enough surrounding explanation." },
  { id: "q3", phase: "p2", question: "A knowledge map for tutoring should most often be:", options: ["An undirected clique", "A DAG of prerequisites", "A linear list only", "A single root node"], correct: 1, explanation: "Skills depend on prior skills; prerequisite graphs are directed and acyclic in most curricula." },
  { id: "q4", phase: "p2", question: "Bloom's 2 Sigma finding implies AI tutors should prioritize:", options: ["One-size-fits-all lectures", "Personalized pacing and feedback", "Removing all assessments", "Maximizing content volume"], correct: 1, explanation: "Mastery learning with individualized feedback drove the 2 sigma effect." },
  { id: "q5", phase: "p3", question: "Bayesian Knowledge Tracing estimates:", options: ["Embedding dimension", "Probability a student knows a skill", "Graph database index size", "Token price"], correct: 1, explanation: "BKT maintains P(L)—probability the learner has learned the skill." },
  { id: "q6", phase: "p3", question: "In Neo4j, the best query to find all skills ready to learn (prerequisites mastered) uses:", options: ["Full table scan", "Pattern matching on MASTERED and REQUIRES edges", "Random sampling", "JSON parse only"], correct: 1, explanation: "Graph pattern matching traverses prerequisite edges efficiently." },
  { id: "q7", phase: "p4", question: "GraphRAG improves over vanilla RAG when:", options: ["Documents are unrelated", "Questions need multi-hop reasoning across concepts", "You have no graph", "Embeddings are disabled"], correct: 1, explanation: "Community summaries and graph traversal help connect concepts across sources." },
  { id: "q8", phase: "p4", question: "Hybrid search typically combines:", options: ["GPU + CPU", "BM25 keyword + dense vector scores", "Two LLMs", "Train + test split"], correct: 1, explanation: "Hybrid fusion captures exact terms and semantic similarity." },
  { id: "q9", phase: "p5", question: "MCP standardizes:", options: ["Model training", "How AI apps connect to external tools/data", "Graph database storage", "Student grades"], correct: 1, explanation: "MCP defines host/client/server protocol for tool and resource access." },
  { id: "q10", phase: "p5", question: "ReAct-style agents alternate:", options: ["Training and validation", "Reasoning traces and tool actions", "Chunking and embedding", "Graph import and export"], correct: 1, explanation: "ReAct interleaves thought, action, and observation loops." },
  { id: "q11", phase: "p6", question: "The highest-risk LLM failure in K-12 tutoring is:", options: ["Slow latency", "Confident incorrect teaching or answer leakage", "Small font", "Dark mode UI"], correct: 1, explanation: "Wrong teaching and doing the student's work undermine learning and trust." },
  { id: "q12", phase: "p6", question: "RAGAS 'faithfulness' measures whether:", options: ["Answers are funny", "Generation is grounded in retrieved context", "Graph is connected", "Students pass tests"], correct: 1, explanation: "Faithfulness checks claims against retrieved evidence." },
];

const EXPERT_FEEDS: ExpertFeed[] = [
  { name: "Educational Data Mining (EDM)", type: "Conference", url: "https://educationaldatamining.org/", cadence: "Annual + proceedings", why: "Latest KT, ITS, and learning analytics research" },
  { name: "AIED Conference", type: "Conference", url: "https://iaied.org/conferences", cadence: "Annual", why: "AI in education — tutor systems, adaptivity" },
  { name: "NeurIPS / ACL Edu-NLP workshops", type: "Workshop", url: "https://arxiv.org/list/cs.CL/recent", cadence: "Weekly arXiv scan", why: "NLP advances that become tutor features in 6–12 months" },
  { name: "MCP Specification repo", type: "GitHub", url: "https://github.com/modelcontextprotocol/specification", cadence: "Biweekly", why: "Protocol changes affect all integrations" },
  { name: "LangChain / LlamaIndex changelogs", type: "Changelog", url: "https://github.com/langchain-ai/langchain", cadence: "Weekly", why: "RAG stack defaults shift quickly" },
  { name: "Neo4j Developer Blog", type: "Blog", url: "https://neo4j.com/developer-blog/", cadence: "Monthly", why: "Graph + vector hybrid patterns" },
  { name: "OpenAI / Anthropic release notes", type: "Docs", url: "https://platform.openai.com/docs/changelog", cadence: "Every release", why: "Model capabilities change tutor design constraints" },
  { name: "Microsoft Copilot Blog", type: "Blog", url: "https://www.microsoft.com/en-us/microsoft-copilot/blog/", cadence: "Monthly", why: "Enterprise agent + Copilot integration patterns" },
  { name: "r/MachineLearning + r/LanguageTechnology", type: "Community", url: "https://www.reddit.com/r/MachineLearning/", cadence: "Weekly skim", why: "Early signals on retrieval and agents" },
  { name: "Latent Space podcast", type: "Podcast", url: "https://www.latent.space/", cadence: "Biweekly", why: "Practitioner interviews on AI stack shifts" },
  { name: "Papers With Code — Question Answering", type: "Benchmark", url: "https://paperswithcode.com/task/question-answering", cadence: "Quarterly", why: "Track SOTA retrieval architectures" },
  { name: "OWASP GenAI Security Project", type: "Security", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", cadence: "Quarterly review", why: "Update tutor threat model" },
];

const WEEKLY_ROTATION = [
  "Mon (60m): Concept study — read embedded docs in lesson file",
  "Tue (60m): Guided lab — step through lesson lab section",
  "Wed (60m): Capstone build — commit to capstone/",
  "Thu (60m): Eval, graph query, or metrics exercise",
  "Fri (60m): Review, flashcards, week checkpoint commit",
];

function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <Row gap={6} wrap style={{ marginBottom: 4 }}>
      {TABS.map((tab) => (
        <Button
          variant={active === tab.id ? "primary" : "ghost"}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </Row>
  );
}

function KnowledgeMapView() {
  const theme = useHostTheme();
  const layout = computeDAGLayout({
    nodes: DAG_NODES.map((n) => ({ id: n.id })),
    edges: DAG_EDGES.map((e) => ({ from: e.from, to: e.to })),
    direction: "vertical",
    nodeWidth: 148,
    nodeHeight: 36,
    rankGap: 52,
    nodeGap: 16,
    padding: 16,
  });

  const nodeById = Object.fromEntries(DAG_NODES.map((n) => [n.id, n]));

  return (
    <Stack gap={12}>
      <Text tone="secondary">
        Dependency graph for Tutor-Based AI expertise. Master earlier nodes before
        depending branches. Solid flow top-to-bottom; dashed edges are cross-links.
      </Text>
      <Card>
        <CardHeader trailing={<Pill tone="info">14 nodes</Pill>}>Tutor AI Knowledge DAG</CardHeader>
        <CardBody style={{ overflow: "auto", padding: 8 }}>
          <svg width={layout.width} height={layout.height} role="img" aria-label="Knowledge map DAG">
            {layout.ranks.map((rank) => (
              <rect
                key={rank.rank}
                x={rank.x - 8}
                y={rank.y - 8}
                width={rank.width + 16}
                height={rank.height + 16}
                fill={theme.fill.tertiary}
                stroke={theme.stroke.secondary}
                strokeWidth={1}
                rx={4}
              />
            ))}
            {layout.edges.map((edge, i) => {
              const isCross = edge.from === "rag" && edge.to === "graphrag";
              return (
                <line
                  key={`${edge.from}-${edge.to}-${i}`}
                  x1={edge.sourceX}
                  y1={edge.sourceY}
                  x2={edge.targetX}
                  y2={edge.targetY}
                  stroke={isCross ? theme.accent.primary : theme.stroke.primary}
                  strokeWidth={1.5}
                  strokeDasharray={edge.isBackEdge || isCross ? "4 3" : undefined}
                />
              );
            })}
            {layout.nodes.map((node) => {
              const meta = nodeById[node.id];
              return (
                <g key={node.id}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={148}
                    height={36}
                    fill={theme.bg.elevated}
                    stroke={theme.stroke.primary}
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={node.x + 74}
                    y={node.y + 22}
                    textAnchor="middle"
                    fill={theme.text.primary}
                    fontSize={11}
                    fontFamily="system-ui, sans-serif"
                  >
                    {meta?.label ?? node.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </CardBody>
      </Card>
      <Grid columns={3} gap={10}>
        {[
          { label: "Core spine", desc: "LLM → RAG → ITS → Graph → Agents → Production", color: "blue" as const },
          { label: "Graph branch", desc: "Knowledge maps + Neo4j feed GraphRAG and sequencing", color: "purple" as const },
          { label: "Integration layer", desc: "MCP connects LMS, assessments, analytics, content CMS", color: "orange" as const },
        ].map((item) => (
          <Card key={item.label}>
            <CardBody>
              <Row gap={8} align="center">
                <Swatch color={item.color} />
                <Stack gap={4}>
                  <Text weight="semibold">{item.label}</Text>
                  <Text size="small" tone="secondary">{item.desc}</Text>
                </Stack>
              </Row>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Stack>
  );
}

function OverviewTab() {
  const phaseHours = PHASES.map((p) => ({ label: p.name.replace(/^Phase \d+ — /, ""), value: p.hours }));
  return (
    <Stack gap={16}>
      <Callout tone="info">
        Commitment: {MINUTES_PER_DAY} min/business day, {DAYS_PER_WEEK} days/week (Mon–Fri).
        {TOTAL_WEEKS} weeks (~{Math.round(TOTAL_WEEKS / 4.33)} months) · ~{TOTAL_HOURS} focused hours to recognized expert.
      </Callout>
      <Grid columns={4} gap={10}>
        <Stat label="Daily block" value="60 min" tone="info" />
        <Stat label="Weekly load" value="5 hr" />
        <Stat label="Expert-ready" value="52 wks" tone="success" />
        <Stat label="Full mastery" value="78 wks" tone="warning" />
      </Grid>
      <H2>Study hours by phase</H2>
      <BarChart
        categories={phaseHours.map((p) => p.label)}
        series={[{ name: "Hours", data: phaseHours.map((p) => p.value), tone: "info" }]}
        valueSuffix=" h"
        showValues
      />
      <Text size="small" tone="tertiary">
        Source: curriculum plan · {TOTAL_HOURS} total hours · {MINUTES_PER_DAY} min × {DAYS_PER_WEEK} days/week
      </Text>
      <Card>
        <CardHeader>Expert milestones</CardHeader>
        <CardBody style={{ padding: 0 }}>
          <Table
            headers={["Week", "Level", "You can…"]}
            rows={MILESTONES.map((m) => [
              `Week ${m.week}`,
              m.label,
              m.desc,
            ])}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Weekly rhythm (repeat every week)</CardHeader>
        <CardBody>
          <Stack gap={6}>
            {WEEKLY_ROTATION.map((line) => (
              <Text key={line}>{line}</Text>
            ))}
          </Stack>
        </CardBody>
      </Card>
      <Callout tone="neutral">
        Realistic expectation: at 60 min/business day you reach expert-ready in ~12 months and recognized expert in ~18 months (~390 focused hours).
      </Callout>
    </Stack>
  );
}

function CurriculumTab() {
  return (
    <Stack gap={10}>
      <Text tone="secondary">
        Seven phases · 78 weeks · each week follows the Mon–Fri rotation above. Weeks not expanded in Lessons tab follow the same pattern for that phase theme.
      </Text>
      {PHASES.map((phase) => (
        <CollapsibleSection
          key={phase.id}
          title={phase.name}
          leading={<Swatch color={phase.color} />}
          trailing={<Text size="small" tone="tertiary">{phase.weeks}</Text>}
        >
          <Stack gap={8}>
            <Text>{phase.outcome}</Text>
            <UsageBar
              topLeftLabel="Phase hours"
              topRightLabel={`${phase.hours}h planned`}
              segments={[{ id: phase.id, value: phase.hours, color: phase.color }]}
              total={phase.hours}
            />
            <PhaseWeekOutline phaseId={phase.id} />
          </Stack>
        </CollapsibleSection>
      ))}
    </Stack>
  );
}

function PhaseWeekOutline({ phaseId }: { phaseId: string }) {
  const outlines: Record<string, string[]> = {
    p1: ["W1–2: LLM + prompting", "W3–4: Eval harness", "W5–6: Embeddings + chunking", "W7–8: RAG tutor v1 + RAGAS"],
    p2: ["W9–10: ITS + knowledge maps", "W11–12: Misconception modeling", "W13–14: Adaptive hint policies", "W15–16: Curriculum authoring workflow"],
    p3: ["W17–18: Neo4j modeling", "W19–20: Mastery in graph", "W21–22: BKT / KT basics", "W23–24: Personalized sequencing engine"],
    p4: ["W25–26: Hybrid retrieval", "W27–28: Reranking + context ordering", "W29–30: GraphRAG pipeline", "W31–32: Multimodal content (optional)"],
    p5: ["W33–34: MCP spec deep dive", "W35–36: Custom MCP servers", "W37–38: ReAct tutor agent", "W39–40: Guardrails + permissions"],
    p6: ["W41–44: Capstone build sprints", "W45–46: Observability + eval", "W47–48: Safety + A/B tests", "W49–52: Documentation + stakeholder demo"],
    p7: ["W53–58: Reproduce 2 papers", "W59–64: OSS contribution", "W65–70: Novel experiment", "W71–78: Teach / write / conference submission"],
  };
  const items = outlines[phaseId] ?? [];
  return (
    <Stack gap={4}>
      {items.map((item) => (
        <Text key={item} size="small">· {item}</Text>
      ))}
    </Stack>
  );
}

function ResourcesTab() {
  const [filter, setFilter] = useCanvasState<string>("resource-filter", "all");
  const types = ["all", "book", "course", "paper", "docs", "repo", "video", "tool"];
  const filtered = filter === "all" ? RESOURCES : RESOURCES.filter((r) => r.type === filter);

  return (
    <Stack gap={12}>
      <Row gap={6} wrap>
        {types.map((t) => (
          <Button variant={filter === t ? "primary" : "ghost"} onClick={() => setFilter(t)}>
            {t === "all" ? "All" : t}
          </Button>
        ))}
      </Row>
      <Text tone="secondary">{filtered.length} resources · click links to open</Text>
      {(["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const).map((phaseId) => {
        const phaseResources = filtered.filter((r) => r.phase === phaseId);
        if (phaseResources.length === 0) return null;
        const phaseName = PHASES.find((p) => p.id === phaseId)?.name ?? phaseId;
        return (
          <CollapsibleSection key={phaseId} title={phaseName} count={phaseResources.length} defaultOpen={phaseId === "p1"}>
            <Stack gap={8}>
              {phaseResources.map((r) => (
                <Row key={r.title} gap={8} align="start">
                  <Pill size="sm" tone="neutral">{r.type}</Pill>
                  <Stack gap={2}>
                    <Link href={r.url}>{r.title}</Link>
                    <Text size="small" tone="secondary">{r.note}</Text>
                  </Stack>
                </Row>
              ))}
            </Stack>
          </CollapsibleSection>
        );
      })}
    </Stack>
  );
}

function LessonsTab() {
  const dispatch = useCanvasAction();
  const [week, setWeek] = useCanvasState<number>("lesson-week", 1);
  const [phaseFilter, setPhaseFilter] = useCanvasState<string>("lesson-phase", "all");
  const filtered = phaseFilter === "all"
    ? WEEK_INDEX
    : WEEK_INDEX.filter((w) => phaseForWeek(w.week) === phaseFilter);
  const selected = WEEK_INDEX.find((w) => w.week === week) ?? WEEK_INDEX[0];
  const lessonPath = weekLessonPath(week);

  return (
    <Stack gap={12}>
      <Callout tone="info">
        All 78 weeks have self-contained lesson files — 60 min business-day blocks, embedded source links, lab steps, and deliverables. Open the lesson and follow it; no external hunting required.
      </Callout>
      <Row gap={8} wrap>
        <Button variant="primary" onClick={() => dispatch({ type: "openFile", path: lessonPath })}>
          Open Week {week} lesson
        </Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "openFile", path: "README.md" })}>
          Open course repo
        </Button>
        <Button variant="ghost" onClick={() => dispatch({ type: "openFile", path: "curriculum/INDEX.md" })}>
          Curriculum index
        </Button>
      </Row>
      <Row gap={6} wrap>
        {["all", "p1", "p2", "p3", "p4", "p5", "p6", "p7"].map((p) => (
          <Button variant={phaseFilter === p ? "primary" : "ghost"} onClick={() => setPhaseFilter(p)}>
            {p === "all" ? "All phases" : p.toUpperCase()}
          </Button>
        ))}
      </Row>
      <Row gap={6} wrap>
        {filtered.map((w) => (
          <Button variant={week === w.week ? "primary" : "ghost"} onClick={() => setWeek(w.week)}>
            W{w.week}
          </Button>
        ))}
      </Row>
      <Card>
        <CardHeader trailing={<Pill tone="info">{phaseForWeek(week).toUpperCase()}</Pill>}>
          {`Week ${selected.week}: ${selected.theme}`}
        </CardHeader>
        <CardBody>
          <Stack gap={8}>
            <Text tone="secondary">File: {lessonPath}</Text>
            <Text>Each business day: read embedded docs, complete lab in capstone/, commit deliverable.</Text>
            <Table
              headers={["Day", "Focus", "Minutes"]}
              rows={[
                ["Mon", "Concept study (embedded docs in lesson)", "60"],
                ["Tue", "Guided lab (lesson lab steps)", "60"],
                ["Wed", "Capstone build", "60"],
                ["Thu", "Eval / graph / metrics", "60"],
                ["Fri", "Review + checkpoint", "60"],
              ]}
            />
            <Button variant="primary" onClick={() => dispatch({ type: "openFile", path: lessonPath })}>
              Open full lesson (5 days with all links)
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

function KnowledgeChecksTab() {
  const [answers, setAnswers] = useCanvasState<Record<string, number>>("quiz-answers", {});
  const [submitted, setSubmitted] = useCanvasState<boolean>("quiz-submitted", false);

  const score = QUIZ.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);

  return (
    <Stack gap={16}>
      <Row align="center">
        <Text tone="secondary">12 questions across all phases · retake anytime</Text>
        <Spacer />
        {submitted && (
          <Pill tone={score >= 10 ? "success" : score >= 8 ? "warning" : "deleted"}>
            Score: {score}/{QUIZ.length}
          </Pill>
        )}
      </Row>
      {QUIZ.map((q, idx) => (
        <Card key={q.id}>
          <CardBody>
            <Stack gap={8}>
              <Row gap={8} align="center">
                <Pill size="sm" tone="neutral">Q{idx + 1}</Pill>
                <Pill size="sm" tone="info">{q.phase.toUpperCase()}</Pill>
              </Row>
              <Text weight="semibold">{q.question}</Text>
              <Stack gap={6}>
                {q.options.map((opt, i) => (
                  <Row key={opt} gap={8} align="center">
                    <Checkbox
                      checked={answers[q.id] === i}
                      onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    />
                    <Text size="small">{opt}</Text>
                  </Row>
                ))}
              </Stack>
              {submitted && (
                <Callout tone={answers[q.id] === q.correct ? "success" : "danger"}>
                  {answers[q.id] === q.correct ? "Correct. " : "Incorrect. "}
                  {q.explanation}
                </Callout>
              )}
            </Stack>
          </CardBody>
        </Card>
      ))}
      <Row gap={8}>
        <Button variant="primary" onClick={() => setSubmitted(true)}>Grade answers</Button>
        <Button variant="ghost" onClick={() => { setAnswers({}); setSubmitted(false); }}>Reset</Button>
      </Row>
      <Card>
        <CardHeader>Phase gate thresholds</CardHeader>
        <CardBody style={{ padding: 0 }}>
          <Table
            headers={["Phase", "Gate", "Requirement"]}
            rows={[
              ["End Phase 1", "RAG checkpoint", "≥80% on Q1–Q2 + working RAG tutor demo"],
              ["End Phase 2", "Map checkpoint", "≥80% on Q3–Q4 + JSON/Graph knowledge map"],
              ["End Phase 3", "Graph checkpoint", "≥80% on Q5–Q6 + Neo4j mastery queries"],
              ["End Phase 4", "Retrieval checkpoint", "≥80% on Q7–Q8 + GraphRAG eval beat baseline"],
              ["End Phase 5", "MCP checkpoint", "≥80% on Q9–Q10 + 2 MCP tools in tutor"],
              ["End Phase 6", "Production gate", "≥80% on Q11–Q12 + capstone shipped"],
            ]}
          />
        </CardBody>
      </Card>
    </Stack>
  );
}

function StayExpertTab() {
  const [cadenceFilter, setCadenceFilter] = useCanvasState<string>("expert-cadence", "all");
  return (
    <Stack gap={16}>
      <Callout tone="success">
        Expertise decays without maintenance. Budget 30 min/week after Week 78 (or parallel to Phase 7) for this loop.
      </Callout>
      <Grid columns={3} gap={10}>
        <Card>
          <CardHeader>Weekly (30 min)</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· Scan OpenAI/Anthropic release notes</Text>
              <Text size="small">· Read 1 arXiv abstract in Edu-AI</Text>
              <Text size="small">· Run regression eval on tutor golden set</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Monthly (2 hr)</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· Upgrade one dependency (LangChain, MCP SDK)</Text>
              <Text size="small">· Re-run RAGAS / safety red team</Text>
              <Text size="small">· Publish learning note or internal demo</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Quarterly (1 day)</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text size="small">· Reproduce one new paper technique</Text>
              <Text size="small">· OWASP LLM threat model refresh</Text>
              <Text size="small">· Architecture review with stakeholders</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
      <H2>Follow list</H2>
      <Row gap={6} wrap>
        {["all", "Weekly", "Biweekly", "Monthly", "Quarterly", "Annual"].map((c) => (
          <Button variant={cadenceFilter === c ? "primary" : "ghost"} onClick={() => setCadenceFilter(c)}>
            {c === "all" ? "All" : c}
          </Button>
        ))}
      </Row>
      <Card>
        <CardHeader trailing={<Pill tone="neutral">{EXPERT_FEEDS.length} feeds</Pill>}>Sources to follow</CardHeader>
        <CardBody style={{ padding: 0 }}>
          <Table
            headers={["Name", "Type", "Cadence", "Why it matters", "Link"]}
            rows={EXPERT_FEEDS.filter((f) => cadenceFilter === "all" || f.cadence.includes(cadenceFilter.replace("ly", ""))).map((f) => [
              f.name,
              f.type,
              f.cadence,
              f.why,
              <Link href={f.url}>Open</Link>,
            ])}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Expert habits checklist</CardHeader>
        <CardBody>
          <Stack gap={8}>
            {[
              "Maintain a personal 'tutor eval golden set' (50+ scenarios) and run it on every model upgrade",
              "Track cost per successful learning outcome, not just cost per token",
              "Contribute upstream: MCP server, KT library, or open curriculum graph",
              "Pair with an educator monthly — domain experts catch pedagogical regressions",
              "Document architecture decisions (ADR) when changing retrieval or student model",
              "Teach one concept publicly (blog, lunch-and-learn) to force clarity",
            ].map((habit) => (
              <Row key={habit} gap={8} align="start">
                <Swatch color="green" />
                <Text size="small">{habit}</Text>
              </Row>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default function TutorAiExpertLearningPlan() {
  const [tab, setTab] = useCanvasState<TabId>("active-tab", "overview");

  return (
    <Stack gap={16}>
      <Stack gap={4}>
        <H1>Tutor-Based AI Expert Learning Plan</H1>
        <Text tone="secondary">
          60 min/business day · Course repo with 78 self-contained lesson files · RAG · Graph · MCP
        </Text>
      </Stack>
      <TabBar active={tab} onChange={setTab} />
      <Divider />
      {tab === "overview" && <OverviewTab />}
      {tab === "knowledge-map" && <KnowledgeMapView />}
      {tab === "curriculum" && <CurriculumTab />}
      {tab === "resources" && <ResourcesTab />}
      {tab === "lessons" && <LessonsTab />}
      {tab === "checks" && <KnowledgeChecksTab />}
      {tab === "stay-expert" && <StayExpertTab />}
    </Stack>
  );
}

function Divider() {
  const theme = useHostTheme();
  return <div style={{ height: 1, background: theme.stroke.tertiary, width: "100%" }} />;
}
