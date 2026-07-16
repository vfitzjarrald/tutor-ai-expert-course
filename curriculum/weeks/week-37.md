# Week 37: ReAct tutor agent loop

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *ReAct tutor agent loop* committed to this repo.

---

### Day 1 — ReAct paper deep read (60 min)

**Objective:** Study Reason+Act loop for tool-using tutor agents

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [ReAct paper](https://arxiv.org/abs/2210.03629) |
| Read | 10 | [LangChain ReAct agent](https://python.langchain.com/docs/how_to/migrate_agent/) |
| Lab | 25 | Hands-on in `notes/week-37//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [ReAct paper](https://arxiv.org/abs/2210.03629) (~25 min)
- [LangChain ReAct agent](https://python.langchain.com/docs/how_to/migrate_agent/) (~10 min)

#### Lab steps
1. Write notes/week-37/react-notes.md with Thought/Action/Observation examples
1. Design tutor-specific ReAct trace for hint generation

**Deliverable:** ReAct design notes

### Day 2 — Implement agent_loop.py (60 min)

**Objective:** Build ReAct-style thought/action/observation cycle for tutor

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP client SDK](https://github.com/modelcontextprotocol/typescript-sdk) |
| Read | 15 | [Anthropic tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP client SDK](https://github.com/modelcontextprotocol/typescript-sdk) (~15 min)
- [Anthropic tool use](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/mcp/agent_loop.py with max 5 steps
1. Wire to get_skill_info MCP tool

**Deliverable:** agent_loop.py

### Day 3 — Tool call logging (60 min)

**Objective:** Log every tool invocation with inputs, outputs, and latency

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Langfuse tracing](https://langfuse.com/docs/tracing) |
| Read | 10 | [Structured logging Python](https://docs.python.org/3/howto/logging-cookbook.html) |
| Lab | 25 | Hands-on in `capstone/src/tutor/observability//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Langfuse tracing](https://langfuse.com/docs/tracing) (~15 min)
- [Structured logging Python](https://docs.python.org/3/howto/logging-cookbook.html) (~10 min)

#### Lab steps
1. Log tool calls to capstone/logs/tools.jsonl with timestamp and duration
1. Add capstone/src/tutor/observability/tool_logger.py

**Deliverable:** tool_logger.py + logs

### Day 4 — Max-step and timeout guards (60 min)

**Objective:** Prevent runaway agent loops and hung tool calls

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI agent best practices](https://platform.openai.com/docs/guides/agents) |
| Read | 10 | [Python asyncio timeouts](https://docs.python.org/3/library/asyncio-task.html#timeouts) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI agent best practices](https://platform.openai.com/docs/guides/agents) (~15 min)
- [Python asyncio timeouts](https://docs.python.org/3/library/asyncio-task.html#timeouts) (~10 min)

#### Lab steps
1. Add MAX_STEPS=5 and TOOL_TIMEOUT_MS=3000 to agent_loop config
1. Test agent stops gracefully on timeout

**Deliverable:** Agent guardrails config

### Day 5 — Week 37 checkpoint (60 min)

**Objective:** ReAct tutor demo with logged tool trace

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [LangChain agent debugging](https://python.langchain.com/docs/how_to/debugging/) |
| Lab | 40 | Hands-on in `notes/week-37//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [LangChain agent debugging](https://python.langchain.com/docs/how_to/debugging/) (~10 min)

#### Lab steps
1. Run 5 tutor sessions through agent_loop
1. Save best trace to notes/week-37/sample-trace.json

**Deliverable:** ReAct demo trace

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
