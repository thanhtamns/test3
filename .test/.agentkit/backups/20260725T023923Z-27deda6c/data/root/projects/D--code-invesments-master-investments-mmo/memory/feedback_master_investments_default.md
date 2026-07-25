---
name: master_investments default — full channel+comment analysis with user gate and 3-tier options
description: Mandatory default protocol when running master_investments on social/creator channels — ask user first with exact counts and present 3-tier (Quick/Smart/Full) options before any deep analysis
type: feedback
originSessionId: 98bb8376-dc8a-43c3-8839-9cc9f2fbf485
---

When running analysis via `D:\code\invesments\master_investments\` system on any social/creator channel (TikTok/YouTube/FB/IG/X/etc.):

**Default scope:** Analyze ALL videos on the channel AND read ALL comments in each video. This is the mandatory baseline, not an optional upgrade.

**BUT always ask user first** before executing. Protocol:

### Step 1 — Scrape inventory first (cheap, no API cost)
Use `yt-dlp --flat-playlist --dump-json` to get: total video count, per-video views/likes/comments/duration/title/date. This is the baseline data needed for the question.

### Step 2 — Ask user with exact numbers AND 3-tier options

The confirmation question MUST include:
1. **Exact total video count** on the channel
2. **Total comments across channel** + avg/median/P90/max per video
3. **Date range** (oldest → newest) and total audio duration
4. **Power-law callout:** top 5/10 videos by comment → what % of total comments they capture
5. **Top 5 videos by engagement** (title preview) — often reveals red flags before deep analysis
6. **3-tier options** (Quick / Smart / Full) with cost+time+coverage tradeoff
7. **Explicit recommendation** of which tier is optimal, with reasoning

### Step 3 — 3-Tier Framework (ALWAYS present these)

🟢 **Tier 1 — QUICK** (~10 videos, 15 min, free tier OK)
- Top 10 videos by comment count
- Coverage: ~80-85% of audience discourse (power law)
- Use when: fast verdict on claim verifiability + audience sentiment
- Cost: ~$0.30, zero quota risk

🟡 **Tier 2 — SMART** (~35-40 videos, 60 min) ⭐ DEFAULT RECOMMENDATION
- (a) Full narrative series if present (e.g., all P1-P25 episodes)
- (b) Top 15 by engagement (comments + views)
- (c) 10 random zero-comment videos (failure/dying content pattern)
- Deduplicate to ~35-40 unique videos
- ALL comments (no sampling — cheap)
- Coverage: 95%+ of meaningful signal
- Cost: ~$1-2 Gemini, may need quota reset wait
- Use when: defendable full verdict needed

🔴 **Tier 3 — FULL** (ALL videos, 2-3 hours)
- Every video + every comment
- Extra value over Tier 2: ~5% (completeness only)
- Cost: ~$3-5 Gemini, needs paid tier or key rotation
- Use when: forensic-grade audit (e.g., investment due diligence on creator)

### Step 4 — User decides, system executes
User picks tier (1/2/3) OR custom N with selection rule. Never auto-run without explicit confirmation, never skip presenting Tier 2 as recommended default.

### Why this protocol exists
- Full sweep is the correct default scope (single-video analysis misses cross-video claim inconsistency, shill detection, narrative drift, engagement decay).
- BUT blind full-sweep wastes Gemini quota + founder time when Pareto distribution means top 10 videos typically capture 80%+ of audience signal.
- Power-law validated empirically: Tiến Thể Thao channel 2026-04-10 — top 5 of 128 videos = 67% of all 1,798 comments.
- User is solo founder with limited time — needs smart N, not exhaustive N.

### How to apply
Any channel URL or "analyze this creator" request via master_investments → first action = scrape inventory (yt-dlp --flat-playlist) → present the 3-tier question with exact numbers → wait for user decision → then execute selected tier.
