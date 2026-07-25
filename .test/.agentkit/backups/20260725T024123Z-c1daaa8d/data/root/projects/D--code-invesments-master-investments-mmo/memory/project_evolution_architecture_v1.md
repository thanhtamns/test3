---
name: Evolution Architecture V1 Complete
description: Learning loop wired - predictions tracked, outcomes logged, agent accuracy updated, patterns extracted
type: project
originSessionId: f3002090-1ad2-49f6-9e3a-91a5641aec90
---
Evolution Architecture Phase 1 "Close the Loop" shipped 2026-04-22.

**Problem solved:** System had 118 agents with 0 predictions tracked, empty patterns.json, no learning from outcomes.

**Components built:**
- `prediction-schema-validator.py` — unified prediction card schema
- `prediction-extractor.py` — parses verdicts → structured cards
- `prediction-logger.py` — JSONL storage + pending-index
- `accuracy-updater.py` — Brier scoring + agent accuracy updates
- `pattern-extractor.py` — extracts patterns when 20+ outcomes
- `prediction-post-processor.py` — command wrapper
- `/evolve` command — manual learning cycle trigger

**Hook updated:** `learning-loop-trigger.cjs` now checks unified store, surfaces expired predictions at session start.

**Why:** To make system actually learn from outcomes, not just generate advice from static training.

**How to apply:** 
- After /stage0 verdicts: run `prediction-post-processor.py process -i verdict.md -c stage0`
- When deadlines pass: run `/evolve` to collect outcomes and update accuracy
- System now tracks which agents are reliable per domain

**Location:** All scripts in `.claude/skills/business/feedback_loop/`
**Plan:** `plans/260422-1124-evolution-close-the-loop/`
