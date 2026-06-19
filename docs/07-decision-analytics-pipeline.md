# Part 7 — Decision Analytics Pipeline

The end-to-end, 11-stage pipeline that turns data into an implemented, re-measured decision.
Each stage names its engine and its output.

## 1. The pipeline

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 1. PROBLEM IDENTIFICATION        gap indices (Part 3) flag where burden is     │
│    output: prioritized problem    avoidable & misallocated      [E01, Part 3]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ 2. CONTRIBUTOR ANALYSIS          causal DAG + decomposition: what drives it    │
│    output: ranked contributors                                  [E02, E05]     │
├──────────────────────────────────────────────────────────────────────────────┤
│ 3. ATTRIBUTABLE BURDEN           PAF/CFA/causal-ML → Δ posterior               │
│    output: avoidable burden Δ ±CI                               [E06, Part 4]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ 4. INTERVENTION IDENTIFICATION   solution discovery → candidate set            │
│    output: scored intervention repository                       [E07]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ 5. EVIDENCE SYNTHESIS            effectiveness, cost, equity, feasibility       │
│    output: parameterized options with uncertainty               [E07, Part 5]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ 6. MULTI-CRITERIA DECISION       8-method MCDA → robust ranking                │
│    output: method-robust shortlist                              [E08]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ 7. OPTIMIZATION                  LP/MIP/multi-obj under constraints+uncertainty │
│    output: allocation x*, frontier, shadow prices               [E09, Part 6]  │
├──────────────────────────────────────────────────────────────────────────────┤
│ 8. POLICY RECOMMENDATION         translate to tiered briefs w/ evidence-cost-   │
│    output: ministerial/state/district plans   risk-monitoring   [E13]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ 9. (pre-decision) SIMULATION     digital twin stress-test of x*                 │
│    output: dynamic-robust allocation + failure modes            [E10]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ 10. IMPLEMENTATION MONITORING    track coverage, fidelity κ, realized Δ         │
│    output: live dashboard, drift alerts                         [E12]          │
├──────────────────────────────────────────────────────────────────────────────┤
│ 11. IMPACT EVALUATION            DiD/synthetic-control on realized outcomes      │
│    output: measured deaths/DALYs averted vs counterfactual      [E06, Part 4]  │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │  feedback: updated Δ, κ, costs → Stage 1
                                ▼   (learning health system — re-optimize each cycle)
```

## 2. Value-of-Information gate (between stages 6 and 7)

Before committing to optimization, compute **EVPI/EVPPI**: if the expected value of resolving
uncertainty exceeds the cost of more data *and* would change the decision, **collect data
first**; otherwise **decide now**. This prevents both premature decisions and analysis
paralysis — a defining PHDA discipline (Part 1 §1.4).

## 3. Stage gates (quality control)

| Gate | Pass criterion |
|---|---|
| After 3 | Causal estimate survives ≥2 identification strategies (triangulation) |
| After 5 | Every parameter has an uncertainty distribution (no point estimates) |
| After 7 | Allocation reported with stability across posterior draws |
| After 9 | Twin reveals no catastrophic congestion/feedback failure |
| After 11 | Realized vs predicted Δ reconciled; model updated |

## 4. Roles across the pipeline

Epidemiologist/biostatistician (1–3,11) · economist (5) · decision scientist (6) · OR/optimization
scientist (7,9) · implementation scientist + policy analyst (8,10) · software/AI (all, via platform).
The pipeline is the org chart in motion ([E14](engines/E14-research-centre-blueprint.md)).

## 5. Why a pipeline (not a project)

The pipeline is **standing infrastructure**: once built for the first flagship, every
subsequent problem flows through the same stages, engines, and code. Marginal analyses get
cheaper and faster — the compounding return that justifies a Centre, not a one-off study.
