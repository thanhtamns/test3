---
name: Transaction Layer V10 — Living Intelligence
description: V10 wires LIVE DATA through pipeline. Outcome tracking, prediction verification, weight adaptation, real-time data connectors, death registry, base rates, asset verification. System learns from outcomes.
type: project
---

**Status:** IMPLEMENTED (2026-04-05). All 7 phases complete, 9 scripts compile.

V10 = Memory + Senses. V8=skeleton, V9=brain, V10=learning from outcomes.

**7 Phases:**
1. **Outcome Tracking** — `outcome-tracker.py` (--check/--append/--log/--stats). JSONL file with atomic writes. Orchestrator Step 9 auto-logs GO predictions.
2. **Prediction Verification** — `delta-calculator.py` compares predicted vs actual. Classifications: ACCURATE (±20%), ACCEPTABLE (±50%), MISS (>50%). Auto-updates `accuracy-tracker.json`.
3. **Weight Adaptation** — `calibration-updater.py` reads accuracy-tracker → adjusts scanner weights ±10% max per cycle. Produces versioned `calibration-state.json` with rollback.
4. **Calibration Engine** — filter-enforcer.py reads dynamic thresholds. Scanner.md reads dynamic weights. Deep-reasoner reads category_accuracy for calibrated skepticism. Orchestrator Step -3 displays calibration status.
5. **Real-Time Data** — `data-connector.py` (5 free APIs: HN, Reddit, GitHub, BLS, Trends) + `real-time-enricher.py` orchestrator. Scanner D7 auto-calls. 24h TTL cache.
6. **Death Registry** — 22 seeded platform death events + `base-rates.json` (12 categories). `death-registry-updater.py` auto-scans HN+Reddit. Deep-reasoner Technique 9 uses base rates as starting point.
7. **Asset Verification** — `owned-asset-verifier.py` (existing mode: verify via web, new mode: assess buildability). Staircase-gate.py `check_asset_verification()` as WARNING.

**New Scripts (in .claude/skills/business/transaction-layer/scripts/):**
outcome-tracker.py, delta-calculator.py, calibration-updater.py, data-connector.py, real-time-enricher.py, death-registry-updater.py, owned-asset-verifier.py

**New Data (in .claude/skills/business/transaction-layer/data/):**
pipeline-predictions.jsonl, accuracy-tracker.json, calibration-state.json, live-cache.json, death-registry.json, base-rates.json

**Modified Files:**
- transaction-orchestrator.md — Step 9 (V10 script), Step -3 (calibration status), Learning Loop (script-based)
- money-mountain-scanner.md — V10 dynamic weights, D7 real-time enrichment
- deep-reasoner.md — Calibrated skepticism (Technique 3), base rates (Technique 9), asset verification
- filter-enforcer.py — load_calibration(), dynamic mountain_minimum
- staircase-gate.py — check_asset_verification()

**Why:** V9 DESCRIBED learning but didn't LEARN. Run #50 was no smarter than run #1. pipeline-predictions.jsonl was referenced but never created, XSkill scripts were empty.
**How to apply:** V10 is current production pipeline. Full learning loop: prediction → outcome → delta → pattern → weight update. After 10+ outcomes, system demonstrably improves.