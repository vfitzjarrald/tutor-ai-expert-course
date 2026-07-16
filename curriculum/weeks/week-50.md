# Week 50: Documentation & runbook

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Documentation & runbook* committed to this repo.

---

### Day 1 — Runbook structure design (60 min)

**Objective:** Outline production runbook sections for capstone tutor

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Google SRE runbook template](https://sre.google/sre-book/table-of-contents/) |
| Read | 10 | [Incident response basics](https://response.pagerduty.com/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google SRE runbook template](https://sre.google/sre-book/table-of-contents/) (~15 min)
- [Incident response basics](https://response.pagerduty.com/) (~10 min)

#### Lab steps
1. Create capstone/docs/runbook.md skeleton with 8 sections
1. List on-call responsibilities and escalation paths

**Deliverable:** Runbook skeleton

### Day 2 — Deployment documentation (60 min)

**Objective:** Document local, staging, and production deployment steps

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Docker Compose docs](https://docs.docker.com/compose/) |
| Read | 10 | [12-factor app config](https://12factor.net/config) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Docker Compose docs](https://docs.docker.com/compose/) (~15 min)
- [12-factor app config](https://12factor.net/config) (~10 min)

#### Lab steps
1. Add capstone/docker-compose.yml for Neo4j + app
1. Document deploy steps in capstone/docs/deployment.md

**Deliverable:** Deployment docs + compose

### Day 3 — Monitoring and alerting (60 min)

**Objective:** Define alerts for error rate, latency, and cost thresholds

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse alerts](https://langfuse.com/docs/analytics/overview) |
| Read | 10 | [Prometheus alerting](https://prometheus.io/docs/alerting/latest/overview/) |
| Lab | 30 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse alerts](https://langfuse.com/docs/analytics/overview) (~10 min)
- [Prometheus alerting](https://prometheus.io/docs/alerting/latest/overview/) (~10 min)

#### Lab steps
1. Add capstone/docs/monitoring.md with alert thresholds
1. Configure Langfuse alert for faithfulness score < 0.7

**Deliverable:** Monitoring config doc

### Day 4 — API and architecture docs (60 min)

**Objective:** Generate architecture diagram and module reference

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Mermaid diagram syntax](https://mermaid.js.org/intro/) |
| Read | 10 | [Python docstring conventions](https://docs.python.org/3/tutorial/controlflow.html#documentation-strings) |
| Lab | 30 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Mermaid diagram syntax](https://mermaid.js.org/intro/) (~10 min)
- [Python docstring conventions](https://docs.python.org/3/tutorial/controlflow.html#documentation-strings) (~10 min)

#### Lab steps
1. Add capstone/docs/architecture.md with Mermaid component diagram
1. Document public API of orchestrator and adaptivity engine

**Deliverable:** Architecture documentation

### Day 5 — Week 50 checkpoint (60 min)

**Objective:** Complete runbook reviewed and all docs linked from README

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [README documentation links](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [README documentation links](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) (~10 min)

#### Lab steps
1. Finalize capstone/docs/runbook.md
1. Add docs index section to capstone/README.md

**Deliverable:** Complete runbook

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
