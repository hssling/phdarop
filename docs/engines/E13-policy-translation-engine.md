# Engine 13 — Policy Translation Engine

Converts every analytic finding into the documents that actually move decisions, at every
tier of government. Each artifact is auto-generated from an analysis run ([E12](E12-software-factory.md)
`/report/brief`) and then human-curated.

## 1. Artifact ladder (audience → document)

| Audience | Document | Length | Core content |
|---|---|---|---|
| Minister / Secretary | **Ministerial note** | 1 page | The decision, the gain, the cost, the risk, the ask |
| Cabinet / Parliament | **Parliamentary briefing** | 2–3 pp | Problem, evidence, options, fiscal note, equity impact |
| Programme division | **Policy brief** | 4 pp | Evidence → recommendation → implementation → monitoring |
| State health dept | **State action plan** | 15–30 pp | District-level optimal allocation + rollout |
| District (CMHO) | **District action plan** | 8–12 pp | Facility-level plan, targets, responsibilities |
| Technical | **Annex** | n | Methods, assumptions, sensitivity, code links |

## 2. Standard recommendation block (every recommendation carries all six)

For each recommendation the engine emits:

1. **Evidence** — estimate + 95% CrI + identification strategy + evidence grade.
2. **Cost** — total + per-DALY + budget line + financing source.
3. **Benefit** — deaths/DALYs averted, equity gain, CHE reduction, with uncertainty.
4. **Implementation roadmap** — steps, owners, sequence, dependencies, timeline.
5. **Monitoring indicators** — leading + lagging, data source, cadence, target.
6. **Risk assessment** — top risks, likelihood/impact, mitigation, trigger thresholds.

## 3. Worked example (auto-generated from E09 + E02)

> **Ministerial Note — Need-Based Workforce Redistribution**
> **Decision:** Adopt the need-based posting algorithm for the next transfer cycle.
> **Evidence:** Reallocating existing staff cuts the population access deficit by ~40%
> (equity-weighted DALYs averted +41.7% at constant budget; LP optimum, MIP with equity floor
> within 1%; DE cross-check within 4.4%).
> **Cost:** ₹0 net (reallocation) + ₹[X] transition/incentive fund.
> **Benefit:** ~[Y] avoidable deaths/year averted; HEDI ↓; pro-poor.
> **Implementation:** publish need-atlas → union consultation → integrate into transfer
> counselling → quarterly re-optimization. **Owner:** State HFW + NHM HR cell.
> **Monitoring:** % facilities staffed-and-functional (monthly); travel-time-to-EmONC (qtr).
> **Risks:** union resistance (High/High → early negotiation, transparency, hardship
> incentives); posted≠functional (Med/High → functionality audit). **Ask:** approval +
> ₹[X] transition fund + data-sharing order for HRMIS.

## 4. Plan generation across tiers

- **National action plan** ← integrated allocation (P38, [E09](E09-optimization-engine.md)) +
  funding map ([Part 10](../10-funding-strategy.md)).
- **State action plan** ← state-level optimizer run + district atlas + financing formula (P26).
- **District action plan** ← facility-level assignment + monitoring dashboard.

All three are *the same optimization* rendered at different resolutions — internal consistency
guaranteed by construction (no contradictory plans across tiers).

## 5. Traceability (legitimacy requirement)

Every sentence in every brief links back to a computation run ID ([E12](E12-software-factory.md)
`/runs/{id}`) carrying the data snapshot, model version, assumptions, and sensitivity. This
makes recommendations **auditable and contestable** — the political precondition for evidence
to move money (Part 1 §1.4).

## 6. Equity & uncertainty are never dropped in translation

Two PHDA non-negotiables survive into the one-page note: (i) the **distributional** impact (who
gains), and (ii) the **uncertainty** (credible interval + probability the gain exceeds a
threshold). Ministers receive honest ranges, not false precision.
