# Part 5 — Advanced Analytical Toolkit

A compendium of every method PHDA deploys. For each: **theory · assumptions · data · strengths
· limitations · public-health application.** Method *selection* logic is in
[E05](engines/E05-analytical-framework.md); this Part is the reference manual.

## A. Epidemiology

### Decomposition analysis
- **Theory:** partition a change/difference in an outcome into contributions of components
  (Oaxaca-Blinder, Das Gupta, Arriaga life-table, Kitagawa rate decomposition).
- **Assumptions:** additive/multiplicative structure; components measured.
- **Data:** rates by component over time/place. **Strengths:** attributes change to drivers.
- **Limitations:** descriptive, path-dependent ordering. **Application:** what drove a fall in
  child mortality — coverage vs case-fatality vs demographics.

### Attributable fractions / burden estimation
- See [Part 4](04-attributable-burden.md). **Application:** PBI, risk-factor burden, gap burden.

## B. Biostatistics

### Multilevel / hierarchical models
- **Theory:** random effects model clustered data (patients in facilities in districts).
- **Assumptions:** correct level structure; distributional forms; exchangeability.
- **Data:** nested observations. **Strengths:** partial pooling, correct SEs, borrows strength.
- **Limitations:** convergence, mis-specified levels. **Application:** facility-adjusted outcomes,
  small-area estimation.

### Bayesian hierarchical models
- **Theory:** priors + likelihood → posterior; spatial priors (BYM2/CAR) for areal data.
- **Assumptions:** prior choice; conditional independence. **Strengths:** honest uncertainty,
  sparse-data stability, principled propagation into decisions. **Limitations:** compute, prior
  sensitivity. **Application:** the PHDA burden posterior that feeds every optimizer.

### Latent-variable models
- **Theory:** infer unobserved constructs (quality, governance) from indicators (SEM, IRT, factor).
- **Assumptions:** measurement model correct; local independence. **Strengths:** quantifies the
  unmeasurable. **Limitations:** identifiability, interpretation. **Application:** governance-gap
  and quality indices (P31, P33).

## C. Economics

### Cost-effectiveness analysis (CEA)
- **Theory:** ICER = ΔCost/ΔEffect vs threshold λ. **Assumptions:** comparator, time horizon,
  perspective, discounting. **Data:** costs, effects, transitions. **Strengths:** standardized,
  league tables. **Limitations:** ignores distribution, budget feasibility. **Application:**
  intervention screening before optimization.

### Extended CEA (ECEA)
- **Theory:** adds financial-risk protection and equity (by wealth group) to CEA.
- **Strengths:** captures CHE averted, pro-poor impact. **Application:** financing-formula and
  equity manuscripts (M9, P26, P34).

### Value of Statistical Life / human-capital
- **Theory:** monetize mortality via willingness-to-pay (VSL) or discounted future earnings (HC).
- **Assumptions:** wage/earnings data, discount rate, employment. **Limitations:** equity concerns
  of wage-based valuation. **Application:** attributable productivity loss (E06 §2), CBA.

## D. Operations Research

### Linear programming (LP)
- **Theory:** optimize linear objective over linear constraints; strong duality → shadow prices.
- **Assumptions:** linearity, divisibility, certainty. **Strengths:** fast, exact, interpretable
  duals (= value of relaxing a constraint). **Limitations:** no integrality, point parameters.
- **Application:** continuous budget/coverage allocation ([E09](engines/E09-optimization-engine.md)).

### Mixed-integer programming (MIP)
- **Theory:** LP + integer/binary variables (open/close, yes/no). **Strengths:** models lumpy
  real decisions and logical constraints (equity floors). **Limitations:** NP-hard, scaling.
- **Application:** facility opening, programme on/off, equity-floor allocation.

### Facility-location models
- **Theory:** p-median (min total distance), p-center (min max distance), set-cover, MCLP.
- **Application:** trauma centers (P15), labs (P36), HWCs (P30), referral hubs (P25).

### Queueing theory
- **Theory:** M/M/c and networks; Little's law; waiting/utilization. **Assumptions:** arrival/
  service distributions. **Application:** ambulance staging, OPD/ICU congestion, counsellor caseload.

### Network optimization
- **Theory:** min-cost flow, shortest path, max-flow, matching on graphs. **Application:** referral
  routing, supply chain, transmission-aware allocation.

## E. Artificial Intelligence / ML

### Explainable AI (XAI)
- **Theory:** SHAP/attention/surrogate models to interpret predictions. **Strengths:** trust,
  auditability (required for policy). **Limitations:** explanation ≠ cause. **Application:** risk
  stratification dashboards ministers can interrogate.

### Causal machine learning
- **Theory:** double/debiased ML, causal forests, TMLE — flexible nuisance models with valid
  effect inference via cross-fitting/orthogonalization. **Assumptions:** DAG, positivity,
  overlap. **Strengths:** heterogeneous effects at scale. **Application:** allocation effects,
  AMR attribution, heterogeneous intervention response.

### Reinforcement learning
- **Theory:** learn a policy maximizing long-run reward in an MDP. **Assumptions:** reward
  specification, exploration safety. **Strengths:** sequential/adaptive decisions. **Limitations:**
  sample-hungry, safety. **Application:** surge/anticipatory allocation, adaptive screening (offline
  RL on the digital twin, not live patients).

### Bayesian optimization
- **Theory:** surrogate (GP) + acquisition to optimize expensive black-box functions.
- **Application:** tuning the digital twin / simulator-based allocation where each evaluation is costly.

## F. Decision Science (MCDA)

All eight applied and compared in [E08](engines/E08-decision-analytics-engine.md):
**TOPSIS** (distance to ideal), **AHP** (pairwise eigenvector), **BWM** (best/worst anchored),
**ELECTRE** (concordance/discordance outranking), **PROMETHEE** (preference-flow outranking),
plus **VIKOR/TODIM/MACBETH**. Shared assumptions: criteria defined, weights elicited, scores
commensurable. Strength: explicit, auditable multi-criteria choice. Limitation: weight
subjectivity → always Monte-Carlo the weights.

## G. Systems Science

### System dynamics
- **Theory:** stocks, flows, feedback loops, delays (differential equations). **Strengths:**
  captures feedback/accumulation. **Limitations:** aggregate, calibration. **Application:**
  workforce attrition spirals, demand feedback, programme interactions.

### Agent-based modelling
- **Theory:** autonomous heterogeneous agents → emergent system behavior. **Strengths:** captures
  heterogeneity, access frictions, equity, emergence. **Limitations:** validation, compute.
- **Application:** referral congestion, inequity dynamics, outbreak response.

### Digital twins
- **Theory:** calibrated, coupled ABM+SD+network replica synchronized to data; see
  [E10](engines/E10-digital-twin.md). **Application:** ex-ante policy simulation; optimizer⇄twin loop.

### Complexity science
- **Theory:** nonlinearity, emergence, path dependence, networks, tipping points. **Application:**
  why linear planning fails; identify leverage points and resilience thresholds.

---

## Integration principle (what makes this a *toolkit*, not a list)

Methods share **parameters and uncertainty**: the Bayesian posterior (B) *is* the optimizer's
(D) input; the optimizer's shadow prices (D) *are* the value-of-information signals back to data
(C/EVPI); the digital twin (G) *corrects* the optimizer's static assumptions. The toolkit is
wired into one pipeline ([Part 7](07-decision-analytics-pipeline.md)), not used à la carte.
