---
name: Transaction Layer V5 — Vision Layer Upgrade
description: master_investments pipeline upgraded 2026-04-04. Staircase growth model, revenue gate unblocked, video intelligence, bootstrap path analysis.
type: feedback
---

## V5 Upgrade (2026-04-04) — Built on V4 (2026-04-03)

**Problem solved:** System was a self-reinforcing loop. Revenue gate blocked scanning → forced executing weak micro-opps → deep-reasoner killed everything on capital constraints → always converged to same 5 weak GOs.

**3 Core Changes:**

### 1. Vision Layer (Staircase Growth Model)
- `deep-reasoner.md` — Added Technique 8: Staircase Propagation. Models 12-month bootstrap path instead of snapshot evaluation.
- `STAIRCASE_GO` verdict: opportunity viable via multi-step bootstrap (capital gap ≤18mo bridgeable)
- Technique 8 can OVERRIDE Technique 7's capital kill with viable staircase path

### 2. Revenue Gate: BLOCK → WARNING
- `pipeline-runner.py` — Revenue gate now returns WARNING, not BLOCK. `--strict` flag restores original blocking.
- `filter-enforcer.py` — Added `check_bootstrap_path()`. Capital-intensive opps get `STAIRCASE_GO` instead of KILL.

### 3. Video Intelligence Layer
- NEW: `video-extractor.py` — yt-dlp subtitle extraction from TikTok/YouTube/Instagram
- NEW: `video-signal-miner.md` — Agent for video transcript signal extraction  
- `conversation-miner.md` — Accepts video transcripts as Tier 2 supplementary signals
- `transaction-orchestrator.md` — Added Step 0.5 for video signal mining

**Files modified in master_investments:**
- `.claude/agents/core/transaction/deep-reasoner.md` — 8 techniques (was 7), STAIRCASE_GO verdict
- `.claude/agents/core/transaction/transaction-orchestrator.md` — Phase 3.5, video step, revenue gate as warning
- `.claude/agents/core/transaction/smart-detector.md` — Accepts STAIRCASE_GO input
- `.claude/agents/core/transaction/conversation-miner.md` — Video transcript integration
- `.claude/agents/core/transaction/video-signal-miner.md` — NEW agent
- `.claude/skills/business/transaction-layer/scripts/pipeline-runner.py` — Revenue gate WARNING + --strict
- `.claude/skills/business/transaction-layer/scripts/filter-enforcer.py` — Bootstrap path analysis
- `.claude/skills/business/transaction-layer/scripts/video-extractor.py` — NEW script
- `.claude/skills/business/transaction-layer/data/transaction-state.json` — growth_staircase, video_sources fields
- `.claude/skills/business/unit-economics/data/benchmark-rates.json` — staircase_model section

**Why:** User feedback — system was too conservative, killing all big opportunities on capital constraints, always converging to micro-puddle GOs (n8n templates, Apify actors). Vision was artificially limited.

**How to apply:** When evaluating opportunities, use staircase model to project growth path. Don't kill on capital alone — model the bootstrap timeline.
