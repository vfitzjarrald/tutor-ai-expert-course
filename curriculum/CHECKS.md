# Knowledge Checks & Phase Gates

Use this file for weekly quiz reviews and phase gate checkpoints. The learning plan canvas **Knowledge Checks** tab has the same 12 questions with interactive grading.

**Scoring:** Phase gates require **≥80%** on the listed questions plus the deliverable demo. The **expert checkpoint** (Week 78) requires **≥85%** across all phases.

---

## Quiz (12 questions)

### Phase 1 — Q1–Q2

**Q1.** In a tutoring context, why keep temperature low (0–0.3) for hint generation?

- A) Faster inference
- B) More consistent, less random pedagogical drift ✓
- C) Required by API
- D) Increases context window

*Explanation:* Low temperature reduces variance so hints stay predictable and aligned with policy.

**Q2.** What is the primary purpose of chunking in RAG for tutors?

- A) Reduce API cost only
- B) Balance retrieval precision with enough context for explanations ✓
- C) Replace embeddings
- D) Eliminate hallucinations entirely

*Explanation:* Chunk size trades off whether you retrieve the right passage vs enough surrounding explanation.

### Phase 2 — Q3–Q4

**Q3.** A knowledge map for tutoring should most often be:

- A) An undirected clique
- B) A DAG of prerequisites ✓
- C) A linear list only
- D) A single root node

*Explanation:* Skills depend on prior skills; prerequisite graphs are directed and acyclic in most curricula.

**Q4.** Bloom's 2 Sigma finding implies AI tutors should prioritize:

- A) One-size-fits-all lectures
- B) Personalized pacing and feedback ✓
- C) Removing all assessments
- D) Maximizing content volume

*Explanation:* Mastery learning with individualized feedback drove the 2 sigma effect.

### Phase 3 — Q5–Q6

**Q5.** Bayesian Knowledge Tracing estimates:

- A) Embedding dimension
- B) Probability a student knows a skill ✓
- C) Graph database index size
- D) Token price

*Explanation:* BKT maintains P(L)—probability the learner has learned the skill.

**Q6.** In Neo4j, the best query to find all skills ready to learn (prerequisites mastered) uses:

- A) Full table scan
- B) Pattern matching on MASTERED and REQUIRES edges ✓
- C) Random sampling
- D) JSON parse only

*Explanation:* Graph pattern matching traverses prerequisite edges efficiently.

### Phase 4 — Q7–Q8

**Q7.** GraphRAG improves over vanilla RAG when:

- A) Documents are unrelated
- B) Questions need multi-hop reasoning across concepts ✓
- C) You have no graph
- D) Embeddings are disabled

*Explanation:* Community summaries and graph traversal help connect concepts across sources.

**Q8.** Hybrid search typically combines:

- A) GPU + CPU
- B) BM25 keyword + dense vector scores ✓
- C) Two LLMs
- D) Train + test split

*Explanation:* Hybrid fusion captures exact terms and semantic similarity.

### Phase 5 — Q9–Q10

**Q9.** MCP standardizes:

- A) Model training
- B) How AI apps connect to external tools/data ✓
- C) Graph database storage
- D) Student grades

*Explanation:* MCP defines host/client/server protocol for tool and resource access.

**Q10.** ReAct-style agents alternate:

- A) Training and validation
- B) Reasoning traces and tool actions ✓
- C) Chunking and embedding
- D) Graph import and export

*Explanation:* ReAct interleaves thought, action, and observation loops.

### Phase 6 — Q11–Q12

**Q11.** The highest-risk LLM failure in K-12 tutoring is:

- A) Slow latency
- B) Confident incorrect teaching or answer leakage ✓
- C) Small font
- D) Dark mode UI

*Explanation:* Wrong teaching and doing the student's work undermine learning and trust.

**Q12.** RAGAS 'faithfulness' measures whether:

- A) Answers are funny
- B) Generation is grounded in retrieved context ✓
- C) Graph is connected
- D) Students pass tests

*Explanation:* Faithfulness checks claims against retrieved evidence.

---

## Phase gate thresholds

| Phase | Gate | Requirement |
|-------|------|-------------|
| End Phase 1 | RAG checkpoint | ≥80% on Q1–Q2 + working RAG tutor demo |
| End Phase 2 | Map checkpoint | ≥80% on Q3–Q4 + JSON/Graph knowledge map |
| End Phase 3 | Graph checkpoint | ≥80% on Q5–Q6 + Neo4j mastery queries |
| End Phase 4 | Retrieval checkpoint | ≥80% on Q7–Q8 + GraphRAG eval beat baseline |
| End Phase 5 | MCP checkpoint | ≥80% on Q9–Q10 + 2 MCP tools in tutor |
| End Phase 6 | Production gate | ≥80% on Q11–Q12 + capstone shipped |

Log quiz scores in `notes/week-NN/quiz-review.md` on gate weeks (8, 16, 24, 32, 40, 52).

---

## Expert checkpoint (Week 78)

Complete when you can demonstrate:

1. **Portfolio** — `checkpoints/expert-portfolio/` links all 7 phase gate artifacts
2. **Knowledge** — ≥85% on all 12 questions above (retake until passing)
3. **Competency self-assessment** — `notes/week-77/competency-self-assessment.md` with evidence links per domain
4. **Capstone** — production-ready tutor with RAG, graph, MCP, observability, and eval harness
5. **Completion record** — `checkpoints/expert-checkpoint-complete.md` with date and summary

After Week 78, follow the **Stay an Expert** maintenance loop in the learning plan canvas.
