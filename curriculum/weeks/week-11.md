# Week 11: Misconception-driven hint selection

- **Phase:** Phase 2 — Tutor Architecture & Knowledge Maps
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Misconception-driven hint selection* committed to this repo.

---

### Day 1 — Misconception taxonomy (60 min)

**Objective:** Classify error types and link to skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [VanLehn ITS survey](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~25 min)

#### Lab steps
1. Extend capstone/data/graph/misconceptions.jsonl with 10 tags
1. Map each to remediation resource ID

**Deliverable:** Misconception taxonomy v2

### Day 2 — Diagnostic question design (60 min)

**Objective:** Write probes that surface specific misconceptions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [CMU OLI assessment patterns](https://oli.cmu.edu/) |
| Lab | 30 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [CMU OLI assessment patterns](https://oli.cmu.edu/) (~20 min)

#### Lab steps
1. Add 5 diagnostics to capstone/data/graph/diagnostics.jsonl
1. Test with mock student answers

**Deliverable:** Diagnostic bank

### Day 3 — Hint selection policy (60 min)

**Objective:** Route hints based on detected misconception

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Prompt Engineering Guide](https://www.promptingguide.ai/) |
| Lab | 35 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Prompt Engineering Guide](https://www.promptingguide.ai/) (~15 min)

#### Lab steps
1. Add capstone/src/tutor/graph/misconception_router.py
1. Unit test 3 routing cases

**Deliverable:** Router module

### Day 4 — Eval misconception detection (60 min)

**Objective:** Score false positive/negative on sample set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) |
| Lab | 35 | Hands-on in `capstone/eval/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) (~15 min)

#### Lab steps
1. Create capstone/eval/graph/misconception_cases.yaml
1. Log precision/recall

**Deliverable:** Detection eval

### Day 5 — Week 11 checkpoint (60 min)

**Objective:** Demo misconception-aware hint

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 15 | [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `notes/week-11//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS survey (PDF)](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~20 min)
- [Bloom 2-sigma (PDF)](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~15 min)

#### Lab steps
1. Record 3-min demo script in notes/week-11/
1. Commit all artifacts

**Deliverable:** Week 11 demo notes

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
