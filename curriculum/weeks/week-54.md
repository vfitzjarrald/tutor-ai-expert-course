# Week 54: Paper reproduction 1 — implementation

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Paper reproduction 1 — implementation* committed to this repo.

---

### Day 1 — BKT baseline implementation (60 min)

**Objective:** Implement BKT baseline matching paper comparison table

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [pyBKT GitHub](https://github.com/CAHLR/pyBKT) |
| Read | 10 | [BKT Corbett PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [pyBKT GitHub](https://github.com/CAHLR/pyBKT) (~20 min)
- [BKT Corbett PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) (~10 min)

#### Lab steps
1. Implement capstone/research/kt-repro/baselines/bkt_baseline.py
1. Run on preprocessed data and log AUC

**Deliverable:** BKT baseline results

### Day 2 — Neural KT model implementation (60 min)

**Objective:** Implement or adapt DKT model architecture from paper

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) |
| Read | 10 | [PyTorch RNN tutorial](https://pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) (~25 min)
- [PyTorch RNN tutorial](https://pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html) (~10 min)

#### Lab steps
1. Implement capstone/research/kt-repro/models/dkt.py
1. Run training loop with paper hyperparameters

**Deliverable:** DKT model training

### Day 3 — Evaluation and metrics (60 min)

**Objective:** Compute AUC, ACC, and RMSE matching paper evaluation protocol

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [KT evaluation metrics](https://arxiv.org/abs/2201.08434) |
| Read | 10 | [scikit-learn metrics](https://scikit-learn.org/stable/modules/model_evaluation.html) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [KT evaluation metrics](https://arxiv.org/abs/2201.08434) (~15 min)
- [scikit-learn metrics](https://scikit-learn.org/stable/modules/model_evaluation.html) (~10 min)

#### Lab steps
1. Script capstone/research/kt-repro/evaluate.py
1. Save results to capstone/research/kt-repro/results/metrics.json

**Deliverable:** Reproduction metrics

### Day 4 — Results comparison (60 min)

**Objective:** Compare reproduced metrics to published paper results

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Statistical significance testing](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html) |
| Read | 10 | [EDM reproducibility standards](https://educationaldatamining.org/) |
| Lab | 30 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Statistical significance testing](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html) (~10 min)
- [EDM reproducibility standards](https://educationaldatamining.org/) (~10 min)

#### Lab steps
1. Write capstone/research/kt-repro/results/comparison.md
1. Document any deviations and their impact on metrics

**Deliverable:** Comparison report

### Day 5 — Week 54 checkpoint (60 min)

**Objective:** KT reproduction code and results committed

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github) |
| Lab | 40 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github) (~10 min)

#### Lab steps
1. Tag capstone/research/kt-repro v0.1.0
1. Update main capstone README with research section link

**Deliverable:** KT repro v0.1.0

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
