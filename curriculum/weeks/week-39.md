# Week 39: Guardrails for tool use

- **Phase:** Phase 5 — MCP & Agentic Tutors
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Guardrails for tool use* committed to this repo.

---

### Day 1 — Guardrails AI framework intro (60 min)

**Objective:** Study input/output validation for tool-using agents

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Guardrails AI docs](https://www.guardrailsai.com/docs) |
| Read | 10 | [Guardrails validators hub](https://www.guardrailsai.com/docs/hub) |
| Lab | 25 | Hands-on in `notes/week-39//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Guardrails AI docs](https://www.guardrailsai.com/docs) (~20 min)
- [Guardrails validators hub](https://www.guardrailsai.com/docs/hub) (~10 min)

#### Lab steps
1. Install guardrails-ai in capstone/requirements.txt
1. Write notes/week-39/guardrails-overview.md

**Deliverable:** Guardrails setup notes

### Day 2 — Tool argument validators (60 min)

**Objective:** Validate MCP tool inputs before execution

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [JSON Schema validation](https://json-schema.org/learn/getting-started-step-by-step) |
| Read | 15 | [Pydantic validation](https://docs.pydantic.dev/latest/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [JSON Schema validation](https://json-schema.org/learn/getting-started-step-by-step) (~15 min)
- [Pydantic validation](https://docs.pydantic.dev/latest/) (~15 min)

#### Lab steps
1. Add capstone/src/tutor/mcp/validators.py with Pydantic models for each tool
1. Reject malformed skill_id and out-of-range mastery values

**Deliverable:** validators.py

### Day 3 — Tool output sanitization (60 min)

**Objective:** Strip sensitive data and validate tool response shape

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OWASP data exposure](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [Anthropic safety best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) |
| Lab | 25 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP data exposure](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)
- [Anthropic safety best practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) (~10 min)

#### Lab steps
1. Add output sanitizer in capstone/src/tutor/mcp/output_guard.py
1. Test: tool cannot return full student PII

**Deliverable:** output_guard.py

### Day 4 — Jailbreak via tool injection (60 min)

**Objective:** Test prompt injection attacks routed through tool args

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OWASP LLM prompt injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [Microsoft prompt injection paper](https://arxiv.org/abs/2302.05733) |
| Lab | 25 | Hands-on in `capstone/logs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM prompt injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min)
- [Microsoft prompt injection paper](https://arxiv.org/abs/2302.05733) (~10 min)

#### Lab steps
1. Run 15 injection payloads through tool validators
1. Log blocked attempts to capstone/logs/guardrail_blocks.jsonl

**Deliverable:** Injection test log

### Day 5 — Week 39 checkpoint (60 min)

**Objective:** Rate limiting and per-session tool budgets configured

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Token bucket rate limiting](https://en.wikipedia.org/wiki/Token_bucket) |
| Read | 10 | [OpenAI rate limits](https://platform.openai.com/docs/guides/rate-limits) |
| Lab | 30 | Hands-on in `capstone/src/tutor/mcp//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Token bucket rate limiting](https://en.wikipedia.org/wiki/Token_bucket) (~10 min)
- [OpenAI rate limits](https://platform.openai.com/docs/guides/rate-limits) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/mcp/rate_limiter.py with 20 calls/session limit
1. Document limits in capstone/docs/mcp-threat-model.md

**Deliverable:** Rate limiter + updated threat model

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
