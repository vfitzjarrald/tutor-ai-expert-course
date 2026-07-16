# Week 26: Reranking with cross-encoders

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Reranking with cross-encoders* committed to this repo.

---

### Day 1 — Bi-encoder vs cross-encoder theory (60 min)

**Objective:** Understand two-stage retrieval and reranking tradeoffs

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [ColBERT paper](https://arxiv.org/abs/2004.12832) |
| Read | 15 | [SBERT cross-encoder](https://www.sbert.net/examples/applications/cross-encoder/README.html) |
| Lab | 25 | Hands-on in `notes/week-26//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [ColBERT paper](https://arxiv.org/abs/2004.12832) (~20 min)
- [SBERT cross-encoder](https://www.sbert.net/examples/applications/cross-encoder/README.html) (~15 min)

#### Lab steps
1. Write notes/week-26/rerank-theory.md comparing bi-encoder and cross-encoder
1. Estimate latency budget for tutor reranking

**Deliverable:** Rerank theory notes

### Day 2 — Cohere Rerank integration (60 min)

**Objective:** Add cross-encoder rerank step after initial retrieval

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Cohere Rerank docs](https://docs.cohere.com/docs/rerank) |
| Read | 10 | [Cohere Rerank API](https://docs.cohere.com/reference/rerank) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Cohere Rerank docs](https://docs.cohere.com/docs/rerank) (~20 min)
- [Cohere Rerank API](https://docs.cohere.com/reference/rerank) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/reranker.py using Cohere or local cross-encoder
1. Rerank top-20 to top-5 for 10 queries

**Deliverable:** reranker.py module

### Day 3 — Rerank latency profiling (60 min)

**Objective:** Measure rerank overhead and set timeout budgets

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization) |
| Read | 10 | [Python timeit](https://docs.python.org/3/library/timeit.html) |
| Lab | 25 | Hands-on in `capstone/logs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI latency optimization](https://platform.openai.com/docs/guides/latency-optimization) (~15 min)
- [Python timeit](https://docs.python.org/3/library/timeit.html) (~10 min)

#### Lab steps
1. Add timing logs to capstone/logs/rerank_profile.jsonl
1. Set 500ms rerank timeout in config

**Deliverable:** Latency profile

### Day 4 — Two-stage retrieve-then-rerank (60 min)

**Objective:** Wire retrieve k=20 → rerank k=5 in graphrag pipeline

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LlamaIndex CohereRerank](https://docs.llamaindex.ai/en/stable/examples/query_engine/CohereRerank/) |
| Read | 10 | [RAGAS context precision](https://docs.ragas.io/en/stable/concepts/metrics/context_precision/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LlamaIndex CohereRerank](https://docs.llamaindex.ai/en/stable/examples/query_engine/CohereRerank/) (~15 min)
- [RAGAS context precision](https://docs.ragas.io/en/stable/concepts/metrics/context_precision/) (~10 min)

#### Lab steps
1. Update capstone/src/tutor/graphrag/pipeline.py with two-stage flow
1. Compare hit@5 before and after rerank

**Deliverable:** Two-stage pipeline

### Day 5 — Week 26 checkpoint (60 min)

**Objective:** RAGAS context precision improvement report

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [RAGAS metrics overview](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 35 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS metrics overview](https://docs.ragas.io/en/stable/concepts/metrics/) (~15 min)

#### Lab steps
1. Run capstone/eval/rag/ragas_run.py on reranked pipeline
1. Save results to capstone/eval/rag/rerank_benchmark.json

**Deliverable:** Rerank benchmark report

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
