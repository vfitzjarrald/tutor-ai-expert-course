# Week 55: Paper reproduction 2 — GraphRAG

- **Phase:** Phase 7 — Expert Mastery Track
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Paper reproduction 2 — GraphRAG* committed to this repo.

---

### Day 1 — GraphRAG paper deep read (60 min)

**Objective:** Study GraphRAG paper methodology for reproduction

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [GraphRAG paper](https://arxiv.org/abs/2404.16130) |
| Read | 15 | [Microsoft GraphRAG repo](https://github.com/microsoft/graphrag) |
| Lab | 25 | Hands-on in `notes/week-55//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG paper](https://arxiv.org/abs/2404.16130) (~25 min)
- [Microsoft GraphRAG repo](https://github.com/microsoft/graphrag) (~15 min)

#### Lab steps
1. Write notes/week-55/graphrag-paper-notes.md with indexing and query algorithms
1. Identify which results to reproduce on capstone corpus

**Deliverable:** GraphRAG paper notes

### Day 2 — Corpus preparation for repro (60 min)

**Objective:** Prepare standardized corpus subset for GraphRAG reproduction

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GraphRAG inputs docs](https://microsoft.github.io/graphrag/index/inputs/) |
| Read | 10 | [BEIR corpus format](https://arxiv.org/abs/2104.08663) |
| Lab | 25 | Hands-on in `capstone/research/graphrag-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG inputs docs](https://microsoft.github.io/graphrag/index/inputs/) (~15 min)
- [BEIR corpus format](https://arxiv.org/abs/2104.08663) (~10 min)

#### Lab steps
1. Create capstone/research/graphrag-repro/data/corpus_subset/
1. Document corpus stats in capstone/research/graphrag-repro/DATA.md

**Deliverable:** Repro corpus prepared

### Day 3 — Index configuration (60 min)

**Objective:** Configure GraphRAG index matching paper default settings

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG default dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) |
| Read | 10 | [GraphRAG settings.yaml](https://microsoft.github.io/graphrag/config/yaml/) |
| Lab | 25 | Hands-on in `capstone/research/graphrag-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG default dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) (~20 min)
- [GraphRAG settings.yaml](https://microsoft.github.io/graphrag/config/yaml/) (~10 min)

#### Lab steps
1. Copy and tune capstone/research/graphrag-repro/settings.yaml
1. Run index job and verify artifact parity with main capstone index

**Deliverable:** Repro index config

### Day 4 — Query mode reproduction (60 min)

**Objective:** Reproduce local and global search results from paper examples

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GraphRAG local search](https://microsoft.github.io/graphrag/query/local_search/) |
| Read | 15 | [GraphRAG global search](https://microsoft.github.io/graphrag/query/global_search/) |
| Lab | 25 | Hands-on in `capstone/research/graphrag-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG local search](https://microsoft.github.io/graphrag/query/local_search/) (~15 min)
- [GraphRAG global search](https://microsoft.github.io/graphrag/query/global_search/) (~15 min)

#### Lab steps
1. Run 10 local + 5 global queries from capstone/research/graphrag-repro/queries.yaml
1. Save outputs to capstone/research/graphrag-repro/results/

**Deliverable:** Query reproduction outputs

### Day 5 — Week 55 checkpoint (60 min)

**Objective:** GraphRAG repro scaffold with index and query results

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GraphRAG examples](https://github.com/microsoft/graphrag/tree/main/examples) |
| Lab | 40 | Hands-on in `capstone/research/graphrag-repro//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG examples](https://github.com/microsoft/graphrag/tree/main/examples) (~10 min)

#### Lab steps
1. Write capstone/research/graphrag-repro/README.md
1. Compare query quality to capstone production GraphRAG module

**Deliverable:** GraphRAG repro README

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
