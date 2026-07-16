# Week 14: Curriculum authoring workflow

- **Phase:** Phase 2 — Tutor Architecture & Knowledge Maps
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Curriculum authoring workflow* committed to this repo.

---

### Day 1 — Authoring workflow design (60 min)

**Objective:** Pipeline from standards → skills → graph

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Knowledge Space Theory](https://link.springer.com/book/10.1007/978-1-4612-5082-8) |
| Lab | 30 | Hands-on in `notes/week-14//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Knowledge Space Theory](https://link.springer.com/book/10.1007/978-1-4612-5082-8) (~20 min)

#### Lab steps
1. Draw workflow in notes/week-14/authoring-flow.md
1. List tooling gaps

**Deliverable:** Authoring workflow diagram

### Day 2 — Spreadsheet → JSON import (60 min)

**Objective:** Build importer for skill lists

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) |
| Lab | 35 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [JSON Schema](https://json-schema.org/learn/getting-started-step-by-step) (~15 min)

#### Lab steps
1. Script capstone/scripts/import_skills_csv.py
1. Import sample CSV

**Deliverable:** Import script

### Day 3 — Educator review checklist (60 min)

**Objective:** QA for prerequisite cycles and orphans

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [NetworkX DAG check](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.is_directed_acyclic_graph.html) |
| Lab | 40 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [NetworkX DAG check](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.is_directed_acyclic_graph.html) (~10 min)

#### Lab steps
1. Add capstone/scripts/validate_graph.py
1. Fix any graph errors

**Deliverable:** Graph validator

### Day 4 — Versioning curriculum maps (60 min)

**Objective:** Git-based change log for skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 15 | [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. Add capstone/data/graph/CHANGELOG.md
1. Tag v0.2.0

**Deliverable:** Graph changelog

### Day 5 — Week 14 lab (60 min)

**Objective:** End-to-end author 10 new skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 15 | [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. Add skills + edges + resources
1. Validate and commit

**Deliverable:** 10 new skills in graph

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
