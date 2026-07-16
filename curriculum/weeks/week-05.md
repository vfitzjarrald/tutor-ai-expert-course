# Week 05: Embeddings & semantic search

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Embeddings & semantic search* committed to this repo.

---

### Day 1 — Embedding fundamentals (60 min)

**Objective:** Similarity search for curriculum content

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI embeddings guide](https://platform.openai.com/docs/guides/embeddings) |
| Read | 15 | [MTEB leaderboard](https://huggingface.co/spaces/mteb/leaderboard) |
| Lab | 25 | Hands-on in `capstone/data/corpus//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI embeddings guide](https://platform.openai.com/docs/guides/embeddings) (~15 min)
- [MTEB leaderboard](https://huggingface.co/spaces/mteb/leaderboard) (~15 min)

#### Lab steps
1. Embed capstone/data/corpus/sample_units.jsonl
1. Compare 2 models; log in notes/

**Deliverable:** Embedding comparison

### Day 2 — Vector store setup (60 min)

**Objective:** Local Chroma or pgvector index

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Chroma docs](https://docs.trychroma.com/docs/overview) |
| Read | 10 | [pgvector README](https://github.com/pgvector/pgvector) |
| Lab | 25 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Chroma docs](https://docs.trychroma.com/docs/overview) (~15 min)
- [pgvector README](https://github.com/pgvector/pgvector) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/rag/vector_store.py
1. Ingest sample corpus

**Deliverable:** Vector index built

### Day 3 — Similarity queries (60 min)

**Objective:** Top-k retrieval and score inspection

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LlamaIndex retrieval](https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies/) |
| Lab | 35 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LlamaIndex retrieval](https://docs.llamaindex.ai/en/stable/optimizing/basic_strategies/basic_strategies/) (~15 min)

#### Lab steps
1. Add capstone/src/tutor/rag/retriever.py
1. Query 10 tutor questions manually

**Deliverable:** Retriever module

### Day 4 — Embedding eval (60 min)

**Objective:** Measure retrieval quality on labeled set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [BEIR benchmark paper](https://arxiv.org/abs/2104.08663) |
| Lab | 35 | Hands-on in `capstone/eval/retrieval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [BEIR benchmark paper](https://arxiv.org/abs/2104.08663) (~15 min)

#### Lab steps
1. Create 20 query-doc pairs in eval/retrieval/labeled.jsonl
1. Compute hit@3

**Deliverable:** Retrieval mini-benchmark

### Day 5 — Week 5 lab review (60 min)

**Objective:** Document embedding choice rationale

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Write capstone/docs/embedding-choice.md
1. Demo retrieval in CLI

**Deliverable:** Embedding ADR

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
