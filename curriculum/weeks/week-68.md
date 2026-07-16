# Week 68: Open curriculum graph release

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Open curriculum graph release* committed to this repo.

---

### Day 1 — Open license selection (60 min)

**Objective:** Choose OSS license for curriculum graph release

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Choose a License](https://choosealicense.com/) |
| Read | 15 | [Creative Commons for data](https://creativecommons.org/share-your-work/) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Choose a License](https://choosealicense.com/) (~15 min)
- [Creative Commons for data](https://creativecommons.org/share-your-work/) (~15 min)

#### Lab steps
1. Select license and write notes/week-68/license-decision.md
1. Add LICENSE file to capstone/data/graph/

**Deliverable:** License file added

### Day 2 — Graph data sanitization (60 min)

**Objective:** Remove PII and proprietary content from graph before release

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Data anonymization guide](https://www.nist.gov/privacy-framework) |
| Read | 10 | [GDPR data minimization](https://gdpr.eu/data-minimization/) |
| Lab | 30 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Data anonymization guide](https://www.nist.gov/privacy-framework) (~10 min)
- [GDPR data minimization](https://gdpr.eu/data-minimization/) (~10 min)

#### Lab steps
1. Audit capstone/data/graph/ for PII and proprietary content
1. Create sanitized release bundle in capstone/data/graph/release/

**Deliverable:** Sanitized graph bundle

### Day 3 — Release documentation (60 min)

**Objective:** Write README and schema docs for external graph consumers

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Data package README best practices](https://datapackage.org/standard/data-resource/) |
| Read | 10 | [JSON Schema docs](https://json-schema.org/learn/getting-started-step-by-step) |
| Lab | 30 | Hands-on in `capstone/data/graph/release//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Data package README best practices](https://datapackage.org/standard/data-resource/) (~10 min)
- [JSON Schema docs](https://json-schema.org/learn/getting-started-step-by-step) (~10 min)

#### Lab steps
1. Write capstone/data/graph/release/README.md with schema and usage examples
1. Include sample Cypher and Python import scripts

**Deliverable:** Release README

### Day 4 — Public repository setup (60 min)

**Objective:** Publish graph to public GitHub repo or HuggingFace dataset

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [HuggingFace datasets](https://huggingface.co/docs/datasets/) |
| Read | 10 | [GitHub public repo guide](https://docs.github.com/en/repositories/creating-and-managing-repositories) |
| Lab | 25 | Hands-on in `capstone/data/graph/release//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [HuggingFace datasets](https://huggingface.co/docs/datasets/) (~15 min)
- [GitHub public repo guide](https://docs.github.com/en/repositories/creating-and-managing-repositories) (~10 min)

#### Lab steps
1. Publish to public repo and verify clone + import works
1. Add dataset card with citation and license

**Deliverable:** Public graph repo live

### Day 5 — Week 68 checkpoint (60 min)

**Objective:** Announce curriculum graph release in blog and communities

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [HuggingFace dataset card](https://huggingface.co/docs/hub/datasets-cards) |
| Read | 10 | [Dev.to community post](https://dev.to/new) |
| Lab | 30 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [HuggingFace dataset card](https://huggingface.co/docs/hub/datasets-cards) (~10 min)
- [Dev.to community post](https://dev.to/new) (~10 min)

#### Lab steps
1. Write announcement post linking to public repo
1. Update capstone/docs/publications.md with graph release URL

**Deliverable:** Graph release announced

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
