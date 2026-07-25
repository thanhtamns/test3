---
name: Transaction Layer V11 — Evidence-First Discovery + Simulation
description: V11 flips pipeline from MARKETS→EXECUTION to EVIDENCE→EXECUTION PATH→MARKET. Harvests real revenue proof, reverse-engineers paths, clusters archetypes, scores founder→revenue distance, simulates funnels.
type: project
---

**Status:** IMPLEMENTED (2026-04-05). All 7 phases complete, 7 new scripts + 5 new data files, 4 modified agents.

V11 = Eyes. V8=skeleton, V9=brain, V10=memory, V11=evidence-first discovery.

**6 Root Failures Fixed:**
1. MONO-PATTERN → 3-axis clustering enforces archetype diversity
2. SURFACE SEARCH → real revenue evidence from HN/Reddit/IH/Flippa/PH
3. CEILING≠FLOOR → simulation engine produces falsifiable month-by-month curves
4. NO COMPOUND ANALYSIS → 6-mechanism weighted compound scorer with time multiplier
5. STATIC INTELLIGENCE → evidence bank grows with each scan cycle
6. ZERO FOUNDER FIT → 10-dimension execution distance scorer against founder-profile.json

**7 Phases:**
1. **Evidence Scraper** — `evidence-scraper.py` (5 sources, revenue regex, credibility scoring, dedup). 27 records from initial scan.
2. **Path Extractor** — `path-extractor-runner.py` (LLM batch I/O, prompt templates, vn_executable logic)
3. **Pattern Clusterer** — `pattern-clusterer.py` (3-axis: distribution×leverage×compound, diversity enforcement)
4. **Execution Distance** — `execution-distance-scorer.py` (10 dimensions 0-3, total 0-30, auto-matches founder-profile.json)
5. **Compound Scorer** — `compound-scorer.py` (6 mechanisms weighted, time_multiplier, COPYABLE/DEFENSIBLE/MOATED/FORTRESS)
6. **Simulation Engine** — `acquisition-simulator.py` (5 channel models) + `trajectory-calculator.py` (churn-adjusted curves, 3 scenarios)
7. **Pipeline Integration** — Step -4 in orchestrator, Technique 12 in deep-reasoner, evidence-informed scanner, --evidence-mode flag

**New Scripts:** evidence-scraper.py, path-extractor-runner.py, pattern-clusterer.py, execution-distance-scorer.py, compound-scorer.py, acquisition-simulator.py, trajectory-calculator.py
**New Data:** evidence-bank.jsonl, evidence-paths.jsonl, evidence-patterns.json, founder-profile.json, channel-base-rates.json
**Modified:** transaction-orchestrator.md, deep-reasoner.md, money-mountain-scanner.md, pipeline-runner.py, SKILL.md (v9→v11)

**Why:** V8-V10 always produced "$49-99/mo vertical SaaS for underserved US trades" — correct market analysis but useless for solo founder in Vietnam. Pipeline started from markets, not evidence.
**How to apply:** Use `pipeline-runner.py --evidence-mode` to run evidence-first discovery before standard pipeline. Top archetypes inject as evidence_hypotheses[] into Step -1. Technique 12 gates GO verdicts with simulation math + execution distance + compound score.
