---
name: brain4-flow-position-upgrade
description: "Diagnosed hunt/stage0 trader-only blindspot. Designed Brain 4 (FlowPositionEngine) to detect toll/owner positions like OpenRouter. 315 LOC, 4 changes. Plan pending."
metadata: 
  node_type: memory
  type: project
  originSessionId: e778a245-938c-4fc3-8ec8-09ebac4f4935
---

Hunt/stage0 system has structural blindspot: can only see PriceDelta (arbitrage) and ForcedFlow (compliance) — both TRADER patterns. Cannot detect OWNER/TOLL positions (OpenRouter $1.3B, Li Ka-shing ports).

**Root cause in code:**
- `models.py`: No FlowPosition dataclass → invisible opportunity class
- `AnomalyCard.final_rank()`: `margin_per_unit / 1000` scoring kills high-volume/low-margin plays
- `IntelligenceController`: bottleneck_positions used to AVOID, not OWN

**Designed upgrade:** Brain 4 FlowPositionEngine. 5 position types: GATEWAY, AGGREGATOR, STANDARD, BOTTLENECK, DATA_EXHAUST. Dual scoring (trader + owner). ~315 LOC. No refactoring.

**Why:** Tony Le intersection + OpenRouter analysis proved system thinks like McKinsey consultant, not like Li Ka-shing owner.

**How to apply:** When user asks to implement, reference `plans/260602-brainstorm-system-vision-upgrade/brainstorm-report.md`. Target repo: master_investments. [[strategic-3phase-plan]]
