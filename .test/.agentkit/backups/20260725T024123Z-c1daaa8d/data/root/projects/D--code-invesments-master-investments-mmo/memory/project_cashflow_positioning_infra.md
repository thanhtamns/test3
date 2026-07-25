---
name: Cashflow Positioning Infrastructure
description: 5-phase positioning framework — data schemas + CRUD scripts + 6 commands + stage0 wiring for deal observation, failure archaeology, relationship engineering
type: project
originSessionId: 6eb19526-b2ab-4a7b-8ed4-d793f7f4323d
---
SHIPPED 2026-05-09: Full positioning framework infrastructure in master_investments.

**Phase 1 (commit 9c4a0251):** 11 data schemas + 7 execution templates.
**Phase 2 (session 2026-05-09):** CRUD scripts + commands + stage0 integration.

**What shipped (Phase 2):**
1. `positioning-crud.py` — unified CRUD for all positioning data (add-deal, add-failure, add-coffee, add-synthesis, add-dream5, dream5-give, add-micro-deal, update-micro-deal, phase-check, sync-gates)
2. `positioning-context-generator.py` — generates injection block for stage0 pipeline with topic matching + pattern data
3. 6 commands: `/observe`, `/failure`, `/synthesis`, `/coffee-meeting`, `/dream5`, `/phase-check`
4. Stage0 wiring: Step 1.7 (positioning context load), Positioning Context verdict section, POSITIONING layer in Brain Audit

**Why:** Schemas existed but no way to interact. Commands let founder log deals, failures, coffee meetings. Stage0 wiring feeds pattern recognition into opportunity scoring.

**How to apply:** When user logs deals → `/observe`. Weekly review → `/synthesis`. Check progress → `/phase-check`. Stage0 auto-loads positioning context at Step 1.7.

**Key paths:**
- Scripts: `master_investments/execution/scripts/positioning-crud.py`, `positioning-context-generator.py`
- Commands: `_mmo/.claude/commands/{observe,failure,synthesis,coffee-meeting,dream5,phase-check}.md`
- Stage0: `master_investments/.claude/commands/stage0.md` (Step 1.7), `stage0-checklist.md`
- Plan: `plans/260509-1816-cashflow-positioning-mastery/`
