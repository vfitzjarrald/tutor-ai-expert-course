# Week 46: Human eval loop

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Human eval loop* committed to this repo.

---

### Day 1 — Human eval protocol design (60 min)

**Objective:** Define educator rubric and sampling strategy for tutor sessions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Langfuse human annotation](https://langfuse.com/docs/scores/manually) |
| Read | 10 | [RAGAS human evaluation](https://docs.ragas.io/en/stable/concepts/metrics/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse human annotation](https://langfuse.com/docs/scores/manually) (~20 min)
- [RAGAS human evaluation](https://docs.ragas.io/en/stable/concepts/metrics/) (~10 min)

#### Lab steps
1. Write capstone/docs/human-eval-protocol.md with rubric dimensions
1. Define sample size: 20 sessions/week

**Deliverable:** Human eval protocol

### Day 2 — Eval queue setup (60 min)

**Objective:** Build CSV queue of sessions ready for educator review

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse export](https://langfuse.com/docs/api) |
| Read | 10 | [Google Sheets eval template pattern](https://support.google.com/docs/answer/6000292) |
| Lab | 30 | Hands-on in `capstone/eval/human//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse export](https://langfuse.com/docs/api) (~10 min)
- [Google Sheets eval template pattern](https://support.google.com/docs/answer/6000292) (~10 min)

#### Lab steps
1. Create capstone/eval/human/review_queue.csv template
1. Export 20 sessions from Langfuse to queue

**Deliverable:** Review queue populated

### Day 3 — Educator rubric scoring (60 min)

**Objective:** Score 10 sessions on pedagogy, accuracy, and safety

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [VanLehn ITS evaluation](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 10 | [Educator rubric from week 3](capstone/eval/rubric/educator_rubric.md) |
| Lab | 25 | Hands-on in `capstone/eval/human//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS evaluation](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)
- [Educator rubric from week 3](capstone/eval/rubric/educator_rubric.md) (~10 min)

#### Lab steps
1. Score 10 sessions in capstone/eval/human/scores.csv
1. Calculate inter-rater agreement if peer available

**Deliverable:** 10 scored sessions

### Day 4 — Feedback loop integration (60 min)

**Objective:** Route low-scoring patterns back to prompt and policy fixes

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI eval iteration](https://platform.openai.com/docs/guides/evaluation) |
| Read | 10 | [Langfuse score analytics](https://langfuse.com/docs/analytics/overview) |
| Lab | 25 | Hands-on in `capstone/eval/human//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI eval iteration](https://platform.openai.com/docs/guides/evaluation) (~15 min)
- [Langfuse score analytics](https://langfuse.com/docs/analytics/overview) (~10 min)

#### Lab steps
1. Identify top 3 failure patterns from human scores
1. Create capstone/eval/human/action_items.md with fixes

**Deliverable:** Human eval action items

### Day 5 — Week 46 checkpoint (60 min)

**Objective:** Human eval loop documented and first cycle complete

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Google ML data collection](https://developers.google.com/machine-learning/testing-debugging) |
| Lab | 40 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML data collection](https://developers.google.com/machine-learning/testing-debugging) (~10 min)

#### Lab steps
1. Automate queue refresh in capstone/scripts/refresh_eval_queue.py
1. Schedule weekly human eval in capstone/docs/human-eval-protocol.md

**Deliverable:** Automated eval queue refresh

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
