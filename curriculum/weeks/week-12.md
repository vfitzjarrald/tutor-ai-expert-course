# Week 12: Adaptive hint level policies

- **Phase:** Phase 2 — Tutor Architecture & Knowledge Maps
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Adaptive hint level policies* committed to this repo.

---

### Day 1 — Hint level framework (60 min)

**Objective:** Define levels 1–3 and escalation rules

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn hint studies](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 30 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn hint studies](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)

#### Lab steps
1. Document levels in capstone/docs/hint-levels.md
1. Update tutor_policy.yaml

**Deliverable:** Hint level spec

### Day 2 — Adaptive level selection (60 min)

**Objective:** Choose level from attempt count + mastery

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Bloom mastery learning](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 35 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Bloom mastery learning](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/graph/hint_policy.py
1. Simulate 3 student traces

**Deliverable:** Hint policy module

### Day 3 — Prompt templates per level (60 min)

**Objective:** Separate system prompts for each hint level

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Anthropic system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) |
| Lab | 35 | Hands-on in `capstone/src/tutor/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Anthropic system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) (~15 min)

#### Lab steps
1. Add capstone/src/tutor/prompts/hint_level_*.yaml
1. Test consistency

**Deliverable:** Level prompt set

### Day 4 — Policy eval (60 min)

**Objective:** Ensure level increases only after failed attempts

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 35 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) (~15 min)

#### Lab steps
1. Add golden cases to eval/golden/hint_levels.yaml
1. Run automated checks

**Deliverable:** Hint level eval

### Day 5 — Week 12 review (60 min)

**Objective:** Consolidate adaptive hint docs

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 15 | [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `notes/flashcards//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. Update capstone README adaptivity section
1. 5 flashcards

**Deliverable:** Flashcards

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
