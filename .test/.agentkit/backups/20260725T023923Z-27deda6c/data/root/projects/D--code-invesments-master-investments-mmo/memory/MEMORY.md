# Project Memory

## User Profile
- [User Role - Entrepreneur](user_role.md) — Solo founder, Thanh Hoa VN, no-ceiling vision, demands zero-bias data-driven analysis

## Architecture
- **Persona system**: Agent .md files in `.claude/agents/personas/{category}/` + SKILL.md in `.claude/skills/business/personas/{name}/`
- **3-Layer Hybrid Knowledge** (completed 2026-03-09):
  - **Layer 1 (STATIC):** 11 PATP identity JSON files per persona — never auto-modified
  - **Layer 2 (PERIODIC):** 4 monthly-refresh JSON files per persona (market-awareness, tool-ecosystem, competitive-landscape, trend-signals)
  - **Layer 3 (REAL-TIME):** Per-query WebSearch via keyword classifier in KB-skill SKILL.md
- **V5 Niche Map**: `ok-testing/mmo-master-niche-map-v5-vietnamese.md` — 5578 lines, 178+ niches, 18+ groups A-W, Vietnamese

## Strategic Direction (2026-06-02)
- [3-Phase Strategic Plan](project_strategic_3phase_plan.md) — Phase 1: sell AI services ($2-5K/mo), Phase 2: build toll position, Phase 3: scale. Tony Le + Li Ka-shing framework.
- [Brain 4 FlowPositionEngine](project_brain4_flow_position_upgrade.md) — DESIGNED: Adds GATEWAY/AGGREGATOR/BOTTLENECK detection to hunt. Fixes trader-only blindspot. 315 LOC. Plan pending.

## Intelligence Controller (2026-05-22)
- [Intelligence Controller](project_intelligence_controller.md) — SHIPPED: Hypothesis-driven search brain. Deterministic Python controlling LLM. 8 files, 20/20 tests. Pre-stage for ThinkRunner + /hunt.

## Hypothesis-Driven Intelligence Engine (2026-05-27)
- [HDIE Evolution](project_hypothesis_driven_intelligence.md) — PLANNED: Evolve Stage0 from search-aggregation to Co-Scientist-style think-first engine. 5 phases, ~25h. Plan: `plans/260527-hypothesis-driven-intelligence-engine/`

## LLM-as-Sensor Architecture (2026-05-10)
- [LLM-as-Sensor Wiring](project_llm_sensor_wiring.md) — SHIPPED: ThinkRunner+Stage0Bridge wired with real DuckDuckGo research. Gate B0 in brainstorm. 34 facts/8 dims on KVision test.
- [LFI Architecture](project_local_first_intelligence.md) — APPROVED: Shift intelligence from LLM→local. 4 tiers, graduated autonomy, 3 evolution triggers. 6 phases, ~24 days.
- [Knowledge Distillation Engine](project_knowledge_distillation_engine.md) — APPROVED: Phase 0 of LFI. Distill books/failures into SQLite. 6 phases, 6.5 days.

## Evolution Architecture (2026-04-28)
- [Autonomous Evolution Hook](project_autonomous_evolution_hook.md) — SHIPPED 2026-05-09: SessionStart hook auto-triggers 4 Python evolution scripts. Zero manual triggers for knowledge hunting/evolution/verify.
- [Auto-Evolution V17](project_auto_evolution_v17.md) — SHIPPED 2026-04-28: Auto-outcome detection, intelligent full KB loading, auto-refresh. Evolution is AUTOMATIC — no manual /log-outcome required.
- [Evolution Architecture V1](project_evolution_architecture_v1.md) — SHIPPED 2026-04-22: Learning loop wired. 6 scripts in feedback_loop/, /evolve command, hook updated.

## Stage0 Brain Evolution (2026-04-13)
- [Stage0 Brain Evolution Phase 6-9](project_stage0_brain_evolution.md) — SHIPPED 2026-04-13: 4 atomic commits in master_investments (eee3b82, 3d87634, f2ce214, bb509e3), 5120 LOC, 133/133 tests. Operator archetype library + Wave 2 enforcement + multi-branch mode + compound learning loop. Ground-truth replay pending user.

## Stage0 Execution Layer (2026-05-04)
- [Stage0 Execution Layer V1](project_stage0_execution_layer_v1.md) — SHIPPED 2026-05-04: Step 11 added, wires verdict to 44+ personas, 7 deal-* agents, 15 closing techniques, Mark Tôn payment terms. Trigger: `/execute <case_id>` after verdict.

## Cashflow Blueprint Layer (2026-05-09)
- [Cashflow Blueprint Layer](project_cashflow_blueprint_layer.md) — SHIPPED 2026-05-09: Step 12 wires 4 cashflow agents into stage0 verdict. /blueprint + /deal commands, infra freeze until 10+ deals, feedback loop bridge.
- [Cashflow Positioning Infra](project_cashflow_positioning_infra.md) — SHIPPED 2026-05-09: 5-phase positioning framework (pattern→info→deals→relationships→position). 11 schemas + 7 templates + phase gates. Commit 9c4a0251.

