# Week 58: OSS PR submission

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *OSS PR submission* committed to this repo.

---

### Day 1 — Feature branch implementation (60 min)

**Objective:** Implement contribution on feature branch with tests

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GitHub pull request guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) |
| Read | 10 | [Test-driven development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) |
| Lab | 25 | Hands-on in `capstone/oss//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub pull request guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) (~15 min)
- [Test-driven development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) (~10 min)

#### Lab steps
1. Create feature branch in capstone/oss/fork/
1. Implement change with unit tests covering new behavior

**Deliverable:** Feature branch with tests

### Day 2 — Code quality pass (60 min)

**Objective:** Run linter, formatter, and full test suite on fork

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Ruff linter](https://docs.astral.sh/ruff/) |
| Read | 10 | [Pre-commit hooks](https://pre-commit.com/) |
| Lab | 30 | Hands-on in `capstone/oss//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Ruff linter](https://docs.astral.sh/ruff/) (~10 min)
- [Pre-commit hooks](https://pre-commit.com/) (~10 min)

#### Lab steps
1. Run project linter and fix all warnings
1. All existing + new tests pass locally

**Deliverable:** Clean code ready for PR

### Day 3 — Pull request submission (60 min)

**Objective:** Open PR with clear description linking to issue

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GitHub PR template best practices](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests) |
| Read | 10 | [Conventional Commits](https://www.conventionalcommits.org/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub PR template best practices](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests) (~15 min)
- [Conventional Commits](https://www.conventionalcommits.org/) (~10 min)

#### Lab steps
1. Open PR with description: problem, solution, test plan
1. Link PR URL in capstone/docs/oss-contributions.md

**Deliverable:** PR submitted

### Day 4 — CI monitoring (60 min)

**Objective:** Monitor CI checks and fix any failures on PR branch

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GitHub Actions docs](https://docs.github.com/en/actions) |
| Read | 10 | [Debugging CI failures](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows) |
| Lab | 25 | Hands-on in `capstone/oss//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub Actions docs](https://docs.github.com/en/actions) (~15 min)
- [Debugging CI failures](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows) (~10 min)

#### Lab steps
1. Fix any CI failures on PR branch
1. Document CI fix in notes/week-58/ci-fixes.md if needed

**Deliverable:** CI green on PR

### Day 5 — Week 58 checkpoint (60 min)

**Objective:** PR open with green CI awaiting maintainer review

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GitHub PR review process](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) |
| Lab | 40 | Hands-on in `notes/week-58//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GitHub PR review process](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests) (~10 min)

#### Lab steps
1. Respond to any initial maintainer comments
1. Write notes/week-58/pr-submission-log.md

**Deliverable:** PR submission log

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
