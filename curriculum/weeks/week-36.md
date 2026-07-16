# Week 36: Copilot Studio agent patterns

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Copilot Studio agent patterns* committed to this repo.

---

### Day 1 — Copilot Studio agent overview (60 min)

**Objective:** Study Microsoft Copilot Studio agent and connector patterns

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/) |
| Read | 10 | [Copilot Studio topics](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-create-edit-topics) |
| Lab | 25 | Hands-on in `notes/week-36//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/) (~25 min)
- [Copilot Studio topics](https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-create-edit-topics) (~10 min)

#### Lab steps
1. Summarize Copilot Studio architecture in notes/week-36/copilot-studio.md
1. Map topics/actions to MCP tools conceptually

**Deliverable:** Copilot Studio notes

### Day 2 — MCP vs Copilot connector mapping (60 min)

**Objective:** Compare MCP tools with Power Platform custom connectors

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Power Platform connectors](https://learn.microsoft.com/en-us/connectors/) |
| Read | 10 | [MCP vs REST APIs](https://modelcontextprotocol.io/docs/concepts/architecture) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Power Platform connectors](https://learn.microsoft.com/en-us/connectors/) (~15 min)
- [MCP vs REST APIs](https://modelcontextprotocol.io/docs/concepts/architecture) (~10 min)

#### Lab steps
1. Create comparison table in capstone/docs/agent-platform-comparison.md
1. Note enterprise deployment differences

**Deliverable:** Platform comparison doc

### Day 3 — Tool schema parity design (60 min)

**Objective:** Align MCP tool schemas with Copilot action definitions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAPI spec](https://swagger.io/specification/) |
| Read | 10 | [MCP tool JSON schema](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) |
| Lab | 25 | Hands-on in `capstone/docs/schemas//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAPI spec](https://swagger.io/specification/) (~15 min)
- [MCP tool JSON schema](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) (~10 min)

#### Lab steps
1. Export get_skill_info schema to capstone/docs/schemas/get_skill_info.openapi.yaml
1. Verify schema covers all Copilot-required fields

**Deliverable:** OpenAPI tool schema

### Day 4 — Enterprise deployment considerations (60 min)

**Objective:** Document auth, tenancy, and audit for production agents

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/) |
| Read | 10 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/) (~15 min)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~10 min)

#### Lab steps
1. Write capstone/docs/enterprise-agent-deployment.md
1. List 5 audit log requirements for tutor tools

**Deliverable:** Enterprise deployment notes

### Day 5 — Week 36 checkpoint (60 min)

**Objective:** Agent pattern comparison finalized with capstone recommendation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [ReAct paper](https://arxiv.org/abs/2210.03629) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [ReAct paper](https://arxiv.org/abs/2210.03629) (~10 min)

#### Lab steps
1. Add platform recommendation to capstone/docs/agent-platform-comparison.md
1. Link to upcoming ReAct implementation week

**Deliverable:** Platform recommendation ADR

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
