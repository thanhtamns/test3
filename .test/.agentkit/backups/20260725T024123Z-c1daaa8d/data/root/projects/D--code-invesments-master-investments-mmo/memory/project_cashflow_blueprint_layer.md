---
name: Cashflow Blueprint Layer
description: Stage0 Step 12 wires 4 cashflow agents into verdict output — blueprint synthesizer + deal tracker + infra freeze
type: project
originSessionId: 5c071d50-b4e8-44bd-8964-9c5bf4fb67d8
---
SHIPPED 2026-05-09: Execution Evolution — wires cashflow reasoning into stage0 pipeline.

**Problem:** 4 cashflow agents (cash-operator-brain, operator-mastery-brain, zero-to-cash-architect, money-game-modeler) were DISCONNECTED from /stage0. Verdicts produced scores but no actionable business models.

**What shipped (in master_investments):**
1. Blueprint Synthesizer (`/blueprint <case_id>`) — invokes 4 cashflow agents sequentially, produces 5-section output (Money Flow, Cash Timeline, Unit Economics, Playbook, Kill/Scale)
2. Deal Lifecycle Tracker (`/deal new|go|update|kill|status`) — tracks predicted vs actual cash events, max 3 active deals
3. Stage0 Step 12 — BLOCKING for MOUNTAIN verdicts, OPTIONAL for SIDE_HUSTLE_PLUS, auto-invokes blueprint
4. Infrastructure Freeze — hooks warn on new infra until 10+ deals tracked with outcomes
5. Feedback bridge — deal-outcome-to-prediction.py closes learning loop (deal -> Brier scoring)

**Why:** User identified core failure: "system doesn't produce good business models and cashflow paths" — it was thinking like McKinsey (research reports) not like an operator (first-principles cashflow calculation).

**How to apply:** When user runs /stage0 and gets a GO verdict, Step 12 auto-triggers /blueprint. After blueprint, offer /deal new. Track deals until 10+ outcomes before building more infrastructure.

**Key paths:**
- `.claude/skills/business/blueprint-synthesizer/SKILL.md`
- `.claude/skills/business/deal-tracker/scripts/create-deal.py|update-deal.py|deal-dashboard.py`
- `.claude/commands/blueprint.md`, `.claude/commands/deal.md`
- `.claude/hooks/infra-freeze-warning.cjs`, `.claude/hooks/deal-reminder.cjs`
- `.claude/skills/business/feedback_loop/deal-outcome-to-prediction.py`
- Plan: `plans/260509-1510-execution-evolution/` (in _mmo repo)
