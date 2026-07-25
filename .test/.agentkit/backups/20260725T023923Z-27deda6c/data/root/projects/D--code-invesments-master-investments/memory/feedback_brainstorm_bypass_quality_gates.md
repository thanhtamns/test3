---
name: Brainstorm skill bypasses all business quality gates
description: /brainstorm routes business queries through dev-oriented tool, bypassing BD, PE, reasoning-enforcement. Root cause of repeated generic output feedback.
type: feedback
---

/brainstorm skill has ZERO references to bullshit-detector, principle-enforcer, reasoning-enforcement.md, or business-workflow.md. When business questions route through it, the entire quality infrastructure (125 agents, 25 rules, 8 scoring dimensions) is bypassed.

**Why:** Discovered 260321 — brainstorm session on $1M/month business system produced ChatGPT-level generic output. Same generic-output feedback flagged 5+ times since 260319 but root cause (routing bypass) was never identified until this audit.

**How to apply:**
- Business queries through /brainstorm MUST route to business-workflow.md
- OR /brainstorm must include BD + PE + reasoning-enforcement inline
- This is P0 priority — blocks all other quality improvements
- Never assume /brainstorm is appropriate for business analysis until fixed
