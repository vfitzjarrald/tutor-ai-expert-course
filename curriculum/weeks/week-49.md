# Week 49: Performance & cost optimization

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Performance & cost optimization* committed to this repo.

---

### Day 1 — Cost baseline measurement (60 min)

**Objective:** Measure token and API costs per tutor session

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI pricing](https://openai.com/api/pricing/) |
| Read | 15 | [Langfuse cost tracking](https://langfuse.com/docs/tracing-features/token-and-cost-tracking) |
| Lab | 25 | Hands-on in `capstone/logs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI pricing](https://openai.com/api/pricing/) (~15 min)
- [Langfuse cost tracking](https://langfuse.com/docs/tracing-features/token-and-cost-tracking) (~15 min)

#### Lab steps
1. Log token usage per session to capstone/logs/cost.jsonl
1. Calculate average cost per 5-turn session

**Deliverable:** Cost baseline

### Day 2 — Retrieval cost optimization (60 min)

**Objective:** Reduce embedding and rerank API calls without quality loss

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI batch API](https://platform.openai.com/docs/guides/batch) |
| Read | 10 | [Caching embeddings](https://platform.openai.com/docs/guides/embeddings) |
| Lab | 25 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI batch API](https://platform.openai.com/docs/guides/batch) (~15 min)
- [Caching embeddings](https://platform.openai.com/docs/guides/embeddings) (~10 min)

#### Lab steps
1. Add embedding cache in capstone/src/tutor/rag/embedding_cache.py
1. Measure cost reduction on 20 sessions

**Deliverable:** Embedding cache

### Day 3 — LLM call reduction (60 min)

**Objective:** Use smaller model for routing; reserve large model for hint generation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI model selection](https://platform.openai.com/docs/models) |
| Read | 10 | [Anthropic model overview](https://docs.anthropic.com/en/docs/about-claude/models) |
| Lab | 25 | Hands-on in `capstone/src/tutor/llm//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI model selection](https://platform.openai.com/docs/models) (~15 min)
- [Anthropic model overview](https://docs.anthropic.com/en/docs/about-claude/models) (~10 min)

#### Lab steps
1. Route query_router intent classification to cheap model
1. Compare quality on capstone/eval/golden/conversations.yaml

**Deliverable:** Model routing config

### Day 4 — Latency optimization pass (60 min)

**Objective:** Parallelize retrieval and graph queries where possible

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Python asyncio gather](https://docs.python.org/3/library/asyncio-task.html#asyncio.gather) |
| Read | 10 | [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization) |
| Lab | 25 | Hands-on in `capstone/eval/performance//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python asyncio gather](https://docs.python.org/3/library/asyncio-task.html#asyncio.gather) (~15 min)
- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization) (~10 min)

#### Lab steps
1. Add async parallel fetch in orchestrator for graph + retrieval
1. Log p95 latency improvement to capstone/eval/performance/optimized.json

**Deliverable:** Latency improvement log

### Day 5 — Week 49 checkpoint (60 min)

**Objective:** Cost and latency report with optimization recommendations

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [FinOps foundation](https://www.finops.org/introduction/what-is-finops/) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [FinOps foundation](https://www.finops.org/introduction/what-is-finops/) (~10 min)

#### Lab steps
1. Write capstone/docs/cost-performance-report.md
1. Set cost alert threshold in capstone/docs/runbook.md

**Deliverable:** Cost/performance report

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
