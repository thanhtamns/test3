---
name: EE-RA Integration Plan
description: Integrating EE-REPORTING-AGENT as domains/reporting/ in SKE2 — LangChain, AI chat sidebar, smart alerting
type: project
---

EE-REPORTING-AGENT (Insight Agent) is reference only — no code comparison with EE-RA codebase.

**Integration decisions (2026-04-01, refreshed):**
- Backend: New `domains/reporting/` domain in SKE2
- Frontend: `frontend-azai` features/reporting/ (shadcn + Recharts)
- Agent framework: LangChain + ChatBedrock (Claude Sonnet 4.6)
- Data source: PostgreSQL only (SKE2 internal data), direct queries, no cache layer
- Permissions: Multi-tenant (customer-scoped, follows SKE2 RBAC pattern)
- Report type: Custom report builder (JSON config-driven)
- Build order: Phase 0 (report infrastructure) → Phase 1 (AI Chat Sidebar) → Phase 2 (Smart Alerting, deferred)
- Key adaptation: Backend queries PG directly via data models (not frontend-mediated like original design)
- Multi-step reasoning: Simplified to 2 endpoints (not 4) — LangChain agent loop handles via tool calling

**Design docs:** `C:\Users\phamt\Downloads\New folder (4)\01_FEATURE_AI_REPORT_ASSISTANT.md` and `02_FEATURE_SMART_ALERTING.md`
**Brainstorm report:** `plans/reports/brainstorm-260401-1432-reporting-module-fresh.md`
**Architecture review:** High-level architecture has no flaws. Issues are implementation details (timeout, dead letter queue, rate limiting, SQL injection prevention).

**Why:** User wants reporting/analytics as a full module in SKE2, built from scratch (no existing dashboard pages).
**How to apply:** Follow design docs architecture with PG-direct adaptations. New code in domains/reporting/ (backend) and features/reporting/ (frontend-azai).
