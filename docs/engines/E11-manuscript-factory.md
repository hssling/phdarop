# Engine 11 — Manuscript Factory: 10 High-Impact Manuscripts

Ten publication-ready manuscript specifications derived from the engines above. Each carries
title, journal, abstract, structure, tables/figures, SAP, reporting checklist, strategy, and
pre-empted "Reviewer 2" critiques with responses. (The full 100-manuscript pipeline is in
[Part 9](../09-publication-strategy.md).)

---

## M1 — Founding the field
- **Title:** "Public Health Decision Analytics: a unifying science for avoidable-burden reduction and resource optimization."
- **Journal:** *The Lancet* (Health Policy) / *Nature Medicine* (Perspective).
- **Abstract (150w):** We propose Public Health Decision Analytics (PHDA), a discipline that
  unifies attribution, optimization, and decision science around the avoidable-burden decision
  chain. We formalize the master objective, demonstrate on a multi-district allocation that
  optimization averts ~40% more equity-weighted DALYs at constant budget, and set a research
  agenda. PHDA reframes health-system failure as a solvable decision problem.
- **Design:** Conceptual + worked demonstration (our E09 result).
- **Figures:** ABDC framework; field-lineage timeline; Value-of-Analytics bar.
- **Reporting:** N/A (perspective) + methods appendix (GATHER/CHEERS for the demo).
- **Reviewer-2 → response:** *"Just a relabeling of existing fields."* → No prior framework
  makes the burden→optimization chain continuous with shared uncertainty; we provide the
  formal object and a quantified gain.

## M2 — Workforce redistribution (flagship)
- **Title:** "Need-based redistribution of the existing health workforce to avert mortality: a decision-analytic optimization."
- **Journal:** *Human Resources for Health* / *BMJ Global Health*.
- **Abstract:** Coupling a Bayesian burden posterior to an equity-constrained assignment MIP,
  we show redistribution of *current* staff cuts the population access deficit by X% and
  averts Y deaths/year at zero added cost.
- **Design:** Modelling + optimization; facility panel for the staffing→outcome estimate.
- **Tables:** decision matrix; pre/post access deficit. **Figures:** access-deficit atlas;
  redistribution flow map; equity-efficiency frontier.
- **SAP:** BYM2 burden; facility-FE + IV for staffing effect; MIP; PSA over posterior.
- **Reviewer-2:** *"Transfers aren't politically feasible."* → We model a transfer-budget τ and
  report gains achievable within realistic τ; provide stakeholder-validated constraints.

## M3 — Attributable burden of care gaps
- **Title:** "Counterfactual-Frontier Attribution: estimating achievable avoidable burden across districts."
- **Journal:** *PLoS Medicine* / *International Journal of Epidemiology*.
- **Abstract:** We introduce CFA, a context-adjusted frontier counterfactual, and estimate
  achievable avoidable deaths/DALYs for [cause], triangulated against PAF and synthetic control.
- **Design:** Bayesian CRA + stochastic frontier.
- **Figures:** attributable-burden atlas; PAF-vs-CFA comparison. **Checklist:** GATHER.
- **Reviewer-2:** *"Frontier = unobserved confounding."* → Frontier is covariate-conditional and
  we bound sensitivity (E-values); triangulation with policy-based synthetic controls.

## M4 — RTI trauma-system optimization (flagship)
- **Title:** "Optimizing trauma-system geography and pre-hospital staging to avert road-traffic deaths."
- **Journal:** *Injury Prevention* / *Lancet Public Health*.
- **Design:** spatial crash model → p-median + M/M/c queueing + enforcement MIP.
- **Figures:** crash-risk surface; optimal trauma-center map; golden-hour coverage gain.
- **Reviewer-2:** *"Ambulance data are noisy."* → measurement-error model + robustness to GPS gaps.

## M5 — TB allocation (flagship)
- **Title:** "Allocating active case-finding and diagnostics to minimize avoidable TB deaths under a fixed budget."
- **Journal:** *Lancet Global Health* / *PLoS Medicine*.
- **Design:** small-area TB burden → cascade mediation → MIP allocation.
- **Figures:** notification-gap map; optimal ACF effort map; deaths-averted curve.
- **Reviewer-2:** *"Private sector unobserved."* → incorporate private notifications + sensitivity.

## M6 — Eight-method MCDA robustness
- **Title:** "How robust are health-priority rankings to the choice of MCDA method? Evidence from eight methods."
- **Journal:** *Medical Decision Making* / *Value in Health*.
- **Design:** our E08 computation (8 methods, Spearman agreement, sensitivity).
- **Figures:** rank heatmap; inter-method correlation. **Reviewer-2:** *"Toy weights."* → Monte-Carlo over weights; conclusions invariant.

## M7 — The Value of Analytics
- **Title:** "How much avoidable burden is lost to suboptimal allocation? A decision-analytic estimate."
- **Journal:** *Health Affairs* / *Lancet Global Health*.
- **Design:** optimization vs status-quo across districts (E09 scaled to real data).
- **Figures:** Value-of-Analytics by state; efficiency-equity frontier. **Checklist:** CHEERS 2022.

## M8 — Digital twin for policy
- **Title:** "A calibrated digital twin of a district health system for ex-ante policy evaluation."
- **Journal:** *Lancet Digital Health* / *npj Digital Medicine*.
- **Design:** coupled ABM/SD/network; decision-validation on past policies.
- **Figures:** twin architecture; scenario trajectories with CIs. **Reviewer-2:** *"Unvalidated simulation."* → out-of-sample + decision-validation protocol.

## M9 — Equity deficit & its price
- **Title:** "Quantifying the Health Equity Deficit and the cost of closing it."
- **Journal:** *Lancet* / *Social Science & Medicine*.
- **Design:** HEDI index (Part 3) + remediation-cost optimization (ECEA).
- **Figures:** HEDI map; cost-to-close curve. **Checklist:** STROBE/CHEERS.

## M10 — Integrated cross-programme allocation (capstone)
- **Title:** "Whole-portfolio health-budget optimization out-performs siloed vertical planning."
- **Journal:** *Nature Medicine* / *The Lancet*.
- **Design:** large-scale MIP/Benders across all programmes (P38).
- **Figures:** integrated vs siloed DALYs-averted; reallocation Sankey. **Reviewer-2:** *"Ministries won't pool budgets."* → we model partial integration and show monotone gains.

---

## Standard apparatus applied to every manuscript

- **SAP skeleton:** pre-registered estimand → identification (≥2 strategies) → Bayesian
  estimation → PSA/uncertainty propagation → decision/optimization → sensitivity multiverse.
- **Reporting checklists:** GATHER (burden), CHEERS 2022 (economic), STROBE (observational),
  TRIPOD+AI (prediction), CONSORT (any trial), PRISMA (any review).
- **Open science:** code + (governed) data + pre-registration; every figure reproducible from
  the [code/](../../code/) scripts.
- **Publication strategy:** field-founding piece (M1) first to plant the flag, then flagship
  empirical papers (M2/M4/M5) for policy traction, then methods (M3/M6/M8) for citations.
