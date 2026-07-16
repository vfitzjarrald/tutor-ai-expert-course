# Week 70: Expert eval golden set v2

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Expert eval golden set v2* committed to this repo.

---

### Day 1 — Golden set v2 design (60 min)

**Objective:** Design expanded golden set covering all production features

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI Evals framework](https://github.com/openai/evals) |
| Read | 10 | [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) |
| Lab | 25 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Evals framework](https://github.com/openai/evals) (~15 min)
- [LangChain evaluation](https://python.langchain.com/docs/concepts/evaluation/) (~10 min)

#### Lab steps
1. Write capstone/eval/golden/v2_design.md with coverage matrix
1. Target 50 cases covering graph, KT, GraphRAG, MCP, and safety

**Deliverable:** Golden set v2 design

### Day 2 — Expert case authoring (60 min)

**Objective:** Write 25 expert-authored golden cases with expected behaviors

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [VanLehn ITS evaluation](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Read | 10 | [Educator rubric](capstone/eval/rubric/educator_rubric.md) |
| Lab | 25 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [VanLehn ITS evaluation](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)
- [Educator rubric](capstone/eval/rubric/educator_rubric.md) (~10 min)

#### Lab steps
1. Author 25 cases in capstone/eval/golden/conversations_v2.yaml
1. Include expected hint_level, skill_id, and tool_calls fields

**Deliverable:** 25 expert cases authored

### Day 3 — Adversarial case authoring (60 min)

**Objective:** Write 25 adversarial cases for safety and edge cases

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) |
| Read | 10 | [Red team v2 cases](capstone/eval/security/injection_cases.yaml) |
| Lab | 25 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~15 min)
- [Red team v2 cases](capstone/eval/security/injection_cases.yaml) (~10 min)

#### Lab steps
1. Author 25 adversarial cases in capstone/eval/golden/adversarial_v2.yaml
1. Cover injection, leakage, tool abuse, and escalation triggers

**Deliverable:** 25 adversarial cases authored

### Day 4 — Golden set v2 automation (60 min)

**Objective:** Extend run_golden.py to cover v2 cases with new assertions

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [pytest parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html) |
| Read | 10 | [OpenAI eval automation](https://platform.openai.com/docs/guides/evaluation) |
| Lab | 30 | Hands-on in `capstone/eval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [pytest parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html) (~10 min)
- [OpenAI eval automation](https://platform.openai.com/docs/guides/evaluation) (~10 min)

#### Lab steps
1. Extend capstone/eval/run_golden.py for v2 schema
1. Run v2 suite — target ≥85% pass before release

**Deliverable:** Golden set v2 runner

### Day 5 — Week 70 checkpoint (60 min)

**Objective:** Golden set v2 complete with ≥85% pass rate

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Google ML regression testing](https://developers.google.com/machine-learning/testing-debugging) |
| Lab | 40 | Hands-on in `capstone/eval/golden//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Google ML regression testing](https://developers.google.com/machine-learning/testing-debugging) (~10 min)

#### Lab steps
1. Merge v2 cases into capstone/eval/golden/conversations.yaml
1. Document v2 in capstone/eval/golden/README.md

**Deliverable:** Golden set v2 released

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
