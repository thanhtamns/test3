---
name: Autonomous Evolution Hook
description: SessionStart hook auto-triggers 4 Python evolution scripts (knowledge hunting, scheduled evolution, batch verify, knowledge hunter) — eliminates manual /evolve triggers
type: project
originSessionId: 6eb19526-b2ab-4a7b-8ed4-d793f7f4323d
---
SHIPPED 2026-05-09: `evolution-auto-runner.cjs` in master_investments hooks.

**What it does:** SessionStart hook checks 4 staleness conditions, spawns Python scripts detached:
1. `auto_evolve.py` — knowledge hunting + integration (>7 days threshold)
2. `scheduled-evolution-loop.py` — prompt evolution proposals (>7 days)
3. `batch-auto-verify.py --all-expired` — expired prediction verification (>3 days)
4. `knowledge_hunter.py` — external data hunting (>14 days)

**Also fixed:** `knowledge-auto-refresh.cjs` — was calling useless `--list-all`, now writes priority queue to `kb-refresh-queue.json`.

**Why:** User demanded zero manual triggers for evolution. 4 of 5 manual gaps closed. Remaining manual: `/sync-knowledge` (needs LLM), `/evolve --extract` (needs LLM), `/log-outcome` (needs human judgment).

**How to apply:** Hook runs automatically on every SessionStart. No user action needed. Check `.logs/evolution-auto-runner.log` for run history.

**Key paths:**
- Hook: `master_investments/.claude/hooks/evolution-auto-runner.cjs`
- Fix: `master_investments_mmo/.claude/hooks/knowledge-auto-refresh.cjs`
- Registration: `master_investments/.claude/settings.json` (origin: autonomous-evolution-hook-260509)
- Plan: `plans/260509-1908-autonomous-evolution-hook/`
