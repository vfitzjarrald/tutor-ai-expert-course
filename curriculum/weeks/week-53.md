# Week 53: Paper reproduction 1 — KT

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Paper reproduction 1 — KT* committed to this repo.

---

### Day 1 — KT paper selection (60 min)

**Objective:** Choose foundational KT paper to reproduce for expert track

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) |
| Read | 15 | [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) |
| Lab | 25 | Hands-on in `notes/week-53//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Deep Knowledge Tracing](https://arxiv.org/abs/1506.05908) (~20 min)
- [Knowledge Tracing survey](https://arxiv.org/abs/2201.08434) (~15 min)

#### Lab steps
1. Select paper and write notes/week-53/paper-selection-rationale.md
1. Extract key equations and baseline results to reproduce

**Deliverable:** Paper selection doc

### Day 2 — Dataset acquisition (60 min)

**Objective:** Download and preprocess public KT benchmark dataset

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Assistments dataset](https://sites.google.com/site/assistmentsdata/) |
| Read | 10 | [EdNet dataset](https://github.com/riiid/ednet) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Assistments dataset](https://sites.google.com/site/assistmentsdata/) (~20 min)
- [EdNet dataset](https://github.com/riiid/ednet) (~10 min)

#### Lab steps
1. Download dataset to capstone/research/kt-repro/data/
1. Write preprocessing script capstone/research/kt-repro/preprocess.py

**Deliverable:** Preprocessed dataset

### Day 3 — Baseline replication plan (60 min)

**Objective:** Design experiment protocol matching paper methodology

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Papers With Code reproducibility](https://paperswithcode.com/) |
| Read | 15 | [ML reproducibility checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Papers With Code reproducibility](https://paperswithcode.com/) (~10 min)
- [ML reproducibility checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) (~15 min)

#### Lab steps
1. Write capstone/research/kt-repro/EXPERIMENT.md with hyperparameters
1. List expected metrics from original paper

**Deliverable:** Experiment protocol

### Day 4 — Environment setup (60 min)

**Objective:** Create isolated conda/venv for reproduction experiments

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [PyTorch install](https://pytorch.org/get-started/locally/) |
| Read | 10 | [pyBKT for baseline comparison](https://github.com/CAHLR/pyBKT) |
| Lab | 25 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [PyTorch install](https://pytorch.org/get-started/locally/) (~15 min)
- [pyBKT for baseline comparison](https://github.com/CAHLR/pyBKT) (~10 min)

#### Lab steps
1. Create capstone/research/kt-repro/requirements.txt
1. Verify GPU/CPU training environment runs smoke test

**Deliverable:** Repro environment ready

### Day 5 — Week 53 checkpoint (60 min)

**Objective:** Reproduction repo scaffold committed with README

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GitHub research repo best practices](https://docs.github.com/en/repositories) |
| Lab | 40 | Hands-on in `capstone/research/kt-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub research repo best practices](https://docs.github.com/en/repositories) (~10 min)

#### Lab steps
1. Write capstone/research/kt-repro/README.md
1. Commit scaffold with empty results/ directory

**Deliverable:** KT repro README

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
