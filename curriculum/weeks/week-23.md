# Week 23: Knowledge tracing survey methods

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Knowledge tracing survey methods* committed to this repo.

---

### Day 1 — Deep learning KT survey (60 min)

**Objective:** Review DKT, SAKT, and transformer-based knowledge tracing

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) |
| Read | 15 | [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) |
| Lab | 25 | Hands-on in `notes/week-23//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) (~25 min)
- [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) (~15 min)

#### Lab steps
1. Write structured notes in notes/week-23/kt-survey.md covering 4 methods
1. Rate each method on interpretability vs accuracy

**Deliverable:** KT survey notes

### Day 2 — DKT vs BKT tradeoff analysis (60 min)

**Objective:** Document when to use classical BKT vs neural KT in capstone

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [EDM proceedings](https://educationaldatamining.org/) |
| Read | 10 | [pyBKT interpretability](https://github.com/CAHLR/pyBKT) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [EDM proceedings](https://educationaldatamining.org/) (~15 min)
- [pyBKT interpretability](https://github.com/CAHLR/pyBKT) (~10 min)

#### Lab steps
1. Add comparison table to capstone/docs/kt-method-choice.md
1. Recommend default for capstone with rationale

**Deliverable:** KT method ADR

### Day 3 — KT evaluation metrics (60 min)

**Objective:** Implement AUC, RMSE, and accuracy on holdout interaction sequences

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [KT evaluation benchmarks](https://arxiv.org/abs/2201.08434) |
| Read | 10 | [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) |
| Lab | 25 | Hands-on in `capstone/eval/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [KT evaluation benchmarks](https://arxiv.org/abs/2201.08434) (~15 min)
- [scikit-learn model evaluation](https://scikit-learn.org/stable/modules/model_evaluation.html) (~10 min)

#### Lab steps
1. Script capstone/eval/student_model/kt_metrics.py on sample data
1. Save baseline metrics to capstone/eval/student_model/baseline.json

**Deliverable:** KT metrics script

### Day 4 — Optional DKT prototype sketch (60 min)

**Objective:** Outline neural KT integration path for future work

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Deep Knowledge Tracing paper](https://arxiv.org/abs/1506.05908) |
| Read | 10 | [PyTorch quickstart](https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html) |
| Lab | 25 | Hands-on in `capstone/src/tutor/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Deep Knowledge Tracing paper](https://arxiv.org/abs/1506.05908) (~15 min)
- [PyTorch quickstart](https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html) (~10 min)

#### Lab steps
1. Create capstone/src/tutor/student_model/dkt_stub.py matching bkt_predictor interface
1. Document training data requirements in notes/week-23/dkt-roadmap.md

**Deliverable:** DKT stub + roadmap

### Day 5 — Week 23 checkpoint (60 min)

**Objective:** Finalize student model module README and integration tests

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [AIED research track](https://iaied.org/conferences) |
| Lab | 40 | Hands-on in `capstone/src/tutor/student_model//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [AIED research track](https://iaied.org/conferences) (~10 min)

#### Lab steps
1. Write capstone/src/tutor/student_model/README.md
1. Run full student_model test suite and fix failures

**Deliverable:** Student model README + green tests

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
