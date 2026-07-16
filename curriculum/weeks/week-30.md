# Week 30: GraphRAG query modes

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *GraphRAG query modes* committed to this repo.

---

### Day 1 — GraphRAG local search mode (60 min)

**Objective:** Query single-entity neighborhoods for specific skill questions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG local search docs](https://microsoft.github.io/graphrag/query/local_search/) |
| Read | 10 | [Entity-centric retrieval](https://arxiv.org/abs/2404.16130) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG local search docs](https://microsoft.github.io/graphrag/query/local_search/) (~20 min)
- [Entity-centric retrieval](https://arxiv.org/abs/2404.16130) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/local_search.py
1. Test 10 entity-specific tutor questions

**Deliverable:** local_search.py

### Day 2 — GraphRAG global search mode (60 min)

**Objective:** Map-reduce over community summaries for broad questions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG global search docs](https://microsoft.github.io/graphrag/query/global_search/) |
| Read | 10 | [LlamaIndex sub-question engine](https://docs.llamaindex.ai/en/stable/examples/query_engine/sub_question_query_engine/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG global search docs](https://microsoft.github.io/graphrag/query/global_search/) (~20 min)
- [LlamaIndex sub-question engine](https://docs.llamaindex.ai/en/stable/examples/query_engine/sub_question_query_engine/) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/global_search.py
1. Test 5 broad curriculum overview questions

**Deliverable:** global_search.py

### Day 3 — Hybrid GraphRAG + vector fallback (60 min)

**Objective:** Combine GraphRAG modes with vector search for coverage

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GraphRAG query overview](https://microsoft.github.io/graphrag/query/overview/) |
| Read | 10 | [LangChain ensemble retriever](https://python.langchain.com/docs/how_to/ensemble_retriever/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG query overview](https://microsoft.github.io/graphrag/query/overview/) (~15 min)
- [LangChain ensemble retriever](https://python.langchain.com/docs/how_to/ensemble_retriever/) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/graphrag/hybrid_query.py merging local + vector
1. Compare recall on capstone/eval/retrieval/labeled.jsonl

**Deliverable:** hybrid_query.py

### Day 4 — Query mode routing logic (60 min)

**Objective:** Route tutor questions to local, global, or vector by intent

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Function calling guide](https://www.promptingguide.ai/applications/function_calling) |
| Read | 10 | [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Function calling guide](https://www.promptingguide.ai/applications/function_calling) (~15 min)
- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/query_router.py with intent classifier
1. Test routing on 20 labeled question types

**Deliverable:** query_router.py

### Day 5 — Week 30 checkpoint (60 min)

**Objective:** End-to-end GraphRAG tutor query demo

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GraphRAG examples](https://github.com/microsoft/graphrag/tree/main/examples) |
| Lab | 40 | Hands-on in `notes/week-30//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG examples](https://github.com/microsoft/graphrag/tree/main/examples) (~10 min)

#### Lab steps
1. Wire query_router into tutor_cli.py
1. Record demo in notes/week-30/graphrag-query-demo.md

**Deliverable:** GraphRAG query demo

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
