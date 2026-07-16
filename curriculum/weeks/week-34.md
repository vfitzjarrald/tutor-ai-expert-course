# Week 34: Build first MCP server

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Build first MCP server* committed to this repo.

---

### Day 1 — MCP TypeScript SDK scaffold (60 min)

**Objective:** Initialize MCP server project with official TypeScript SDK

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) |
| Read | 15 | [MCP server quickstart](https://modelcontextprotocol.io/docs/develop/build-server) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) (~20 min)
- [MCP server quickstart](https://modelcontextprotocol.io/docs/develop/build-server) (~15 min)

#### Lab steps
1. Scaffold capstone/src/tutor/mcp/server/ with package.json and tsconfig
1. Verify npm run build succeeds

**Deliverable:** MCP server scaffold

### Day 2 — First tool: get_skill_info (60 min)

**Objective:** Expose skill lookup as MCP tool with typed parameters

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP tool registration](https://modelcontextprotocol.io/docs/develop/build-server#tools) |
| Read | 10 | [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP tool registration](https://modelcontextprotocol.io/docs/develop/build-server#tools) (~15 min)
- [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) (~10 min)

#### Lab steps
1. Implement get_skill_info tool reading capstone/data/graph/skills.json
1. Return skill metadata + prerequisites on valid skill_id

**Deliverable:** get_skill_info tool

### Day 3 — First resource: curriculum graph (60 min)

**Objective:** Serve graph snapshot as MCP readable resource

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP resources tutorial](https://modelcontextprotocol.io/docs/develop/build-server#resources) |
| Read | 10 | [Neo4j export patterns](https://neo4j.com/docs/cypher-manual/current/clauses/return/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP resources tutorial](https://modelcontextprotocol.io/docs/develop/build-server#resources) (~15 min)
- [Neo4j export patterns](https://neo4j.com/docs/cypher-manual/current/clauses/return/) (~10 min)

#### Lab steps
1. Register curriculum://graph/snapshot resource URI
1. Resource returns serialized skills + edges JSON

**Deliverable:** Graph snapshot resource

### Day 4 — MCP Inspector manual testing (60 min)

**Objective:** Validate server tools and resources with MCP Inspector

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [MCP Inspector GitHub](https://github.com/modelcontextprotocol/inspector) |
| Read | 10 | [MCP debugging guide](https://modelcontextprotocol.io/docs/tools/inspector) |
| Lab | 25 | Hands-on in `notes/week-34//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP Inspector GitHub](https://github.com/modelcontextprotocol/inspector) (~20 min)
- [MCP debugging guide](https://modelcontextprotocol.io/docs/tools/inspector) (~10 min)

#### Lab steps
1. Run MCP Inspector against local server
1. Screenshot successful get_skill_info call to notes/week-34/inspector.png

**Deliverable:** Inspector test log

### Day 5 — Week 34 checkpoint (60 min)

**Objective:** Commit working MCP server with README setup steps

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [MCP examples repo](https://github.com/modelcontextprotocol/servers) |
| Lab | 40 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP examples repo](https://github.com/modelcontextprotocol/servers) (~10 min)

#### Lab steps
1. Write capstone/src/tutor/mcp/README.md with start commands
1. Add capstone/tests/test_mcp_server.sh smoke script

**Deliverable:** MCP server README + smoke test

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
