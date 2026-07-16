# Week 10: Knowledge maps & prerequisite graphs

- **Phase:** Phase 2 — Tutor Architecture & Knowledge Maps
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Knowledge maps & prerequisite graphs* committed to this repo.

---

### Day 1 — Competency frameworks (60 min)

**Objective:** Map standards to atomic skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Bloom's taxonomy (Vanderbilt)](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) |
| Lab | 35 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Bloom's taxonomy (Vanderbilt)](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) (~15 min)

#### Lab steps
1. Pick subject; list 20 skills in capstone/data/graph/skills.json
1. Tag difficulty 1-5

**Deliverable:** skills.json v1

### Day 2 — Prerequisite DAG (60 min)

**Objective:** Directed acyclic skill dependencies

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Knowledge Space Theory book](https://link.springer.com/book/10.1007/978-1-4612-5082-8) |
| Lab | 35 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Knowledge Space Theory book](https://link.springer.com/book/10.1007/978-1-4612-5082-8) (~15 min)

#### Lab steps
1. Add edges to capstone/data/graph/prerequisites.jsonl
1. Validate acyclic with script

**Deliverable:** Prerequisite file

### Day 3 — Misconception nodes (60 min)

**Objective:** Link errors to remediation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [VanLehn misconceptions section](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 35 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn misconceptions section](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)

#### Lab steps
1. Add capstone/data/graph/misconceptions.jsonl
1. Write 5 diagnostic questions

**Deliverable:** Misconception map

### Day 4 — JSON schema & validation (60 min)

**Objective:** Machine-readable curriculum graph

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) |
| Lab | 40 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) (~10 min)

#### Lab steps
1. Add capstone/data/graph/schema.json
1. Validate all graph files

**Deliverable:** Validated graph bundle

### Day 5 — Next-skill recommender (60 min)

**Objective:** Topological sort given mastery set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [NetworkX docs](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.topological_sort.html) |
| Lab | 40 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [NetworkX docs](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.topological_sort.html) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graph/sequencer.py
1. Test 3 student profiles

**Deliverable:** Sequencer module

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
