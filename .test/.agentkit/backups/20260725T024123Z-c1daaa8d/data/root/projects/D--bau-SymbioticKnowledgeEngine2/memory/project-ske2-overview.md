---
name: SKE2 Project Overview
description: SymbioticKnowledgeEngine2 — AI knowledge transfer platform, FastAPI backend with 12 DDD domains, two React frontends, Azure AD SSO, AWS infra
type: project
---

SKE2 (AZAI.MS) is an AI-powered code knowledge transfer system for enterprise teams.

**Stack:** FastAPI (Python 3.11) + React 18 + PostgreSQL + AWS Bedrock + Terraform
**Architecture:** Domain-driven design with 12 domains, V1 (legacy sunset) + V2 (active, multi-tenant)
**Auth:** Azure AD SSO (MSAL) via frontend-azai, JWT fallback
**Frontends:** `frontend` (Vite+React+Tailwind, hackathon original), `frontend-azai` (Radix/shadcn, Azure AD, active development)
**Infra:** AWS AppRunner, RDS, S3, CloudFront, Bedrock, CodeBuild CI/CD
**Domains:** application, auth, customer, document, insight, integration, knowledge, settings, transition, user

**Why:** Helps teams capture/transfer critical codebase knowledge to mitigate knowledge loss risks.
**How to apply:** All new features should follow V2 patterns (domain structure, tenant isolation, Azure AD auth). Use frontend-azai for new UI work.
