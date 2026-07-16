# Week 48: Safety red team round 2

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Safety red team round 2* committed to this repo.

---

### Day 1 — Red team plan round 2 (60 min)

**Objective:** Design adversarial test suite for integrated production tutor

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [Anthropic red teaming](https://www.anthropic.com/research) |
| Lab | 25 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min)
- [Anthropic red teaming](https://www.anthropic.com/research) (~10 min)

#### Lab steps
1. Write capstone/eval/security/red_team_plan_v2.md with 30 attack scenarios
1. Cover prompt injection, tool abuse, and answer leakage

**Deliverable:** Red team plan v2

### Day 2 — Prompt injection battery (60 min)

**Objective:** Run 15 injection attacks against integrated orchestrator

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OWASP LLM01](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [Microsoft prompt injection survey](https://arxiv.org/abs/2302.05733) |
| Lab | 25 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM01](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)
- [Microsoft prompt injection survey](https://arxiv.org/abs/2302.05733) (~10 min)

#### Lab steps
1. Execute injection cases from capstone/eval/security/injection_cases.yaml
1. Log results to capstone/eval/security/red_team_v2_results.json

**Deliverable:** Injection test results

### Day 3 — Tool abuse scenarios (60 min)

**Objective:** Test unauthorized mastery updates and skill info exfiltration

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [MCP security docs](https://modelcontextprotocol.io/docs/concepts/security) |
| Read | 10 | [Principle of least privilege](https://csrc.nist.gov/glossary/term/least_privilege) |
| Lab | 25 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [MCP security docs](https://modelcontextprotocol.io/docs/concepts/security) (~15 min)
- [Principle of least privilege](https://csrc.nist.gov/glossary/term/least_privilege) (~10 min)

#### Lab steps
1. Run 10 tool abuse scenarios against MCP server
1. Verify permission middleware blocks all unauthorized calls

**Deliverable:** Tool abuse test results

### Day 4 — Mitigation fixes (60 min)

**Objective:** Patch top 3 vulnerabilities found in red team round 2

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Guardrails AI docs](https://www.guardrailsai.com/docs) |
| Read | 10 | [OpenAI safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) |
| Lab | 30 | Hands-on in `capstone/src/tutor/policies//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Guardrails AI docs](https://www.guardrailsai.com/docs) (~10 min)
- [OpenAI safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) (~10 min)

#### Lab steps
1. Fix top 3 issues in capstone/src/tutor/policies/ and mcp/
1. Re-run failed red team cases — all must pass

**Deliverable:** Security patches committed

### Day 5 — Week 48 checkpoint (60 min)

**Objective:** Red team v2 report and updated safety section in README

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) |
| Lab | 40 | Hands-on in `capstone/eval/security//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (~10 min)

#### Lab steps
1. Write capstone/eval/security/red_team_v2_report.md
1. Update capstone/README.md safety section

**Deliverable:** Red team v2 report

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
