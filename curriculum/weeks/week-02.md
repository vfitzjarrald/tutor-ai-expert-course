# Week 02: Prompting patterns for tutors

- **Phase:** Phase 1 — AI & RAG Foundations
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Prompting patterns for tutors* committed to this repo.

---

### Day 1 — System prompt architecture (60 min)

**Objective:** Structure persona, pedagogy, boundaries, escalation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Anthropic — System prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) |
| Read | 15 | [Prompt Engineering Guide](https://www.promptingguide.ai/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Anthropic — System prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts) (~20 min)
- [Prompt Engineering Guide](https://www.promptingguide.ai/) (~15 min)

#### Lab steps
1. Create capstone/src/tutor/prompts/system_socratic.yaml
1. A/B two variants; score with rubric in eval/rubric.md

**Deliverable:** System prompt v1

### Day 2 — Few-shot hint chains (60 min)

**Objective:** Embed gold hint sequences in-context

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Few-shot prompting](https://www.promptingguide.ai/techniques/fewshot) |
| Lab | 30 | Hands-on in `capstone/data/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Few-shot prompting](https://www.promptingguide.ai/techniques/fewshot) (~20 min)

#### Lab steps
1. Add 5 exemplars to capstone/data/prompts/hint_examples.jsonl
1. Test consistency on 5 new items

**Deliverable:** Hint exemplar file

### Day 3 — Hidden chain-of-thought (60 min)

**Objective:** Separate private reasoning from student-visible hints

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI reasoning models guide](https://platform.openai.com/docs/guides/reasoning) |
| Lab | 35 | Hands-on in `capstone/src/tutor/prompts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI reasoning models guide](https://platform.openai.com/docs/guides/reasoning) (~15 min)

#### Lab steps
1. Use XML tags for scratchpad in prompt template
1. Verify no solution leakage in 20 runs

**Deliverable:** Leak-free prompt template

### Day 4 — Structured tutor outputs (60 min)

**Objective:** JSON schema for hint_level, concept_id, next_question

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) |
| Lab | 30 | Hands-on in `capstone/src/tutor/schemas//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) (~20 min)

#### Lab steps
1. Define capstone/src/tutor/schemas/hint_response.json
1. Parse and validate in Python

**Deliverable:** Schema + validator

### Day 5 — Eval harness v0 (60 min)

**Objective:** Golden conversations with pass/fail automation

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [OpenAI Evals repo](https://github.com/openai/evals) |
| Lab | 35 | Hands-on in `capstone/eval//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [OpenAI Evals repo](https://github.com/openai/evals) (~15 min)

#### Lab steps
1. Create capstone/eval/golden/conversations.yaml
1. Script capstone/eval/run_golden.py

**Deliverable:** Baseline pass rate logged

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
