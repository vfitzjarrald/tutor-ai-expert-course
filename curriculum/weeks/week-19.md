# Week 19: Prerequisite path queries

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Prerequisite path queries* committed to this repo.

---

### Day 1 — Shortest path Cypher queries (60 min)

**Objective:** Find minimum prerequisite chains between any two skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Neo4j shortestPath](https://neo4j.com/docs/cypher-manual/current/functions/shortestpath/) |
| Read | 10 | [Neo4j GDS algorithms](https://neo4j.com/docs/graph-data-science/current/algorithms/) |
| Lab | 25 | Hands-on in `capstone/data/graph/queries//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j shortestPath](https://neo4j.com/docs/cypher-manual/current/functions/shortestpath/) (~20 min)
- [Neo4j GDS algorithms](https://neo4j.com/docs/graph-data-science/current/algorithms/) (~10 min)

#### Lab steps
1. Add capstone/data/graph/queries/week-19-shortest-path.cypher with parameterized start/end
1. Test path from entry skill to capstone skill

**Deliverable:** Shortest path queries

### Day 2 — All paths with depth limit (60 min)

**Objective:** Enumerate prerequisite chains up to depth N for curriculum planning

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Variable-length paths](https://neo4j.com/docs/cypher-manual/current/patterns/reference/) |
| Read | 10 | [NetworkX all_simple_paths](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.simple_paths.all_simple_paths.html) |
| Lab | 25 | Hands-on in `capstone/data/graph/queries//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Variable-length paths](https://neo4j.com/docs/cypher-manual/current/patterns/reference/) (~20 min)
- [NetworkX all_simple_paths](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.simple_paths.all_simple_paths.html) (~10 min)

#### Lab steps
1. Write all-paths query with max depth 5 in week-19-all-paths.cypher
1. Compare output count to NetworkX sequencer for 3 skill pairs

**Deliverable:** Path enumeration query

### Day 3 — Next-skill recommendation query (60 min)

**Objective:** Mirror sequencer.py logic in Cypher given mastered skill set

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j list functions](https://neo4j.com/docs/cypher-manual/current/functions/list/) |
| Read | 10 | [NetworkX topological_sort](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.topological_sort.html) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j list functions](https://neo4j.com/docs/cypher-manual/current/functions/list/) (~15 min)
- [NetworkX topological_sort](https://networkx.org/documentation/stable/reference/algorithms/generated/networkx.algorithms.dag.topological_sort.html) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graph/neo4j_sequencer.py wrapping Cypher next-skill query
1. Unit test against Python sequencer on 5 profiles

**Deliverable:** neo4j_sequencer.py

### Day 4 — Path visualization export (60 min)

**Objective:** Export learning paths as JSON for educator review UI

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j apoc.export.json](https://neo4j.com/labs/apoc/current/overview/apoc.export/apoc.export.json.all/) |
| Read | 10 | [D3 force graph](https://github.com/d3/d3-force) |
| Lab | 25 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j apoc.export.json](https://neo4j.com/labs/apoc/current/overview/apoc.export/apoc.export.json.all/) (~15 min)
- [D3 force graph](https://github.com/d3/d3-force) (~10 min)

#### Lab steps
1. Add capstone/scripts/export_paths.py outputting paths JSON
1. Generate path bundle for 3 sample student profiles

**Deliverable:** Path export JSON

### Day 5 — Week 19 checkpoint (60 min)

**Objective:** Benchmark path query latency and document query catalog

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j query tuning](https://neo4j.com/docs/cypher-manual/current/query-tuning/) |
| Lab | 35 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j query tuning](https://neo4j.com/docs/cypher-manual/current/query-tuning/) (~15 min)

#### Lab steps
1. Log query timings to capstone/eval/graph/path_benchmark.json
1. Write capstone/docs/cypher-query-catalog.md

**Deliverable:** Query benchmark + catalog

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
