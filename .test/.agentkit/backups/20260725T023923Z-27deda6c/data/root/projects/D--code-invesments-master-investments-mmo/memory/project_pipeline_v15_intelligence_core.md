---
name: V15 Intelligence Core Automation
description: Transaction pipeline V15 — platform signal monitor, auto-verify learning loop, knowledge graph cache-first, calibration wire, scheduled automation
type: project
---

V15 transforms static prompt-driven system → autonomous intelligence engine:

1. **Platform Signal Monitor** — `platform-signal-monitor.py`: commission rate tracking for 5 platforms (V1=manual entry), delta classification (SPIKE/DROP/POLICY/STABLE), arbitrage scoring, alert management
2. **Auto-Verify** — `auto-verify.py`: closes prediction→outcome→learn loop, classifies expired predictions (AUTO_LOG/NEEDS_WEB_VERIFY/NEEDS_MANUAL_REVIEW), conservative approach
3. **Scheduled Automation** — Daily (8AM): signal scan + check + verify. Weekly (Sun 9AM): knowledge delta + patterns + temporal. Hook updated with V15 Intel status line
4. **Calibration Wire** — `signal-extractor.py` now reads `calibration-state.json` dynamically (R/S/G/P/T/C → dimension mapping), falls back to defaults when version=0
5. **Knowledge Graph** — `knowledge-query.py` + `knowledge-graph.json`: unified entity store, --rebuild aggregates all data sources, --query searches, --fresh checks FRESH/STALE/EXPIRED, cache-first protocol in SKILL.md

**Why:** V14 had 7+ scripts but ZERO automation. Data files empty/template. Every query started fresh with WebSearch.

**How to apply:** SKILL.md v15 documents cache-first protocol (MANDATORY before WebSearch). Hook shows V15 Intel on session start.

**Location:** `D:\code\invesments\master_investments\.claude\skills\business\transaction-layer\`
**Plan:** `plans/260405-1752-v15-intelligence-core-automation/`
