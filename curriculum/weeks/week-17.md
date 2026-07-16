# Week 17: Neo4j setup & Cypher basics

- **Phase:** Phase 3 — Graph Databases & Student Modeling
- **Time:** 5 business days × 60 min = 5h/week
- **Capstone touchpoint:** `capstone/`

## Weekly outcomes
By Friday you will have concrete artifacts for *Neo4j setup & Cypher basics* committed to this repo.

---

### Day 1 — Neo4j Aura provisioning (60 min)

**Objective:** Create a cloud Neo4j instance for the capstone graph

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Neo4j Aura free tier](https://neo4j.com/cloud/platform/aura-graph-database/) |
| Read | 10 | [Neo4j Browser guide](https://neo4j.com/docs/browser-manual/current/) |
| Lab | 25 | Hands-on in `capstone/data/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Aura free tier](https://neo4j.com/cloud/platform/aura-graph-database/) (~20 min)
- [Neo4j Browser guide](https://neo4j.com/docs/browser-manual/current/) (~10 min)

#### Lab steps
1. Create AuraDB free instance and save credentials in capstone/.env.example (no secrets committed)
1. Verify connection with :server status in Neo4j Browser

**Deliverable:** Aura instance connected

### Day 2 — Cypher CREATE patterns (60 min)

**Objective:** Write node and relationship creation queries for skills

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Neo4j Cypher CREATE](https://neo4j.com/docs/cypher-manual/current/clauses/create/) |
| Read | 15 | [GraphAcademy Cypher basics](https://graphacademy.neo4j.com/courses/cypher-fundamentals/) |
| Lab | 25 | Hands-on in `capstone/data/graph/queries//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Cypher CREATE](https://neo4j.com/docs/cypher-manual/current/clauses/create/) (~20 min)
- [GraphAcademy Cypher basics](https://graphacademy.neo4j.com/courses/cypher-fundamentals/) (~15 min)

#### Lab steps
1. Write CREATE queries in capstone/data/graph/queries/week-17-create.cypher
1. Create 10 sample Skill nodes matching skills.json IDs

**Deliverable:** CREATE query file

### Day 3 — MATCH and WHERE filtering (60 min)

**Objective:** Query skills by difficulty, tags, and prerequisite edges

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j MATCH clause](https://neo4j.com/docs/cypher-manual/current/clauses/match/) |
| Read | 15 | [Neo4j WHERE filtering](https://neo4j.com/docs/cypher-manual/current/clauses/where/) |
| Lab | 25 | Hands-on in `capstone/data/graph/queries//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j MATCH clause](https://neo4j.com/docs/cypher-manual/current/clauses/match/) (~15 min)
- [Neo4j WHERE filtering](https://neo4j.com/docs/cypher-manual/current/clauses/where/) (~15 min)

#### Lab steps
1. Add MATCH/WHERE queries to capstone/data/graph/queries/week-17-match.cypher
1. Return all skills with difficulty ≥ 3 and list their prerequisites

**Deliverable:** Filtered query set

### Day 4 — Python neo4j driver setup (60 min)

**Objective:** Connect capstone Python code to Neo4j via official driver

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 20 | [Neo4j Python driver](https://neo4j.com/docs/python-manual/current/) |
| Read | 10 | [Neo4j driver on PyPI](https://pypi.org/project/neo4j/) |
| Lab | 25 | Hands-on in `capstone/src/tutor/graph//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j Python driver](https://neo4j.com/docs/python-manual/current/) (~20 min)
- [Neo4j driver on PyPI](https://pypi.org/project/neo4j/) (~10 min)

#### Lab steps
1. Implement capstone/src/tutor/graph/neo4j_client.py with session helper
1. Run smoke test: count Skill nodes from Python

**Deliverable:** neo4j_client.py module

### Day 5 — Week 17 checkpoint (60 min)

**Objective:** Seed Neo4j from existing JSON graph files and document setup

#### Timed schedule
| Block | Minutes | Activity |
|-------|---------|----------|
| Read | 15 | [Neo4j LOAD CSV import](https://neo4j.com/docs/cypher-manual/current/clauses/load-csv/) |
| Lab | 35 | Hands-on in `notes/week-17//` |
| Deliver | 10 | Write deliverable + commit |

#### Source documentation (open these — no external hunting)
- [Neo4j LOAD CSV import](https://neo4j.com/docs/cypher-manual/current/clauses/load-csv/) (~15 min)

#### Lab steps
1. Script capstone/scripts/seed_neo4j.py to load skills.json and prerequisites.jsonl
1. Write notes/week-17/neo4j-setup.md with connection steps

**Deliverable:** Seeded graph + setup doc

---

## Phase resources
- [Resource library](../RESOURCES.md)
- [Knowledge checks](../CHECKS.md)
- [Course index](../INDEX.md)
