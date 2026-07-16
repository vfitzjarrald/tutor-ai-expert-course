# Week 21: Bayesian Knowledge Tracing theory

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Bayesian Knowledge Tracing theory* committed to this repo.

---

### Day 1 — BKT latent variables deep dive (60 min)

**Objective:** Learn P(L0), P(T), P(S), P(G) and their tutor interpretations

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [BKT Corbett & Anderson PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) |
| Read | 10 | [Bayesian knowledge tracing overview](https://en.wikipedia.org/wiki/Bayesian_knowledge_tracing) |
| Lab | 25 | Hands-on in `notes/week-21//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [BKT Corbett & Anderson PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) (~25 min)
- [Bayesian knowledge tracing overview](https://en.wikipedia.org/wiki/Bayesian_knowledge_tracing) (~10 min)

#### Lab steps
1. Write notes/week-21/bkt-parameters.md explaining each parameter
1. Map parameters to your domain's skill difficulty

**Deliverable:** BKT parameter notes

### Day 2 — Forward-backward BKT algorithm (60 min)

**Objective:** Trace belief updates step-by-step for a skill sequence

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) |
| Read | 10 | [pyBKT GitHub](https://github.com/CAHLR/pyBKT) |
| Lab | 25 | Hands-on in `notes/week-21//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) (~20 min)
- [pyBKT GitHub](https://github.com/CAHLR/pyBKT) (~10 min)

#### Lab steps
1. Hand-calculate 5-step BKT trace in notes/week-21/worked-example.md
1. Verify against pyBKT on same sequence

**Deliverable:** Worked BKT trace

### Day 3 — Mastery threshold policy design (60 min)

**Objective:** Connect BKT posteriors to hint level and sequencing decisions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [VanLehn adaptive tutoring](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 10 | [CMU Open Learning Initiative](https://oli.cmu.edu/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn adaptive tutoring](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)
- [CMU Open Learning Initiative](https://oli.cmu.edu/) (~10 min)

#### Lab steps
1. Define thresholds in capstone/src/tutor/student_model/mastery_policy.yaml
1. Document escalation rules when P(mastery) crosses 0.95

**Deliverable:** Mastery policy YAML

### Day 4 — Multi-skill BKT dependencies (60 min)

**Objective:** Study skill-to-skill transfer and q-matrix concepts

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [EDM conference](https://educationaldatamining.org/) |
| Read | 15 | [KT survey q-matrix section](https://arxiv.org/abs/2201.08434) |
| Lab | 25 | Hands-on in `notes/week-21//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [EDM conference](https://educationaldatamining.org/) (~15 min)
- [KT survey q-matrix section](https://arxiv.org/abs/2201.08434) (~15 min)

#### Lab steps
1. Sketch q-matrix for 5 related skills in notes/week-21/q-matrix.md
1. Identify which skills share latent knowledge

**Deliverable:** Q-matrix sketch

### Day 5 — Week 21 checkpoint (60 min)

**Objective:** Consolidate BKT theory notes and link to capstone architecture

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [AIED conference](https://iaied.org/conferences) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [AIED conference](https://iaied.org/conferences) (~10 min)

#### Lab steps
1. Add BKT section to capstone/docs/student-model.md
1. Create 5 flashcards in notes/flashcards/week-21.md

**Deliverable:** Student model doc + flashcards

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
