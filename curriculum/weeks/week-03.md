# Week 03: Evaluation design for tutors

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Evaluation design for tutors* committed to this repo.

---

### Day 1 — Tutor rubrics (60 min)

**Objective:** Define pedagogy, accuracy, safety dimensions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [RAGAS metrics overview](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 30 | Hands-on in `capstone/eval/rubric//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS metrics overview](https://docs.ragas.io/en/stable/concepts/metrics/) (~20 min)

#### Lab steps
1. Write capstone/eval/rubric/educator_rubric.md
1. Score 5 manual sessions

**Deliverable:** Rubric document

### Day 2 — Automated checks (60 min)

**Objective:** Script structural and policy checks on outputs

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) |
| Lab | 35 | Hands-on in `capstone/eval/checks//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) (~15 min)

#### Lab steps
1. Add capstone/eval/checks/policy_checks.py
1. Wire into run_golden.py

**Deliverable:** Automated check suite

### Day 3 — Regression baselines (60 min)

**Objective:** Snapshot metrics for future model upgrades

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) |
| Lab | 35 | Hands-on in `capstone/eval/baselines//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) (~15 min)

#### Lab steps
1. Save baseline to capstone/eval/baselines/week-03.json
1. Document methodology in notes/

**Deliverable:** Baseline file

### Day 4 — Human-in-the-loop sampling (60 min)

**Objective:** Design educator review workflow

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Langfuse human annotation](https://langfuse.com/docs/scores/manually) |
| Lab | 35 | Hands-on in `capstone/eval/human//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse human annotation](https://langfuse.com/docs/scores/manually) (~15 min)

#### Lab steps
1. Create capstone/eval/human/sample_queue.csv template
1. Define review SLA in notes/

**Deliverable:** Review workflow doc

### Day 5 — Phase 1 eval sprint (60 min)

**Objective:** Integrate rubric + automated + golden set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI eval best practices](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 35 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI eval best practices](https://platform.openai.com/docs/guides/evaluation) (~15 min)

#### Lab steps
1. Run full eval; fix top 3 failures
1. Commit checkpoint checkpoints/phase-01-eval.md

**Deliverable:** Eval report

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
