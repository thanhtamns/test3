---
name: LLM-as-Sensor Architecture Wiring
description: ThinkRunner + Stage0Bridge wired with real web research (DuckDuckGo). Gate B0 in brainstorm. 6 bugs fixed 2026-05-10. Techniques operational (consensus=SPLIT). 36/38 facts stored, 2 [K] verified.
type: project
originSessionId: 2abd054c-b25c-49d0-8058-7fb178e6fd73
---
Architectural shift from "LLM as thinker" to "LLM as sensor, code as thinker" — wired 2026-05-10.

**Why:** User identified that ALL intelligence (MM-01 through MM-18, gates B1-B5, SCH rules) was prompt text depending on LLM compliance. Existing decomposition library (28 files) was built but never called from live workflows.

**How to apply:** When brainstorm or stage0 fires on business topics, Gate B0 runs ThinkRunner FIRST. ThinkRunner decomposes query into 30-40 micro-queries, fires each via DuckDuckGo, scores dimensions deterministically. LLM then narrates pre-computed findings — cannot contradict verified facts.

Key files:
- `master_investments/.claude/lib/intelligence/decomposition/web_research_bridge.py` — real research_fn + authority-based confidence scoring
- `master_investments/.claude/lib/intelligence/decomposition/live_think_runner.py` — CLI entry
- `master_investments/.claude/lib/intelligence/decomposition/stage0_live_bridge.py` — stage0 adapter
- Stage0 Step 2.9 updated in `stage0.md`
- Gate B0 added to brainstorm SKILL.md in both repos

Bug fixes applied 2026-05-10 (session 2):
1. kill_signals.json is raw list, not {"signals":[...]} — _load_kill_signals handles both
2. Confidence scoring upgraded — authority domains (gov/edu/pitchbook/crunchbase) boost to [K] zone
3. Fact assembly fixed — _is_duplicate was rejecting after 10 same-category facts, now uses SQL LIKE on fact prefix
4. Dimension taxonomy unified — VALID_DIMENSIONS expanded from 8 to 18 (hunger + decomposition)
5. T02 reflexion type comparison (str>int) fixed
6. VC/finance templates added to DimensionRegistry

Phase 3 (ReasoningOrchestrator → real LLM API) deferred — needs API key infrastructure.
