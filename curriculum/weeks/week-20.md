# Week 20: Student mastery in graph

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Student mastery in graph* committed to this repo.

---

### Day 1 — Student node model (60 min)

**Objective:** Design per-learner nodes with mastery properties on skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j property types](https://neo4j.com/docs/cypher-manual/current/values-and-types/property-structural-construct/) |
| Read | 15 | [Student modeling in ITS](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) |
| Lab | 25 | Hands-on in `capstone/docs//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j property types](https://neo4j.com/docs/cypher-manual/current/values-and-types/property-structural-construct/) (~15 min)
- [Student modeling in ITS](https://www.public.asu.edu/~vanlehn/papers/VanLehn-2011-ITS.pdf) (~15 min)

#### Lab steps
1. Add Student label schema to neo4j-schema.md with student_id and created_at
1. Create sample Student nodes in seed script

**Deliverable:** Student node schema

### Day 2 — Mastery update on assessment (60 min)

**Objective:** Write Cypher to mutate mastery scores after each attempt

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j SET clause](https://neo4j.com/docs/cypher-manual/current/clauses/set/) |
| Read | 15 | [BKT Corbett & Anderson PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j SET clause](https://neo4j.com/docs/cypher-manual/current/clauses/set/) (~15 min)
- [BKT Corbett & Anderson PDF](https://www.act.org/content/dam/act/unsecured/documents/RUF131.pdf) (~15 min)

#### Lab steps
1. Implement capstone/src/tutor/graph/mastery_store.py with update_mastery Cypher
1. Simulate 10 attempt sequences and verify mastery deltas

**Deliverable:** mastery_store.py

### Day 3 — Weak-skill identification query (60 min)

**Objective:** Find lowest-mastery prerequisites blocking progress

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j ORDER BY](https://neo4j.com/docs/cypher-manual/current/clauses/order-by/) |
| Read | 10 | [Bloom mastery learning](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) |
| Lab | 25 | Hands-on in `capstone/data/graph/queries//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j ORDER BY](https://neo4j.com/docs/cypher-manual/current/clauses/order-by/) (~15 min)
- [Bloom mastery learning](https://web.mit.edu/5.95/www/readings/bloom-two-sigma.pdf) (~10 min)

#### Lab steps
1. Add weak-skills query to capstone/data/graph/queries/week-20-weak-skills.cypher
1. Return top 5 blocking skills for a sample student

**Deliverable:** Weak-skill query

### Day 4 — Bidirectional mastery sync (60 min)

**Objective:** Sync mastery between JSON files and Neo4j graph

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j Python transactions](https://neo4j.com/docs/python-manual/current/transactions/) |
| Read | 10 | [Python json module](https://docs.python.org/3/library/json.html) |
| Lab | 25 | Hands-on in `capstone/scripts//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Python transactions](https://neo4j.com/docs/python-manual/current/transactions/) (~15 min)
- [Python json module](https://docs.python.org/3/library/json.html) (~10 min)

#### Lab steps
1. Add capstone/scripts/sync_mastery.py for JSON ↔ Neo4j sync
1. Run round-trip sync test on capstone/data/student_model/sample_mastery.jsonl

**Deliverable:** Mastery sync script

### Day 5 — Week 20 checkpoint (60 min)

**Objective:** Demo mastery-aware next-skill recommendation end-to-end

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 10 | [Neo4j Bloom product page](https://neo4j.com/product/bloom/) |
| Lab | 40 | Hands-on in `notes/week-20//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Bloom product page](https://neo4j.com/product/bloom/) (~10 min)

#### Lab steps
1. Wire mastery_store into neo4j_sequencer for personalized paths
1. Record demo script in notes/week-20/mastery-demo.md

**Deliverable:** Mastery-aware sequencer demo

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
