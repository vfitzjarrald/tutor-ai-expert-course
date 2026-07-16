# Week 35: Cursor MCP integration

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Cursor MCP integration* committed to this repo.

---

### Day 1 — Cursor mcp.json configuration (60 min)

**Objective:** Register capstone MCP server in Cursor IDE settings

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) |
| Read | 10 | [MCP client configuration](https://modelcontextprotocol.io/docs/develop/connect-local-servers) |
| Lab | 25 | Hands-on in `.cursor//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol) (~20 min)
- [MCP client configuration](https://modelcontextprotocol.io/docs/develop/connect-local-servers) (~10 min)

#### Lab steps
1. Add .cursor/mcp.json pointing to capstone MCP server
1. Verify server appears in Cursor MCP panel

**Deliverable:** Cursor MCP config

### Day 2 — IDE tool invocation test (60 min)

**Objective:** Invoke get_skill_info from Cursor agent chat

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Cursor agent tools](https://docs.cursor.com/agent/tools) |
| Read | 10 | [MCP tool call flow](https://modelcontextprotocol.io/docs/concepts/tools) |
| Lab | 25 | Hands-on in `capstone/logs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Cursor agent tools](https://docs.cursor.com/agent/tools) (~15 min)
- [MCP tool call flow](https://modelcontextprotocol.io/docs/concepts/tools) (~10 min)

#### Lab steps
1. Ask Cursor agent to look up 3 skills via MCP
1. Log tool call traces to capstone/logs/cursor_mcp.jsonl

**Deliverable:** Cursor tool call log

### Day 3 — Prompt templates via MCP resources (60 min)

**Objective:** Expose tutor system prompts as MCP resources

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP prompts spec](https://modelcontextprotocol.io/specification/2025-03-26/server/prompts) |
| Read | 10 | [Anthropic system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP prompts spec](https://modelcontextprotocol.io/specification/2025-03-26/server/prompts) (~15 min)
- [Anthropic system prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) (~10 min)

#### Lab steps
1. Register tutor://prompts/socratic as MCP prompt resource
1. Test prompt retrieval from Cursor

**Deliverable:** MCP prompt resources

### Day 4 — Developer workflow documentation (60 min)

**Objective:** Document MCP setup for team onboarding

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GitHub dev setup guide pattern](https://docs.github.com/en/get-started) |
| Read | 10 | [Cursor MCP troubleshooting](https://docs.cursor.com/context/model-context-protocol) |
| Lab | 30 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub dev setup guide pattern](https://docs.github.com/en/get-started) (~10 min)
- [Cursor MCP troubleshooting](https://docs.cursor.com/context/model-context-protocol) (~10 min)

#### Lab steps
1. Write capstone/docs/cursor-mcp-setup.md with step-by-step screenshots
1. Add troubleshooting section for common errors

**Deliverable:** Cursor setup guide

### Day 5 — Week 35 checkpoint (60 min)

**Objective:** End-to-end Cursor + MCP developer workflow verified

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [MCP SDK releases](https://github.com/modelcontextprotocol/typescript-sdk/releases) |
| Lab | 40 | Hands-on in `notes/week-35//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP SDK releases](https://github.com/modelcontextprotocol/typescript-sdk/releases) (~10 min)

#### Lab steps
1. Record notes/week-35/cursor-mcp-demo.md walkthrough
1. Confirm fresh clone setup works in <15 min

**Deliverable:** Verified dev workflow

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
