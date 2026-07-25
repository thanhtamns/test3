---
name: Transaction Layer V12 — Observation + Survivor Intelligence
description: V12 adds ad observation, geographic arbitrage, compound customer scoring, trade data, failure-survivor analysis, business model matrix. KEY CHANGE — kills CHANNELS not PRODUCTS when trade data shows $M+ flows.
type: project
---

**Status:** IMPLEMENTED (2026-04-05). 9 phases complete, 8 new scripts, 7 data files, 5 modified agents.

V12 = Radar. V8=skeleton, V9=brain, V10=memory, V11=eyes, V12=radar.

**9 Blind Spots Fixed:**
1. TEXT ONLY → ad library + video analysis observation
2. NO AD INTELLIGENCE → FB Ad Library signal mining via HN/Reddit
3. NO ARBITRAGE → VN→US price gap detection (lemongrass 58x, guava 47x, bamboo straw 23x)
4. NO COMPOUND CUSTOMER → 11 model archetypes scored (AD_DEPENDENT vs SELF_PERPETUATING)
5. SEARCH ONLY → observe where money is SPENT not just discussed
6. NO VIDEO INTELLIGENCE → Gemini-powered ad creative analysis
7. NO FAILURE-FIRST ANALYSIS → failure mining + survivor hunting per category
8. NO TRADE DATA → UN Comtrade API (21 VN HS codes, official export $)
9. KILLS PRODUCT not CHANNEL → rattan: 4 B2B GO + 4 DTC KILL (same product!)

**Part A — Observation Scripts:**
ad-library-observer.py, arbitrage-detector.py, compound-customer-scorer.py, ad-creative-analyzer.py, amazon-trend-observer.py

**Part B — Survivor Intelligence Scripts:**
trade-data-connector.py (UN Comtrade, 21 HS codes), failure-survivor-analyzer.py, business-model-matrix.py (8 model templates)

**Key Integration:**
- `pipeline-runner.py --observation-mode --product "{keyword}"` runs full V12
- Step -5A (observation) + Step -5B (survivor) before Step -4 (V11 evidence)
- Techniques 13 (ad-validated) + 14 (survivor-informed) in deep-reasoner
- Trade data override: >$100M exports = CANNOT kill product, evaluate per-model
- Scanner evaluates each business model independently (DTC vs B2B vs OEM)

**Rattan test case:** trade data $60M → DTC KILL (shipping kills) → B2B GO (hospitality, wholesale, OEM, design)

**Why:** V11 still killed "rattan" because Etsy sellers dying. But $640M/yr flows through VN rattan exports. Pipeline needed to observe MONEY FLOW (trade data) not just FORUM DISCUSSION.
**How to apply:** Use `--observation-mode` for products where DTC fails but B2B might thrive. Trade data reveals the invisible money mountain.
