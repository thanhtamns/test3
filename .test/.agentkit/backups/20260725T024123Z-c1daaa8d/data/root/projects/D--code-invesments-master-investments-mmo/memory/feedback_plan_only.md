---
name: Plan-only mode preference
description: When user says "only completed plan, not implement" — exit plan mode without allowedPrompts, don't assume implementation follows
type: feedback
---

When in plan mode, user may want plan written but NOT proceed to implementation. Don't attach allowedPrompts to ExitPlanMode in that case — just exit cleanly. User will return to implement later.

**Why:** User explicitly rejected ExitPlanMode twice when it included implementation permissions. They want planning and implementation as separate sessions.

**How to apply:** If user says "only plan" or similar, call ExitPlanMode with no parameters. Don't assume implementation follows planning.
