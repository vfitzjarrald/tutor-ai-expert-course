# Week 33: MCP architecture deep dive

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *MCP architecture deep dive* committed to this repo.

---

### Day 1 — MCP transport layer study (60 min)

**Objective:** Compare stdio, SSE, and streamable HTTP transports for tutor tools

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26) |
| Read | 15 | [MCP architecture overview](https://modelcontextprotocol.io/docs/concepts/architecture) |
| Lab | 25 | Hands-on in `notes/week-33//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP specification](https://modelcontextprotocol.io/specification/2025-03-26) (~25 min)
- [MCP architecture overview](https://modelcontextprotocol.io/docs/concepts/architecture) (~15 min)

#### Lab steps
1. Diagram transport options in notes/week-33/mcp-transports.md
1. Pick transport for capstone dev vs production

**Deliverable:** Transport decision doc

### Day 2 — Host-server-client roles (60 min)

**Objective:** Map MCP roles onto capstone tutor architecture

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [MCP core concepts](https://modelcontextprotocol.io/docs/concepts/architecture) |
| Read | 10 | [Lilian Weng LLM agents](https://lilianweng.github.io/posts/2023-06-23-agent/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP core concepts](https://modelcontextprotocol.io/docs/concepts/architecture) (~20 min)
- [Lilian Weng LLM agents](https://lilianweng.github.io/posts/2023-06-23-agent/) (~10 min)

#### Lab steps
1. Draw host/server/client diagram in capstone/docs/mcp-architecture.md
1. Label which component owns curriculum graph access

**Deliverable:** MCP architecture diagram

### Day 3 — Capability negotiation deep dive (60 min)

**Objective:** Study resources, tools, and prompts capability handshake

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP tools spec](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) |
| Read | 15 | [MCP resources spec](https://modelcontextprotocol.io/specification/2025-03-26/server/resources) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP tools spec](https://modelcontextprotocol.io/specification/2025-03-26/server/tools) (~15 min)
- [MCP resources spec](https://modelcontextprotocol.io/specification/2025-03-26/server/resources) (~15 min)

#### Lab steps
1. List planned MCP tools in capstone/docs/mcp-tool-catalog.md
1. Define JSON schemas for get_skill_info and update_mastery

**Deliverable:** MCP tool catalog

### Day 4 — MCP security model review (60 min)

**Objective:** Study auth, sandboxing, and least-privilege for tutor MCP servers

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP security best practices](https://modelcontextprotocol.io/docs/concepts/security) |
| Read | 15 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP security best practices](https://modelcontextprotocol.io/docs/concepts/security) (~15 min)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)

#### Lab steps
1. Write threat model in capstone/docs/mcp-threat-model.md
1. List 5 tutor-specific MCP attack vectors

**Deliverable:** MCP threat model

### Day 5 — Week 33 checkpoint (60 min)

**Objective:** Finalize MCP architecture doc and get peer review

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) (~10 min)

#### Lab steps
1. Incorporate feedback into capstone/docs/mcp-architecture.md
1. Create 5 flashcards in notes/flashcards/week-33.md

**Deliverable:** Reviewed architecture doc

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
