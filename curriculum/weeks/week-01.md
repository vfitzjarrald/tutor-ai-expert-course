# Week 01: How LLMs work & tutor use cases

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *How LLMs work & tutor use cases* committed to this repo.

---

### Day 1 — Transformer intuition (60 min)

**Objective:** Explain tokens, context window, chat vs completion

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [3Blue1Brown — Attention visualized](https://www.3blue1brown.com/topics/neural-networks) |
| Read | 15 | [Anthropic — Intro to LLMs](https://docs.anthropic.com/en/docs/intro-to-claude) |
| Lab | 25 | Hands-on in `notes/week-01//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [3Blue1Brown — Attention visualized](https://www.3blue1brown.com/topics/neural-networks) (~20 min)
- [Anthropic — Intro to LLMs](https://docs.anthropic.com/en/docs/intro-to-claude) (~15 min)

#### Lab steps
1. Sketch tutor I/O in notes/week-01/day-01-diagram.md
1. List 5 tutor scenarios in notes/

**Deliverable:** Diagram + scenario list

### Day 2 — Chat API anatomy (60 min)

**Objective:** Call an LLM with system/user/assistant roles

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat) |
| Read | 15 | [Anthropic Messages API](https://docs.anthropic.com/en/api/messages) |
| Lab | 25 | Hands-on in `capstone/src/tutor/llm//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Chat Completions](https://platform.openai.com/docs/api-reference/chat) (~15 min)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages) (~15 min)

#### Lab steps
1. Create capstone/src/tutor/llm/client.py wrapper
1. Log tokens to capstone/logs/usage.jsonl

**Deliverable:** Working API client

### Day 3 — Sampling & temperature (60 min)

**Objective:** Tune consistency for pedagogical hints

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Prompt Engineering Guide — LLM params](https://www.promptingguide.ai/introduction/settings) |
| Lab | 30 | Hands-on in `labs/phase-01-rag/temperature//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Prompt Engineering Guide — LLM params](https://www.promptingguide.ai/introduction/settings) (~20 min)

#### Lab steps
1. Run same prompt at temp 0, 0.3, 0.7
1. Save outputs to labs/phase-01-rag/temperature/

**Deliverable:** Temperature comparison doc

### Day 4 — Tutor failure modes (60 min)

**Objective:** Document hallucination, sycophancy, answer leakage

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OpenAI Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) |
| Lab | 30 | Hands-on in `capstone/src/tutor/policies//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Safety best practices](https://platform.openai.com/docs/guides/safety-best-practices) (~20 min)

#### Lab steps
1. Run 10 adversarial student prompts
1. Write policy rules in capstone/src/tutor/policies/tutor_policy.yaml

**Deliverable:** Policy YAML v0

### Day 5 — Week 1 integration lab (60 min)

**Objective:** CLI Socratic tutor that refuses final answers

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Anthropic prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) |
| Lab | 35 | Hands-on in `capstone/src/tutor/cli//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Anthropic prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/cli/tutor_cli.py
1. Add 10 golden tests in capstone/tests/test_tutor_policy.py

**Deliverable:** Passing policy tests

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
