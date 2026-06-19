# Methods (web app)

The app's engines are faithful TypeScript ports of the research engines (`code/*.py`,
`docs/engines/`). This page documents what each computes and its assumptions. For full theory
see [docs/05-analytical-toolkit.md](05-analytical-toolkit.md).

## 1. MCDA — `lib/phda/mcda.ts`
- **AHP / BWM**: criterion weights → min–max-normalised weighted sum.
- **TOPSIS**: vector normalisation → closeness to ideal/anti-ideal.
- **PROMETHEE II**: net outranking flow with linear preference functions (std-dev thresholds).
- **Consensus**: mean rank across methods; **agreement** = mean pairwise Spearman (≈1 ⇒ robust).
- *Assumptions*: criteria are benefit-oriented and commensurable; weights elicited. Weight
  sensitivity should be checked (the research engine does Monte-Carlo perturbation).

## 2. Optimization — `lib/phda/optimization.ts`
- Maximises **equity-weighted avoidable DALYs averted** s.t. **budget** and **workforce**
  ceilings, `x ∈ [0,1]`, using a real LP solver (`javascript-lp-solver`).
- **Status quo** = inertial equal-coverage spread scaled to the binding constraint.
- **Value of Analytics** = % more equity-weighted DALYs vs status quo at equal budget.
- **Allocation Inefficiency Index** = `1 − statusQuo/optimum`.
- **Efficiency–equity frontier**: ε-constraint on a pro-poor coverage floor.
- **Stability**: 60-draw Monte-Carlo perturbation of `Δ` (±15%) → fraction each cell stays funded.
- *Assumptions*: point parameters in this view; production propagates the Bayesian posterior
  (stochastic/robust optimization) and supports MILP for lumpy decisions.

## 3. Attributable burden — `lib/phda/attribution.ts`
- **PAF** (categorical) per risk factor; **joint PAF** via the multiplicative complement.
- Attributable **deaths, YLL, YLD, DALY, cost** = PAF × burden.
- *Assumptions*: causal relative risks, no unmeasured confounding. Triangulate with causal-ML
  / counterfactual methods (see [E06](engines/E06-attributable-burden-engine.md)).

## 4. Gap indices — `lib/phda/indices.ts`
- **PPGI** weighted truncated shortfall; **IFI** = 1 − Π(cascade retentions) (+ bottleneck);
  **AII** = 1 − achieved/optimal; **RMI** = index of dissimilarity (resource vs need shares);
  **PBI** = avoidable/total; **HEDI** = population-weighted excess over best-off stratum.
- All normalised to [0,1]; the **binding gap** is the max.

## Validity & reproducibility
- Engines are pure functions → deterministic and unit-testable.
- The TS optimization reproduces the Python engine's headline (+~41.7% at constant budget,
  AII ≈ 0.29) on the shared default scenario.
- The AI layer never produces numbers; it only routes the question and writes prose grounded
  on computed facts.
