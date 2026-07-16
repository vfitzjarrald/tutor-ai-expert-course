# Week 47: A/B test hint strategies

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *A/B test hint strategies* committed to this repo.

---

### Day 1 — A/B experiment design (60 min)

**Objective:** Design controlled test comparing hint strategy variants

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Google ML A/B testing](https://developers.google.com/machine-learning/testing-debugging) |
| Read | 10 | [OpenAI eval best practices](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML A/B testing](https://developers.google.com/machine-learning/testing-debugging) (~20 min)
- [OpenAI eval best practices](https://platform.openai.com/docs/guides/evaluation) (~10 min)

#### Lab steps
1. Write capstone/docs/ab-hint-experiment.md with hypothesis and metrics
1. Define control (Socratic) vs treatment (worked example) arms

**Deliverable:** A/B experiment design

### Day 2 — Experiment instrumentation (60 min)

**Objective:** Randomly assign sessions to hint strategy arms

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Python random assignment](https://docs.python.org/3/library/random.html) |
| Read | 10 | [Langfuse experiment tracking](https://langfuse.com/docs/tracing-features/tags) |
| Lab | 30 | Hands-on in `capstone/src/tutor/experiments//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python random assignment](https://docs.python.org/3/library/random.html) (~10 min)
- [Langfuse experiment tracking](https://langfuse.com/docs/tracing-features/tags) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/experiments/ab_assign.py
1. Tag Langfuse traces with experiment arm

**Deliverable:** ab_assign.py

### Day 3 — Run A/B collection (60 min)

**Objective:** Collect 30 sessions per arm on same skill set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Statistical power basics](https://en.wikipedia.org/wiki/Power_(statistics)) |
| Read | 10 | [scipy stats](https://docs.scipy.org/doc/scipy/reference/stats.html) |
| Lab | 30 | Hands-on in `capstone/eval/experiments//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Statistical power basics](https://en.wikipedia.org/wiki/Power_(statistics)) (~10 min)
- [scipy stats](https://docs.scipy.org/doc/scipy/reference/stats.html) (~10 min)

#### Lab steps
1. Run 30 simulated sessions per arm via capstone/scripts/run_ab_sessions.py
1. Export results to capstone/eval/experiments/hint_ab_raw.csv

**Deliverable:** A/B raw data

### Day 4 — Statistical analysis (60 min)

**Objective:** Compute significance of hint strategy difference on learning proxy

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [SciPy t-test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html) |
| Read | 10 | [EDM experiment reporting](https://educationaldatamining.org/) |
| Lab | 25 | Hands-on in `capstone/eval/experiments//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [SciPy t-test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html) (~15 min)
- [EDM experiment reporting](https://educationaldatamining.org/) (~10 min)

#### Lab steps
1. Script capstone/eval/experiments/analyze_ab.py
1. Write results summary to capstone/eval/experiments/hint_ab_results.md

**Deliverable:** A/B analysis report

### Day 5 — Week 47 checkpoint (60 min)

**Objective:** A/B winner declared and default hint policy updated

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Evidence-based policy update](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 40 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Evidence-based policy update](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~10 min)

#### Lab steps
1. Update capstone/src/tutor/graph/hint_policy.py with winning strategy
1. Document decision in capstone/docs/ab-hint-experiment.md

**Deliverable:** Updated hint policy

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
