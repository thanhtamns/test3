# Patterns & Lessons (Extracted from MEMORY.md)

## General Analysis Patterns
- When deploying 5+ parallel statistical agents, wait for ALL before synthesizing — late notifications arrive after synthesis starts
- probability-synthesizer resolves cross-model tensions by aligning definitions first (the 62pp range was definitional, not methodological)
- Bayesian LR for zero-capital needs reference class correction for micro-ventures ($20 seed ≠ $50K startup)
- Always check if plan confuses DTC (prepay by design) with B2B (trust ladder needed)
- Plan "base case" revenue projections are often 75th percentile, not median — flag this
- Original kill criteria in business plans are almost always too lenient — simulation-derived thresholds are 2-4x tighter
- 100x+ model disagreements are usually DEFINITIONAL not methodological — align definitions FIRST
- Bayesian sequential LR can double-count related evidence — flag when LRs share causal pathway

## COGS & Shipping
- **CRITICAL:** Always validate COGS with REAL supplier quotes before modeling revenue. Plan COGS almost always optimistic (50-100% underestimate for physical products w/ intl shipping)
- Shipping cost dominates unit economics for lightweight DTC products shipped internationally — rank #1 in tornado analysis
- Kelly going NEGATIVE = absolute DO NOT INVEST signal, regardless of "potential"

## Pricing & Offer Design
- Hormozi fix: when COGS trap makes commodity pricing impossible, restructure VEHICLE not price (bags→drip bags, singles→bundles)
- Category-of-one naming prevents price comparison: "Da Lat Discovery Set" ≠ "$12 Amazon bag"
- **CATEGORY-OF-ONE:** "Nha May Khong Dung" (Zero-Stop Factory) prevents price comparison. Sell outcome, name uniquely, guarantee result
- Outcome-based pricing sidesteps hourly rate comparison entirely
- Plans always use Upwork/international rates. Local Vietnamese rates are 30-60% lower

## Agent Combinations
- 4-agent parallel (FinModel+Bayesian+Hormozi+RiskQ) = ideal combo for pricing/sales crisis
- 3-agent parallel (FM + BD + PO) is ideal for zero-capital models
- 6-agent combo (CD + RV + Researcher + FM + BD + Hormozi) = ideal for service business startup analysis

## Plan Validation
- **CRITICAL:** Always validate DTC vs B2B preference with founder BEFORE building execution plan
- **CRITICAL:** LLM synthesis agents make arithmetic errors on multi-factor products. ALWAYS verify compound probability manually
- **CRITICAL:** Bayesian likelihood ratios are EXPERT GUESSES — cross-validate against industry benchmark data
- **CRITICAL:** Always verify market data currency. Commodity prices can shift 20-30% in months
- B2B cold email benchmarks (2026): avg 3-5% reply, top quartile 5-10%, best-in-class 15-25%
- Plan validation interview (3-8 questions) catches fundamental model mismatches that save entire plan rewrites

## V5 Lessons
- 25-agent rigorous analysis > iterative plan tweaks. Compute ALL scenarios before advisory agents
- bullshit-detector FIRST, advisory LAST. Contrarian agents should gate advisory to prevent optimism bias
- Zero reference class = automatic flag. If no one has done X with Y constraints, base rate is unknowable
- 12/12 agent consensus on NO-GO is rare and definitive
- Reusable Python framework = $0 marginal cost for future ventures
- Pre-mortem stories (8 failure modes with P%) more actionable than abstract risk lists

## Industrial Refurb Lessons
- Brokerage model at 8% commission + 1.69% win rate = NEGATIVE Kelly. Need >4.5% win rate OR >$10K deal size
- FDI companies get duty exemptions → buy NEW, not refurb
- A→B→C staged model = fantasy. Compound transition P = 2-4.5%. Each stage is a different business
- Working capital trap in parts business — 90-day cycle needs $38K WC on $22.5K capital

## V7 Lessons
- ALWAYS model compliance/regulatory costs BEFORE revenue. Compliance is a HARD GATE, not a variable
- Research-first > model-first. Parallel researchers find hard kills that MC can't discover
- When decomposing funnels, SEPARATE combined stages. Each sub-stage reveals hidden drop-off
- Previous "validated" pivots can be invalidated by research

## V8 Lessons (Sourcing Agent)
- Monte Carlo can DECOUPLE from Bayesian funnel — always verify MC inputs match funnel output
- Commission-only agent models die on DEMAND + RETENTION, not COGS + COMPLIANCE
- "Retention" in B2B food measures PRODUCT repurchase, not AGENT retention (zero switching cost = 20-40%)
- When FM and PO disagree >5x on Kelly, trust PO (funnel-consistent) over FM
- Cold email alone NEVER sufficient for B2B commodity sourcing. Need multi-channel
- Agent→Own Export transition = same "A→B fantasy" as Industrial Refurb

## V8 Deep Analysis Lessons (260207-0913)
- Trade show multipliers applied to WHOLE funnel = fabricated. Should bypass early stages only
- "N/M viable scenarios" is a definition game without probability weighting. Always report P-weighted count
- Capital bundled with contacts creates fake Kelly correlation. Isolate variables to test capital utility
- Mean vs median for right-skewed: ALWAYS report median. Mean $290 vs median -$900 is misleading
- Iteration optimism bias: each version introduces 1 new assumption to make model work. Market hasn't changed
- Convergence diagnostics: base case needs 100K+ iterations when expected customers <0.5
- Code: revenue applying market_mult TWICE (customers × revenue/customer) → boom overstated 1.5-2x
- Code: bootstrap Kelly CI uses n=len(outcomes) not len(boot_sample) → underestimates CI width 10-20%
- Robusta agent commission reality: 2-4% (not 3-7%). Commodity with transparent ICE/LIFFE pricing

## Service Business Lessons
- Direct service (sell labor) has 10-20x better Kelly than commission/brokerage
- Service businesses have NO compliance gate, NO inventory trap, NO working capital cycle
- Free diagnostic = most aggressive sales weapon for zero-track-record businesses (300-600x asymmetry)
- Factory visits convert 10x better than digital outreach in Vietnam B2B
- FM consistently produces 75th percentile projections. BD-adjusted = 30-50% lower but still positive
