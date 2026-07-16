# Week 28: GraphRAG indexing pipeline

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *GraphRAG indexing pipeline* committed to this repo.

---

### Day 1 — GraphRAG architecture overview (60 min)

**Objective:** Study Microsoft GraphRAG indexing and query pipeline

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Microsoft GraphRAG repo](https://github.com/microsoft/graphrag) |
| Read | 15 | [GraphRAG paper](https://arxiv.org/abs/2404.16130) |
| Lab | 25 | Hands-on in `notes/week-28//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Microsoft GraphRAG repo](https://github.com/microsoft/graphrag) (~25 min)
- [GraphRAG paper](https://arxiv.org/abs/2404.16130) (~15 min)

#### Lab steps
1. Draw architecture diagram in notes/week-28/graphrag-architecture.md
1. List required inputs: corpus, entity types, prompts

**Deliverable:** Architecture diagram

### Day 2 — Entity extraction pipeline (60 min)

**Objective:** Extract entities and relationships from curriculum corpus

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG indexing overview](https://microsoft.github.io/graphrag/index/overview/) |
| Read | 10 | [LangChain extraction](https://python.langchain.com/docs/how_to/extraction/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG indexing overview](https://microsoft.github.io/graphrag/index/overview/) (~20 min)
- [LangChain extraction](https://python.langchain.com/docs/how_to/extraction/) (~10 min)

#### Lab steps
1. Configure capstone/src/tutor/graphrag/settings.yaml for entity extraction
1. Run extraction on capstone/data/corpus/sample_units.jsonl subset

**Deliverable:** Entity extraction config

### Day 3 — Community detection with Leiden (60 min)

**Objective:** Configure graph clustering for curriculum topic communities

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Leiden algorithm](https://arxiv.org/abs/1810.08473) |
| Read | 15 | [GraphRAG default dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Leiden algorithm](https://arxiv.org/abs/1810.08473) (~15 min)
- [GraphRAG default dataflow](https://microsoft.github.io/graphrag/index/default_dataflow/) (~15 min)

#### Lab steps
1. Set community detection params in settings.yaml
1. Inspect community count and size distribution

**Deliverable:** Community detection config

### Day 4 — Full GraphRAG index run (60 min)

**Objective:** Execute end-to-end indexing job on sample corpus

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG CLI](https://microsoft.github.io/graphrag/cli/) |
| Read | 10 | [GraphRAG inputs](https://microsoft.github.io/graphrag/index/inputs/) |
| Lab | 25 | Hands-on in `capstone/data/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG CLI](https://microsoft.github.io/graphrag/cli/) (~20 min)
- [GraphRAG inputs](https://microsoft.github.io/graphrag/index/inputs/) (~10 min)

#### Lab steps
1. Run graphrag index in capstone/data/graphrag/output/
1. Verify parquet artifacts: entities, relationships, communities

**Deliverable:** GraphRAG index artifacts

### Day 5 — Week 28 checkpoint (60 min)

**Objective:** Validate index output and document indexing runbook

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [GraphRAG GitHub issues](https://github.com/microsoft/graphrag/issues) |
| Lab | 40 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG GitHub issues](https://github.com/microsoft/graphrag/issues) (~10 min)

#### Lab steps
1. Write capstone/docs/graphrag-index-runbook.md
1. Log index stats to capstone/eval/graphrag/index_stats.json

**Deliverable:** Index runbook

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
