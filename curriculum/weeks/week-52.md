# Week 52: Phase 6 gate — production capstone

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Phase 6 gate — production capstone* committed to this repo.

---

### Day 1 — Production readiness review (60 min)

**Objective:** Walk through runbook, tests, security, and observability checklist

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Google production readiness review](https://sre.google/sre-book/launch-checklist/) |
| Read | 10 | [Course CHECKS](curriculum/CHECKS.md) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google production readiness review](https://sre.google/sre-book/launch-checklist/) (~20 min)
- [Course CHECKS](curriculum/CHECKS.md) (~10 min)

#### Lab steps
1. Complete capstone/docs/production-readiness-checklist.md
1. Fix all blocking items found

**Deliverable:** Production readiness checklist

### Day 2 — Full golden set run (60 min)

**Objective:** Run complete eval suite and achieve ≥90% pass rate

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) |
| Read | 10 | [RAGAS full suite](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 25 | Hands-on in `capstone/eval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) (~15 min)
- [RAGAS full suite](https://docs.ragas.io/en/stable/concepts/metrics/) (~10 min)

#### Lab steps
1. Run capstone/eval/run_golden.py — target ≥90%
1. Run capstone/eval/rag/ragas_run.py — faithfulness ≥0.85

**Deliverable:** Eval suite green

### Day 3 — Stakeholder demo delivery (60 min)

**Objective:** Deliver 5-minute capstone demo to peer or mentor

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse session export](https://langfuse.com/docs/tracing) |
| Lab | 40 | Hands-on in `notes/week-52//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse session export](https://langfuse.com/docs/tracing) (~10 min)

#### Lab steps
1. Deliver demo using notes/week-51/demo-script.md
1. Collect feedback in notes/week-52/demo-feedback.md

**Deliverable:** Demo feedback collected

### Day 4 — Phase 6 knowledge check (60 min)

**Objective:** Retake Phase 6 quiz on production, observability, and safety

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse docs](https://langfuse.com/docs) |
| Read | 10 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Lab | 30 | Hands-on in `notes/week-52//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse docs](https://langfuse.com/docs) (~10 min)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~10 min)

#### Lab steps
1. Score ≥80% on Phase 6 questions in curriculum/CHECKS.md
1. Log weak areas in notes/week-52/quiz-review.md

**Deliverable:** Quiz score logged

### Day 5 — Phase 6 gate (60 min)

**Objective:** Ship production capstone checkpoint and v1.0.0 release

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Semantic versioning](https://semver.org/) |
| Lab | 40 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Semantic versioning](https://semver.org/) (~10 min)

#### Lab steps
1. Write checkpoints/phase-06-complete.md
1. Tag capstone v1.0.0 and publish release notes

**Deliverable:** Phase 6 complete — v1.0.0

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
