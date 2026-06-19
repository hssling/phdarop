# Part 11 — Implementation Roadmap (Compressed)

Per the Director's instruction to **keep the timeframe short and build now**, the original
1/3/5/10-year phasing is compressed into an aggressive, sprint-led roadmap. Each phase has
milestones, staffing, indicative budget share, risks, and mitigations.

## Phase 0 — Sprint (Weeks 0–12): *Prove it on one flagship*

- **Goal:** one flagship (Workforce P23 *or* TB P01) end-to-end: data → attribution →
  optimization → policy brief → live dashboard → the **Value-of-Analytics** number.
- **Milestones:** M-Wk2 MADB + ingestion live; M-Wk5 burden posterior; M-Wk8 optimizer +
  frontier; M-Wk10 policy brief + dashboard; M-Wk12 field-founding manuscript (M1) submitted.
- **Staffing:** ~12 (methods 4, software 4, 1 flagship lead+2 analysts, 1 policy writer).
- **Budget share:** ~10% (seed). **Deliverable that unlocks the rest:** the computed result
  (AII≈0.29; +41.7% equity-weighted DALYs) on real district data.
- **Risks:** data access (Mit: start with open NFHS/HMIS/GBD; sign data MoU in parallel);
  scope creep (Mit: one flagship only). 

## Phase 1 — District → State (Months 3–12): *All three flagships at state scale*

- **Goal:** Injury, TB, and Workforce flagships running for one state; platform Wave-1
  (MCDA + reports + single-district twin); first adopted action plan.
- **Milestones:** 3 flagship optimizations delivered; 10 manuscripts in pipeline ([E11](engines/E11-manuscript-factory.md));
  state action plan adopted into a PIP cycle; gap dashboard public.
- **Staffing:** ~30 (full Wave-0 org, [E14](engines/E14-research-centre-blueprint.md)).
- **Budget share:** ~35%. **Risks:** political non-adoption (Mit: co-design with state, ministerial
  notes via [E13](engines/E13-policy-translation-engine.md)); union resistance on P23 (Mit: early
  negotiation, transparency, hardship incentives); data quality (Mit: DQ module, EVPI-driven
  data investment).

## Phase 2 — National (Months 12–30): *Integrate and institutionalize*

- **Goal:** integrated cross-programme allocation (P38) at national scale; platform Wave-2 (AI
  layer, multi-state, public portal); training programme + fellowships launched.
- **Milestones:** national integrated budget optimization demonstrated; World Bank/ministry
  deployment contract; 30+ manuscripts; curriculum live; reproducibility CI enforced.
- **Staffing:** ~50–60 (add training division, more engineers, programme analysts).
- **Budget share:** ~40%. **Risks:** inter-ministry budget pooling resistance (Mit: model
  *partial* integration showing monotone gains, [E09](engines/E09-optimization-engine.md)/M10); scaling
  load (Mit: stateless workers, decomposition/Benders for P38); talent retention (Mit: fellowships,
  academic joint appointments).

## Phase 3 — Global (Months 30+): *Federate and standardize*

- **Goal:** federated multi-country PHDA commons; One-Health capstone (P50); the field is
  self-sustaining (conference, curriculum, standards).
- **Milestones:** ≥2 additional countries onboarded (Horizon/WHO); One-Health decision platform;
  PHDA recognized as a named field with reference institution status.
- **Budget share:** ~15% (now largely contract/grant self-funded).
- **Risks:** data-sovereignty/privacy (Mit: federated, on-prem, DPDP/GDPR-aligned, PII tokenized);
  context-transfer validity (Mit: CFA's context-adjusted frontier; local recalibration of twins).

## Cross-cutting governance, monitoring, and risk register

| Risk | Likelihood | Impact | Mitigation | Trigger |
|---|---|---|---|---|
| Data access delays | High | High | Open-data first; parallel MoUs; EVPI to justify | No MoU by Wk6 |
| Political non-adoption | Med | High | Co-design; tiered briefs; quick visible win | No plan adopted by M9 |
| Union/stakeholder pushback (P23) | High | Med | Early negotiation; transparency; incentives | Formal objection |
| Model mis-specification | Med | High | Triangulation; multiverse; decision-validation | Predicted≠realized Δ |
| Talent attrition | Med | Med | Fellowships, joint appointments, mission | >15% annual churn |
| Equity entrenchment by optimizer | Low | High | Equity floor + Ethics Board veto + HEDI audit | HEDI rises post-deployment |
| Scaling/compute | Med | Med | Stateless workers; decomposition | Solve time > SLA |

## North-star monitoring metric

Every phase is judged on the **Value of Analytics** realized in deployment:
$$
\text{VoA} = \frac{A(\mathbf{x}^{*}) - A(\mathbf{x}^{\text{status quo}})}{\mathcal B}
$$
measured *ex-post* by impact evaluation (Stage 11, [Part 7](07-decision-analytics-pipeline.md)) —
the programme must demonstrate, not merely model, avoidable burden averted.
