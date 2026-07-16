"""Detailed day plans for weeks 11–78 (same structure as weeks 1–10)."""

from __future__ import annotations

from generate_lessons import DayPlan, DocLink, WeekPlan, MINUTES, PROJECT

# fmt: off
WEEK_THEMES: list[tuple[int, str, str, str]] = [
    (11, "p2", "Misconception-driven hint selection", "graph"),
    (12, "p2", "Adaptive hint level policies", "graph"),
    (13, "p2", "Worked examples vs Socratic modes", "graph"),
    (14, "p2", "Curriculum authoring workflow", "graph"),
    (15, "p2", "Knowledge map QA & educator review", "graph"),
    (16, "p2", "Phase 2 gate — map + sequencer demo", "graph"),
    (17, "p3", "Neo4j setup & Cypher basics", "graph"),
    (18, "p3", "Learning graph data model", "graph"),
    (19, "p3", "Prerequisite path queries", "graph"),
    (20, "p3", "Student mastery in graph", "graph"),
    (21, "p3", "Bayesian Knowledge Tracing theory", "student_model"),
    (22, "p3", "pyBKT implementation", "student_model"),
    (23, "p3", "Knowledge tracing survey methods", "student_model"),
    (24, "p3", "Phase 3 gate — graph + KT demo", "graph"),
    (25, "p4", "Hybrid BM25 + vector search", "graphrag"),
    (26, "p4", "Reranking with cross-encoders", "graphrag"),
    (27, "p4", "Context ordering (Lost in the Middle)", "graphrag"),
    (28, "p4", "GraphRAG indexing pipeline", "graphrag"),
    (29, "p4", "Community summaries for curriculum", "graphrag"),
    (30, "p4", "GraphRAG query modes", "graphrag"),
    (31, "p4", "Multimodal content retrieval (optional)", "graphrag"),
    (32, "p4", "Phase 4 gate — GraphRAG beats baseline", "graphrag"),
    (33, "p5", "MCP architecture deep dive", "mcp"),
    (34, "p5", "Build first MCP server", "mcp"),
    (35, "p5", "Cursor MCP integration", "mcp"),
    (36, "p5", "Copilot Studio agent patterns", "mcp"),
    (37, "p5", "ReAct tutor agent loop", "mcp"),
    (38, "p5", "Tool permission matrix", "mcp"),
    (39, "p5", "Guardrails for tool use", "mcp"),
    (40, "p5", "Phase 5 gate — 2 MCP tools live", "mcp"),
    (41, "p6", "Capstone sprint 1 — integration", "eval"),
    (42, "p6", "Capstone sprint 2 — UX", "eval"),
    (43, "p6", "Capstone sprint 3 — adaptivity", "eval"),
    (44, "p6", "Capstone sprint 4 — polish", "eval"),
    (45, "p6", "Observability with Langfuse", "observability"),
    (46, "p6", "Human eval loop", "eval"),
    (47, "p6", "A/B test hint strategies", "eval"),
    (48, "p6", "Safety red team round 2", "eval"),
    (49, "p6", "Performance & cost optimization", "observability"),
    (50, "p6", "Documentation & runbook", "eval"),
    (51, "p6", "Stakeholder demo prep", "eval"),
    (52, "p6", "Phase 6 gate — production capstone", "eval"),
    (53, "p7", "Paper reproduction 1 — KT", "student_model"),
    (54, "p7", "Paper reproduction 1 — implementation", "student_model"),
    (55, "p7", "Paper reproduction 2 — GraphRAG", "graphrag"),
    (56, "p7", "Paper reproduction 2 — writeup", "graphrag"),
    (57, "p7", "OSS contribution scouting", "mcp"),
    (58, "p7", "OSS PR submission", "mcp"),
    (59, "p7", "OSS PR iteration", "mcp"),
    (60, "p7", "Novel experiment design", "eval"),
    (61, "p7", "Novel experiment run", "eval"),
    (62, "p7", "Novel experiment analysis", "eval"),
    (63, "p7", "Blog post draft — tutor architecture", "eval"),
    (64, "p7", "Blog post publish", "eval"),
    (65, "p7", "Internal tech talk", "eval"),
    (66, "p7", "Conference abstract draft", "eval"),
    (67, "p7", "Peer review practice", "eval"),
    (68, "p7", "Open curriculum graph release", "graph"),
    (69, "p7", "MCP server open-source", "mcp"),
    (70, "p7", "Expert eval golden set v2", "eval"),
    (71, "p7", "Teaching workshop design", "eval"),
    (72, "p7", "Teaching workshop delivery", "eval"),
    (73, "p7", "Mentor office hours", "eval"),
    (74, "p7", "Research reading group lead", "eval"),
    (75, "p7", "Industry case study writeup", "eval"),
    (76, "p7", "Portfolio site update", "eval"),
    (77, "p7", "Expert retrospective", "eval"),
    (78, "p7", "Recognized expert checkpoint", "eval"),
]
# fmt: on

