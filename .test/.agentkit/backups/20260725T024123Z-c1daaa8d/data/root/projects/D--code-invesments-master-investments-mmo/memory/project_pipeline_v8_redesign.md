---
name: Transaction Layer V8 — Leverage-First Mountain Discovery
description: V8 pipeline redesign — constraint decoupling, deep-not-wide scanner (5 niches × exhaustive), leverage-path-finder agent, platform ecosystem reclassification, path-based kills
type: project
---

**Status:** IMPLEMENTED (2026-04-05). All 7 phases complete, all 6 Python files compile, tests pass.

V8 supersedes V7. Core changes:
1. **Constraint decoupling** — capital/time = "starting position" metadata, never kill criteria. filter_mode: STAIRCASE_BUILDER_ONLY
2. **Category reclassification** — all platform ecosystems (n8n, Chrome, Shopify, Apify, VS Code, WordPress) = ONE category `platform_ecosystem`, max 20% of portfolio
3. **Deep-not-wide scanner** — 5 niches × 40+ web calls each (was: 20 × 5). Stage 1 broad sweep → Stage 2 deep dive on top 5
4. **Leverage-path-finder** — NEW opus agent. For each mountain, finds WHO climbed it from $0 and HOW. Output: leverage_paths[] with founder, starting_capital, time_to_50k, key_moves
5. **Intel map expansion** — 38 → 100+ industries via auto-populate of 58 proposals
6. **Staircase from real data** — staircase-gate validates against leverage_paths[], deep-reasoner builds from real comparable paths
7. **Path-based kills** — "no viable path exists" (structural) replaces "can't afford it now"

**Why:** V7 still found platform ecosystem anthills ($500-$5K/mo) because: dollar kills eliminated big opps, platform categories fooled diversity gate, shallow 20-niche scan = no depth, no leverage discovery.

**How to apply:** All transaction layer work should reference V8 plan at `plans/260405-0935-transaction-v8-leverage-first-redesign/`. V7 plan is superseded. V6 archive stays unchanged.

**Plan:** `plans/260405-0935-transaction-v8-leverage-first-redesign/` (7 phases)
**Location:** `D:\code\invesments\master_investments` (NOT _mmo)