## Transaction Layer V8→V19 (2026-04-07)
- [V16 Ground Truth Intelligence](project_ground_truth_v16.md) — SHIPPED 2026-04-22: Learning from real decisions, not templates. Predictions calibrated from actual outcomes. Step -7 added to pipeline.
- [V19 Dual-Lane Mountain Hunter](project_pipeline_v19_dual_lane.md) — IN-PROGRESS: Lane A (V18 floor, unchanged) + Lane B (mountain: 6 novelty scanners, P90 scoring, $10K/day gate). Phases 0-8 complete. See `plans/260407-0821-v19-dual-lane-mountain-hunter/`.
- [V18 Discovery Engine Rebuild](project_pipeline_v18_discovery_engine.md) — COMPLETE: full inversion, 10 archetype scanners, Pre-Filter D demoted, VN quota removed, $1K cap removed, 7/7 sale2 ground-truth matched.
- [V17 Anti-Bias Intelligence Engine](project_pipeline_v17_anti_bias.md) — SUPERSEDED: never shipped (plan 260406-1127 all phases unchecked). V17.1 Orchestration Contracts (260406-1551) complete separately. Root cause fixed by V18+V19 architecture.
- [V15 Intelligence Core Automation](project_pipeline_v15_intelligence_core.md) — COMPLETE: signal monitor, auto-verify, knowledge graph, calibration wire, scheduled automation
- [V14 Intelligence Depth Fix](project_pipeline_v14_intelligence_depth.md) — COMPLETE: learning loop wiring, reasoning engine, temporal analysis, contradiction resolution, knowledge accumulation
- [V13 Deep Intelligence](project_pipeline_v13_deep_intelligence.md) — COMPLETE (2026-04-05): ecosystem mapping, Gold Rush Law, causal reasoning, structural-position scoring, compound learning, founder-path match
- [V12 Observation + Survivor](project_pipeline_v12_observation_survivor.md) — SUPERSEDED by V13. ad observation, arbitrage, trade data, failure-survivor, business model matrix.
- [V11 Evidence-First Discovery](project_pipeline_v11_evidence_first.md) — SUPERSEDED by V12. evidence scraper, path extractor, pattern clusterer, execution distance, compound scorer, simulation engine
- [V10 Living Intelligence](project_pipeline_v10_living_intelligence.md) — SUPERSEDED by V11. outcome tracking, delta calc, weight adaptation, 5 free APIs, death registry, base rates, asset verification
- [V9 Intelligence Integration](project_pipeline_v9_intelligence.md) — SUPERSEDED by V10. 4-persona pre-analysis, 11-technique deep-reasoner, execution path, learning loop
- [V9 Intelligence Gap](feedback_v9_intelligence_gap.md) — System thinks like McKinsey not hustler; 200+ skills disconnected from pipeline
- [V8 Redesign](project_pipeline_v8_redesign.md) — SUPERSEDED by V9. Constraint decoupling, deep-not-wide (5×exhaustive), leverage-path-finder, platform_ecosystem=1 category, path-based kills
- [V7 Redesign](project_pipeline_v7_redesign.md) — SUPERSEDED by V8. Hard gates, scanner overhaul, staircase enforcement
- [V6 Hotfix](project_pipeline_v6_hotfix.md) — 7 critical bugs (V6 archived — all 14 opps cleared)
- [V5 Upgrade Details](feedback_system_redesign_complete.md) — Staircase model, video intel, revenue gate unblocked
- **Location:** `D:\code\invesments\master_investments` (NOT _mmo)
- **V8 Plan:** `plans/260405-0935-transaction-v8-leverage-first-redesign/` (7 phases)
- **V8 core:** no dollar kills, platform ecosystems=1 category (max 20%), 5 niches×40 web calls, leverage-path-finder agent, staircase from real data
- **V7 diagnosed failures:** 86% platform ecosystem (miscategorized as diverse), $1K capital cage killed mountains, 20 shallow niches, no leverage discovery

## Team Intelligence Upgrade (completed 2026-03-14)
- **Correction-capture pipeline**: `.claude/hooks/correction-capture.cjs`
- **Agent I/O ledger**: `.claude/hooks/agent-io-complete.cjs` + `subagent-init.cjs`
- **Skills added**: `/agent-report`, `/log-outcome`, `/reflect`
- **Quality gates**: BS-detector + principle-enforcer BLOCKING in business workflow Stage 2

## Feedback
- [Focus master_investments repo](feedback_focus_master_investments.md) — Code changes target master_investments (NOT _mmo). Plans can live in _mmo.
- [Plan-only mode preference](feedback_plan_only.md) — Don't assume implementation follows planning; exit cleanly
- [Proof-required recommendations](feedback_proof_required.md) — ALL business suggestions MUST have verified evidence
- [System Redesign Complete](feedback_system_redesign_complete.md) — Zero-bias pipeline, hook enforcement, portfolio stable
- [master_investments default — 3-tier channel analysis with user gate](feedback_master_investments_default.md) — Quick/Smart/Full options before any deep channel sweep
- **Forensic training corpus:** lives at `D:\code\invesments\master_investments\data\training\`. Auto-loaded via SessionStart hook (NOT memory). Never re-add to memory.

## Brain Harness Fix (260412)
- [Brain Harness Fix](project_brain_harness_fix.md) — 15/15 compound learning, 3 hooks, spec v24, production verified. Next: Research Intelligence Upgrade (8 data scripts)

## Verified Issues (Fixed)
- Do Duc Quang: FABRICATED persona, added UNVERIFIED disclaimer
- Hormozi $46.2M quote: was misleading (equity sale, not gym revenue)
- Buffett failures-learned.md: was missing despite MANDATORY LOAD rule
- Cold Email King: inflated metrics (23% → 15-18% open rate)
- Jack Ma: unverifiable origin stories labeled as such
