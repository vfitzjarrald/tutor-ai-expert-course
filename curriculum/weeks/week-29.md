# Week 29: Community summaries for curriculum

- **Phase:** Phase 4 — Advanced RAG & GraphRAG
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Community summaries for curriculum* committed to this repo.

---

### Day 1 — Community report generation (60 min)

**Objective:** Generate LLM summaries for each detected community

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [GraphRAG global search](https://microsoft.github.io/graphrag/query/global_search/) |
| Read | 10 | [GraphRAG prompt tuning](https://microsoft.github.io/graphrag/prompt_tuning/overview/) |
| Lab | 25 | Hands-on in `capstone/data/graphrag//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG global search](https://microsoft.github.io/graphrag/query/global_search/) (~20 min)
- [GraphRAG prompt tuning](https://microsoft.github.io/graphrag/prompt_tuning/overview/) (~10 min)

#### Lab steps
1. Run community report generation on index output
1. Review 3 sample reports for factual accuracy

**Deliverable:** Community reports generated

### Day 2 — Map communities to skill graph (60 min)

**Objective:** Link GraphRAG communities to Neo4j skill nodes

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j node similarity](https://neo4j.com/docs/graph-data-science/current/algorithms/node-similarity/) |
| Read | 10 | [GraphRAG paper alignment](https://arxiv.org/abs/2404.16130) |
| Lab | 25 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j node similarity](https://neo4j.com/docs/graph-data-science/current/algorithms/node-similarity/) (~15 min)
- [GraphRAG paper alignment](https://arxiv.org/abs/2404.16130) (~10 min)

#### Lab steps
1. Script capstone/scripts/link_communities_to_skills.py
1. Create COMMUNITY_OF edges for top 20 skills

**Deliverable:** Community-skill links

### Day 3 — Educator-readable summary format (60 min)

**Objective:** Format community reports for curriculum reviewer audience

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Bloom's taxonomy guide](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) |
| Read | 10 | [Markdown guide](https://www.markdownguide.org/basic-syntax/) |
| Lab | 30 | Hands-on in `capstone/docs/templates//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Bloom's taxonomy guide](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) (~10 min)
- [Markdown guide](https://www.markdownguide.org/basic-syntax/) (~10 min)

#### Lab steps
1. Template capstone/docs/templates/community_report.md.j2
1. Render 5 community reports for educator review

**Deliverable:** Report template

### Day 4 — Store summaries in capstone corpus (60 min)

**Objective:** Persist community summaries as retrievable documents

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [GraphRAG local search](https://microsoft.github.io/graphrag/query/local_search/) |
| Read | 10 | [Chroma metadata](https://docs.trychroma.com/docs/collections/metadata) |
| Lab | 25 | Hands-on in `capstone/data/corpus//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [GraphRAG local search](https://microsoft.github.io/graphrag/query/local_search/) (~15 min)
- [Chroma metadata](https://docs.trychroma.com/docs/collections/metadata) (~10 min)

#### Lab steps
1. Ingest community summaries into capstone/data/corpus/community_summaries.jsonl
1. Index summaries in vector store with community_id metadata

**Deliverable:** Indexed community summaries

### Day 5 — Week 29 checkpoint (60 min)

**Objective:** Educator review of community summaries quality

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [RAGAS context recall](https://docs.ragas.io/en/stable/concepts/metrics/context_recall/) |
| Lab | 40 | Hands-on in `capstone/data/corpus//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [RAGAS context recall](https://docs.ragas.io/en/stable/concepts/metrics/context_recall/) (~10 min)

#### Lab steps
1. Score 10 summaries against source entities
1. Fix top 3 inaccurate summaries

**Deliverable:** Reviewed summary bundle

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
