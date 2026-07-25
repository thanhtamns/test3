---
name: Stage0 Brain Evolution Phase 6-9
description: Stage0 brain evolution shipped — operator archetype library + multi-branch enforcement + compound learning loop. Code in master_investments. Ground-truth replay pending.
type: project
originSessionId: 9935eaed-27b7-435b-b9d7-79bc6a907e61
---
# Stage0 Brain Evolution — Phase 6-9 (shipped 2026-04-13)

**Plan:** `D:\code\invesments\master_investments_mmo\plans\260413-1751-stage0-brain-evolution\`
**Code repo:** `D:\code\invesments\master_investments`
**Status:** code complete + 133/133 tests; ground-truth replay pending user

## Why
Phase 1-5 fixed architectural bias (learned-rules hook, query classifier, forum preflight, power-law sizer, stair-step, constraint inversion, confidence gate, parallel tracks). 2026-04-13 run revealed 4 bugs surviving + 6 structural gaps:
- Wave 2 still skipped "for context efficiency" (no Stop hook block)
- Forum preflight failed silently, no retry
- Step 2.5 forced single-branch (D only out of 4)
- Output still defaulted to micro-SaaS — all 4 hypothesis Skills Master #3 product margin

Root cause: knowledge library = indie-hacker-Western only; no operator archetypes; no founder-strength routing; no compound learning.

## What shipped (4 atomic commits)

| Phase | Commit | Files | LOC | Tests |
|---|---|---|---|---|
| 6 KNOWLEDGE EXPANSION | eee3b82 | 17 | 1727 | 27/27 |
| 7 ENFORCEMENT HARDENING | 3d87634 | 9 | 1070 | 19/19 |
| 8 COMPOUND LEARNING | f2ce214 | 16 | 2029 | 75/75 |
| 9 VALIDATION | bb509e3 | 2 | 294 | 12/12 smoke |

**Total:** 5120 LOC, 133/133 tests passing.

## Key components

**Phase 6 (knowledge):**
- `money-mechanics-reference.md`: 7 money-flow types, 5 compound engines, 4 founder strengths, anti-bias checklist
- 6 archetype JSONs (flat schema): trade-intermediary, labor-arbitrage-operator, information-broker, content-factory, acquisition-operator, holding-company. Each ≥2 example_operators tagged [K]/[T]/[?] per FABRICATION rule
- `founder-strength-detector.py`: rule-based, 4-class (Skills/Relationship/Market/Operations Master)
- `money-flow-tagger.py`: keyword-based 7-type classifier
- 3 personas: operator-archetype-specialist, information-broker-mapper, labor-arbitrage-architect
- `niche-archaeologist.md` references kb/archetypes/ (no duplication)
- `profile-capture.py` enriches founder_strength via subprocess
- `stage0.md` Step 1 founder_strength + Step 5 money_flow tagging + diversity check

**Phase 7 (enforcement):**
- `stage0-wave2-enforcement.cjs`: Stop hook blocks verdict if Wave 1 fired but Wave 2 missing AND conf<0.8 AND verdict not in exempt classes (EXPLORATION_ONGOING, INSUFFICIENT_SIGNAL, KILL, HARD_KILL). Honors `.ck.json` flag `wave2Enforcement: enforce|warn|off`
- `forum-preflight.py` retry loop: backoff [2,5,10]s + cache fallback (max_age_days=7). Test env guards `FORUM_PREFLIGHT_TEST_NO_SLEEP/NO_CACHE`
- `ladder-fallback-wrapper.py`: retry + route fallback for ladder-runner
- `stage0.md` Step 2.5 multi-branch mode "all-parallel-depth-1" (cap 12 agents, 10min wall)
- `stage0.md` Step 3.5/3.8 receipt writes to `/tmp/stage0-wave{1,2}-receipt-<case_id>.json`

**Phase 8 (compound learning):**
- `outcome-feedback-processor.py`: matches outcomes.jsonl to cases, Brier score per verdict class
- `prior-update-bayesian.py`: exponential smoothing α=0.3, snapshots `kb/archetypes-history/<date>/` first. Decay >365 days → weight *= 0.7
- `archetype-miner.py`: clusters MOUNTAIN cases by (money_flow, founder_strength, compound_engine), n≥3 → proposal in `kb/archetype-proposals/` (staging-only)
- `rule-fire-tracker.py`: ranks P0 rules by fire frequency
- `bias-calibrator.py`: per verdict class, delta ±20% → OVER/UNDER_PREDICTING flag
- `semantic-consolidator.py`: proposes new learned rules to `learned-rules-proposals.md` (staging)
- `brain-refresh-weekly.py`: orchestrator, --dry-run support, writes `data/calibration/brain-refresh-<date>.md`
- `cron-brain-refresh-weekly.cjs`: SessionStart hook, fires background refresh if >7 days stale
- `stage0-learned-rules-injector.cjs`: ranks rules by fire count from priority.json
- **Staging-first principle:** all proposals require user approval merge

**Phase 9 (validation):**
- `test-bias-fix-smoke.py` expanded 6→12 checks
- Validation docs in plans/260413-1751-stage0-brain-evolution/validation/ (gitignored)
- Brain refresh baseline digest at `data/calibration/brain-refresh-2026-04-13.md`

## Pending user action

Ground-truth replay: run /stage0 with verbatim 2026-04-13 query, select `all-parallel-depth-1`, fill `validation/ground-truth-diff.md`. Need ≥7/11 expected behavior changes for merge approval.

## Brain evolution principles operationalized

1. Repetition strengthens pathways → rule-fire-tracker
2. Outcomes calibrate predictions → outcome-feedback + bayesian update
3. Pattern recognition from examples → archetype-miner clustering
4. Transfer learning → cross-archetype similarity (via cluster keys)
5. Forgetting decays wrong patterns → decay function (>365 days)
6. Episodic → semantic consolidation → semantic-consolidator
7. Chunking expertise → archetype JSON as atomic concept
