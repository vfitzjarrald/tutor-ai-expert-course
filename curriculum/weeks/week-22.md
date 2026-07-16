# Week 22: pyBKT implementation

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *pyBKT implementation* committed to this repo.

---

### Day 1 — pyBKT install and sample data (60 min)

**Objective:** Load Assistments-style skill sequence data into pyBKT

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [pyBKT GitHub](https://github.com/CAHLR/pyBKT) |
| Read | 15 | [Assistments dataset portal](https://sites.google.com/site/assistmentsdata/) |
| Lab | 25 | Hands-on in `capstone/data/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [pyBKT GitHub](https://github.com/CAHLR/pyBKT) (~20 min)
- [Assistments dataset portal](https://sites.google.com/site/assistmentsdata/) (~15 min)

#### Lab steps
1. Add pyBKT to capstone/requirements.txt
1. Download sample CSV to capstone/data/student_model/assistments_sample.csv

**Deliverable:** Sample dataset ready

### Day 2 — Fit BKT model per skill (60 min)

**Objective:** Train individual BKT models and inspect learned parameters

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [pyBKT README](https://github.com/CAHLR/pyBKT/blob/master/README.md) |
| Read | 10 | [KT cross-validation](https://arxiv.org/abs/2201.08434) |
| Lab | 25 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [pyBKT README](https://github.com/CAHLR/pyBKT/blob/master/README.md) (~20 min)
- [KT cross-validation](https://arxiv.org/abs/2201.08434) (~10 min)

#### Lab steps
1. Script capstone/scripts/fit_bkt.py training on sample data
1. Save fitted params to capstone/data/student_model/bkt_params.json

**Deliverable:** Fitted BKT parameters

### Day 3 — Predict next-step mastery (60 min)

**Objective:** Export posterior mastery predictions for tutor routing

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [pyBKT predict API](https://github.com/CAHLR/pyBKT) |
| Read | 10 | [ITS student model design](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 25 | Hands-on in `capstone/src/tutor/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [pyBKT predict API](https://github.com/CAHLR/pyBKT) (~15 min)
- [ITS student model design](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/student_model/bkt_predictor.py
1. Generate predictions for 3 synthetic student traces

**Deliverable:** bkt_predictor.py

### Day 4 — Integrate BKT with graph sequencer (60 min)

**Objective:** Combine Neo4j paths with BKT mastery for adaptive routing

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j Python manual](https://neo4j.com/docs/python-manual/current/) |
| Read | 10 | [Adaptive sequencing survey](https://arxiv.org/abs/2201.08434) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Python manual](https://neo4j.com/docs/python-manual/current/) (~15 min)
- [Adaptive sequencing survey](https://arxiv.org/abs/2201.08434) (~10 min)

#### Lab steps
1. Wire bkt_predictor into capstone/src/tutor/graph/adaptive_sequencer.py
1. Test: low mastery blocks advanced skills

**Deliverable:** adaptive_sequencer.py

### Day 5 — Week 22 checkpoint (60 min)

**Objective:** Unit tests and eval for BKT predictions on holdout sequences

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) |
| Lab | 35 | Hands-on in `capstone/tests//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) (~15 min)

#### Lab steps
1. Add capstone/tests/test_bkt_predictor.py with 5 cases
1. Log AUC summary to capstone/eval/student_model/bkt_eval.json

**Deliverable:** BKT test suite + eval

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
