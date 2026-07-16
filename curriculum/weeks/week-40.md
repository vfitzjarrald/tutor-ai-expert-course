# Week 40: Phase 5 gate — 2 MCP tools live

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Phase 5 gate — 2 MCP tools live* committed to this repo.

---

### Day 1 — Second MCP tool: update_mastery (60 min)

**Objective:** Implement mastery update tool with validation and audit log

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP tools spec](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) |
| Read | 10 | [BKT mastery update semantics](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP tools spec](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) (~15 min)
- [BKT mastery update semantics](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) (~10 min)

#### Lab steps
1. Implement update_mastery tool in capstone/src/tutor/mcp/server/
1. Write audit entry to capstone/logs/mastery_audit.jsonl on each call

**Deliverable:** update_mastery tool

### Day 2 — End-to-end ReAct + 2 tools demo (60 min)

**Objective:** Run tutor agent loop using get_skill_info and update_mastery

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [ReAct paper](https://arxiv.org/abs/2210.03629) |
| Read | 10 | [MCP Inspector](https://github.com/modelcontextprotocol/inspector) |
| Lab | 30 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [ReAct paper](https://arxiv.org/abs/2210.03629) (~10 min)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector) (~10 min)

#### Lab steps
1. Wire both tools into agent_loop.py
1. Complete 3 full tutor sessions with tool traces

**Deliverable:** Two-tool agent demo

### Day 3 — Phase 5 gate checklist (60 min)

**Objective:** Verify all Phase 5 MCP deliverables against curriculum CHECKS

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Course CHECKS](curriculum/CHECKS.md) |
| Read | 10 | [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26) |
| Lab | 25 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Course CHECKS](curriculum/CHECKS.md) (~15 min)
- [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26) (~10 min)

#### Lab steps
1. Complete checkpoints/phase-gates.md Phase 5 section
1. Fix any missing MCP artifacts

**Deliverable:** Phase 5 checklist done

### Day 4 — Agent security review (60 min)

**Objective:** Run OWASP subset and permission tests on MCP stack

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [MCP security docs](https://modelcontextprotocol.io/docs/concepts/security) |
| Lab | 25 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min)
- [MCP security docs](https://modelcontextprotocol.io/docs/concepts/security) (~10 min)

#### Lab steps
1. Run capstone/eval/security/tool_permission_cases.yaml
1. Run 10 injection tests; all must pass

**Deliverable:** Security review report

### Day 5 — Phase 5 gate (60 min)

**Objective:** Ship Phase 5 checkpoint with live 2-tool MCP demo

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Semantic versioning](https://semver.org/) |
| Lab | 40 | Hands-on in `checkpoints//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Semantic versioning](https://semver.org/) (~10 min)

#### Lab steps
1. Write checkpoints/phase-05-complete.md
1. Tag capstone v0.5.0 and record demo in notes/week-40/demo-script.md

**Deliverable:** Phase 5 complete

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
