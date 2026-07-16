# Week 43: Capstone sprint 3 — adaptivity

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Capstone sprint 3 — adaptivity* committed to this repo.

---

### Day 1 — Adaptivity audit (60 min)

**Objective:** Review hint level, sequencing, and mode selection logic holistically

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS adaptivity](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 10 | [CMU OLI adaptivity](https://oli.cmu.edu/) |
| Lab | 25 | Hands-on in `notes/week-43//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS adaptivity](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [CMU OLI adaptivity](https://oli.cmu.edu/) (~10 min)

#### Lab steps
1. Map adaptivity decision points in notes/week-43/adaptivity-map.md
1. Identify 3 gaps in current implementation

**Deliverable:** Adaptivity map

### Day 2 — Unified adaptivity engine (60 min)

**Objective:** Consolidate hint_policy, teaching_mode, and adaptive_sequencer

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Strategy pattern Python](https://refactoring.guru/design-patterns/strategy/python/example) |
| Read | 10 | [pyBKT predict API](https://github.com/CAHLR/pyBKT) |
| Lab | 30 | Hands-on in `capstone/src/tutor/adaptivity//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Strategy pattern Python](https://refactoring.guru/design-patterns/strategy/python/example) (~10 min)
- [pyBKT predict API](https://github.com/CAHLR/pyBKT) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/adaptivity/engine.py
1. Single decide_next_action() entry point

**Deliverable:** adaptivity engine

### Day 3 — Personalization parameters (60 min)

**Objective:** Expose grade_band, hint_aggressiveness, and mode prefs

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [JSON Schema config](https://json-schema.org/learn/getting-started-step-by-step) |
| Read | 10 | [UNESCO AI in education](https://www.unesco.org/en/digital-education/artificial-intelligence) |
| Lab | 30 | Hands-on in `capstone/data/config//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [JSON Schema config](https://json-schema.org/learn/getting-started-step-by-step) (~10 min)
- [UNESCO AI in education](https://www.unesco.org/en/digital-education/artificial-intelligence) (~10 min)

#### Lab steps
1. Add capstone/data/config/student_profiles.yaml with 3 profiles
1. Wire profiles into adaptivity engine

**Deliverable:** Student profile config

### Day 4 — Adaptivity regression tests (60 min)

**Objective:** Ensure personalization changes behavior predictably

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) |
| Read | 10 | [pytest parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html) |
| Lab | 25 | Hands-on in `capstone/tests//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) (~15 min)
- [pytest parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html) (~10 min)

#### Lab steps
1. Add capstone/tests/test_adaptivity.py with 3 profile scenarios
1. Assert different hint levels for same wrong answer across profiles

**Deliverable:** Adaptivity test suite

### Day 5 — Week 43 checkpoint (60 min)

**Objective:** Adaptivity sprint demo with 3 student profiles

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Bloom 2-sigma](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 40 | Hands-on in `notes/week-43//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Bloom 2-sigma](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~10 min)

#### Lab steps
1. Record profile comparison in notes/week-43/adaptivity-demo.md
1. Write sprint retrospective

**Deliverable:** Adaptivity demo + retro

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