PHASE_DOCS: dict[str, list[DocLink]] = {
    "p2": [
        DocLink("VanLehn ITS survey (PDF)", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 20),
        DocLink("Bloom 2-sigma (PDF)", "https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf", 15),
        DocLink("CMU Open Learning Initiative", "https://oli.cmu.edu/", 10),
        DocLink("Knowledge Space Theory", "https://link.springer.com/book/10.1007/978-1-4612-5082-8", 10),
    ],
    "p3": [
        DocLink("Neo4j GraphAcademy Fundamentals", "https://graphacademy.neo4j.com/categories/fundamentals/", 20),
        DocLink("Neo4j data modeling", "https://neo4j.com/developer/data-modeling/", 15),
        DocLink("BKT — Corbett & Anderson (PDF)", "https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf", 15),
        DocLink("Knowledge Tracing survey", "https://arxiv.org/abs/2201.08434", 15),
        DocLink("pyBKT on GitHub", "https://github.com/CAHLR/pyBKT", 10),
    ],
    "p4": [
        DocLink("Microsoft GraphRAG repo", "https://github.com/microsoft/graphrag", 20),
        DocLink("Weaviate hybrid search", "https://weaviate.io/developers/weaviate/concepts/search/hybrid-search", 15),
        DocLink("Cohere Rerank docs", "https://docs.cohere.com/docs/rerank", 15),
        DocLink("Lost in the Middle (paper)", "https://arxiv.org/abs/2307.03172", 15),
        DocLink("ColBERT paper", "https://arxiv.org/abs/2004.12832", 10),
    ],
    "p5": [
        DocLink("MCP specification", "https://modelcontextprotocol.io/specification/2025-03-26", 20),
        DocLink("MCP TypeScript SDK", "https://github.com/modelcontextprotocol/typescript-sdk", 15),
        DocLink("Cursor MCP docs", "https://docs.cursor.com/context/model-context-protocol", 15),
        DocLink("Microsoft Copilot Studio", "https://learn.microsoft.com/en-us/microsoft-copilot-studio/", 10),
        DocLink("ReAct paper", "https://arxiv.org/abs/2210.03629", 15),
        DocLink("Guardrails AI docs", "https://www.guardrailsai.com/docs", 10),
    ],
    "p6": [
        DocLink("Langfuse docs", "https://langfuse.com/docs", 15),
        DocLink("OWASP LLM Top 10", "https://owasp.org/www-project-top-10-for-large-language-model-applications/", 15),
        DocLink("Google ML testing guide", "https://developers.google.com/machine-learning/testing-debugging", 15),
        DocLink("RAGAS metrics", "https://docs.ragas.io/en/stable/concepts/metrics/", 10),
        DocLink("OpenAI eval guide", "https://platform.openai.com/docs/guides/evaluation", 10),
    ],
    "p7": [
        DocLink("EDM conference", "https://educationaldatamining.org/", 15),
        DocLink("AIED conference", "https://iaied.org/conferences", 15),
        DocLink("arXiv cs.CL recent", "https://arxiv.org/list/cs.CL/recent", 10),
        DocLink("GitHub contributing guide", "https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project", 10),
    ],
}

