---
name: intelligence-controller
description: Hypothesis-driven search brain — deterministic Python controlling LLM search strategy with incremental graph building
metadata: 
  node_type: memory
  type: project
  originSessionId: b16b5fa5-da1d-4701-8fdc-7735a1b4fee0
---

SHIPPED 2026-05-22: IntelligenceController framework — the "brain" that controls what LLM searches for.

**Why:** System had no thinking engine. It depended entirely on LLM + WebSearch — fire 30 queries, get 200-char snippets, synthesize. No hypothesis-driven search, no incremental picture building. User critique: "không có bất kỳ tư duy nào điều khiển LLM."

**How to apply:** The controller is a pre-stage for ThinkRunner and /hunt --asym. It runs BEFORE decomposition/scanners and provides a verified money flow graph as context.

**Location:** `.claude/lib/intelligence/controller/` (8 Python files + tests)
- `intelligence_controller.py` — main loop: Seed → Hypothesis → Search → Update → Judge × 5 cycles
- `money_flow_graph.py` — GraphNode/GraphEdge/Hypothesis data structures
- `seeder.py` — 3 targeted seed searches to bootstrap graph
- `hypothesis_generator.py` — rule-based (gap→hypothesis) + structural patterns
- `search_director.py` — budget allocation (15 calls), DDG vs WebFetch selection
- `graph_updater.py` — parse results, confirm/kill hypotheses
- `completion_judge.py` — stop when: verified edges ≥ 3, confidence ≥ 0.55, nodes ≥ 4
- `think_runner_bridge.py` — bridge to ThinkRunner + prompt formatting

**Integration:**
- ThinkRunner: pre-stage, graph context injected into strategic reasoner via `ic_context`
- /hunt --asym: Step A0.PRE runs controller before all 6 scanners
- hunt.md: updated with A0.PRE section
- hunt-lib/intelligence-controller-integration.md: scanner usage guide

**Tests:** 20/20 passing

Related: [[llm-sensor-wiring]], [[local-first-intelligence]]
