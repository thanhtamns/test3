---
name: Auto-Evolution V17 System
description: Automatic evolution pipeline + intelligent full KB loading + auto-refresh for persona knowledge system
type: project
originSessionId: 46f356ec-3b81-472f-bb3a-fb6a073d6cde
---
## Auto-Evolution Architecture (SHIPPED 2026-04-28)

### Components

1. **auto-outcome-detector.cjs** — UserPromptSubmit + SubagentStop hook
   - Auto-detects outcome signals: revenue, conversion, response rate, success/failure
   - Auto-links to pending predictions (30-day window)
   - Triggers accuracy recalculation

2. **auto-evolution-engine.py** — Batch evolution processor
   - Calculates persona accuracy from linked outcomes
   - Updates recommendation weights per persona
   - Logs evolution events

3. **intelligent-kb-loader.py** — Full KB loading with weighting
   - Loads ALL personas (not selective top 5-8)
   - Composite scoring: keyword (30%) + domain (30%) + accuracy (25%) + kb_depth (15%)
   - Returns tiered rankings: Primary/Secondary/Tertiary

4. **knowledge-auto-refresh.cjs** — Auto-refresh stale knowledge
   - Triggers on session start if >30% personas stale
   - Refreshes top 5 stale personas in background

### Key Change from V16
- Evolution is now AUTOMATIC — no manual `/log-outcome` required
- Full KB loaded with intelligent weighting instead of selective top-N
- Stale knowledge auto-refreshes on session start

### Files Created
- `.claude/hooks/auto-outcome-detector.cjs`
- `.claude/hooks/knowledge-auto-refresh.cjs`
- `.claude/skills/business/feedback_loop/auto-evolution-engine.py`
- `.claude/skills/business/feedback_loop/intelligent-kb-loader.py`
- `startup.md` updated to V17

### Verified
- Evolution engine: 36 predictions, 4 personas processed
- KB loader: 15 personas indexed, ranking functional
