#!/usr/bin/env python3
"""Generate 78 weeks of 60-minute business-day lesson plans with embedded source links."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEEKS_DIR = ROOT / "curriculum" / "weeks"

MINUTES = 60
PROJECT = "capstone"


@dataclass
class DocLink:
    label: str
    url: str
    minutes: int = 15


@dataclass
class DayPlan:
    title: str
    objective: str
    docs: list[DocLink] = field(default_factory=list)
    lab_steps: list[str] = field(default_factory=list)
    deliverable: str = ""
    repo_path: str = ""


@dataclass
class WeekPlan:
    week: int
    phase: str
    theme: str
    days: list[DayPlan]


def p1_weeks() -> list[WeekPlan]:
    themes = [
        ("How LLMs work & tutor use cases", [
            ("Transformer intuition", "Explain tokens, context window, chat vs completion", [
                DocLink("3Blue1Brown — Attention visualized", "https://www.3blue1brown.com/topics/neural-networks", 20),
                DocLink("Anthropic — Intro to LLMs", "https://docs.anthropic.com/en/docs/intro-to-claude", 15),
            ], ["Sketch tutor I/O in notes/week-01/day-01-diagram.md", "List 5 tutor scenarios in notes/"], "Diagram + scenario list", "notes/week-01/"),
            ("Chat API anatomy", "Call an LLM with system/user/assistant roles", [
                DocLink("OpenAI Chat Completions", "https://platform.openai.com/docs/api-reference/chat", 15),
                DocLink("Anthropic Messages API", "https://docs.anthropic.com/en/api/messages", 15),
            ], ["Create capstone/src/tutor/llm/client.py wrapper", "Log tokens to capstone/logs/usage.jsonl"], "Working API client", f"{PROJECT}/src/tutor/llm/"),
            ("Sampling & temperature", "Tune consistency for pedagogical hints", [
                DocLink("Prompt Engineering Guide — LLM params", "https://www.promptingguide.ai/introduction/settings", 20),
            ], ["Run same prompt at temp 0, 0.3, 0.7", "Save outputs to labs/phase-01-rag/temperature/"], "Temperature comparison doc", "labs/phase-01-rag/temperature/"),
            ("Tutor failure modes", "Document hallucination, sycophancy, answer leakage", [
                DocLink("OpenAI Safety best practices", "https://platform.openai.com/docs/guides/safety-best-practices", 20),
            ], ["Run 10 adversarial student prompts", "Write policy rules in capstone/src/tutor/policies/tutor_policy.yaml"], "Policy YAML v0", f"{PROJECT}/src/tutor/policies/"),
            ("Week 1 integration lab", "CLI Socratic tutor that refuses final answers", [
                DocLink("Anthropic prompt engineering overview", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", 15),
            ], ["Implement capstone/src/tutor/cli/tutor_cli.py", "Add 10 golden tests in capstone/tests/test_tutor_policy.py"], "Passing policy tests", f"{PROJECT}/src/tutor/cli/"),
        ]),
        ("Prompting patterns for tutors", [
            ("System prompt architecture", "Structure persona, pedagogy, boundaries, escalation", [
                DocLink("Anthropic — System prompts", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts", 20),
                DocLink("Prompt Engineering Guide", "https://www.promptingguide.ai/", 15),
            ], ["Create capstone/src/tutor/prompts/system_socratic.yaml", "A/B two variants; score with rubric in eval/rubric.md"], "System prompt v1", f"{PROJECT}/src/tutor/prompts/"),
            ("Few-shot hint chains", "Embed gold hint sequences in-context", [
                DocLink("Few-shot prompting", "https://www.promptingguide.ai/techniques/fewshot", 20),
            ], ["Add 5 exemplars to capstone/data/prompts/hint_examples.jsonl", "Test consistency on 5 new items"], "Hint exemplar file", f"{PROJECT}/data/prompts/"),
            ("Hidden chain-of-thought", "Separate private reasoning from student-visible hints", [
                DocLink("OpenAI reasoning models guide", "https://platform.openai.com/docs/guides/reasoning", 15),
            ], ["Use XML tags for scratchpad in prompt template", "Verify no solution leakage in 20 runs"], "Leak-free prompt template", f"{PROJECT}/src/tutor/prompts/"),
            ("Structured tutor outputs", "JSON schema for hint_level, concept_id, next_question", [
                DocLink("OpenAI Structured Outputs", "https://platform.openai.com/docs/guides/structured-outputs", 20),
            ], ["Define capstone/src/tutor/schemas/hint_response.json", "Parse and validate in Python"], "Schema + validator", f"{PROJECT}/src/tutor/schemas/"),
            ("Eval harness v0", "Golden conversations with pass/fail automation", [
                DocLink("OpenAI Evals repo", "https://github.com/openai/evals", 15),
            ], ["Create capstone/eval/golden/conversations.yaml", "Script capstone/eval/run_golden.py"], "Baseline pass rate logged", f"{PROJECT}/eval/"),
        ]),
        ("Evaluation design for tutors", [
            ("Tutor rubrics", "Define pedagogy, accuracy, safety dimensions", [
                DocLink("RAGAS metrics overview", "https://docs.ragas.io/en/stable/concepts/metrics/", 20),
            ], ["Write capstone/eval/rubric/educator_rubric.md", "Score 5 manual sessions"], "Rubric document", f"{PROJECT}/eval/rubric/"),
            ("Automated checks", "Script structural and policy checks on outputs", [
                DocLink("LangChain evaluation", "https://python.langchain.com/docs/concepts/evaluation/", 15),
            ], ["Add capstone/eval/checks/policy_checks.py", "Wire into run_golden.py"], "Automated check suite", f"{PROJECT}/eval/checks/"),
            ("Regression baselines", "Snapshot metrics for future model upgrades", [
                DocLink("Google ML testing guide", "https://developers.google.com/machine-learning/testing-debugging", 15),
            ], ["Save baseline to capstone/eval/baselines/week-03.json", "Document methodology in notes/"], "Baseline file", f"{PROJECT}/eval/baselines/"),
            ("Human-in-the-loop sampling", "Design educator review workflow", [
                DocLink("Langfuse human annotation", "https://langfuse.com/docs/scores/manually", 15),
            ], ["Create capstone/eval/human/sample_queue.csv template", "Define review SLA in notes/"], "Review workflow doc", f"{PROJECT}/eval/human/"),
            ("Phase 1 eval sprint", "Integrate rubric + automated + golden set", [
                DocLink("OpenAI eval best practices", "https://platform.openai.com/docs/guides/evaluation", 15),
            ], ["Run full eval; fix top 3 failures", "Commit checkpoint checkpoints/phase-01-eval.md"], "Eval report", "checkpoints/"),
        ]),
        ("Safety & academic integrity", [
            ("Answer leakage prevention", "Detect and block doing homework for student", [
                DocLink("OWASP LLM Top 10", "https://owasp.org/www-project-top-10-for-large-language-model-applications/", 20),
            ], ["Expand policy checks for final-answer patterns", "Add 15 leakage test cases"], "Leakage test suite", f"{PROJECT}/eval/golden/"),
            ("Jailbreak resistance", "Test role-play and instruction override attacks", [
                DocLink("OWASP LLM01 Prompt Injection", "https://owasp.org/www-project-top-10-for-large-language-model-applications/", 15),
            ], ["Run red-team prompt list", "Update system prompt mitigations"], "Red-team log", "notes/week-04/"),
            ("Age-appropriate tone", "Tune hints for target learner band", [
                DocLink("UNESCO AI in education", "https://www.unesco.org/en/digital-education/artificial-intelligence", 15),
            ], ["Add grade_band param to prompts", "Test 3 reading levels"], "Grade-band prompt variants", f"{PROJECT}/src/tutor/prompts/"),
            ("Escalation to human", "When tutor should defer to educator", [
                DocLink("Anthropic responsible use", "https://www.anthropic.com/responsible-disclosure-policy", 10),
            ], ["Implement escalation rules in tutor_policy.yaml", "Test 5 escalation triggers"], "Escalation policy", f"{PROJECT}/src/tutor/policies/"),
            ("Week 4 review", "Consolidate safety docs + tests", [], ["Merge all week 4 artifacts", "Update README safety section"], "Safety section in README", f"{PROJECT}/"),
        ]),
        ("Embeddings & semantic search", [
            ("Embedding fundamentals", "Similarity search for curriculum content", [
                DocLink("OpenAI embeddings guide", "https://platform.openai.com/docs/guides/embeddings", 15),
                DocLink("MTEB leaderboard", "https://huggingface.co/spaces/mteb/leaderboard", 15),
            ], ["Embed capstone/data/corpus/sample_units.jsonl", "Compare 2 models; log in notes/"], "Embedding comparison", f"{PROJECT}/data/corpus/"),
            ("Vector store setup", "Local Chroma or pgvector index", [
                DocLink("Chroma docs", "https://docs.trychroma.com/docs/overview", 15),
                DocLink("pgvector README", "https://github.com/pgvector/pgvector", 10),
            ], ["Implement capstone/src/tutor/rag/vector_store.py", "Ingest sample corpus"], "Vector index built", f"{PROJECT}/src/tutor/rag/"),
            ("Similarity queries", "Top-k retrieval and score inspection", [
                DocLink("LlamaIndex retrieval", "https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies/", 15),
            ], ["Add capstone/src/tutor/rag/retriever.py", "Query 10 tutor questions manually"], "Retriever module", f"{PROJECT}/src/tutor/rag/"),
            ("Embedding eval", "Measure retrieval quality on labeled set", [
                DocLink("BEIR benchmark paper", "https://arxiv.org/abs/2104.08663", 15),
            ], ["Create 20 query-doc pairs in eval/retrieval/labeled.jsonl", "Compute hit@3"], "Retrieval mini-benchmark", f"{PROJECT}/eval/retrieval/"),
            ("Week 5 lab review", "Document embedding choice rationale", [], ["Write capstone/docs/embedding-choice.md", "Demo retrieval in CLI"], "Embedding ADR", f"{PROJECT}/docs/"),
        ]),
        ("Chunking & metadata", [
            ("Chunking strategies", "Token windows vs semantic splits", [
                DocLink("Pinecone chunking strategies", "https://www.pinecone.io/learn/chunking-strategies/", 20),
                DocLink("LlamaIndex node parser", "https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/", 15),
            ], ["Implement capstone/src/tutor/rag/chunker.py", "Try 256/512/1024 token sizes"], "Chunker with config", f"{PROJECT}/src/tutor/rag/"),
            ("Metadata design", "grade, unit, skill_id, difficulty filters", [
                DocLink("LangChain metadata filtering", "https://python.langchain.com/docs/how_to/vectorstore_retrieval/", 15),
            ], ["Add metadata schema to corpus JSONL", "Filter queries in retriever"], "Metadata schema", f"{PROJECT}/data/corpus/"),
            ("Ingestion pipeline", "PDF/Markdown → chunks → index", [
                DocLink("LangChain document loaders", "https://python.langchain.com/docs/how_to/document_loader_pdf/", 15),
            ], ["Build capstone/src/tutor/rag/ingest.py CLI", "Ingest labs/phase-01-rag/sample-textbook/"], "Ingest CLI", f"{PROJECT}/src/tutor/rag/"),
            ("Cross-unit leakage tests", "Ensure filters prevent wrong-grade content", [], ["Write 10 cross-unit test queries", "Fix retriever if leakage found"], "Leakage test results", f"{PROJECT}/eval/retrieval/"),
            ("Chunking benchmark", "Pick winning chunk size for domain", [], ["Save results to eval/retrieval/chunk_benchmark.json", "Update embedding-choice.md"], "Benchmark report", f"{PROJECT}/eval/retrieval/"),
        ]),
        ("RAG tutor pipeline", [
            ("RAG architecture", "Retrieve → augment → generate flow", [
                DocLink("LangChain RAG tutorial", "https://python.langchain.com/docs/tutorials/rag/", 25),
            ], ["Implement capstone/src/tutor/rag/pipeline.py", "Wire retriever + LLM client"], "End-to-end RAG pipeline", f"{PROJECT}/src/tutor/rag/"),
            ("Citation-enforced prompts", "Require source IDs in tutor output", [
                DocLink("LlamaIndex production RAG", "https://docs.llamaindex.ai/en/stable/optimizing/production_rag/", 15),
            ], ["Update system prompt with citation rules", "Validate citations in post-processor"], "Citation validator", f"{PROJECT}/src/tutor/rag/"),
            ("Ungrounded vs grounded A/B", "Measure hallucination reduction", [
                DocLink("RAGAS faithfulness", "https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/", 15),
            ], ["Run 20 questions both modes", "Log in eval/rag/comparison.json"], "A/B comparison data", f"{PROJECT}/eval/rag/"),
            ("Latency & cost", "Profile retrieval + generation", [
                DocLink("OpenAI latency guide", "https://platform.openai.com/docs/guides/latency-optimization", 10),
            ], ["Add timing logs to pipeline", "Identify top bottleneck"], "Performance profile", f"{PROJECT}/logs/"),
            ("RAG tutor CLI integration", "Student asks; tutor cites curriculum", [], ["Connect RAG to tutor_cli.py", "Demo 5 grounded sessions"], "Grounded tutor demo", f"{PROJECT}/src/tutor/cli/"),
        ]),
        ("RAGAS & Phase 1 gate", [
            ("RAGAS setup", "Automated RAG quality metrics", [
                DocLink("RAGAS quickstart", "https://docs.ragas.io/en/stable/getstarted/quickstart/", 25),
            ], ["Install ragas in capstone/requirements.txt", "Script eval/rag/ragas_run.py"], "RAGAS script", f"{PROJECT}/eval/rag/"),
            ("Faithfulness & context precision", "Interpret tutor-specific metrics", [
                DocLink("RAGAS metrics", "https://docs.ragas.io/en/stable/concepts/metrics/", 15),
            ], ["Run on 15 tutor Q&A pairs", "Set thresholds in eval/rag/thresholds.yaml"], "Threshold config", f"{PROJECT}/eval/rag/"),
            ("Fix retrieval failures", "Tune chunk size, k, prompts from metrics", [], ["Iterate until faithfulness > 0.8 on golden set", "Document changes"], "Metric improvement log", f"{PROJECT}/docs/"),
            ("Phase 1 checkpoint doc", "Summarize artifacts and demo script", [], ["Write checkpoints/phase-01-complete.md", "Record 3-min demo script"], "Phase 1 gate passed", "checkpoints/"),
            ("Retrospective", "Notes + flashcards for phase 1", [], ["5 flashcards in notes/flashcards/phase-01.md", "Week retrospective"], "Flashcards", "notes/flashcards/"),
        ]),
    ]
    return _build_weeks("p1", 1, themes)


def p2_weeks() -> list[WeekPlan]:
    themes = [
        ("Intelligent Tutoring Systems foundations", [
            ("ITS history & models", "Explain cognitive tutors vs LLM tutors", [
                DocLink("VanLehn ITS survey (PDF)", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 25),
            ], ["Summarize 1 page in notes/week-09/its-survey.md", "List 5 ITS design principles"], "ITS summary", "notes/week-09/"),
            ("Bloom 2-sigma & mastery learning", "Why personalization matters", [
                DocLink("Bloom 2 sigma (PDF)", "https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf", 20),
            ], ["Map principles to your tutor design in notes/", "Add mastery flags to policy YAML"], "Design mapping doc", "notes/week-09/"),
            ("CMU OLI case study", "Study adaptive courseware patterns", [
                DocLink("CMU Open Learning Initiative", "https://oli.cmu.edu/", 15),
            ], ["Browse one OLI course structure", "Extract 3 adaptivity patterns"], "OLI pattern notes", "notes/week-09/"),
            ("Tutor loop design", "Sense → decide → act → assess cycle", [
                DocLink("Lilian Weng — LLM agents", "https://lilianweng.github.io/posts/2023-06-23-agent/", 15),
            ], ["Diagram loop in capstone/docs/tutor-loop.md", "Identify which steps are automated"], "Tutor loop diagram", f"{PROJECT}/docs/"),
            ("Week 9 integration", "Align capstone README with ITS framing", [], ["Update capstone README mission", "Link ITS principles"], "Updated README", f"{PROJECT}/"),
        ]),
        ("Knowledge maps & prerequisite graphs", [
            ("Competency frameworks", "Map standards to atomic skills", [
                DocLink("Bloom's taxonomy (Vanderbilt)", "https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/", 15),
            ], ["Pick subject; list 20 skills in capstone/data/graph/skills.json", "Tag difficulty 1-5"], "skills.json v1", f"{PROJECT}/data/graph/"),
            ("Prerequisite DAG", "Directed acyclic skill dependencies", [
                DocLink("Knowledge Space Theory book", "https://link.springer.com/book/10.1007/978-1-4612-5082-8", 15),
            ], ["Add edges to capstone/data/graph/prerequisites.jsonl", "Validate acyclic with script"], "Prerequisite file", f"{PROJECT}/data/graph/"),
            ("Misconception nodes", "Link errors to remediation", [
                DocLink("VanLehn misconceptions section", "https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf", 15),
            ], ["Add capstone/data/graph/misconceptions.jsonl", "Write 5 diagnostic questions"], "Misconception map", f"{PROJECT}/data/graph/"),
            ("JSON schema & validation", "Machine-readable curriculum graph", [
                DocLink("JSON Schema spec", "https://json-schema.org/learn/getting-started-step-by-step", 10),
            ], ["Add capstone/data/graph/schema.json", "Validate all graph files"], "Validated graph bundle", f"{PROJECT}/data/graph/"),
            ("Next-skill recommender", "Topological sort given mastery set", [
                DocLink("NetworkX docs", "https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.topological_sort.html", 10),
            ], ["Implement capstone/src/tutor/graph/sequencer.py", "Test 3 student profiles"], "Sequencer module", f"{PROJECT}/src/tutor/graph/"),
        ]),
    ]
    # Weeks 11-16 expanded in weeks_expanded.py
    extra = []
    weeks = _build_weeks("p2", 9, themes)
    return weeks


def all_week_plans() -> list[WeekPlan]:
    from weeks_expanded import expanded_weeks

    plans = {w.week: w for w in p1_weeks()}
    for w in p2_weeks():
        plans[w.week] = w
    for w in expanded_weeks():
        plans[w.week] = w
    return [plans[i] for i in range(1, 79)]


def _build_weeks(phase: str, start: int, themes: list) -> list[WeekPlan]:
    weeks = []
    for offset, (theme, day_specs) in enumerate(themes):
        week_num = start + offset
        days = []
        for j, spec in enumerate(day_specs, 1):
            title, objective, docs, lab, deliverable, repo = spec
            days.append(DayPlan(title, objective, docs, lab, deliverable, repo))
        weeks.append(WeekPlan(week_num, phase, theme, days))
    return weeks


def render_day(week: int, day_idx: int, day: DayPlan) -> str:
    lines = [
        f"### Day {day_idx} — {day.title} ({MINUTES} min)",
        "",
        f"**Objective:** {day.objective}",
        "",
        "#### Timed schedule",
        "| Block | Minutes | Activity |",
        "|-------|---------|----------|",
    ]
    if day.docs:
        d0 = day.docs[0]
        lines.append(f"| Read | {d0.minutes} | [{d0.label}]({d0.url}) |")
        remaining_read = sum(d.minutes for d in day.docs[1:])
        if day.docs[1:]:
            links = ", ".join(f"[{d.label}]({d.url})" for d in day.docs[1:])
            lines.append(f"| Read | {remaining_read} | {links} |")
    lab_min = max(25, MINUTES - sum(d.minutes for d in day.docs) - 10)
    lines.extend([
        f"| Lab | {lab_min} | Hands-on in `{day.repo_path or PROJECT}/` |",
        "| Deliver | 10 | Write deliverable + commit |",
        "",
        "#### Source documentation (open these — no external hunting)",
    ])
    for d in day.docs:
        lines.append(f"- [{d.label}]({d.url}) (~{d.minutes} min)")
    lines.extend(["", "#### Lab steps"])
    for step in day.lab_steps:
        lines.append(f"1. {step}")
    lines.extend(["", f"**Deliverable:** {day.deliverable}", ""])
    return "\n".join(lines)


def render_week(plan: WeekPlan) -> str:
    phase_names = {
        "p1": "Phase 1 — AI & RAG Foundations",
        "p2": "Phase 2 — Tutor Architecture & Knowledge Maps",
        "p3": "Phase 3 — Graph Databases & Student Modeling",
        "p4": "Phase 4 — Advanced RAG & GraphRAG",
        "p5": "Phase 5 — MCP & Agentic Tutors",
        "p6": "Phase 6 — Capstone & Production",
        "p7": "Phase 7 — Expert Mastery Track",
    }
    header = [
        f"# Week {plan.week:02d}: {plan.theme}",
        "",
        f"- **Phase:** {phase_names.get(plan.phase, plan.phase)}",
        f"- **Time:** 5 business days × {MINUTES} min = {MINUTES * 5 // 60}h/week",
        f"- **Capstone touchpoint:** `{PROJECT}/`",
        "",
        "## Weekly outcomes",
        f"By Friday you will have concrete artifacts for *{plan.theme}* committed to this repo.",
        "",
        "---",
        "",
    ]
    body = []
    for i, day in enumerate(plan.days, 1):
        body.append(render_day(plan.week, i, day))
    footer = [
        "---",
        "",
        "## Phase resources",
        "- [Resource library](../RESOURCES.md)",
        "- [Knowledge checks](../CHECKS.md)",
        "- [Course index](../INDEX.md)",
        "",
    ]
    return "\n".join(header + body + footer)


def main() -> None:
    WEEKS_DIR.mkdir(parents=True, exist_ok=True)
    for plan in all_week_plans():
        path = WEEKS_DIR / f"week-{plan.week:02d}.md"
        path.write_text(render_week(plan), encoding="utf-8")
    print(f"Generated 78 week files in {WEEKS_DIR}")


if __name__ == "__main__":
    main()
