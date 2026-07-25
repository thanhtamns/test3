---
name: Knowledge Distillation Engine
description: Approved plan to move intelligence from LLM-runtime to local-first via distilling real decisions from books/failures into SQLite. 6 phases, 6.5 days.
type: project
originSessionId: 7907ef5a-bb92-4e18-ae4c-b8c93e154860
---
Knowledge Distillation Engine — approved 2026-05-10.

**Why:** System has 1,649 Python scripts + 9 SQLite DBs but all intelligence runs on LLM at runtime. Local infra is empty (compound.db=0, outcomes=0). Evolution stuck because no personal action outcomes. Solution: use LLM OFFLINE to extract real decisions from books + case studies + failures into structured vectors. Local engine matches against 500+ decisions without LLM.

**How to apply:**
- Plan: `plans/260510-0914-knowledge-distillation-engine/` (6 phases)
- P1: Vectorize 162 existing persona decisions → feature vectors in SQLite
- P2: Build local reasoning engine (Python + SQLite, < 100ms per case)
- P3: Distill Munger, DeMarco, Naval books (~100 decisions)
- P4: Distill Failory + Indie Hackers (~100+ decisions, 50% failures)
- P5: Wire into stage0 as Step 1.8 (local-first, LLM-fallback)
- P6: Auto-distillation hook (every /stage0 run enriches local KB)
- Target repo: master_investments (not _mmo)
- Key insight: local = faster+cheaper, distilled knowledge = smarter, auto-loop = continuously smarter
