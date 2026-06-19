# Part 4 — Attributable Burden Analytics

Formal methodology to estimate attributable deaths, DALYs, costs, catastrophic expenditure,
and productivity losses. This Part is the *specification*; the *engine* (workflow, novel CFA
method, code-ready formulas) is [E06](engines/E06-attributable-burden-engine.md). Here we give the
method theory, the counterfactual taxonomy, and the uncertainty doctrine.

## 1. Counterfactual taxonomy (choose and declare one)

| Counterfactual $B^{*}$ | Meaning | Best for |
|---|---|---|
| **Theoretical minimum (TMREL)** | Biological/zero-exposure | Risk-factor burden (GBD-style) |
| **Policy target** | Stated programme goal | PPGI / accountability |
| **Peer frontier (CFA)** | Achievable given context | Allocation decisions (PHDA default) |
| **Status-quo + intervention** | Counterfactual scale-up | CEA / optimization $\Delta$ |

PHDA's preferred operational counterfactual is the **context-adjusted peer frontier (CFA)** —
it yields the *achievable* avoidable burden, the directly actionable target.

## 2. Estimands and estimators

| Estimand | Estimator | Identification |
|---|---|---|
| Attributable deaths/DALYs | PAF × burden; CRA integral | exchangeability / no unmeasured confounding |
| Effect of a gap (causal) | g-computation, TMLE, DML | DAG + positivity |
| Pathway share | causal mediation (NDE/NIE) | sequential ignorability |
| Policy-attributable burden | synthetic control, DiD | parallel trends / donor pool |
| Attributable cost / CHE / productivity | PAF × economic burden; human-capital | as above + valuation assumptions |

## 3. Method theory (one paragraph each)

- **PAF / comparative risk assessment:** the share of burden removed if exposure shifts to the
  counterfactual distribution; categorical or integral form (E06 §2). Assumes causal RR and
  correct counterfactual; sensitive to confounding and reverse causation.
- **Counterfactual modelling:** simulate burden under $P'(x)$; the difference is avoidable. Handles
  continuous exposures and partial shifts (realistic, not just elimination).
- **Bayesian methods:** put priors on prevalence, RR, and burden; obtain a *posterior* over every
  attributable quantity — the only honest representation for budget-moving outputs.
- **G-computation:** standardizes over the confounder distribution under a hypothetical exposure
  rule; handles time-varying confounding (cascades, sequential care).
- **Causal mediation:** decomposes total attributable burden into direct and pathway-specific
  (e.g., how much TB death is *via* diagnostic delay vs *via* treatment loss) — locates the lever.
- **Synthetic controls:** build a weighted "donor" counterfactual for a unit that adopted a
  policy; the post-policy gap is the policy-attributable burden — triangulates PAF/CFA.

## 4. Novel method

**Counterfactual-Frontier Attribution (CFA)** — full derivation in [E06 §4](engines/E06-attributable-burden-engine.md).
Defines $B^{*}$ as the covariate-conditional achievable frontier via Bayesian stochastic-frontier
/ conditional-quantile regression, yielding the *achievable* avoidable burden $\Delta^{\text{CFA}}$.
This is PHDA's principal methodological contribution to burden science.

## 5. Uncertainty doctrine (non-negotiable)

1. **Full-posterior Monte-Carlo**, not delta-method, for all attributable metrics.
2. **Correlated draws** preserved across prevalence/RR/burden by geography.
3. **Structural uncertainty** via multi-method ensemble (PAF vs CFA vs synthetic control).
4. **Report**: posterior mean, 95% CrI, and P(attributable burden > policy threshold).
5. **GATHER-compliant** reporting of all inputs, models, and uncertainty.

## 6. Outputs feeding the chain

Attributable-burden posteriors ($\Delta_{ij}$) → the optimizer's objective ([E09](engines/E09-optimization-engine.md)),
the Preventable Burden Index ([Part 3 §5](03-policy-practice-gaps.md)), and the attributable-cost
manuscripts (M3/M7/M9). This Part closes the **Attribution** link of the burden→decision chain.
