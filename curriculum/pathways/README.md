# Recognized Expert Fast Track

This directory overlays the original 78-week curriculum with a compressed pathway. It does not modify or delete any original lesson.

## Shape

- 27 required weeks × 5 lesson days = 135 required lessons
- 3 optional depth weeks
- Approximate completion: 27–30 weeks at one lesson per business day
- Same seven phase gates and recognized-expert finish line as the full track

`skills.json` defines week-level skill nodes. The portal expands each week to five ordered lesson nodes. A week prerequisite applies to its first day; days 2–5 depend on the prior day.

`fast-track.json` defines the required order, optional depth pool, and placement thresholds.

## Placement rules

A placement score of at least 80% for Phases 1–6 skips that phase's nodes marked `skippable`. Placement never skips:

- phase gate weeks,
- Phase 7 evidence work,
- the Week 78 recognized-expert checkpoint.

## Editing the graph

1. Every week ID must be unique.
2. Every prerequisite must reference another week ID.
3. Required weeks must be reachable from the first node.
4. Gate weeks 8, 16, 24, 32, 40, 52, and 78 must remain required.
5. Run `npx tsx scripts/smoke-pathway.ts` after changes.

## Why no GAT yet

The explicit prerequisite DAG is deterministic, explainable, and works before enough learner trajectories exist. A future GAT can rank unlocked nodes using completion, quiz, and time-on-task data without replacing this source-of-truth graph.
