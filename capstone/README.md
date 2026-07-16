# Capstone — Adaptive AI Tutor

Integrated project for the full curriculum. Modules unlock by phase:

| Phase | Module | Status |
|-------|--------|--------|
| 1 | `src/tutor/llm/`, `rag/`, `eval/` | Start Week 1 |
| 2 | `src/tutor/graph/`, `data/graph/` | Week 9 |
| 3 | `student_model/`, Neo4j | Week 17 |
| 4 | `graphrag/` | Week 25 |
| 5 | `mcp/` | Week 33 |
| 6 | `observability/`, production hardening | Week 41 |

## Setup

```bash
cd capstone
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add API keys
```

## Run tutor CLI (after Week 1 Day 2)

```bash
python -m tutor.cli.tutor_cli
```

## Run eval golden set (after Week 2 Day 5)

```bash
python eval/run_golden.py
```
