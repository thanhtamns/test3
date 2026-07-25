---
name: V18 Discovery Engine Rebuild
description: Pipeline rebuild from filter→discovery after 100% miss rate vs sale2 ground truth. 10 archetype scanners, kill Pre-Filter D, VN quota required.
type: project
---

# Pipeline V18 — Discovery Engine Rebuild (2026-04-06)

**Status:** PENDING. Brainstorm + plan complete. Blocked by V17 P1/P2/P3.

**Why:** /stage0 ground-truth test vs 7 sale2 videos = 100% miss rate. All 7 videos are physical/VN/TikTok/Shopee/export. System returned 12/12 SMB SaaS monoculture. V17 is compliance theater — scoring gates still kill everything non-SaaS before evidence.

**How to apply:** V17 is read as "cheap wins P1-P3 only". V18 is the real fix. Any future pipeline work should reference V18 architecture, not V17.

**Architecture inversion:**
- 10 archetype-specific scanners in parallel (not 1 universal)
- Evidence-typed miners (MRR is 1 of 10 shapes, not the only shape)
- Archetype-Router + Budget-Allocator (replaces _PRIORITY_CATEGORIES hardcode)
- Kill Pre-Filter D entirely (sustainability = scoring, not gating)
- Pattern-Inducer NEW agent (grows pattern-library.json from unknown clusters)
- VN quota ≥3/10 niches required (Shopee/Tiki/TikTok VN/Zalo/1688)
- $1K capital ceiling hard filter

**10 archetypes:** smb_saas, tiktok_shop_affiliate, shopee_tiki_d2c, cross_border_arbitrage, service_microbrand_vn, export_mfg_signal, creator_monetize_vn, info_product_vn, marketplace_toll, lead_gen_agency

**Ground truth (from sale2 videos):**
1. Custom embroidery VN (service_microbrand)
2. 3D printer filament recycler @3dpany (physical_hardware)
3. TikTok Shop blenders $1.6K DMV (tiktok_shop_live)
4. Shopee kids play set (physical_d2c)
5. VN→KR wood screws export (cross_border_b2b)
6. Gift handbags 80 tỷ VND (physical_premium_d2c)
7. VN→US dried flowers/herbs 5x arbitrage (cross_border_arbitrage)

**Files:**
- Brainstorm: plans/reports/brainstorm-260406-1657-pipeline-v18-discovery-engine-rebuild.md
- Plan dir: plans/260406-1706-pipeline-v18-discovery-engine-rebuild/
- Target repo: D:\code\invesments\master_investments\ (NOT _mmo)

**Open questions:** data-broker free tier (Kalodata/Shoplus/FastMoss), VN Customs API, pattern-inducer UX, refactor-vs-rename strategy, $1K cap soft-vs-hard.
