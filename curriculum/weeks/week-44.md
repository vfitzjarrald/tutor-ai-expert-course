# Week 44: Capstone sprint 4 — polish

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Capstone sprint 4 — polish* committed to this repo.

---

### Day 1 — Code polish pass (60 min)

**Objective:** Refactor orchestrator and adaptivity modules for clarity

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Clean Code Python](https://docs.python-guide.org/writing/style/) |
| Read | 10 | [Ruff linter](https://docs.astral.sh/ruff/) |
| Lab | 25 | Hands-on in `capstone/src/tutor//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Clean Code Python](https://docs.python-guide.org/writing/style/) (~15 min)
- [Ruff linter](https://docs.astral.sh/ruff/) (~10 min)

#### Lab steps
1. Run ruff check --fix on capstone/src/tutor/
1. Resolve all lint warnings in modified modules

**Deliverable:** Clean lint pass

### Day 2 — Performance smoke test (60 min)

**Objective:** Profile orchestrator latency for typical 5-turn session

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Python cProfile](https://docs.python.org/3/library/profile.html) |
| Read | 10 | [OpenAI latency guide](https://platform.openai.com/docs/guides/latency-optimization) |
| Lab | 25 | Hands-on in `capstone/eval/performance//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python cProfile](https://docs.python.org/3/library/profile.html) (~15 min)
- [OpenAI latency guide](https://platform.openai.com/docs/guides/latency-optimization) (~10 min)

#### Lab steps
1. Profile capstone/scripts/profile_session.py on 5-turn session
1. Log p50/p95 latency to capstone/eval/performance/smoke.json

**Deliverable:** Performance smoke results

### Day 3 — Golden set hardening (60 min)

**Objective:** Expand golden conversations to cover all integrated features

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI Evals](https://github.com/openai/evals) |
| Read | 10 | [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) |
| Lab | 25 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Evals](https://github.com/openai/evals) (~15 min)
- [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) (~10 min)

#### Lab steps
1. Add 15 new cases to capstone/eval/golden/conversations.yaml
1. Run capstone/eval/run_golden.py — target ≥90% pass

**Deliverable:** Expanded golden set

### Day 4 — README and quickstart polish (60 min)

**Objective:** Ensure new contributor can run tutor in 10 minutes

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [README best practices](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) |
| Read | 10 | [Docker quickstart pattern](https://docs.docker.com/get-started/) |
| Lab | 30 | Hands-on in `capstone//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [README best practices](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) (~10 min)
- [Docker quickstart pattern](https://docs.docker.com/get-started/) (~10 min)

#### Lab steps
1. Update capstone/README.md with architecture diagram and quickstart
1. Verify fresh clone → running tutor in ≤10 min

**Deliverable:** Polished README

### Day 5 — Week 44 checkpoint (60 min)

**Objective:** Polish sprint complete — all tests green, README verified

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Semantic versioning](https://semver.org/) |
| Lab | 40 | Hands-on in `notes/week-44//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Semantic versioning](https://semver.org/) (~10 min)

#### Lab steps
1. Tag capstone v0.6.0-rc1
1. Write notes/week-44/polish-retrospective.md

**Deliverable:** Release candidate tagged

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
