---
name: LLM Agent Business Expertise Methods
description: Ranked approaches for injecting real-world business pattern recognition into LLM agents beyond generic RAG
type: reference
---

## Core Finding: 6 Methods Ranked by (Feasibility × Impact)

### Top 3 Implementable Methods (Solo Developer)

**1. GraphRAG: 72/100 score**
- 3x accuracy improvement (verified: Data.world, LinkedIn, Microsoft)
- 26-97% fewer tokens vs. alternatives
- Open-source: Microsoft/graphrag, AWS GraphRAG Toolkit, LightRAG
- Time: 3-4 weeks, Low cost
- Why: Retrieves connected entity relationships instead of text chunks
- Resource: [GraphRAG vs RAG Paper](https://arxiv.org/abs/2502.11371)

**2. Experience Replay: 63/100 score**
- Agent learns from own outcomes (successful decisions stored, replayed)
- 40% performance improvement with <10% external data
- Time: 2-3 weeks (Phase 1), or 6-8 weeks (full RL loop)
- Why: Turns execution data into pattern library
- Frameworks: RLEP, DreamGym, AgentRR
- Resource: [RLEP Paper](https://arxiv.org/abs/2507.07451), [Experience Synthesis](https://arxiv.org/pdf/2511.03773)

**3. Few-Shot CoT + Failure Database: 54+63 = 117 combined**
- Few-shot: Curate 5-10 real business case studies, cache as prefix, reuse
- Failure DB: CB Insights (483 post-mortems), Kaggle dataset available
- Time: 1 week total, Cost: $0
- Why: Example-based reasoning > rule-based, real data > generic heuristics
- Resource: [Few-Shot CoT Guide](https://learnprompting.org/docs/intermediate/chain_of_thought), [CB Insights 483 Post-Mortems](https://www.cbinsights.com/research/startup-failure-post-mortem/)

### Critical Infrastructure (Not Recommended for Phase 1)

**Real-Time Market Data: 40/100 score**
- High impact (8/10) but infrastructure-heavy (6-8 weeks)
- Reference: [TradingAgents Framework](https://arxiv.org/pdf/2412.20138)
- Defer until agent needs current data

**Multi-Agent Distillation: 48/100 score**
- High impact (8/10) but requires 3-5x API calls, training infrastructure (6-8 weeks)
- Reference: [MAGDi Paper](https://arxiv.org/html/2402.01620v2)
- Skip until single-agent accuracy plateaus

## Recommended 3-Phase Implementation

**Phase 1 (Weeks 1-3): Quick Expertise Injection**
- Few-Shot CoT: Curate business examples + cache
- Failure Database: Normalize CB Insights dataset, build lookup
- Basic Logging: Start recording agent decisions + outcomes
- Output: Agent cites real examples, failure patterns, reasons through scenarios

**Phase 2 (Weeks 4-7): Knowledge Graph**
- Entity extraction from documents (LLM-based)
- Graph storage (Neo4j Community, free)
- Multi-hop retrieval replacing text chunks
- Output: 3x accuracy, 26-97% token savings

**Phase 3 (Weeks 8-10): Experience Learning**
- Collect 50-100 decision+outcome pairs in replay buffer
- Sample past successes when making similar decisions
- Continuous refinement based on outcomes
- Output: Agent becomes smarter over time

## Key Data Sources

**Failure Patterns:**
- CB Insights: 483 post-mortems, 9 primary failure reasons coded
- Top reasons: No market need (42%), ran out of capital (29%), wrong team (20%)
- Alternative: Autopsy (getautopsy.com), 300+ post-mortems

**Few-Shot Examples:**
- Template: context → reasoning steps → decision → outcome → learning
- Quantity: 5-10 examples (cached as static prefix)
- Cost optimization: Prompt caching (90% discount on reads)

**Graph Entities (for GraphRAG):**
- Companies, Founders, Markets, Funding, Outcomes, Relationships
- Scale: 1000-5000 entities manageable for solo developer
- Storage: Neo4j Community (free)

## Cost & Timeline

**Total 3-month investment:**
- One-time: $0 (open-source tools)
- Monthly: $250-600 (LLM API calls only)
- Achievable scope: 100+ agents/day, 1000-5000 entity graph

**Time investment:**
- Phase 1: 3 weeks (40-50 hours)
- Phase 2: 3-4 weeks (60-80 hours)
- Phase 3: 2-3 weeks (30-50 hours)

## Verification Points

**GraphRAG accuracy:** 3x improvement documented in:
- Data.world benchmark (43 business questions)
- LinkedIn case (40 hrs → 15 hrs ticket resolution)
- Microsoft paper (26-97% fewer tokens)

**Experience synthesis:** 40% improvement documented in:
- DreamGym framework paper
- RLEP results on reasoning tasks

**Few-shot + caching:** 60% cost reduction documented in:
- Thomson Reuters Labs
- Amazon Bedrock case studies

## Next Steps If Implementing

1. Download CB Insights dataset (Kaggle)
2. Design GraphRAG entity schema for your domain
3. Curate 5-10 business case studies (real, documented outcomes)
4. Set up Neo4j Community instance
5. Implement basic entity extraction pipeline
6. Start logging agent decisions for Phase 3

## See Also

- Full research report: `researcher-260319-2156-llm-agent-business-expertise.md`
- Papers: GraphRAG, RLEP, DreamGym, MAGDi (all arxiv.org)
- Tools: Microsoft/graphrag (GitHub), Kaggle startup dataset
