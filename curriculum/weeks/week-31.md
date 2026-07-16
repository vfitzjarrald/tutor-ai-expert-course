# Week 31: Multimodal content retrieval (optional)

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Multimodal content retrieval (optional)* committed to this repo.

---

### Day 1 — Multimodal embedding fundamentals (60 min)

**Objective:** Study CLIP and multimodal retrieval for diagrams

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [CLIP paper](https://arxiv.org/abs/2103.00020) |
| Read | 15 | [LlamaIndex GPT-4V retrieval](https://docs.llamaindex.ai/en/stable/examples/multi_modal/gpt4v_multi_modal_retrieval/) |
| Lab | 25 | Hands-on in `notes/week-31//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [CLIP paper](https://arxiv.org/abs/2103.00020) (~20 min)
- [LlamaIndex GPT-4V retrieval](https://docs.llamaindex.ai/en/stable/examples/multi_modal/gpt4v_multi_modal_retrieval/) (~15 min)

#### Lab steps
1. Survey multimodal options in notes/week-31/multimodal-survey.md
1. Pick embedding model for capstone diagrams

**Deliverable:** Multimodal survey

### Day 2 — Ingest diagram assets (60 min)

**Objective:** Add image chunks with captions to curriculum corpus

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain image loaders](https://python.langchain.com/docs/how_to/document_loader_image/) |
| Read | 10 | [Pillow docs](https://pillow.readthedocs.io/en/stable/) |
| Lab | 25 | Hands-on in `capstone/data/corpus//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain image loaders](https://python.langchain.com/docs/how_to/document_loader_image/) (~15 min)
- [Pillow docs](https://pillow.readthedocs.io/en/stable/) (~10 min)

#### Lab steps
1. Add capstone/data/corpus/diagrams/ with 10 sample images + captions JSONL
1. Run capstone/src/tutor/rag/ingest.py on diagram folder

**Deliverable:** Diagram corpus ingested

### Day 3 — Multimodal retrieval experiment (60 min)

**Objective:** Retrieve text + image context for visual skill questions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [ColPali paper](https://arxiv.org/abs/2407.01449) |
| Read | 10 | [Chroma multimodal embeddings](https://docs.trychroma.com/docs/embeddings/multimodal) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [ColPali paper](https://arxiv.org/abs/2407.01449) (~15 min)
- [Chroma multimodal embeddings](https://docs.trychroma.com/docs/embeddings/multimodal) (~10 min)

#### Lab steps
1. Prototype capstone/src/tutor/graphrag/multimodal_retriever.py
1. Test 5 diagram-based tutor questions

**Deliverable:** Multimodal retriever prototype

### Day 4 — Text-only fallback path (60 min)

**Objective:** Graceful degradation when images unavailable or model fails

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Python error handling](https://docs.python.org/3/tutorial/errors.html) |
| Read | 10 | [LlamaIndex production RAG](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) |
| Lab | 30 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python error handling](https://docs.python.org/3/tutorial/errors.html) (~10 min)
- [LlamaIndex production RAG](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) (~10 min)

#### Lab steps
1. Add fallback to text caption in multimodal_retriever.py
1. Verify 10 queries succeed without image embedding API

**Deliverable:** Fallback logic

### Day 5 — Week 31 checkpoint (60 min)

**Objective:** Optional multimodal scope decision and documentation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Architecture decision records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Architecture decision records](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (~10 min)

#### Lab steps
1. Write capstone/docs/multimodal-scope-adr.md (include or defer)
1. Update roadmap in capstone README

**Deliverable:** Multimodal ADR

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
