# Week 38: Tool permission matrix

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Tool permission matrix* committed to this repo.

---

### Day 1 — Tool allowlist design (60 min)

**Objective:** Define which MCP tools are available per student session context

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Principle of least privilege](https://csrc.nist.gov/glossary/term/least_privilege) |
| Read | 15 | [MCP authorization patterns](https://modelcontextprotocol.io/docs/concepts/security) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Principle of least privilege](https://csrc.nist.gov/glossary/term/least_privilege) (~15 min)
- [MCP authorization patterns](https://modelcontextprotocol.io/docs/concepts/security) (~15 min)

#### Lab steps
1. Draft allowlist matrix in capstone/docs/tool-permission-matrix.md
1. Define student vs educator vs admin contexts

**Deliverable:** Permission matrix draft

### Day 2 — Permission matrix YAML (60 min)

**Objective:** Encode tool permissions in machine-readable policy file

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [YAML spec](https://yaml.org/spec/1.2.2/) |
| Read | 10 | [Open Policy Agent intro](https://www.openpolicyagent.org/docs/latest/) |
| Lab | 30 | Hands-on in `capstone/src/tutor/policies//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [YAML spec](https://yaml.org/spec/1.2.2/) (~10 min)
- [Open Policy Agent intro](https://www.openpolicyagent.org/docs/latest/) (~10 min)

#### Lab steps
1. Create capstone/src/tutor/policies/tool_permissions.yaml
1. Map roles to allowed MCP tool names

**Deliverable:** tool_permissions.yaml

### Day 3 — Server-side permission enforcement (60 min)

**Objective:** Reject unauthorized tool calls at MCP server layer

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP server middleware](https://modelcontextprotocol.io/docs/develop/build-server) |
| Read | 10 | [Guardrails AI docs](https://www.guardrailsai.com/docs) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP server middleware](https://modelcontextprotocol.io/docs/develop/build-server) (~15 min)
- [Guardrails AI docs](https://www.guardrailsai.com/docs) (~10 min)

#### Lab steps
1. Add permission check middleware in capstone/src/tutor/mcp/server/
1. Return structured error on denied tool call

**Deliverable:** Permission middleware

### Day 4 — Adversarial permission bypass tests (60 min)

**Objective:** Attempt 10 ways to invoke forbidden tools

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OWASP LLM01 Prompt Injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 25 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM01 Prompt Injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)
- [OpenAI eval guide](https://platform.openai.com/docs/guides/evaluation) (~10 min)

#### Lab steps
1. Add capstone/eval/security/tool_permission_cases.yaml with 10 attacks
1. Run tests and log pass/fail to eval/security/permission_results.json

**Deliverable:** Permission test results

### Day 5 — Week 38 checkpoint (60 min)

**Objective:** Permission matrix reviewed and all bypass tests pass

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (~10 min)

#### Lab steps
1. Finalize capstone/docs/tool-permission-matrix.md
1. Commit green permission test suite

**Deliverable:** Final permission matrix

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
