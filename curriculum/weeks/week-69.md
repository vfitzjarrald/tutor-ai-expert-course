# Week 69: MCP server open-source

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *MCP server open-source* committed to this repo.

---

### Day 1 — MCP server packaging (60 min)

**Objective:** Prepare capstone MCP server for open-source release

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [npm package publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) |
| Read | 10 | [MCP servers repo](https://github.com/modelcontextprotocol/servers) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [npm package publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry) (~15 min)
- [MCP servers repo](https://github.com/modelcontextprotocol/servers) (~10 min)

#### Lab steps
1. Audit capstone/src/tutor/mcp/ for secrets and hardcoded paths
1. Add capstone/src/tutor/mcp/LICENSE and CONTRIBUTING.md

**Deliverable:** MCP server audit complete

### Day 2 — MCP server documentation (60 min)

**Objective:** Write comprehensive README with install, config, and tool reference

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP server quickstart](https://modelcontextprotocol.io/docs/develop/build-server) |
| Read | 10 | [README best practices](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP server quickstart](https://modelcontextprotocol.io/docs/develop/build-server) (~15 min)
- [README best practices](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes) (~10 min)

#### Lab steps
1. Complete capstone/src/tutor/mcp/README.md with tool catalog and examples
1. Add mcp.json example config for Cursor and Claude Desktop

**Deliverable:** MCP server README

### Day 3 — MCP server tests and CI (60 min)

**Objective:** Add CI pipeline running MCP server smoke tests on every push

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GitHub Actions CI](https://docs.github.com/en/actions/quickstart) |
| Read | 10 | [MCP Inspector CI](https://github.com/modelcontextprotocol/inspector) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub Actions CI](https://docs.github.com/en/actions/quickstart) (~15 min)
- [MCP Inspector CI](https://github.com/modelcontextprotocol/inspector) (~10 min)

#### Lab steps
1. Add .github/workflows/mcp-server.yml running test_mcp_server.sh
1. Verify CI green on main branch

**Deliverable:** MCP CI pipeline

### Day 4 — Submit to MCP servers registry (60 min)

**Objective:** Submit capstone MCP server to official MCP servers list

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP servers contributing](https://github.com/modelcontextprotocol/servers/blob/main/CONTRIBUTING.md) |
| Read | 10 | [MCP server metadata spec](https://modelcontextprotocol.io/docs/develop/build-server) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP servers contributing](https://github.com/modelcontextprotocol/servers/blob/main/CONTRIBUTING.md) (~15 min)
- [MCP server metadata spec](https://modelcontextprotocol.io/docs/develop/build-server) (~10 min)

#### Lab steps
1. Prepare submission PR to modelcontextprotocol/servers repo
1. Include server description, install steps, and tool list

**Deliverable:** MCP registry PR submitted

### Day 5 — Week 69 checkpoint (60 min)

**Objective:** MCP server publicly released and registry PR open

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Semantic versioning](https://semver.org/) |
| Lab | 40 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Semantic versioning](https://semver.org/) (~10 min)

#### Lab steps
1. Tag capstone MCP server v1.0.0
1. Update capstone/docs/publications.md with MCP server release URL

**Deliverable:** MCP server v1.0.0 released

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
