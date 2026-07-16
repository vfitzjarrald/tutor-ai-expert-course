# Week 32: Phase 4 gate — GraphRAG beats baseline

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Phase 4 gate — GraphRAG beats baseline* committed to this repo.

---

### Day 1 — Baseline vs GraphRAG RAGAS benchmark (60 min)

**Objective:** Run full RAGAS suite comparing vector-only vs GraphRAG

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [RAGAS quickstart](https://docs.ragas.io/en/stable/getstarted/quickstart/) |
| Read | 10 | [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) |
| Lab | 25 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS quickstart](https://docs.ragas.io/en/stable/getstarted/quickstart/) (~20 min)
- [RAGAS faithfulness](https://docs.ragas.io/en/stable/concepts/metrics/faithfulness/) (~10 min)

#### Lab steps
1. Run capstone/eval/rag/ragas_run.py on both pipelines
1. Save comparison to capstone/eval/rag/graphrag_vs_baseline.json

**Deliverable:** Benchmark comparison

### Day 2 — Fix GraphRAG retrieval regressions (60 min)

**Objective:** Tune until GraphRAG beats baseline on faithfulness + recall

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GraphRAG prompt tuning](https://microsoft.github.io/graphrag/prompt_tuning/overview/) |
| Read | 10 | [RAGAS metrics](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG prompt tuning](https://microsoft.github.io/graphrag/prompt_tuning/overview/) (~15 min)
- [RAGAS metrics](https://docs.ragas.io/en/stable/concepts/metrics/) (~10 min)

#### Lab steps
1. Iterate query_router and community summary quality
1. Document changes in capstone/docs/retrieval-log.md

**Deliverable:** Regression fixes committed

### Day 3 — Phase 4 gate checklist (60 min)

**Objective:** Verify all Phase 4 deliverables against curriculum CHECKS

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Course CHECKS](curriculum/CHECKS.md) |
| Read | 10 | [GraphRAG getting started](https://microsoft.github.io/graphrag/get_started/) |
| Lab | 25 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Course CHECKS](curriculum/CHECKS.md) (~15 min)
- [GraphRAG getting started](https://microsoft.github.io/graphrag/get_started/) (~10 min)

#### Lab steps
1. Complete checkpoints/phase-gates.md Phase 4 section
1. Fix any gaps before demo

**Deliverable:** Phase 4 checklist done

### Day 4 — GraphRAG tutor demo recording (60 min)

**Objective:** Record grounded tutor session using GraphRAG retrieval

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse tracing](https://langfuse.com/docs/tracing) |
| Lab | 40 | Hands-on in `notes/week-32//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse tracing](https://langfuse.com/docs/tracing) (~10 min)

#### Lab steps
1. Script notes/week-32/demo-script.md with 3 GraphRAG-grounded Q&A
1. Record session log to capstone/logs/demo-week-32.jsonl

**Deliverable:** Demo recording + script

### Day 5 — Phase 4 gate (60 min)

**Objective:** Ship Phase 4 checkpoint and tag release

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Semantic versioning](https://semver.org/) |
| Lab | 40 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Semantic versioning](https://semver.org/) (~10 min)

#### Lab steps
1. Write checkpoints/phase-04-complete.md
1. Tag capstone v0.4.0

**Deliverable:** Phase 4 complete

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
