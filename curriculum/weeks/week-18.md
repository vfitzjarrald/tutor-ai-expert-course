# Week 18: Learning graph data model

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Learning graph data model* committed to this repo.

---

### Day 1 — Skill node schema design (60 min)

**Objective:** Define Neo4j labels, properties, and constraints for curriculum skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 25 | [Neo4j data modeling](https://neo4j.com/developer/data-modeling/) |
| Read | 10 | [Neo4j constraints](https://neo4j.com/docs/cypher-manual/current/constraints/) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j data modeling](https://neo4j.com/developer/data-modeling/) (~25 min)
- [Neo4j constraints](https://neo4j.com/docs/cypher-manual/current/constraints/) (~10 min)

#### Lab steps
1. Document schema in capstone/docs/neo4j-schema.md with Skill, Resource, Misconception labels
1. Add UNIQUE constraint on skill_id in seed script

**Deliverable:** Neo4j schema doc

### Day 2 — Prerequisite relationship modeling (60 min)

**Objective:** Model REQUIRES edges with optional weights and evidence tags

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j relationship types](https://neo4j.com/docs/cypher-manual/current/syntax/relationships/) |
| Read | 15 | [Knowledge Space Theory](https://link.springer.com/book/10.1007/978-1-4612-5082-8) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j relationship types](https://neo4j.com/docs/cypher-manual/current/syntax/relationships/) (~15 min)
- [Knowledge Space Theory](https://link.springer.com/book/10.1007/978-1-4612-5082-8) (~15 min)

#### Lab steps
1. Extend seed_neo4j.py to create REQUIRES relationships from prerequisites.jsonl
1. Validate no cycles with Cypher path query

**Deliverable:** REQUIRES edges loaded

### Day 3 — Resource and misconception nodes (60 min)

**Objective:** Attach learning resources and error patterns to the graph

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j MERGE upsert](https://neo4j.com/docs/cypher-manual/current/clauses/merge/) |
| Read | 15 | [VanLehn misconceptions](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j MERGE upsert](https://neo4j.com/docs/cypher-manual/current/clauses/merge/) (~15 min)
- [VanLehn misconceptions](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)

#### Lab steps
1. Load Resource nodes from capstone/data/graph/resources.jsonl
1. Link Misconception nodes via HAS_MISCONCEPTION edges

**Deliverable:** Extended graph model

### Day 4 — Bulk import from JSON (60 min)

**Objective:** Build idempotent bulk loader for all graph JSON/JSONL files

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j apoc.import.json](https://neo4j.com/labs/apoc/current/overview/apoc.load/apoc.load.json/) |
| Read | 10 | [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) |
| Lab | 25 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j apoc.import.json](https://neo4j.com/labs/apoc/current/overview/apoc.load/apoc.load.json/) (~15 min)
- [JSON Schema spec](https://json-schema.org/learn/getting-started-step-by-step) (~10 min)

#### Lab steps
1. Add capstone/scripts/import_graph_to_neo4j.py with --dry-run flag
1. Run full import and log node/relationship counts

**Deliverable:** Import script v1

### Day 5 — Week 18 checkpoint (60 min)

**Objective:** Visualize learning graph in Browser and export PNG for educators

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j Browser visual tour](https://neo4j.com/docs/browser-manual/current/visual-tour/) |
| Lab | 35 | Hands-on in `notes/week-18//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Browser visual tour](https://neo4j.com/docs/browser-manual/current/visual-tour/) (~15 min)

#### Lab steps
1. Style Skill nodes by difficulty in Browser
1. Export graph screenshot to notes/week-18/graph-viz.png and write notes/week-18/model-review.md

**Deliverable:** Graph visualization + review

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
