# Part 3 — Identifying Policy–Practice Gaps: Six Diagnostic Indices

A universal, formula-based methodology to detect and rank gaps in policy translation,
implementation, service delivery, financing, governance, and workforce. Each index is
normalized to [0,1] (0 = no gap, 1 = total gap), is decomposable, and carries a statistical
justification and interpretation band. All use the notation in [formulas/notation.md](../formulas/notation.md).

## Universal gap definition

Every index is an instance of a **normalized shortfall against an achievable benchmark**:
$$
\text{Gap} = \frac{\text{Benchmark} - \text{Observed}}{\text{Benchmark} - \text{Floor}}\Big|_{[0,1]}
$$
The benchmark is defended explicitly (policy target, peer frontier, or need), never implied.

---

## 1. Policy–Practice Gap Index (PPGI)

Distance between what policy *mandates* and what practice *delivers*.
$$
\mathrm{PPGI}_i = \sum_{m} \omega_m \,\frac{\max(0,\; T_m - O_{im})}{T_m - F_m}
$$
- $T_m$ = policy target for indicator $m$; $O_{im}$ = observed value; $F_m$ = floor; $\omega_m$ = weight ($\sum\omega_m=1$).
- **Statistical justification:** weighted mean of truncated relative shortfalls; weights from
  AHP/BWM ([E08](engines/E08-decision-analytics-engine.md)); CI by bootstrap over facilities.
- **Interpretation:** <0.10 aligned · 0.10–0.25 minor · 0.25–0.50 substantial · >0.50 severe.

## 2. Implementation Failure Index (IFI)

Erosion along the implementation cascade (availability → access → use → quality → effective coverage):
$$
\mathrm{IFI}_i = 1 - \prod_{s\in\text{cascade}} \rho_{is},\qquad \rho_{is}\in[0,1]
$$
where $\rho_{is}$ is the retention at cascade step $s$. Effective coverage $=\prod_s\rho_{is}$.
- **Decomposition:** the largest $1-\rho_{is}$ identifies the **binding** cascade step (where to act).
- **Justification:** multiplicative cascade (Tanahashi/effective-coverage theory); delta-method or Bayesian CI.
- **Interpretation:** IFI is dominated by its weakest link — report the bottleneck step, not just the scalar.

## 3. Allocation Inefficiency Index (AII)

Gap between achieved and **optimal** avoidable burden averted for the *same* budget:
$$
\mathrm{AII} = 1 - \frac{A(\mathbf{x}^{\text{actual}})}{A(\mathbf{x}^{*})}
$$
- $A(\cdot)$ from [E09](engines/E09-optimization-engine.md); $\mathbf{x}^{*}$ the optimizer solution.
- **In the worked example AII ≈ 1 − 385.8/546.5 = 0.29** — 29% of attainable benefit is lost to
  misallocation. This *is* the Value-of-Analytics, expressed as a deficit.
- **Justification:** ratio of optimization objectives; CI via PSA over the burden posterior.
- **Interpretation:** AII is the single most decision-relevant index — it is recoverable at zero cost.

## 4. Resource Mismatch Index (RMI)

Spatial discordance between where resources are and where need is:
$$
\mathrm{RMI} = \tfrac{1}{2}\sum_i \Big|\, \underbrace{\frac{r_i}{\sum_k r_k}}_{\text{resource share}} - \underbrace{\frac{n_i}{\sum_k n_k}}_{\text{need share}} \Big|
$$
- A dissimilarity index $\in[0,1]$; $r_i$ resources, $n_i$ need (avoidable burden) in unit $i$.
- **Justification:** equivalent to the index of dissimilarity; interpretable as the fraction of
  resources that would need to relocate to match need. Bootstrap CI.
- **Interpretation:** <0.15 well-matched · 0.15–0.30 moderate · >0.30 strong maldistribution.

## 5. Preventable Burden Index (PBI)

Share of observed burden that is avoidable (the headline "size of the prize"):
$$
\mathrm{PBI}_i = \frac{\Delta_i}{B_i} = \frac{B_i - B_i^{*}}{B_i}
$$
- $B^{*}$ from Counterfactual-Frontier Attribution ([E06](engines/E06-attributable-burden-engine.md)).
- **Justification:** a PAF-type quantity against the achievable frontier; full posterior CI.
- **Interpretation:** PBI×$B_i$ is the avoidable-burden mass to feed the optimizer; high-PBI,
  high-$B$ units are first-priority.

## 6. Health Equity Deficit Index (HEDI)

Burden inequality weighted toward the worst-off, against an equity benchmark:
$$
\mathrm{HEDI} = \frac{\sum_s p_s\,\big|\mu_s - \mu^{\text{ref}}\big|^{+}}{\mu^{\text{ref}}}
\quad\text{or}\quad
\mathrm{HEDI}_{\text{conc}} = -\,CI_{\text{health}}
$$
- First form: population-weighted excess of stratum rate $\mu_s$ over the best-off/benchmark
  $\mu^{\text{ref}}$ (only shortfalls count, hence $(\cdot)^+$). Second form: negative health
  concentration index (pro-rich inequality → positive deficit).
- **Justification:** rooted in the concentration-index / slope-index-of-inequality literature;
  inference by bootstrap or Bayesian posterior over stratum rates.
- **Interpretation:** paired with the **cost-to-close** curve ([M9](engines/E11-manuscript-factory.md))
  so the deficit is actionable, not merely descriptive.

---

## Composite & dashboard logic

- **No forced aggregation into one number** — the six indices answer different questions and a
  scalar composite hides the actionable detail. Instead, a **gap dashboard** shows all six per
  unit, with the **binding** one flagged.
- **Statistical hygiene:** all indices reported with uncertainty intervals; weights pre-registered;
  benchmarks stated; sensitivity to benchmark choice shown.
- **From index to action:** PBI sizes the prize → RMI/AII locate the misallocation → IFI finds the
  cascade bottleneck → PPGI/governance/workforce sub-indices name the lever → optimizer ([E09](engines/E09-optimization-engine.md))
  prescribes the fix → HEDI checks the distributional consequence.

### Governance & workforce sub-indices (same template)
- **Financing gap:** RMI computed on budget vs need; plus absorptive-capacity adjustment.
- **Governance gap:** latent-variable (SEM) score from accountability/transparency/capacity
  items, validated against outcomes (P33).
- **Workforce gap:** WISN-based deficit $= 1 - \min(1, \text{functional FTE}/\text{required FTE})$,
  the κ-driver for [E02](engines/E02-project-architecture.md).
