# Week 41: Capstone sprint 1 — integration

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Capstone sprint 1 — integration* committed to this repo.

---

### Day 1 — Sprint 1 planning session (60 min)

**Objective:** Define integration scope: graph + KT + GraphRAG + MCP in one flow

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Scrum sprint planning](https://www.scrum.org/resources/what-is-a-sprint) |
| Read | 10 | [Capstone README](capstone/README.md) |
| Lab | 25 | Hands-on in `notes/week-41//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Scrum sprint planning](https://www.scrum.org/resources/what-is-a-sprint) (~15 min)
- [Capstone README](capstone/README.md) (~10 min)

#### Lab steps
1. Write notes/week-41/sprint-plan.md with acceptance criteria
1. List 5 integration bugs to fix this sprint

**Deliverable:** Sprint 1 plan

### Day 2 — Pipeline wiring sprint (60 min)

**Objective:** Connect all modules through unified tutor orchestrator

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [LangChain LCEL](https://python.langchain.com/docs/concepts/lcel/) |
| Read | 10 | [Python package structure](https://docs.python.org/3/tutorial/modules.html) |
| Lab | 25 | Hands-on in `capstone/src/tutor//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain LCEL](https://python.langchain.com/docs/concepts/lcel/) (~15 min)
- [Python package structure](https://docs.python.org/3/tutorial/modules.html) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/orchestrator.py calling graph, KT, RAG, MCP
1. Add integration test capstone/tests/test_orchestrator.py

**Deliverable:** orchestrator.py

### Day 3 — Data flow validation (60 min)

**Objective:** Verify student session flows correctly through all subsystems

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) |
| Read | 10 | [pytest fixtures](https://docs.pytest.org/en/stable/explanation/fixtures.html) |
| Lab | 25 | Hands-on in `capstone/tests//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML testing guide](https://developers.google.com/machine-learning/testing-debugging) (~15 min)
- [pytest fixtures](https://docs.pytest.org/en/stable/explanation/fixtures.html) (~10 min)

#### Lab steps
1. Run 5 end-to-end session simulations
1. Fix top integration failure found

**Deliverable:** Integration test green

### Day 4 — Error handling unification (60 min)

**Objective:** Consistent error responses when graph, RAG, or MCP fails

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Python exception hierarchy](https://docs.python.org/3/library/exceptions.html) |
| Read | 10 | [Graceful degradation patterns](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) |
| Lab | 30 | Hands-on in `capstone/src/tutor//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Python exception hierarchy](https://docs.python.org/3/library/exceptions.html) (~10 min)
- [Graceful degradation patterns](https://docs.llamaindex.ai/en/stable/optimizing/production_rag/) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/errors.py with TutorError hierarchy
1. Orchestrator falls back to vector-only RAG if GraphRAG fails

**Deliverable:** Unified error handling

### Day 5 — Week 41 checkpoint (60 min)

**Objective:** Sprint 1 retrospective and demo of integrated flow

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Sprint retrospective guide](https://www.scrum.org/resources/what-is-a-sprint-retrospective) |
| Lab | 40 | Hands-on in `notes/week-41//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Sprint retrospective guide](https://www.scrum.org/resources/what-is-a-sprint-retrospective) (~10 min)

#### Lab steps
1. Write notes/week-41/retrospective.md
1. Demo integrated tutor session to notes/week-41/demo-notes.md

**Deliverable:** Sprint 1 retrospective

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
