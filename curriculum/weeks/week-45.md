# Week 45: Observability with Langfuse

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Observability with Langfuse* committed to this repo.

---

### Day 1 — Langfuse project setup (60 min)

**Objective:** Create Langfuse project and configure API keys for capstone

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Langfuse docs](https://langfuse.com/docs) |
| Read | 15 | [Langfuse Python SDK](https://langfuse.com/docs/sdk/python) |
| Lab | 25 | Hands-on in `capstone/src/tutor/observability//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse docs](https://langfuse.com/docs) (~20 min)
- [Langfuse Python SDK](https://langfuse.com/docs/sdk/python) (~15 min)

#### Lab steps
1. Add langfuse to capstone/requirements.txt
1. Configure LANGFUSE_* keys in capstone/.env.example

**Deliverable:** Langfuse project configured

### Day 2 — Trace LLM and retrieval calls (60 min)

**Objective:** Instrument orchestrator with Langfuse spans for each step

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Langfuse tracing](https://langfuse.com/docs/tracing) |
| Read | 10 | [OpenTelemetry concepts](https://opentelemetry.io/docs/concepts/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/observability//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse tracing](https://langfuse.com/docs/tracing) (~20 min)
- [OpenTelemetry concepts](https://opentelemetry.io/docs/concepts/) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/observability/langfuse_tracer.py
1. Trace LLM, retrieval, and MCP tool calls in orchestrator

**Deliverable:** langfuse_tracer.py

### Day 3 — Custom scores and metadata (60 min)

**Objective:** Attach tutor-specific scores: hint_level, mastery, faithfulness

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Langfuse scores](https://langfuse.com/docs/scores/overview) |
| Read | 10 | [Langfuse metadata](https://langfuse.com/docs/tracing-features/metadata) |
| Lab | 25 | Hands-on in `capstone/src/tutor/observability//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse scores](https://langfuse.com/docs/scores/overview) (~15 min)
- [Langfuse metadata](https://langfuse.com/docs/tracing-features/metadata) (~10 min)

#### Lab steps
1. Log hint_level and mastery_posterior as trace metadata
1. Add faithfulness score from RAGAS to completed sessions

**Deliverable:** Custom trace metadata

### Day 4 — Session replay review (60 min)

**Objective:** Review 10 traced sessions in Langfuse UI for anomalies

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Langfuse session view](https://langfuse.com/docs/tracing-features/sessions) |
| Read | 10 | [Langfuse human annotation](https://langfuse.com/docs/scores/manually) |
| Lab | 25 | Hands-on in `notes/week-45//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse session view](https://langfuse.com/docs/tracing-features/sessions) (~15 min)
- [Langfuse human annotation](https://langfuse.com/docs/scores/manually) (~10 min)

#### Lab steps
1. Review 10 sessions in Langfuse dashboard
1. Flag 3 anomalies in notes/week-45/trace-review.md

**Deliverable:** Trace review notes

### Day 5 — Week 45 checkpoint (60 min)

**Objective:** Observability dashboard template for weekly reporting

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Langfuse dashboards](https://langfuse.com/docs/analytics/overview) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse dashboards](https://langfuse.com/docs/analytics/overview) (~10 min)

#### Lab steps
1. Create capstone/docs/observability-weekly-report-template.md
1. Generate first weekly report from Langfuse data

**Deliverable:** Weekly report template

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
