---
name: Quality enforcement is instruction-only, not structural
description: All blocking gates are prompt instructions that LLMs can skip. No code validates compliance. Agents skip steps 0a-0k under context pressure.
type: feedback
---

Every "BLOCKING" gate in the agent system is a prompt instruction. No code validates:
- Were scripts (calc-dispatcher, research-dispatcher) actually run?
- Do outputs contain required tags ([CALCULATED], [RESEARCHED], [VERIFIED])?
- Was bullshit-detector actually invoked?
- Did principle-enforcer score pass 7/10?

**Why:** 260321 audit — Hormozi agent output had zero [CALCULATED], [RESEARCHED], or [VERIFIED] tags, meaning steps 0c, 0d, 0f were all skipped. No gate caught this. System moved from "no rules" → "rules as instructions" but NOT to "rules enforced by infrastructure."

**How to apply:**
- Build automated output validator (code, not LLM) that checks tag presence, source count, banned phrases
- This should be a hook that runs post-agent, not another agent that must be manually invoked
- Priority: after fixing brainstorm routing bypass
