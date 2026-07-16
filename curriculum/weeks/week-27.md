# Week 27: Context ordering (Lost in the Middle)

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Context ordering (Lost in the Middle)* committed to this repo.

---

### Day 1 — Lost in the Middle paper study (60 min)

**Objective:** Understand U-shaped attention and context placement effects

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Lost in the Middle paper](https://arxiv.org/abs/2307.03172) |
| Read | 10 | [Anthropic context windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows) |
| Lab | 25 | Hands-on in `notes/week-27//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Lost in the Middle paper](https://arxiv.org/abs/2307.03172) (~25 min)
- [Anthropic context windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows) (~10 min)

#### Lab steps
1. Summarize key findings in notes/week-27/lost-in-middle.md
1. Hypothesize impact on tutor hint context ordering

**Deliverable:** Paper summary

### Day 2 — Chunk reordering strategy (60 min)

**Objective:** Place highest-scored chunks at start and end of context window

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LlamaIndex node postprocessors](https://docs.llamaindex.ai/en/stable/module_guides/querying/node_postprocessors/) |
| Read | 15 | [LangChain LongContextReorder](https://python.langchain.com/docs/how_to/long_context_reorder/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LlamaIndex node postprocessors](https://docs.llamaindex.ai/en/stable/module_guides/querying/node_postprocessors/) (~15 min)
- [LangChain LongContextReorder](https://python.langchain.com/docs/how_to/long_context_reorder/) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/graphrag/context_order.py with reorder policy
1. Apply to 10 multi-chunk tutor prompts

**Deliverable:** context_order.py

### Day 3 — Middle context compression (60 min)

**Objective:** Summarize low-priority middle chunks to save tokens

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain contextual compression](https://python.langchain.com/docs/how_to/contextual_compression/) |
| Read | 10 | [OpenAI summarization guide](https://platform.openai.com/docs/guides/summarization) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain contextual compression](https://python.langchain.com/docs/how_to/contextual_compression/) (~15 min)
- [OpenAI summarization guide](https://platform.openai.com/docs/guides/summarization) (~10 min)

#### Lab steps
1. Add optional middle-chunk summarizer in context_order.py
1. Compare token usage before/after on 5 long sessions

**Deliverable:** Compression option

### Day 4 — Context ordering A/B experiment (60 min)

**Objective:** Measure answer faithfulness across ordering strategies

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) |
| Read | 10 | [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 25 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) (~15 min)
- [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) (~10 min)

#### Lab steps
1. Run A/B: default vs reordered on capstone/eval/golden/conversations.yaml
1. Log results to capstone/eval/rag/ordering_ab.json

**Deliverable:** Ordering A/B results

### Day 5 — Week 27 checkpoint (60 min)

**Objective:** Document winning context order policy for production

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Prompt Engineering Guide RAG](https://www.promptingguide.ai/techniques/rag) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Prompt Engineering Guide RAG](https://www.promptingguide.ai/techniques/rag) (~10 min)

#### Lab steps
1. Add ordering policy to capstone/docs/retrieval-log.md
1. Wire default policy into RAG pipeline

**Deliverable:** Ordering policy doc

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
