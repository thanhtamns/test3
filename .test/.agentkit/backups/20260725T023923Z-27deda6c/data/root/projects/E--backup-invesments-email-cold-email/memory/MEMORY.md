# Cold Email Warmup System - Project Memory

## Project Type
Self-hosted cold email warmup system. Phases 1-3 implemented.

## Active Plans
- **Phases 1-3 (COMPLETE):** `plans/260208-1008-cold-email-warmup-phases-1-3/`
- **Phases 4-5 (PENDING):** `plans/260208-1417-cold-sending-campaign-management/`
  - Phase 4: Cold Sending Engine (24h) — campaigns, recipients, CSV import, templates, A/B, cold send worker
  - Phase 5: Campaign Mgmt & Analytics (18h) — analytics API, Next.js dashboard, indexes, bug fixes

## Codebase Structure
```
apps/api/       — NestJS 11 + Fastify v5 (13 endpoints)
apps/worker/    — NestJS standalone BullMQ worker
apps/dashboard/ — Next.js 15 stub
packages/database/     — @repo/database (Drizzle schemas, DRIZZLE token)
packages/shared-types/ — @repo/shared-types (enums, interfaces)
packages/email-utils/  — @repo/email-utils (stub)
```

## Tech Stack (Implemented)
- **ORM:** Drizzle — manual NestJS DI via `'DRIZZLE'` token, schemas in `@repo/database`
- **Framework:** NestJS 11 + Fastify v5 adapter
- **Queues:** BullMQ queue-per-inbox (`warmup:inbox-{id}`)
- **IMAP:** imapflow — batch polling every 3min
- **SMTP:** Nodemailer with pooling — one transporter per inbox via Map
- **DNS:** node:dns/promises for SPF/DKIM/DMARC TXT lookups
- **Encryption:** AES-256-GCM, scrypt key derivation, random salt per operation
- **Auth:** API key via X-API-Key header, timing-safe comparison
- **Events:** EventEmitter2 in-process
- **AI Content:** Gemini Flash (@google/generative-ai) + fallback templates
- **Monorepo:** Turborepo v2 + pnpm 10

## Key Architectural Patterns
- Queue-per-inbox (BullMQ) — isolated rate limits
- Circuit Breaker — auto-pause on bounce_rate >2% or spam_rate >0.1%
- Strategy Pattern — warmup ramp (aggressive/conservative/custom)
- Repository Pattern — Drizzle queries abstracted
- Separate class-validator DTOs from Drizzle schemas

## Lessons Learned
- **Windows `cp` with quoted paths** causes garbled filenames — use Write tool instead
- **`moduleResolution: NodeNext`** breaks extensionless relative imports in shared packages → use `module: commonjs` + `moduleResolution: node` for NestJS monorepos
- **Shared DB package** (`@repo/database`) needs its own deps (`pg`, `drizzle-orm`) in package.json for TypeScript to resolve types when compiling from consumer apps
- **tsconfig.base.json paths** resolve relative to each app's `baseUrl`, not the root — paths in base config may not work as expected for cross-package imports
- **pnpm hoisting** doesn't always put types where expected — always declare deps in the package that uses them
- **Crypto services duplicated** between API and Worker — must stay in sync (same format, same key derivation). Consider extracting to shared package if it drifts.
- Drizzle has no official NestJS module; manual provider injection works fine
- mailauth SPF/DKIM/DMARC functions require email messages, not raw domain checks → used node:dns/promises directly
- BullMQ dynamic queues can't use `@Processor()` decorator → use Worker class directly

## Code Review Findings (planned for Phase 5)
- Missing DB indexes on email_logs, inboxes, warmup_peers → 10 indexes planned
- `setTimeout` in EngagementAutomationService → BullMQ delayed jobs
- Race condition on totalSent/totalReceived → atomic SQL `SET col = col + 1`
- CORS unrestricted in dev → env-based ALLOWED_ORIGINS

## Phase 4-5 Key Decisions
- **Templates:** Handlebars (XSS-safe by default, industry standard)
- **CSV import:** csv-parse (streaming, batch insert 1000/chunk)
- **Campaign queues:** `campaign:inbox-{id}` separate from `warmup:inbox-{id}`
- **A/B testing:** JSONB variants on campaigns table, weighted random selection
- **Dashboard:** Tremor charts + SWR polling (30s) — no WebSocket (YAGNI)
- **Analytics:** PostgreSQL COUNT FILTER + partial indexes
