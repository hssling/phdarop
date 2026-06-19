# Engine 5 — Analytical Framework & Method-Selection Decision Tree

How PHDA chooses among eight method families for each research objective, and why.

## 1. The eight families compared

| Family | Best for | Core assumption | Strength | Weakness |
|---|---|---|---|---|
| **Traditional epidemiology** | Burden, association, PAF | Correct exposure model; exchangeability for PAF | Interpretable, policy-legible | Confounding; static |
| **Bayesian statistics** | Small-area estimation, uncertainty, hierarchy | Prior + likelihood; exchangeability | Honest uncertainty, borrows strength | Prior sensitivity, compute |
| **Econometrics** | Causal effects from observational/natural experiments | Exogeneity / valid instrument / parallel trends | Credible identification | Strong, often untestable assumptions |
| **Machine learning** | Prediction, high-dimensional, nonlinearity | i.i.d.-ish; representative training data | Predictive power, automation | Opaque, non-causal by default |
| **Causal inference / causal ML** | Effects + heterogeneity at scale | DAG correct; positivity; (for DML) cross-fitting | Effects *and* flexibility | DAG mis-specification |
| **Network science** | Referral, transmission, spillover, contact | Network observed/inferable | Captures structure/flow | Data-hungry, dynamic networks hard |
| **Optimization** | Allocation, siting, scheduling | Objective + constraints specified; params known/estimated | Prescriptive, constraint-aware | GIGO on parameters; can over-trust point estimates |
| **Complex-systems science** | Feedback, emergence, scenarios (ABM/SD) | Mechanisms plausible | Captures dynamics/feedback | Hard to validate, identifiability |

## 2. Objective → method map

| Research objective | Best method | Alternatives | Why |
|---|---|---|---|
| Estimate district burden | Bayesian SAE (BYM2) | GBD downscaling, ML | Borrows strength + honest CI for sparse areas |
| Attribute burden to risk/gap | Causal ML (TMLE/DML) + PAF | G-computation, mediation | Effects with flexible adjustment + triangulation |
| Estimate intervention effect | Econometrics (DiD/IV/SCM) | RCT (if available), TMLE | Credible identification from routine data |
| Predict demand/risk surface | ML (gradient boosting/NN) | GLM, Bayesian | Pure prediction, nonlinearity |
| Allocate resources | Optimization (LP/MIP) | Greedy, RL | Prescriptive under constraints |
| Site facilities / route referrals | Network optimization | Heuristics | Structure-aware flow/location |
| Rank interventions/projects | MCDA (TOPSIS/AHP/BWM/PROMETHEE) | Cost-effectiveness league | Multi-criteria, stakeholder weights |
| Simulate policy/feedback | ABM / system dynamics (digital twin) | Markov, microsim | Captures feedback, scenarios |
| Decide what data to buy | Value of Information (EVPI/EVPPI) | Expert judgment | Decision-relevant data prioritization |
| Value health vs cost | CEA / ECEA + VSL/human capital | CBA | Standardized, equity-extendable |

## 3. Method-selection decision tree

```
Q1. Is the goal a DECISION/ALLOCATION (vs an estimate)?
    ├─ YES → Q2. Discrete siting / integer choices?
    │         ├─ YES → MIP / facility-location / network optimization
    │         └─ NO  → LP / multi-objective / Bayesian optimization
    │         (always: propagate parameter posteriors → stochastic/robust variant)
    └─ NO  → Q3. Is the goal CAUSAL (effect of X on Y)?
              ├─ YES → Q4. Experimental/natural-experiment leverage?
              │         ├─ YES → DiD / IV / RDD / synthetic control
              │         └─ NO  → Q5. Many confounders / nonlinearity?
              │                   ├─ YES → DML / TMLE (causal ML) + DAG
              │                   └─ NO  → g-computation / PAF / mediation
              └─ NO  → Q6. Is the goal PREDICTION or DESCRIPTION?
                        ├─ PREDICTION → ML (boosting/NN) + calibration; Bayesian if CI needed
                        └─ DESCRIPTION/BURDEN → Bayesian SAE; network metrics if relational;
                                                 ABM/SD if feedback/emergence matters
```

**Cross-cutting rule (PHDA discipline):** every causal estimate must survive ≥2 identification
strategies (triangulation, §1.4 of Part 1); every optimization must carry the burden posterior
(no point-estimate optimization); every recommendation must report a VoI statement.

## 4. Why each method earns its place (one line each)

- **Bayesian** — the only honest way to move budgets under sparse data.
- **Econometrics** — credibility revolution: identification before flexibility.
- **Causal ML** — flexibility *after* identification, at scale, with heterogeneity.
- **Optimization** — turns estimates into actions under real constraints.
- **Network science** — health systems are graphs (referrals, contacts, supply).
- **MCDA** — decisions are multi-objective and political; make weights explicit.
- **Complex systems** — feedback and emergence break linear planning; simulate first.
- **Traditional epi** — the legible backbone everyone, including ministers, can read.

This framework governs method choice in every engine: attribution ([E06](E06-attributable-burden-engine.md)),
solution scoring ([E07](E07-solution-discovery-engine.md)), MCDA ([E08](E08-decision-analytics-engine.md)),
optimization ([E09](E09-optimization-engine.md)), and the twin ([E10](E10-digital-twin.md)).
