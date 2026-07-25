---
name: Local-First Intelligence Architecture
description: LFI architecture — shift intelligence from LLM to local. 4 tiers: LLM Interface, Knowledge Distiller, Local Reasoning, Autonomy Governor. Graduated autonomy per domain.
type: project
originSessionId: b4e4d723-3a9b-4776-b732-70d7be5a425f
---
**APPROVED 2026-05-10.** Architecture-first approach to make system think locally, use LLM only as research tool + fallback.

**Why:** LLM causes hallucination (fabricated metrics, false confidence, inconsistent verdicts). ~40% of intelligence runs on LLM at runtime. Lock-in to Claude Code runtime layer.

**How to apply:**
- Plan: `plans/260510-0952-local-first-intelligence-architecture/` (6 phases, ~24 days)
- Blocked by: Knowledge Distillation Engine (`plans/260510-0914-knowledge-distillation-engine/`)
- Target: LLM dependency ~40% → <10%. Local verdict <200ms. Graduated autonomy per domain.
- Key principle: LLM never outputs verdicts, only structured verifiable facts
- 3 evolution triggers: session (gap fill), outcome (learn from mistakes), continuous (daily crawl)
- Autonomy levels: HUMAN_DECIDES (<70% or <30 verdicts) → SEMI_AUTO (70-85%) → FULL_AUTO (>85%)
- Existing provider abstraction at `.claude/lib/llm/provider_interface.py` — 6 files bypass it with direct anthropic imports
