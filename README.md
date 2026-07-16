# Tutor-Based AI Expert Course

Self-paced curriculum to become an expert in **tutor-based AI**: knowledge maps, graph databases, RAG, GraphRAG, MCP, and production agentic tutors.

**78 weeks · 60 min/business day · ~390 hours · Mon–Fri**

## Quick start

1. Clone this repo and open it in Cursor (or your editor).
2. Set your start date: [`curriculum/start-date.txt`](curriculum/start-date.txt) (Monday of Week 1).
3. Open this week's lesson: [`curriculum/weeks/week-01.md`](curriculum/weeks/week-01.md).
4. Follow each day block — **all source links are embedded** (no hunting).
5. Build in [`capstone/`](capstone/) — the integrated tutor project.
6. Track phase gates in [`checkpoints/`](checkpoints/).

### Cursor learning plan (optional)

Open [`canvases/tutor-ai-expert-learning-plan.canvas.tsx`](canvases/tutor-ai-expert-learning-plan.canvas.tsx) for the interactive overview, knowledge map, resource library, and lesson launcher.

### Portable Word workbook

Download [`exports/tutor-ai-expert-course.docx`](exports/tutor-ai-expert-course.docx) for offline study with note spaces on every lesson day. Regenerate with:

```bash
pip install -r requirements.txt
python3 scripts/export_course_doc.py
```

## Repository layout

```
tutor-ai-expert-course/
├── curriculum/          # Lesson plans (week-01 … week-78)
├── capstone/            # End-to-end adaptive tutor (pre-wired modules)
├── labs/                # Phase-specific sandboxes
├── notes/               # Your summaries & flashcards
├── checkpoints/         # Phase gate evidence
├── exports/             # Portable Word workbook (.docx)
├── resources/           # Bundled link index
├── scripts/             # Lesson generator & GitHub packaging
├── automations/         # Cursor weekday-noon study automation
├── canvases/            # Cursor learning-plan canvas
└── docs/                # Publishing & setup guides
```

## Capstone modules

| Module | Path | Phase |
|--------|------|-------|
| LLM client & prompts | `capstone/src/tutor/llm/`, `prompts/` | 1 |
| RAG pipeline | `capstone/src/tutor/rag/` | 1–4 |
| Knowledge graph | `capstone/src/tutor/graph/`, `data/graph/` | 2–3 |
| Student modeling | `capstone/src/tutor/student_model/` | 3 |
| GraphRAG | `capstone/src/tutor/graphrag/` | 4 |
| MCP tools | `capstone/src/tutor/mcp/` | 5 |
| Eval & observability | `capstone/eval/`, `capstone/src/tutor/observability/` | 1–6 |

## Milestones

| Week | Level |
|------|-------|
| 8 | Competent — RAG tutor + eval |
| 24 | Proficient — graph + student model |
| 40 | Advanced — GraphRAG + MCP agent |
| 52 | Expert-ready — production capstone |
| 78 | Recognized expert |

## Scripts

| Command | Purpose |
|---------|---------|
| `python3 scripts/generate_lessons.py` | Regenerate all 78 week markdown files from curriculum data |
| `python3 scripts/export_course_doc.py` | Build portable Word workbook in `exports/` |
| `./scripts/package_for_github.sh` | Pre-flight checks before pushing to GitHub |

## Publish to GitHub

See [`docs/GITHUB.md`](docs/GITHUB.md) for create-repo, push, and release instructions.

```bash
./scripts/package_for_github.sh
git add -A && git commit -m "Initial release: 78-week tutor AI expert curriculum"
gh repo create tutor-ai-expert-course --public --source=. --remote=origin
git push -u origin main
```

## License

[MIT](LICENSE)
