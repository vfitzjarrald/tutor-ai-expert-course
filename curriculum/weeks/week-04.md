# Week 04: Safety & academic integrity

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Safety & academic integrity* committed to this repo.

---

### Day 1 — Answer leakage prevention (60 min)

**Objective:** Detect and block doing homework for student

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Lab | 30 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min)

#### Lab steps
1. Expand policy checks for final-answer patterns
1. Add 15 leakage test cases

**Deliverable:** Leakage test suite

### Day 2 — Jailbreak resistance (60 min)

**Objective:** Test role-play and instruction override attacks

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OWASP LLM01 Prompt Injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Lab | 35 | Hands-on in `notes/week-04//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM01 Prompt Injection](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)

#### Lab steps
1. Run red-team prompt list
1. Update system prompt mitigations

**Deliverable:** Red-team log

### Day 3 — Age-appropriate tone (60 min)

**Objective:** Tune hints for target learner band

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [UNESCO AI in education](https://www.unesco.org/en/digital-education/artificial-intelligence) |
| Lab | 35 | Hands-on in `capstone/src/tutor/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [UNESCO AI in education](https://www.unesco.org/en/digital-education/artificial-intelligence) (~15 min)

#### Lab steps
1. Add grade_band param to prompts
1. Test 3 reading levels

**Deliverable:** Grade-band prompt variants

### Day 4 — Escalation to human (60 min)

**Objective:** When tutor should defer to educator

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Anthropic responsible use](https://www.anthropic.com/responsible-disclosure-policy) |
| Lab | 40 | Hands-on in `capstone/src/tutor/policies//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Anthropic responsible use](https://www.anthropic.com/responsible-disclosure-policy) (~10 min)

#### Lab steps
1. Implement escalation rules in tutor_policy.yaml
1. Test 5 escalation triggers

**Deliverable:** Escalation policy

### Day 5 — Week 4 review (60 min)

**Objective:** Consolidate safety docs + tests

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Lab | 50 | Hands-on in `capstone//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)

#### Lab steps
1. Merge all week 4 artifacts
1. Update README safety section

**Deliverable:** Safety section in README

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
