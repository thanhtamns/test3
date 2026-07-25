---
name: Ground Truth Intelligence V16
description: Learning from real decisions, not templates. Predictions calibrated from actual outcomes.
type: project
originSessionId: 33606302-2809-4afb-8c6e-c1645e6305fe
---
# Ground Truth Intelligence V16

## SHIPPED 2026-04-22

Transaction Layer upgraded from V15 → V16 with Ground Truth Learning + Adversarial Reasoning.

## Core Change

| Before (V15) | After (V16) |
|--------------|-------------|
| Template-based advice | Predictions from real outcomes |
| "Confidence: 0.92" (invented) | "Confidence: 0.1, INSUFFICIENT_DATA" (honest) |
| Same advice for all contexts | Learns from YOUR decision history |
| No learning loop | Bayesian update on every outcome |

## Files Added

```
D:/code/invesments/master_investments/.claude/skills/business/money-intelligence/
├── ground_truth/
│   ├── __init__.py
│   ├── schema.py          # Decision/Counterparty/Stakes/Timing/Outcome
│   ├── capture.py         # Record decisions + outcomes
│   └── predictor.py       # Learn predictions from history
├── ground-truth-cli.py            # CLI interface
├── ground-truth-session-check.py  # Session start alert hook
└── ground-truth-integration.md    # Usage docs
```

## Pipeline Integration

Step -7 (GROUND TRUTH) added before all other analysis:
1. Check data sufficiency (INSUFFICIENT < 30, LEARNING 30-99, CALIBRATED 100+)
2. If calibrated: use prediction as primary signal
3. If insufficient: flag output, offer to record decision
4. Always check pending outcomes

Step +1 (GROUND TRUTH CAPTURE) added after recommendation:
- Record decision with full context
- Set outcome_due_date
- Learning loop closes when outcome recorded

## Commands

```bash
# Capture
record    # Record decision
outcome   # Record outcome
pending   # Check overdue

# Learn
predict   # Predict from history
patterns  # Extract patterns
match     # Match against patterns

# Simulate
simulate  # Model negotiation (--strategy firm|flexible|aggressive)
respond   # Best response to their move

# Meta
stats     # Data sufficiency
export    # ML features
```

## Commits

1. `419a8b5c` — Core ground truth system (1503 LOC)
2. `c4db6510` — /truth skill access
3. `fdca587b` — Session check hook
4. `dfd8489d` — Adversarial reasoner

## Current State

- Decisions: 4
- With outcomes: 3
- Status: INSUFFICIENT (user data)
- Patterns extracted: 7 (from user data)
- Vicarious patterns: 26 (from external operators)

## Vicarious Knowledge Base (a82a1aff)

System bootstraps from external operator wisdom when user data is insufficient:

| Category | Patterns | Key Sources |
|----------|----------|-------------|
| Negotiation | 15 | Chris Voss FBI tactics, Harvard PON, body language |
| Cash Flow | 14 | Profit First, Uri Levine (Waze), presale, crisis |
| Pricing | 12 | Alex Hormozi $100M Offers, Tony Dinh, premium positioning |
| Network Position | 4 | Marc Rich (Iran-SA, OPM, floating storage) |
| Failure | 6 | CB Insights, Startup Genome, platform dependency |
| Timing | 2 | API launch windows, 5-year patience |
| Risk/Portfolio | 2 | 30-app portfolio, multi-product buffer |

**Total:** 55 patterns, 108 tags, 34 sources, 0.87 avg confidence

**Smart Context Matching:** Emotional words → Voss tactics, crisis words → speed patterns, offer words → Hormozi patterns

Key patterns with specific numbers:
- Hormozi 3x pricing (3x most expensive competitor, 32x cheapest)
- Value Equation: Value = (Dream Outcome × Likelihood) ÷ (Time × Effort)
- Client-financed acquisition: $600 program - $100 ads = $500 profit to reinvest
- 5-minute lead response rule
- Levine: Act within 30 days of crisis, maintain 12-18mo runway
- 70-75% of budget is people (cut there for impact)
- Voss: Mirroring, Labeling, Accusation Audit, Calibrated Questions
- Ackerman: 65% → 85% → 95% → 100% bargaining sequence

## /stage0 Integration (4686b0a4)

Step 3.4f added to stage0.md — vicarious knowledge fires ALWAYS:
- `vicarious-knowledge-runner.py` CLI for /stage0 integration
- Context-aware tag detection (emotions→Voss, pricing→Hormozi, crisis→speed)
- Auto-inject into ALL agent prompts as `## VICARIOUS_KNOWLEDGE`
- Brain Audit includes VICARIOUS layer status

## Next Milestone

27 more decisions with outcomes → LEARNING status → user data overrides vicarious
