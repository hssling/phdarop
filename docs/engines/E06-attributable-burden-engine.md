# Engine 6 — Attributable Burden Engine

A unified framework to estimate attributable **deaths, DALYs, YLL, YLD, costs, and
productivity losses** from any risk factor, care gap, or policy failure — with formulas,
a computational workflow, and uncertainty propagation. This is the quantitative heart of
Part 4 and feeds the optimizer's $\Delta$ term.

## 1. The six attribution methods and when each applies

| Method | Estimand | Use when |
|---|---|---|
| **PAF** | Fraction of burden removable if exposure → counterfactual | Exposure prevalence + RR available |
| **Counterfactual (comparative risk assessment)** | Burden under alternative exposure distribution | Continuous exposure, TMREL defined |
| **Bayesian hierarchical** | Posterior of attributable burden with CI | Sparse small-area data |
| **G-computation** | Effect of setting exposure/coverage to a value | Time-varying confounding, longitudinal |
| **Causal mediation** | Direct vs indirect (pathway) attribution | Mechanism decomposition needed |
| **Synthetic control** | Counterfactual trajectory of a unit post-policy | Policy/natural experiment, one/few units |

## 2. Core formulas

**Population Attributable Fraction (categorical):**
$$
\mathrm{PAF} = \frac{\sum_k p_k(\mathrm{RR}_k - 1)}{1 + \sum_k p_k(\mathrm{RR}_k - 1)}
$$

**Continuous exposure (CRA, against TMREL $x_0$):**
$$
\mathrm{PAF} = \frac{\int \mathrm{RR}(x)\,P(x)\,dx - \int \mathrm{RR}(x)\,P'(x)\,dx}{\int \mathrm{RR}(x)\,P(x)\,dx}
$$
where $P'$ is the counterfactual exposure distribution (e.g., everyone at TMREL).

**Attributable burden** (apply PAF to any burden metric):
$$
\text{Att}_{\bullet} = \mathrm{PAF}\times B_{\bullet},\quad \bullet\in\{\text{Deaths, YLL, YLD, DALY}\}
$$
with $\text{YLL}=\sum \text{deaths}\times \text{SLE}_{\text{age}}$, $\text{YLD}=\sum \text{prevalence}\times \text{DW}$, $\text{DALY}=\text{YLL}+\text{YLD}$.

**Attributable cost:**
$$
\text{Att Cost} = \mathrm{PAF}\times\big(C_{\text{direct}} + C_{\text{indirect}}\big)
$$

**Attributable productivity loss (human-capital):**
$$
\text{PL} = \sum_{\text{deaths }a} \mathrm{PAF}\sum_{t=a}^{R}\frac{w_t\,e_t\,\pi_t}{(1+\delta)^{t-a}}
$$
($w$=wage, $e$=employment prob, $\pi$=survival, $R$=retirement, $\delta$=discount).

**Attributable catastrophic expenditure:**
$$
\text{Att CHE} = \mathrm{PAF}\times \Pr\!\big(\text{OOP}/\text{capacity-to-pay} > 0.4\big)\times \text{households}
$$

## 3. Mediation decomposition (care-cascade example)

For a gap acting through a mediator $M$ (e.g., diagnostic delay → treatment delay → death):
$$
\text{Total} = \underbrace{\text{NDE}}_{\text{direct}} + \underbrace{\text{NIE}}_{\text{via }M}
,\qquad
\eta_{\text{mediated}} = \frac{\text{NIE}}{\text{Total}}
$$
estimated by g-computation with sequential regression (natural direct/indirect effects).

## 4. Novel method (PHDA contribution): Counterfactual-Frontier Attribution (CFA)

Existing PAF answers "what if exposure were ideal?" but not "what if *this system* performed
like the *achievable frontier*?" CFA defines the counterfactual as the data-driven efficiency
frontier of comparable units:

$$
\Delta^{\text{CFA}}_{i} = B_i - \hat B^{\text{frontier}}_{i},\qquad
\hat B^{\text{frontier}}_i = \min_{j\in \text{peers}(i)}\; \mathbb{E}[B \mid \mathbf{Z}_i, \text{coverage}_j]
$$

estimated via Bayesian stochastic-frontier or conditional quantile regression on covariates
$\mathbf{Z}$ (so the frontier is *fair* — adjusted for context, not raw best). This yields the
**achievable avoidable burden** — what *this* district could reach with peer-level performance,
the directly actionable target for the optimizer. CFA is PHDA's answer to the contestability
of biological counterfactuals (Part 1 §1.9).

## 5. Computational workflow

```
1. Assemble exposure/coverage P(x), RR(x), burden B  ──► MADB (E04)
2. Fit Bayesian hierarchical exposure & RR models (partial pooling across geo)
3. Draw S posterior samples θ_s = {p_k, RR_k, B}_s
4. For each s: compute PAF_s (or CFA Δ_s), Att_{deaths,YLL,YLD,DALY,cost,PL}_s
5. Summarize: posterior mean + 95% credible interval for every attributable metric
6. Mediation: g-computation per sample → NDE_s, NIE_s, η_s
7. Triangulate: compare PAF vs CFA vs synthetic-control where policy variation exists
8. Export Δ posteriors → optimizer (E09) and dashboard (E12)
```

## 6. Uncertainty propagation

- **Monte-Carlo over the full posterior** (not delta-method) — every downstream attributable
  metric inherits the joint uncertainty of prevalence, RR, and burden.
- **Correlated draws** preserved (e.g., RR and prevalence covary by geography).
- **Structural uncertainty** via multi-model ensemble (PAF, CFA, synthetic control) with
  model-averaged or reported-separately estimates.
- **Reported output:** posterior mean, 95% CrI, and the probability that attributable burden
  exceeds a policy-relevant threshold — the form the optimizer and ministers consume.

## 7. Publication-ready methodology statement (template)

> "We estimated cause- and risk-specific attributable burden using a Bayesian comparative
> risk-assessment framework. Exposure prevalence and relative risks were modelled
> hierarchically across districts (BYM2 spatial priors). Population attributable fractions
> were computed per posterior draw and applied to small-area burden estimates to yield
> attributable deaths, YLL, YLD, and DALYs with 95% credible intervals. Attributable costs
> and productivity losses used human-capital valuation with 3% discounting. We additionally
> estimated achievable avoidable burden via Counterfactual-Frontier Attribution and
> triangulated against synthetic-control estimates where policy variation permitted. All
> uncertainty was propagated by Monte-Carlo over the joint posterior (4,000 draws). Reporting
> follows GATHER guidelines."

This engine supplies $\Delta_{ij}$ to [E09 Optimization](E09-optimization-engine.md) and underpins
manuscripts M3, M5, M7 in [E11](E11-manuscript-factory.md).
