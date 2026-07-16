# Week 06: Chunking & metadata

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Chunking & metadata* committed to this repo.

---

### Day 1 — Chunking strategies (60 min)

**Objective:** Token windows vs semantic splits

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Pinecone chunking strategies](https://www.pinecone.io/learn/chunking-strategies/) |
| Read | 15 | [LlamaIndex node parser](https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Pinecone chunking strategies](https://www.pinecone.io/learn/chunking-strategies/) (~20 min)
- [LlamaIndex node parser](https://docs.llamaindex.ai/en/stable/module_guides/loading/node_parsers/) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/rag/chunker.py
1. Try 256/512/1024 token sizes

**Deliverable:** Chunker with config

### Day 2 — Metadata design (60 min)

**Objective:** grade, unit, skill_id, difficulty filters

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain metadata filtering](https://python.langchain.com/docs/how_to/vectorstore_retrieval/) |
| Lab | 35 | Hands-on in `capstone/data/corpus//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain metadata filtering](https://python.langchain.com/docs/how_to/vectorstore_retrieval/) (~15 min)

#### Lab steps
1. Add metadata schema to corpus JSONL
1. Filter queries in retriever

**Deliverable:** Metadata schema

### Day 3 — Ingestion pipeline (60 min)

**Objective:** PDF/Markdown → chunks → index

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain document loaders](https://python.langchain.com/docs/how_to/document_loader_pdf/) |
| Lab | 35 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain document loaders](https://python.langchain.com/docs/how_to/document_loader_pdf/) (~15 min)

#### Lab steps
1. Build capstone/src/tutor/rag/ingest.py CLI
1. Ingest labs/phase-01-rag/sample-textbook/

**Deliverable:** Ingest CLI

### Day 4 — Cross-unit leakage tests (60 min)

**Objective:** Ensure filters prevent wrong-grade content

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone/eval/retrieval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Write 10 cross-unit test queries
1. Fix retriever if leakage found

**Deliverable:** Leakage test results

### Day 5 — Chunking benchmark (60 min)

**Objective:** Pick winning chunk size for domain

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone/eval/retrieval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Save results to eval/retrieval/chunk_benchmark.json
1. Update embedding-choice.md

**Deliverable:** Benchmark report

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
