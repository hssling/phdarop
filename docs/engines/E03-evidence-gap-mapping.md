# Engine 3 — Evidence Gap Mapping

A comprehensive evidence-gap assessment for PHDA, framed around the flagship domains
(workforce, TB, injury, allocation) but generalizable.

## 1. The five-state knowledge classification

| State | Definition | Example (workforce/allocation) |
|---|---|---|
| **Known** | Replicated, low-uncertainty | Maldistribution exists; WISN exists; CEA of many interventions exists |
| **Uncertain** | Estimated but wide CI / contested | Magnitude of staffing→mortality elasticity; productivity by cadre |
| **Unanswered** | Posed but unresolved | Optimal *transfer budget* τ; equity weight that society endorses |
| **Policy-relevant** | Decision hinges on it | Will reallocation survive union/political constraints? |
| **Never studied** | Not yet posed | Joint cross-programme optimal allocation under one envelope (P38) |

## 2. Evidence-gap matrix (interventions × outcomes; cell = evidence strength)

Legend: ●=strong RCT/meta, ◐=observational/modelled, ○=thin, ✕=absent.

| Intervention → / Outcome ↓ | Redistribution | Incentives | Task-shift | Infra capital | Integrated alloc |
|---|---|---|---|---|---|
| Coverage/access | ◐ | ◐ | ● | ◐ | ○ |
| Avoidable mortality | ○ | ○ | ◐ | ○ | ✕ |
| Equity (HEDI) | ○ | ○ | ○ | ○ | ✕ |
| Cost / value | ◐ | ◐ | ● | ○ | ✕ |
| Political feasibility | ✕ | ○ | ○ | ○ | ✕ |

The diagonal of darkest gaps — **mortality & equity effects of allocation decisions, and
anything about integrated allocation** — is precisely PHDA's white space.

## 3. Uncertainty map

| Parameter | Source of uncertainty | Reducible by | Decision leverage (EVPI proxy) |
|---|---|---|---|
| Staffing→mortality elasticity | Confounding, measurement | Panel + natural experiment | **High** |
| Cadre productivity ρ | Heterogeneity | Time-motion + audit | High |
| Need (burden posterior) | Small-area, data quality | Bayesian SAE + survey | High |
| Retention probability | Behavioral | Cohort + DCE | Medium |
| Political-feasibility budget τ | Process | Stakeholder elicitation | **High (binding constraint)** |
| Equity weights w | Normative | Deliberative process | High (value-laden) |

## 4. Research-priority matrix (gap severity × decision leverage)

```
 Decision      HIGH │  Equity effects of      │  Integrated allocation
 leverage           │  allocation (study now)  │  (P38 — moonshot)
                    │  Staffing→mortality      │  Transfer-budget τ
              ──────┼──────────────────────────┼─────────────────────────
               LOW  │  Cadre productivity      │  Novel measurement of
                    │  (worth doing)           │  "functional vs posted"
                    └──────────────────────────┴─────────────────────────
                          LOW gap severity          HIGH gap severity
```

Top-right quadrant = immediate research priority.

## 5. Gap taxonomy with examples

- **Knowledge gaps:** size/sign of allocation→mortality effects; intervention interactions.
- **Methodological gaps:** uncertainty propagation from Bayesian burden into MIP; causal ML for
  policy effects on routine data; equity-constrained optimization at scale.
- **Policy gaps:** no need-based transfer algorithm in statute; no value-based purchasing rule.
- **Implementation gaps:** posted≠functional; fidelity κ unmeasured; data latency.
- **Resource-allocation gaps:** no operational optimizer linking burden to budget at district level.
- **Measurement gaps:** "effective coverage", catastrophic expenditure attribution, equity deficit.

## 6. Fifty research questions

**Burden & attribution (Q1–10)**
1. What fraction of district under-5 mortality is attributable to workforce access gaps?
2. What is the staffing→case-fatality elasticity for maternal emergencies?
3. What share of TB deaths is attributable to diagnostic delay vs treatment loss?
4. What is the AMR-attributable mortality fraction at sub-national level?
5. How much RTI mortality is attributable to pre-hospital (vs in-hospital) delay?
6. What is the attributable catastrophic-expenditure fraction from NCD care gaps?
7. How does attributable burden decompose across the care cascade by stratum?
8. What is the avoidable-DALY gap between observed and frontier-benchmark districts?
9. How do climate exposures mediate vector-borne attributable burden?
10. What is the attributable productivity loss from premature adult mortality by cause?

**Methods (Q11–20)**
11. How to propagate full Bayesian burden posteriors into MIP allocation honestly?
12. Can double/debiased ML recover allocation effects from HMIS panels?
13. What preference function makes PROMETHEE robust to ordinal expert input?
14. How to set defensible, deliberatively-elicited equity weights?
15. Does targeted learning (TMLE) outperform PAF for AMR attribution?
16. How to build district digital twins that are decision-validated, not just fit?
17. What is the minimal data set for a credible allocation recommendation?
18. How to quantify Value of Information to prioritize data investments?
19. How to handle measurement error in "functional staffing"?
20. Can reinforcement learning yield stable surge-allocation policies?

**Resource allocation (Q21–30)**
21. What transfer budget τ maximizes avoidable burden averted per political cost?
22. How much more burden is averted by integrated vs siloed allocation (P38)?
23. What is the optimal trauma-center geography for a given state?
24. Where should ambulances be staged to minimize golden-hour misses?
25. What is the optimal ACF effort map for TB under a fixed budget?
26. How should a financing formula weight need vs equity vs absorptive capacity?
27. What cadre-mix minimizes access deficit under a fixed wage bill?
28. How robust are optimal allocations to burden-posterior uncertainty?
29. What is the equity-efficiency frontier for each flagship?
30. How frequently should allocation be re-optimized (value of recency)?

**Policy & implementation (Q31–40)**
31. Do need-based transfer rules survive union negotiation? Under what design?
32. What incentive level retains staff at deficit clusters (DCE)?
33. Does publishing the need-atlas change posting behavior (natural experiment)?
34. What governance structure sustains quarterly re-optimization?
35. What causes reversal of evidence-based allocation decisions?
36. How does private-sector substitution alter optimal public allocation?
37. What is the uptake elasticity of district plans to dashboard provision?
38. Which implementation-fidelity levers most raise κ per rupee?
39. How to design value-based purchasing that providers accept?
40. What accountability indicators best predict outcome improvement?

**Equity (Q41–45)**
41. How large is the Health Equity Deficit and what does closing it cost?
42. Does optimization with equity weights reduce or entrench disparities?
43. Which strata bear the most avoidable burden across flagships?
44. How do allocation gains distribute across wealth quintiles?
45. What equity floor is both ethical and affordable?

**Systems & One Health (Q46–50)**
46. How do programme interactions change joint optimal allocation?
47. What climate-adaptation portfolio maximizes avoidable burden averted?
48. Where are spillover-surveillance investments highest-value?
49. What cross-sector (WASH/nutrition/health) allocation is jointly optimal?
50. Can a learning health system measurably out-perform static planning over 3 cycles?

These 50 questions are mapped to the 50 projects (Part 2) and the manuscript pipeline
([E11](E11-manuscript-factory.md) / Part 9), ensuring no question is orphaned from a study design.
