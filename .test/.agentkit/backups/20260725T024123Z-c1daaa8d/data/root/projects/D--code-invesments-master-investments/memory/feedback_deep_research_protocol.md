---
name: Deep research mandatory
description: Research agents must do deep multi-layer search, not shallow Google page 1 scraping. WebFetch every source, extract mechanisms, cross-validate.
type: feedback
---

Research agents were producing shallow output because: (1) model was haiku (cheapest), (2) skill limited to 5 tool calls, (3) no WebFetch instruction — only WebSearch snippets.

**Why:** User feedback 260321 — 5th+ time flagging generic analysis. Surface-level internet data has zero value. Real insight requires reading actual source pages, extracting mechanisms (WHY not WHAT), and finding data NOT on Google page 1.

**How to apply:**
- researcher.md upgraded to `model: sonnet` with Deep Research Protocol
- research SKILL.md: removed 5-call limit, added 4-layer deep search protocol
- Layer 1: Broad discovery (WebSearch) = find URLs, not answers
- Layer 2: Deep extraction (WebFetch) = read actual pages in full
- Layer 3: Cross-reference validation = 2+ sources per data point
- Layer 4: Mechanism extraction = WHY/HOW, not WHAT
- Quality bar: "Would a 15-year veteran find NEW info here?"
- Anti-pattern: search once → summarize snippets = FORBIDDEN
