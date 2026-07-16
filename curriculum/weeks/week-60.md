# Week 60: Novel experiment design

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Novel experiment design* committed to this repo.

---

### Day 1 — Research gap identification (60 min)

**Objective:** Identify novel research question at intersection of KT + GraphRAG + tutors

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [EDM conference CFP](https://educationaldatamining.org/) |
| Read | 15 | [AIED conference](https://iaied.org/conferences) |
| Lab | 25 | Hands-on in `notes/week-60//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [EDM conference CFP](https://educationaldatamining.org/) (~15 min)
- [AIED conference](https://iaied.org/conferences) (~15 min)

#### Lab steps
1. Write notes/week-60/research-gap.md with 3 candidate questions
1. Select one with highest feasibility and impact

**Deliverable:** Research gap doc

### Day 2 — Experiment hypothesis and design (60 min)

**Objective:** Write formal hypothesis and controlled experiment design

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [AB testing design](https://developers.google.com/machine-learning/testing-debugging) |
| Read | 10 | [KT survey experiment section](https://arxiv.org/abs/2201.08434) |
| Lab | 25 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [AB testing design](https://developers.google.com/machine-learning/testing-debugging) (~15 min)
- [KT survey experiment section](https://arxiv.org/abs/2201.08434) (~10 min)

#### Lab steps
1. Write capstone/research/novel-experiment/DESIGN.md with hypothesis and variables
1. Define primary metric and minimum detectable effect

**Deliverable:** Experiment design doc

### Day 3 — Dataset and baseline selection (60 min)

**Objective:** Choose dataset and baseline systems for comparison

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Assistments data](https://sites.google.com/site/assistmentsdata/) |
| Read | 10 | [Capstone eval golden set](capstone/eval/golden/conversations.yaml) |
| Lab | 25 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Assistments data](https://sites.google.com/site/assistmentsdata/) (~15 min)
- [Capstone eval golden set](capstone/eval/golden/conversations.yaml) (~10 min)

#### Lab steps
1. Select dataset and create capstone/research/novel-experiment/data/
1. Define baselines: BKT-only, GraphRAG-only, combined

**Deliverable:** Experiment dataset ready

### Day 4 — Pre-registration document (60 min)

**Objective:** Pre-register experiment to avoid p-hacking and HARKing

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OSF pre-registration](https://osf.io/registries) |
| Read | 10 | [ML reproducibility checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) |
| Lab | 25 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OSF pre-registration](https://osf.io/registries) (~15 min)
- [ML reproducibility checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) (~10 min)

#### Lab steps
1. Write capstone/research/novel-experiment/PREREGISTRATION.md
1. Share with peer for review before running

**Deliverable:** Pre-registration doc

### Day 5 — Week 60 checkpoint (60 min)

**Objective:** Experiment design approved and ready to execute

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Experiment design peer review](https://arxiv.org/help/preprint_feedback) |
| Lab | 40 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Experiment design peer review](https://arxiv.org/help/preprint_feedback) (~10 min)

#### Lab steps
1. Incorporate peer feedback into DESIGN.md
1. Create experiment tracking issue in notes/week-60/experiment-tracker.md

**Deliverable:** Approved experiment design

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
