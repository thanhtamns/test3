---
name: Focus on master_investments repo
description: All stage0/pipeline work targets master_investments, NOT master_investments_mmo. Plans can live in _mmo but code changes go to master_investments only.
type: feedback
originSessionId: a3c7fa49-98fa-4209-9680-6f78822f7706
---
When working on stage0 pipeline, hooks, agents, or any business intelligence code — the target is ALWAYS `D:\code\invesments\master_investments`.

**Why:** _mmo is the orchestration/plans repo. master_investments is where the actual pipeline code, hooks, agents, settings.json, and scripts live. Confusing the two causes commits in wrong repo or edits to wrong files.

**How to apply:** Before any Edit/Write to .claude/ files, verify path starts with `D:\code\invesments\master_investments\` (no _mmo suffix). Plans/reports can go to _mmo per hook injection, but code goes to master_investments.
