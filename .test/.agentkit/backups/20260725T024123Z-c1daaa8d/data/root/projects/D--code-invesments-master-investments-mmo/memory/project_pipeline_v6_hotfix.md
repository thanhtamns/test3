---
name: Pipeline V6 Hotfix — 7 Critical Bugs
description: 2026-04-05 hotfix fixing recycling, broken scorer, narrow search, capital hardcode, vision constraints, synthetic data pollution
type: project
---

## Pipeline V6 Hotfix (2026-04-05)

7 critical bugs fixed in `D:\code\invesments\master_investments\`:

1. **Recycling** — Scanner now reads `verified_opportunities` + `scanner_kills` and excludes known niches before scanning
2. **Evidence duplication** — Added EVIDENCE UNIQUENESS RULE (BLOCKING) — each dimension must have different evidence from different sources
3. **Narrow search** — Removed "intel map IS your universe" ceiling. Added EXPANSION PHASE: 5+ new industries per broad scan beyond the 30 mapped ones
4. **Capital hardcode** — `filter-enforcer.py` now reads `transaction-state.json` dynamically instead of hardcoding $1000
5. **Vision constraints** — `deep-reasoner.md` changed from "HARD CONSTRAINTS" to "STARTING CONTEXT". Never kills on time/capital.
6. **Synthetic data purge** — Deleted 56 synthetic pipeline seeds, 22 fake registry entries, broken pipeline-output, placeholder market-pulse signals
7. **Validation history** — Added pipeline-fix marker entry in transaction-state.json

**Why:** Previous scans recycled same 22 opportunities, scoring was broken (same evidence copied across all 6 dimensions), search was locked to 30 industries, $1000/$3h constraints were limiting vision.

## Scanner V2 Rewrite — Revenue-First Discovery (2026-04-05, second pass)

The v2-r5 scan AFTER the initial hotfix still produced 100% tech_saas niches. Root cause: scanner prompt itself biased toward platform ecosystems.

**Changes made:**
- **ANTI-TECH-FIXATION RULE**: If >50% of niches are tech_saas → output INVALID
- **DIVERSITY GATE rebalanced**: min 8/20 REAL-INDUSTRY niches, max 6 platform, max 6 infra
- **New Step 0.0A-D**: Revenue-first discovery order (non-tech industries FIRST, platforms LAST)
- **Step 0.0B Deep Conversation Mining**: Browse communities (read 25 posts), don't just keyword search. Cross-reference pain across 3+ independent communities. Dollar amounts > vague frustration.
- **Platform distribution_bonus reduced**: +3 → +1 (platform isn't a moat). Industry tools get NEW bonuses: industry_size_bonus (+3 if TAM>$100B), pricing_power_bonus (+2 if avg>$99/mo), stability_bonus (+2 if industry>20yr)
- **FORBIDDEN updated**: Must WebFetch ≥10 real communities/forums. Must have ≥3 community sources per CONFIRMED niche.

**Why:** Platform ecosystems (n8n templates, Chrome extensions) have low TAM, price compression toward $0 (open-source like OmniVoice kills margins), and platform dependency risk. Real industries ($900B restaurant, $400B construction, $4T healthcare) have stable demand, pricing power, and 100x larger TAM.

**How to apply:** Next `/stage0` should produce 8+ real-industry niches (dental, construction, logistics, etc.) alongside max 6 platform niches.
