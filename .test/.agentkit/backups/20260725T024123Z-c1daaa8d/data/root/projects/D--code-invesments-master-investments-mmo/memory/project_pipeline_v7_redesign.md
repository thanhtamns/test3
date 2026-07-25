---
name: Transaction Pipeline V7 Redesign
description: V7 redesign plan to fix V6 pipeline failures — hard gates, scanner overhaul, intel map expansion, staircase enforcement, mountain minimum
type: project
---

V7 pipeline redesign COMPLETE (2026-04-05). Phases 1-5 implemented, Phase 6 partial (regression passed, full scan pending).

**V6 Root Causes (diagnosed):**
- 0 WebFetch calls despite "WebFetch-first" mandate
- 86% tech_saas despite 50% max rule
- $500-$5K/mo ceiling opps despite "no_ceiling" vision
- Empty staircase (Technique 8 never populated)
- All gates fail silently (WARNING not BLOCKING)

**V7 Key Changes:**
1. **Hard gates** — gate-enforcer.py: sys.exit(1) on failure (source ≥30 web calls, diversity ≤50% cat, mountain $10K+ ceiling, staircase ≥3 steps)
2. **Scanner overhaul** — 3-phase: industry sweep → revenue verify → platform scan. Founder context REDACTED from scanner (deep-reasoner only)
3. **Intel map expansion** — 38 → 100+ industries via intel-map-builder.py + manual curation
4. **Staircase enforcement** — mandatory for every GO. Marketplace-verified only (Flippa/BizBuySell/SEC)
5. **Mountain minimum** — $50K/mo ceiling for CONFIRMED. ANTHILL (<$10K) auto-skip
6. **Data reset** — Archive all 14 V6 opps, fresh start

**Why:** User demands "núi tiền" (money mountains), not anthills. Pipeline must find $50K+/mo opportunities backed by real web data.

**How to apply:** When working on transaction pipeline, follow V7 rules. Check plan at `plans/260405-0834-transaction-v7-pipeline-redesign/`
