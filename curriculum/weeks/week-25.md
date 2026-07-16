# Week 25: Hybrid BM25 + vector search

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Hybrid BM25 + vector search* committed to this repo.

---

### Day 1 — BM25 sparse retrieval fundamentals (60 min)

**Objective:** Understand TF-IDF and BM25 for curriculum keyword search

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Elastic BM25 explainer](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables) |
| Read | 10 | [rank_bm25 Python](https://github.com/dorianbrown/rank_bm25) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Elastic BM25 explainer](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables) (~20 min)
- [rank_bm25 Python](https://github.com/dorianbrown/rank_bm25) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/bm25_index.py over corpus tokens
1. Index capstone/data/corpus/sample_units.jsonl

**Deliverable:** BM25 index module

### Day 2 — Hybrid alpha-blended search (60 min)

**Objective:** Combine BM25 and dense vector scores with tunable alpha

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Weaviate hybrid search](https://weaviate.io/developers/weaviate/concepts/search/hybrid-search) |
| Read | 10 | [OpenAI embeddings guide](https://platform.openai.com/docs/guides/embeddings) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Weaviate hybrid search](https://weaviate.io/developers/weaviate/concepts/search/hybrid-search) (~20 min)
- [OpenAI embeddings guide](https://platform.openai.com/docs/guides/embeddings) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/graphrag/hybrid_retriever.py with alpha parameter
1. Run 20 tutor queries at alpha 0.0, 0.5, 1.0

**Deliverable:** Hybrid retriever

### Day 3 — Hybrid weight tuning (60 min)

**Objective:** Find optimal alpha for curriculum Q&A retrieval quality

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [BEIR benchmark](https://arxiv.org/abs/2104.08663) |
| Read | 10 | [LlamaIndex retriever modes](https://docs.llamaindex.ai/en/stable/examples/query_engine/retriever_modes/) |
| Lab | 25 | Hands-on in `capstone/eval/retrieval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [BEIR benchmark](https://arxiv.org/abs/2104.08663) (~15 min)
- [LlamaIndex retriever modes](https://docs.llamaindex.ai/en/stable/examples/query_engine/retriever_modes/) (~10 min)

#### Lab steps
1. Benchmark on capstone/eval/retrieval/labeled.jsonl
1. Save best alpha to capstone/eval/retrieval/hybrid_tuning.json

**Deliverable:** Optimal alpha config

### Day 4 — Integrate hybrid into RAG pipeline (60 min)

**Objective:** Replace pure vector retriever with hybrid in tutor pipeline

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain ensemble retriever](https://python.langchain.com/docs/how_to/ensemble_retriever/) |
| Read | 10 | [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain ensemble retriever](https://python.langchain.com/docs/how_to/ensemble_retriever/) (~15 min)
- [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/) (~10 min)

#### Lab steps
1. Update capstone/src/tutor/rag/pipeline.py to use hybrid_retriever
1. Verify citations still validate in post-processor

**Deliverable:** Hybrid RAG pipeline

### Day 5 — Week 25 checkpoint (60 min)

**Objective:** Document hybrid retrieval wins and commit benchmark report

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Pinecone hybrid search](https://www.pinecone.io/learn/hybrid-search/) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Pinecone hybrid search](https://www.pinecone.io/learn/hybrid-search/) (~10 min)

#### Lab steps
1. Write capstone/docs/hybrid-retrieval.md with benchmark summary
1. Update capstone README retrieval section

**Deliverable:** Hybrid retrieval ADR

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
