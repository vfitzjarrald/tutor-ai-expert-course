# Week 07: RAG tutor pipeline

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *RAG tutor pipeline* committed to this repo.

---

### Day 1 — RAG architecture (60 min)

**Objective:** Retrieve → augment → generate flow

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain RAG tutorial](https://python.langchain.com/docs/tutorials/rag/) (~25 min)

#### Lab steps
1. Implement capstone/src/tutor/rag/pipeline.py
1. Wire retriever + LLM client

**Deliverable:** End-to-end RAG pipeline

### Day 2 — Citation-enforced prompts (60 min)

**Objective:** Require source IDs in tutor output

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LlamaIndex production RAG](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) |
| Lab | 35 | Hands-on in `capstone/src/tutor/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LlamaIndex production RAG](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) (~15 min)

#### Lab steps
1. Update system prompt with citation rules
1. Validate citations in post-processor

**Deliverable:** Citation validator

### Day 3 — Ungrounded vs grounded A/B (60 min)

**Objective:** Measure hallucination reduction

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) |
| Lab | 35 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) (~15 min)

#### Lab steps
1. Run 20 questions both modes
1. Log in eval/rag/comparison.json

**Deliverable:** A/B comparison data

### Day 4 — Latency & cost (60 min)

**Objective:** Profile retrieval + generation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [OpenAI latency guide](https://platform.openai.com/docs/guides/latency-optimization) |
| Lab | 40 | Hands-on in `capstone/logs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI latency guide](https://platform.openai.com/docs/guides/latency-optimization) (~10 min)

#### Lab steps
1. Add timing logs to pipeline
1. Identify top bottleneck

**Deliverable:** Performance profile

### Day 5 — RAG tutor CLI integration (60 min)

**Objective:** Student asks; tutor cites curriculum

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone/src/tutor/cli//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Connect RAG to tutor_cli.py
1. Demo 5 grounded sessions

**Deliverable:** Grounded tutor demo

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
