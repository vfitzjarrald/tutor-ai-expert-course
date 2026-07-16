# Week 42: Capstone sprint 2 — UX

- **Phase:** Phase 6 — Capstone & Production
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Capstone sprint 2 — UX* committed to this repo.

---

### Day 1 — UX audit of tutor CLI (60 min)

**Objective:** Review student-facing interaction flow for friction points

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Nielsen usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) |
| Read | 10 | [CLI design patterns](https://clig.dev/) |
| Lab | 25 | Hands-on in `notes/week-42//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Nielsen usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) (~20 min)
- [CLI design patterns](https://clig.dev/) (~10 min)

#### Lab steps
1. Record UX issues in notes/week-42/ux-audit.md
1. Prioritize top 5 fixes for this sprint

**Deliverable:** UX audit report

### Day 2 — Session transcript formatting (60 min)

**Objective:** Improve readability of tutor hint output in CLI

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Rich Python library](https://rich.readthedocs.io/en/stable/) |
| Read | 10 | [Accessibility text formatting](https://www.w3.org/WAI/WCAG21/Understanding/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/cli//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Rich Python library](https://rich.readthedocs.io/en/stable/) (~15 min)
- [Accessibility text formatting](https://www.w3.org/WAI/WCAG21/Understanding/) (~10 min)

#### Lab steps
1. Add capstone/src/tutor/cli/formatting.py with Rich markdown output
1. Apply to tutor_cli.py hint and question display

**Deliverable:** Formatted CLI output

### Day 3 — Progress indicators (60 min)

**Objective:** Show student mastery progress and next skill in session UI

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Progress bar UX patterns](https://www.nngroup.com/articles/progress-indicators/) |
| Read | 10 | [Bloom mastery visualization](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 30 | Hands-on in `capstone/src/tutor/cli//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Progress bar UX patterns](https://www.nngroup.com/articles/progress-indicators/) (~10 min)
- [Bloom mastery visualization](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~10 min)

#### Lab steps
1. Add mastery bar display to tutor_cli.py using bkt_predictor output
1. Show prerequisite path summary after each skill

**Deliverable:** Progress display module

### Day 4 — Educator dashboard stub (60 min)

**Objective:** Minimal read-only view of student session history

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Streamlit quickstart](https://docs.streamlit.io/get-started) |
| Read | 10 | [Langfuse sessions UI](https://langfuse.com/docs/tracing) |
| Lab | 25 | Hands-on in `capstone/src/tutor/dashboard//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Streamlit quickstart](https://docs.streamlit.io/get-started) (~15 min)
- [Langfuse sessions UI](https://langfuse.com/docs/tracing) (~10 min)

#### Lab steps
1. Create capstone/src/tutor/dashboard/app.py showing last 10 sessions
1. Display hint levels used and mastery deltas

**Deliverable:** Dashboard stub

### Day 5 — Week 42 checkpoint (60 min)

**Objective:** UX sprint demo with before/after comparison

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Think-aloud usability testing](https://www.nngroup.com/articles/thinking-aloud-the-usability-testing-method/) |
| Lab | 40 | Hands-on in `notes/week-42//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Think-aloud usability testing](https://www.nngroup.com/articles/thinking-aloud-the-usability-testing-method/) (~10 min)

#### Lab steps
1. Run think-aloud with 1 peer on new CLI
1. Write notes/week-42/ux-retrospective.md

**Deliverable:** UX sprint retrospective

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
