---
name: V14 Intelligence Depth Fix
description: Transaction pipeline V14 — learning loop wiring, reasoning engine, temporal analysis, contradiction resolution, knowledge accumulation
type: project
---

V14 extends V13 with 5 fixes for intelligence depth (currently 1/10):

1. **P0 Close Learning Loop** — pipeline-runner auto-logs predictions to outcome-tracker, orchestrator prompts verification at startup, calibration threshold 10→5, backfill historical manifests
2. **P1 Reasoning Engine** — hypothesize→validate→conclude protocol for deep-reasoner, scanner, causal-reasoner. Max 15 web calls vs 50+.
3. **P2 Contradiction Resolution** — new contradiction-resolver.py, evidence hierarchy (causal > ecosystem > scoring > keyword), reconciled verdicts
4. **P3 Temporal Intelligence** — new temporal-analyzer.py, lifecycle stage (EMERGING→DECLINING), 5 queries per niche, temporal_durability dimension
5. **P4 Accumulated Intelligence** — new knowledge-accumulator.py, cache-first protocol, delta refresh, knowledge-base dirs

**Why:** V13 has 17 agents, 40 scripts but: predictions.jsonl=0 lines, accuracy-tracker=zeros, calibration=v0, every scan starts fresh, no reasoning depth.

**How to apply:** Phase 1 is foundation — everything else builds on having outcome data. Phases 2-4 independent of each other. Phase 5 benefits from all.

**Plan:** `plans/260405-1654-v14-intelligence-depth-fix/`
