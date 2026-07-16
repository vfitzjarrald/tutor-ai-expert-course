# Week 08: RAGAS & Phase 1 gate

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *RAGAS & Phase 1 gate* committed to this repo.

---

### Day 1 — RAGAS setup (60 min)

**Objective:** Automated RAG quality metrics

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [RAGAS quickstart](https://docs.ragas.io/en/stable/getstarted/quickstart/) |
| Lab | 25 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS quickstart](https://docs.ragas.io/en/stable/getstarted/quickstart/) (~25 min)

#### Lab steps
1. Install ragas in capstone/requirements.txt
1. Script eval/rag/ragas_run.py

**Deliverable:** RAGAS script

### Day 2 — Faithfulness & context precision (60 min)

**Objective:** Interpret tutor-specific metrics

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [RAGAS metrics](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 35 | Hands-on in `capstone/eval/rag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS metrics](https://docs.ragas.io/en/stable/concepts/metrics/) (~15 min)

#### Lab steps
1. Run on 15 tutor Q&A pairs
1. Set thresholds in eval/rag/thresholds.yaml

**Deliverable:** Threshold config

### Day 3 — Fix retrieval failures (60 min)

**Objective:** Tune chunk size, k, prompts from metrics

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Iterate until faithfulness > 0.8 on golden set
1. Document changes

**Deliverable:** Metric improvement log

### Day 4 — Phase 1 checkpoint doc (60 min)

**Objective:** Summarize artifacts and demo script

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Write checkpoints/phase-01-complete.md
1. Record 3-min demo script

**Deliverable:** Phase 1 gate passed

### Day 5 — Retrospective (60 min)

**Objective:** Notes + flashcards for phase 1

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `notes/flashcards//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. 5 flashcards in notes/flashcards/phase-01.md
1. Week retrospective

**Deliverable:** Flashcards

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
