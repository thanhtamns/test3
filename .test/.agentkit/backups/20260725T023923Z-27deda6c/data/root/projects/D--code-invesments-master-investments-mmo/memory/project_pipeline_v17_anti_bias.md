---
name: V17 Anti-Bias Intelligence Engine
description: SUPERSEDED — never shipped. Root cause addressed by V18 (10-archetype inversion) + V19 (dual-lane mountain hunter). V17.1 Orchestration Contracts shipped independently (complete).
type: project
status: SUPERSEDED
superseded: 2026-04-07
---

## STATUS: SUPERSEDED (2026-04-07)

Pipeline V17 Anti-Bias Intelligence Engine was **never shipped**. Plan `plans/260406-1127-pipeline-v17-anti-bias-intelligence-engine/` — all 6 phases remain unchecked.

**Why superseded:**
- Root cause was single-scanner monoculture, not bias in scoring weights
- V18 (Apr 6, 2026) inverted the entire architecture: 10 parallel archetype scanners, discovery-first
- V19 (Apr 7, 2026) adds Lane B mountain hunter with P90 asymmetric scoring
- Incremental bias-patches (P4/P5/P6) would not have surfaced mountains — V18/V19 structural fix was the right call

**What actually shipped from this era:**
- V17.1 Orchestration Contracts (`260406-1551`) — ALL 6 PHASES COMPLETE:
  - P1: Scoring scale lock → scoring-config.json
  - P2: Revenue floor purge → deleted min_monthly_ceiling_usd
  - P3: Source routing auto-fallback
  - P4: Transaction-state write ownership (schema 9.0)
  - P5: Threshold linter (threshold-linter.py)
  - P6: V17 cross-references

**Successors:**
- V18: `plans/...v18-discovery-engine-rebuild/` — 10 archetype scanners, 7/7 sale2 ground-truth
- V19: `plans/260407-0821-v19-dual-lane-mountain-hunter/` — dual-lane, Lane B mountain hunter

**Note on V17 label in codebase:** Code comments like `V17.1 P1/P2/P3/P4` refer to V17.1 Orchestration Contracts (SHIPPED). The Research Orchestration V17 (Mar 2026, Phases 5-8) is also complete and shipped — fetchers, validation agents, insight extraction, learning loop.
