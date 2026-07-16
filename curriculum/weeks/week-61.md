# Week 61: Novel experiment run

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Novel experiment run* committed to this repo.

---

### Day 1 — Experiment infrastructure setup (60 min)

**Objective:** Build scripts to run experiment conditions reproducibly

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Python experiment tracking](https://mlflow.org/docs/latest/getting-started/) |
| Read | 10 | [Langfuse experiments](https://langfuse.com/docs/tracing-features/tags) |
| Lab | 25 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python experiment tracking](https://mlflow.org/docs/latest/getting-started/) (~15 min)
- [Langfuse experiments](https://langfuse.com/docs/tracing-features/tags) (~10 min)

#### Lab steps
1. Create capstone/research/novel-experiment/run_experiment.py
1. Configure MLflow or JSONL logging for all conditions

**Deliverable:** Experiment runner script

### Day 2 — Run control conditions (60 min)

**Objective:** Execute BKT-only and GraphRAG-only baseline arms

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Google ML experiment tracking](https://developers.google.com/machine-learning/testing-debugging) |
| Read | 10 | [pyBKT API](https://github.com/CAHLR/pyBKT) |
| Lab | 30 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML experiment tracking](https://developers.google.com/machine-learning/testing-debugging) (~10 min)
- [pyBKT API](https://github.com/CAHLR/pyBKT) (~10 min)

#### Lab steps
1. Run control arms and log to capstone/research/novel-experiment/results/control/
1. Verify result files match pre-registration schema

**Deliverable:** Control condition results

### Day 3 — Run treatment condition (60 min)

**Objective:** Execute novel combined KT+GraphRAG treatment arm

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GraphRAG query modes](https://microsoft.github.io/graphrag/query/overview/) |
| Read | 10 | [Capstone orchestrator](capstone/src/tutor/orchestrator.py) |
| Lab | 30 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG query modes](https://microsoft.github.io/graphrag/query/overview/) (~10 min)
- [Capstone orchestrator](capstone/src/tutor/orchestrator.py) (~10 min)

#### Lab steps
1. Run treatment arm with combined system
1. Log all sessions to capstone/research/novel-experiment/results/treatment/

**Deliverable:** Treatment condition results

### Day 4 — Mid-run quality check (60 min)

**Objective:** Inspect intermediate results for anomalies or protocol violations

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Data quality checks](https://developers.google.com/machine-learning/testing-debugging) |
| Read | 10 | [Statistical outlier detection](https://docs.scipy.org/doc/scipy/reference/stats.html) |
| Lab | 30 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Data quality checks](https://developers.google.com/machine-learning/testing-debugging) (~10 min)
- [Statistical outlier detection](https://docs.scipy.org/doc/scipy/reference/stats.html) (~10 min)

#### Lab steps
1. Run mid-experiment QC script on partial results
1. Document any protocol deviations in capstone/research/novel-experiment/DEVIATIONS.md

**Deliverable:** Mid-run QC report

### Day 5 — Week 61 checkpoint (60 min)

**Objective:** All experiment conditions complete with logged results

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Experiment completeness checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) |
| Lab | 40 | Hands-on in `capstone/research/novel-experiment//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Experiment completeness checklist](https://www.cs.mcgill.ca/~jpineau/ReproducibilityChecklist.pdf) (~10 min)

#### Lab steps
1. Verify all pre-registered conditions have result files
1. Back up results to capstone/research/novel-experiment/results/BACKUP/

**Deliverable:** Complete experiment results

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
