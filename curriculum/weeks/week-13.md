# Week 13: Worked examples vs Socratic modes

- **Phase:** Phase 2 — Tutor Architecture & Knowledge Maps
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Worked examples vs Socratic modes* committed to this repo.

---

### Day 1 — Socratic vs worked example (60 min)

**Objective:** Compare pedagogical modes from literature

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [VanLehn ITS survey](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 25 | Hands-on in `notes/week-13//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~25 min)

#### Lab steps
1. Write comparison in notes/week-13/modes.md
1. Pick default for your domain

**Deliverable:** Mode comparison doc

### Day 2 — Mode switching logic (60 min)

**Objective:** Select mode based on skill difficulty

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [CMU OLI](https://oli.cmu.edu/) |
| Lab | 35 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [CMU OLI](https://oli.cmu.edu/) (~15 min)

#### Lab steps
1. Add capstone/src/tutor/graph/teaching_mode.py
1. Test on 5 skills

**Deliverable:** Teaching mode selector

### Day 3 — Prompt A/B for modes (60 min)

**Objective:** Implement both prompt styles

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot) |
| Lab | 35 | Hands-on in `capstone/src/tutor/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot) (~15 min)

#### Lab steps
1. Create socratic vs worked_example prompt pair
1. Run 10 comparisons

**Deliverable:** Prompt pair

### Day 4 — Educator rubric scoring (60 min)

**Objective:** Human score both modes on same items

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [RAGAS + custom rubric](https://docs.ragas.io/) |
| Lab | 40 | Hands-on in `capstone/eval/human//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS + custom rubric](https://docs.ragas.io/) (~10 min)

#### Lab steps
1. Score 10 sessions in eval/human/mode_compare.csv
1. Summarize winner

**Deliverable:** Mode comparison data

### Day 5 — Week 13 checkpoint (60 min)

**Objective:** Document chosen default mode + rationale

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 15 | [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. ADR in capstone/docs/teaching-mode-adr.md
1. Commit

**Deliverable:** Teaching mode ADR

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