DAY_FOCUS = [
    ("Concept study", "Read primary sources and summarize key ideas for this week's theme"),
    ("Guided lab", "Implement or extend capstone code following official docs"),
    ("Capstone build", "Integrate this week's feature into the adaptive tutor"),
    ("Eval & metrics", "Measure, query, or benchmark this week's work"),
    ("Review & checkpoint", "Retrospective, flashcards, and phase artifact commit"),
]


def _handcrafted_p2_extra() -> dict[int, list[tuple]]:
    """Weeks 11–16 fully specified day tuples (title, objective, docs, lab, deliverable, repo)."""
    w = PROJECT
    return {
        11: [
            ("Misconception taxonomy", "Classify error types and link to skills", [DocLink("VanLehn ITS survey", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 25)], ["Extend capstone/data/graph/misconceptions.jsonl with 10 tags", "Map each to remediation resource ID"], "Misconception taxonomy v2", f"{w}/data/graph/"),
            ("Diagnostic question design", "Write probes that surface specific misconceptions", [DocLink("CMU OLI assessment patterns", "https://oli.cmu.edu/", 20)], ["Add 5 diagnostics to capstone/data/graph/diagnostics.jsonl", "Test with mock student answers"], "Diagnostic bank", f"{w}/data/graph/"),
            ("Hint selection policy", "Route hints based on detected misconception", [DocLink("Prompt Engineering Guide", "https://www.promptingguide.ai/", 15)], ["Add capstone/src/tutor/graph/misconception_router.py", "Unit test 3 routing cases"], "Router module", f"{w}/src/tutor/graph/"),
            ("Eval misconception detection", "Score false positive/negative on sample set", [DocLink("LangChain evaluation", "https://python.langchain.com/docs/concepts/evaluation/", 15)], ["Create capstone/eval/graph/misconception_cases.yaml", "Log precision/recall"], "Detection eval", f"{w}/eval/graph/"),
            ("Week 11 checkpoint", "Demo misconception-aware hint", [], ["Record 3-min demo script in notes/week-11/", "Commit all artifacts"], "Week 11 demo notes", "notes/week-11/"),
        ],
        12: [
            ("Hint level framework", "Define levels 1–3 and escalation rules", [DocLink("VanLehn hint studies", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 20)], ["Document levels in capstone/docs/hint-levels.md", "Update tutor_policy.yaml"], "Hint level spec", f"{w}/docs/"),
            ("Adaptive level selection", "Choose level from attempt count + mastery", [DocLink("Bloom mastery learning", "https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf", 15)], ["Implement capstone/src/tutor/graph/hint_policy.py", "Simulate 3 student traces"], "Hint policy module", f"{w}/src/tutor/graph/"),
            ("Prompt templates per level", "Separate system prompts for each hint level", [DocLink("Anthropic system prompts", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts", 15)], ["Add capstone/src/tutor/prompts/hint_level_*.yaml", "Test consistency"], "Level prompt set", f"{w}/src/tutor/prompts/"),
            ("Policy eval", "Ensure level increases only after failed attempts", [DocLink("OpenAI eval guide", "https://platform.openai.com/docs/guides/evaluation", 15)], ["Add golden cases to eval/golden/hint_levels.yaml", "Run automated checks"], "Hint level eval", f"{w}/eval/golden/"),
            ("Week 12 review", "Consolidate adaptive hint docs", [], ["Update capstone README adaptivity section", "5 flashcards"], "Flashcards", "notes/flashcards/"),
        ],
        13: [
            ("Socratic vs worked example", "Compare pedagogical modes from literature", [DocLink("VanLehn ITS survey", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 25)], ["Write comparison in notes/week-13/modes.md", "Pick default for your domain"], "Mode comparison doc", "notes/week-13/"),
            ("Mode switching logic", "Select mode based on skill difficulty", [DocLink("CMU OLI", "https://oli.cmu.edu/", 15)], ["Add capstone/src/tutor/graph/teaching_mode.py", "Test on 5 skills"], "Teaching mode selector", f"{w}/src/tutor/graph/"),
            ("Prompt A/B for modes", "Implement both prompt styles", [DocLink("Prompt Engineering Guide", "https://www.promptingguide.ai/techniques/fewshot", 15)], ["Create socratic vs worked_example prompt pair", "Run 10 comparisons"], "Prompt pair", f"{w}/src/tutor/prompts/"),
            ("Educator rubric scoring", "Human score both modes on same items", [DocLink("RAGAS + custom rubric", "https://docs.ragas.io/", 10)], ["Score 10 sessions in eval/human/mode_compare.csv", "Summarize winner"], "Mode comparison data", f"{w}/eval/human/"),
            ("Week 13 checkpoint", "Document chosen default mode + rationale", [], ["ADR in capstone/docs/teaching-mode-adr.md", "Commit"], "Teaching mode ADR", f"{w}/docs/"),
        ],
        14: [
            ("Authoring workflow design", "Pipeline from standards → skills → graph", [DocLink("Knowledge Space Theory", "https://link.springer.com/book/10.1007/978-1-4612-5082-8", 20)], ["Draw workflow in notes/week-14/authoring-flow.md", "List tooling gaps"], "Authoring workflow diagram", "notes/week-14/"),
            ("Spreadsheet → JSON import", "Build importer for skill lists", [DocLink("JSON Schema", "https://json-schema.org/learn/getting-started-step-by-step", 15)], ["Script capstone/scripts/import_skills_csv.py", "Import sample CSV"], "Import script", f"{w}/scripts/"),
            ("Educator review checklist", "QA for prerequisite cycles and orphans", [DocLink("NetworkX DAG check", "https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.is_directed_acyclic_graph.html", 10)], ["Add capstone/scripts/validate_graph.py", "Fix any graph errors"], "Graph validator", f"{w}/scripts/"),
            ("Versioning curriculum maps", "Git-based change log for skills", [], ["Add capstone/data/graph/CHANGELOG.md", "Tag v0.2.0"], "Graph changelog", f"{w}/data/graph/"),
            ("Week 14 lab", "End-to-end author 10 new skills", [], ["Add skills + edges + resources", "Validate and commit"], "10 new skills in graph", f"{w}/data/graph/"),
        ],
        15: [
            ("Educator review protocol", "Define review rubric for knowledge maps", [DocLink("VanLehn ITS", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 20)], ["Write capstone/docs/educator-review-protocol.md", "Share with peer if possible"], "Review protocol", f"{w}/docs/"),
            ("Simulated review session", "Walk through map with checklist", [], ["Record issues in notes/week-15/review-findings.md", "Prioritize fixes"], "Review findings", "notes/week-15/"),
            ("Fix graph from review", "Resolve orphan skills and bad prerequisites", [], ["Run validate_graph.py", "Apply fixes to JSON/JSONL files"], "Clean graph", f"{w}/data/graph/"),
            ("Sequencer regression tests", "Ensure fixes didn't break paths", [], ["Add capstone/tests/test_sequencer.py", "All tests green"], "Sequencer tests", f"{w}/tests/"),
            ("Week 15 checkpoint", "Educator-ready knowledge map v1", [], ["Write checkpoints/phase-02-progress.md", "Demo sequencer"], "Phase 2 progress doc", "checkpoints/"),
        ],
        16: [
            ("Phase 2 integration", "Wire graph + sequencer into tutor CLI", [DocLink("Your capstone README", f"{w}/README.md", 10)], ["Connect sequencer to tutor_cli.py", "Show next skill after session"], "Integrated CLI", f"{w}/src/tutor/cli/"),
            ("Gate checklist", "Verify all Phase 2 deliverables", [], ["Complete checkpoints/phase-gates.md Phase 2 section", "Fix gaps"], "Phase 2 gate checklist", "checkpoints/"),
            ("Demo preparation", "3-minute map + adaptivity demo", [], ["Script in notes/week-16/demo-script.md", "Rehearse twice"], "Demo script", "notes/week-16/"),
            ("Knowledge check review", "Retake Phase 2 quiz questions Q3–Q4", [DocLink("Course CHECKS", "curriculum/CHECKS.md", 10)], ["Score ≥80%", "Note weak areas"], "Quiz score logged", "notes/week-16/"),
            ("Phase 2 gate", "Ship Phase 2 checkpoint doc", [], ["Write checkpoints/phase-02-complete.md", "Celebrate milestone"], "Phase 2 complete", "checkpoints/"),
        ],
    }


def _day_from_tuple(week: int, day_idx: int, spec: tuple, phase: str, area: str) -> DayPlan:
    title, objective, docs, lab, deliverable, repo = spec
    if not docs:
        docs = PHASE_DOCS.get(phase, [])[:2]
    if not repo:
        repo = f"{PROJECT}/src/tutor/{area}/" if day_idx in (2, 3) else f"notes/week-{week:02d}/"
    return DayPlan(title, objective, list(docs), list(lab), deliverable, repo)


PHASE_BLUEPRINTS: dict[str, list[tuple[str, str, list[str], str]]] = {
    "p3": [
        ("Graph concepts for {theme}", "Relate Neo4j/Cypher concepts to {theme}", ["Read Neo4j GraphAcademy module notes", "Summarize in notes/week-{week:02d}/day-01.md"], "Concept summary"),
        ("Cypher lab: {theme}", "Write and run Cypher for {theme}", ["Open Neo4j Browser or Aura free tier", "Execute CREATE/MATCH exercises from GraphAcademy", "Save queries to capstone/data/graph/queries/week-{week:02d}.cypher"], "Cypher query file"),
        ("Capstone graph module: {theme}", "Implement graph logic for {theme}", ["Edit capstone/src/tutor/graph/ or student_model/", "Add unit tests in capstone/tests/", "Wire to sample data in capstone/data/graph/"], "Code + tests committed"),
        ("Mastery & KT metrics: {theme}", "Measure or query student state for {theme}", ["Run BKT or graph mastery queries", "Log output to capstone/eval/week-{week:02d}.json"], "Metrics file"),
        ("Week {week} checkpoint", "Review and flashcards for {theme}", ["Write notes/week-{week:02d}/retrospective.md", "5 flashcards in notes/flashcards/week-{week:02d}.md"], "Week checkpoint"),
    ],
    "p4": [
        ("Retrieval theory: {theme}", "Study hybrid/GraphRAG docs for {theme}", ["Read primary paper/docs", "Notes in notes/week-{week:02d}/day-01.md"], "Reading notes"),
        ("Retrieval lab: {theme}", "Build retrieval experiment for {theme}", ["Script in capstone/src/tutor/graphrag/", "Use sample corpus in capstone/data/corpus/"], "Lab script"),
        ("Pipeline integration: {theme}", "Connect retrieval to tutor pipeline", ["Update capstone/src/tutor/rag/pipeline.py or graphrag/", "Require citations in output"], "Pipeline PR"),
        ("RAGAS / benchmark: {theme}", "Evaluate retrieval quality", ["Run capstone/eval/rag/ scripts", "Compare to baseline in eval/baselines/"], "Benchmark results"),
        ("Week {week} checkpoint", "Document wins/losses for {theme}", ["Update capstone/docs/retrieval-log.md", "Flashcards"], "Checkpoint doc"),
    ],
    "p5": [
        ("Protocol & architecture: {theme}", "Study MCP/agent docs for {theme}", ["Read MCP spec sections", "Diagram in notes/week-{week:02d}/architecture.md"], "Architecture note"),
        ("MCP server lab: {theme}", "Build or extend MCP tool for {theme}", ["Code in capstone/src/tutor/mcp/", "Test with MCP Inspector"], "MCP server code"),
        ("Agent loop: {theme}", "Implement ReAct-style tutor step", ["capstone/src/tutor/mcp/agent_loop.py", "Log tool calls to capstone/logs/tools.jsonl"], "Agent loop"),
        ("Guardrails & permissions: {theme}", "Test allowlist and safety for {theme}", ["Expand capstone/src/tutor/policies/", "Run 10 adversarial tool requests"], "Security log"),
        ("Week {week} checkpoint", "Demo MCP-enabled tutor slice", ["Demo script in notes/week-{week:02d}/", "Commit all artifacts"], "Demo + commit"),
    ],
    "p6": [
        ("Plan sprint: {theme}", "Define scope and acceptance criteria", ["Write notes/week-{week:02d}/sprint-plan.md", "Link GitHub issues or checklist items"], "Sprint plan"),
        ("Build sprint: {theme}", "Implement capstone features for {theme}", ["Work across capstone/src/tutor/", "Keep commits small and descriptive"], "Feature commits"),
        ("Eval & observability: {theme}", "Instrument Langfuse/metrics for {theme}", ["capstone/src/tutor/observability/", "Dashboard or weekly report template"], "Observability config"),
        ("Quality gate: {theme}", "Run golden set + safety checks", ["capstone/eval/run_golden.py", "OWASP red-team subset"], "Eval report"),
        ("Week {week} checkpoint", "Stakeholder-ready artifact for {theme}", ["Update capstone/docs/runbook.md", "Retrospective"], "Runbook update"),
    ],
    "p7": [
        ("Research read: {theme}", "Deep-read one paper or repo for {theme}", ["EDM/AIED/arXiv source", "Structured notes in notes/week-{week:02d}/paper-notes.md"], "Paper notes"),
        ("Implementation: {theme}", "Reproduce key result or build artifact", ["Code in capstone/ or fork OSS repo", "Document deviations"], "Implementation repo"),
        ("Write & teach: {theme}", "Draft blog/talk/PR for {theme}", ["Outline in notes/week-{week:02d}/draft.md", "Peer review if possible"], "Draft document"),
        ("Community/OSS: {theme}", "Submit PR, blog, or workshop material", ["Follow GitHub contributing guide", "Track feedback"], "Published artifact link"),
        ("Week {week} checkpoint", "Expert track progress for {theme}", ["Update notes/portfolio-log.md", "Flashcards"], "Portfolio log entry"),
    ],
}


def _generated_days(week: int, phase: str, theme: str, area: str) -> list[DayPlan]:
    docs = PHASE_DOCS.get(phase, PHASE_DOCS["p7"])
    blueprint = PHASE_BLUEPRINTS.get(phase, PHASE_BLUEPRINTS["p7"])
    days: list[DayPlan] = []
    for i, (title_tpl, obj_tpl, lab_tpls, deliverable_tpl) in enumerate(blueprint, 1):
        fmt = {"week": week, "theme": theme, "area": area}
        title = title_tpl.format(**fmt)
        objective = obj_tpl.format(**fmt)
        lab = [step.format(**fmt) for step in lab_tpls]
        deliverable = deliverable_tpl.format(**fmt)
        primary = docs[i % len(docs)]
        secondary = docs[(i + 1) % len(docs)]
        repo = f"{PROJECT}/src/tutor/{area}/" if i in (2, 3) else f"notes/week-{week:02d}/"
        days.append(DayPlan(title, objective, [primary, secondary], lab, deliverable, repo))
    return days


def expanded_weeks() -> list[WeekPlan]:
    from curriculum_data_17_78 import HANDCRAFTED_17_78

    handcrafted = {**_handcrafted_p2_extra(), **HANDCRAFTED_17_78}
    plans: list[WeekPlan] = []
    for week, phase, theme, area in WEEK_THEMES:
        if week not in handcrafted:
            raise ValueError(f"Missing handcrafted plan for week {week}")
        days = [_day_from_tuple(week, i, spec, phase, area) for i, spec in enumerate(handcrafted[week], 1)]
        plans.append(WeekPlan(week, phase, theme, days))
    return plans
