# Coffee Export V8 — Agent/Broker Model Analysis (260207-0913/0928)

## Reports
- V8 Analysis: `plans/reports/advanced-stats-260207-0928-coffee-export-v8-analysis.md`
- V8 Python: `plans/reports/coffee-export-v8-monte-carlo-bayesian-kelly-simulation.py` (1005 lines)
- V8 JSON: `plans/reports/coffee-export-v8-simulation-output.json` (~13,600 lines)
- BD Challenge: `plans/reports/bullshit-detector-260207-0913-coffee-v8-challenge.md` (448 lines)
- Research: `plans/reports/researcher-260207-0913-coffee-v8-{market-data,b2b-funnel-benchmarks,compliance-costs}.md`

## Agents: 3 researchers + 1 financial-modeler + 1 bullshit-detector = 5 agents, 1.79M MC iterations

## VERDICT: CONDITIONAL GO — $200 max capital (BD-adjusted down from FM's $500)

## Key Results
| Metric | V6 | V7 | V8 Base ($500) | V8 BD-Adjusted |
|--------|----|----|----------------|----------------|
| Business Model | Direct export | Direct export | Agent/broker | Agent/broker |
| Kelly | -1.0 | -1.0 | -0.017 | -0.017 (confirmed) |
| P(profit) | 0% | 0% | 11.1% | 11.1% |
| EV | -$961 | -$4,618 | -$72 | -$72 |
| Compliance gate | Not modeled | $2,854 HARD FAIL | $0 (bypassed) | $0 (bypassed) |
| 12mo median | -$1K | -$5K | -$900 | -$900 |
| Viable scenarios | 0/27 | 0/48 | 47/75 | **15-20/75** (BD) |

## BD Critical Findings (7 flaws, 7 death modes)
1. **Trade show 50x multiplier = FABRICATED.** Should bypass S1-S4, not multiply whole funnel. Real EV: -$800 vs model's $3,761
2. **47/75 viable = definition game.** P-weighted realistic: 15-20 scenarios. Most require boom + expert (P<20%)
3. **Capital DESTROYS value at fixed contacts.** $200→Kelly+0.028, $500→-0.017, $5K→-0.123, $15K→-0.350. The $15K Kelly+0.478 headline is PURE contact bundling artifact
4. **Base case FAILS convergence.** 3% relative change at 50K iterations (threshold 1%). Need 100K+
5. **Static cashflow funnel.** Month 1 = Month 12 in model, but reality: zero reputation early → lower conversion
6. **Commission top-of-range.** Model uses 3-7% uniform; robusta commodity = 2-4% real
7. **"Zero COGS" ignores real costs.** Travel, phone, samples = $500-2K/yr

## Death Modes
1. Commodity Transparency Kill (60%) — robusta traded on ICE, buyer can see price
2. Disintermediation Cliff (55%) — Order 2 goes direct, zero switching cost
3. Ghost Market (50%) — ZERO US roasters documented importing VN arabica, robusta buyers have procurement depts
4. Cold Email Extinction (40%) — reply rates declining 15% YoY, V8's 7% already above 2025 average
5. 2,000-Roaster Ceiling (45%) — $15K tier = 100% TAM exhaustion, no second act
6. Payment Delay Cash Crunch (35%) — NET60-120, $500 budget bankrupt by Month 7
7. Zero Reference Class (N/A) — structural uncertainty, all estimates extrapolated

## Claims: 0 VALID, 4 PLAUSIBLE, 5 EXAGGERATED, 1 BULLSHIT

## What V8 Got Right
- Gaussian copula correlated funnel (1.07x vs independent)
- Injected multipliers INSIDE MC (not post-hoc like V6/V7)
- Convergence diagnostics (honest about failure)
- Month-by-month cashflow with payment delays (reveals median -$900)
- Compliance gate properly models agent bypass
- Bayesian sequential update framework ready for real data

## BD Verdict
- **Max capital: $200** (not $500). Model's own sensitivity proves this
- **Correct framing: $200 lottery ticket** with 22% chance of $2,500-$5,000 payout
- 5 validation tests ($90+40hrs) BEFORE spending: exporter visits, 50-email pilot, commission check, TAM validation, exclusivity test

## Lessons
- V8 is BETTER MODEL applied to SAME DEAD MARKET
- Zero reference class persists across V1-V8. Market hasn't changed, only models get smarter
- Each version introduces 1 optimistic assumption that next version invalidates (iteration optimism bias)
- Mean vs median reporting: $290 mean vs -$900 median. ALWAYS report median for right-skewed distributions
- Code flaw: `model_type='agent' if not can_export else 'agent'` — dead branch, always agent
- Code flaw: revenue applies market_mult TWICE (customers × revenue per customer) — boom scenarios overstated 1.5-2x
- Bootstrap Kelly CI uses n=len(outcomes) not len(boot_sample) — underestimates CI width 10-20%
