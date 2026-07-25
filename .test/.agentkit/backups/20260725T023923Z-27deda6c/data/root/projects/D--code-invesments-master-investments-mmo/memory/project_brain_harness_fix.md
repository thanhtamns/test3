---
name: Brain Harness Fix (260412)
description: Stage0 brain compound learning fix — 15 scripts + 3 hooks + spec compression. Production verified.
type: project
originSessionId: ef46e012-675f-4a57-817f-345352b5d1ab
---
## Brain Harness Fix (260412) — COMPLETE

**Why:** Brain compound learning was broken at 11 seams (2/15 score). /stage0 verdicts were commodity LLM output. Wiring, enforcement, and orchestration all failing independently.

**How to apply:** All work lives in `D:/code/invesments/master_investments` (parent, NOT _mmo). Commit `0964d77` on master branch.

### What was built (4 sessions, ~10h)
- **P0 Wiring:** persist-verdict.py, persist-knowledge.py, verify-persistence.py (atomic 6-store writes)
- **P1 Semantic:** kb-query.py rewritten with sentence-transformers 3-band gradient
- **P2 Calibration:** update-calibration.py (dual brier path), /log-outcome --stage0-case-id mode
- **P4 Evolution:** auto-evolve.py (5 policy triggers), brain-dashboard.py (RED/YELLOW/GREEN)
- **Enforcement:** stage0-cwd-validator.cjs (blocks from _mmo), stage0-tool-call-audit.cjs (blocks commodity output)
- **Spec:** stage0.md compressed 846→289 lines imperative checklist v24. Legacy SKILL.md disabled.

### Production status
- 2 successful production /stage0 runs (info-source-audit + info-extract-tiktok-delta)
- 3 cases in KB, 2 brier delayed_pending entries, compound learning verified (Run #5 cited Run #4)
- Brain score: 15/15 layers active

### Known gaps (next session)
- 6/14 spec'd agents not in registry (PERCEIVE coverage)
- Red-team gate skips META queries
- Windows /tmp path mismatch (cosmetic, self-debugs)
- verdict_class extraction regex fallback needed

### Next major upgrade: Research Intelligence Upgrade
- Plan: `plans/260412-1448-research-intelligence-upgrade/plan.md` (APPROVED)
- Replace WebSearch agents with 8 domain-specific data scripts (edgartools, OpenBB, JobSpy, Playwright, Comtrade REST, etc.)
- Phase 1 first: comtrade-mirror-gap.py + edgar-insight-finder.py + job-velocity-tracker.py (~12h)
- Goal: computed insights instead of described methodologies

### Pulse test pending
- Kit: `plans/260412-1036-h5-pulse-test-execution-kit/pulse-test-kit.md`
- H5 "VN Edge OSINT newsletter" — 7-day deadline, 5 LinkedIn cold-pitches
- Resolve: `/log-outcome --stage0-case-id stage0-260412-info-source-audit --observed <0|1>`
