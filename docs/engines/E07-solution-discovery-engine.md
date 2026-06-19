# Engine 7 — Solution Discovery Engine & Intervention Repository

A systematic, cross-disciplinary search for *every plausible intervention*, scored on six
attributes, ranked, and stored in a reusable repository feeding the MCDA ([E08](E08-decision-analytics-engine.md))
and optimizer ([E09](E09-optimization-engine.md)).

## 1. Search protocol (so the repository is exhaustive, not anecdotal)

1. **Source disciplines swept:** public health, clinical medicine, economics, engineering,
   transportation, behavioral science, computer science, systems engineering, AI, operations
   research, policy science.
2. **For each disease/system problem**, enumerate interventions along the
   **prevention → detection → treatment → financing → governance** chain.
3. **Evidence pull:** Cochrane/Campbell reviews, DCP3, WHO-CHOICE, Tufts CEA Registry, Disease
   Control Priorities, grey literature, and innovation scans (engineering/AI).
4. **De-duplicate and structure** into the repository schema below.

## 2. Repository schema (per intervention)

`intervention_id · name · domain · mechanism · target_burden · effectiveness(e) ·
cost(unit) · feasibility(1-5) · scalability(1-5) · equity_impact(±) ·
implementation_complexity(1-5) · evidence_grade · cadre_needs · data_to_localize`

## 3. Scoring rubric

| Attribute | Scale | Source |
|---|---|---|
| Effectiveness $e$ | RR/effect size or % burden averted | Meta-analysis / GBD |
| Cost | $/unit or $/capita | WHO-CHOICE, NHA, local costing |
| Feasibility | 1–5 | Expert + context |
| Scalability | 1–5 | Delivery channel availability |
| Equity impact | −2…+2 | Distributional analysis (pro-poor +) |
| Implementation complexity | 1–5 (5=hard) | Implementation science |

## 4. Illustrative repository (cross-domain, abbreviated)

| ID | Intervention | Domain | e (burden averted) | Cost | Feas | Scal | Equity | Cmplx | $/DALY band |
|---|---|---|---|---|---|---|---|---|---|
| I01 | TB active case finding | Public health | High | Med | 4 | 4 | +2 | 3 | Very cost-effective |
| I02 | Molecular NAAT decentralization | Medicine/eng | High | Med-Hi | 3 | 3 | +1 | 4 | Cost-effective |
| I03 | Workforce redistribution | Systems/OR | High | ~0 (reallocation) | 3 | 4 | +2 | 4 | Dominant (cost-saving) |
| I04 | Task-shifting to mid-level providers | Health systems | Med-Hi | Low | 4 | 5 | +2 | 3 | Very cost-effective |
| I05 | Hardship retention incentives | Economics | Med | Med | 3 | 4 | +2 | 2 | Cost-effective |
| I06 | Trauma-center network + bypass | Transport/OR | High | Hi | 3 | 3 | +1 | 4 | Cost-effective |
| I07 | Ambulance optimal staging | OR/eng | Med-Hi | Med | 4 | 4 | +1 | 3 | Very cost-effective |
| I08 | Helmet/speed enforcement | Policy/behavioral | High | Low | 3 | 4 | +1 | 2 | Dominant |
| I09 | Pesticide regulation (means restriction) | Policy | High | Low | 2 | 4 | +2 | 2 | Dominant |
| I10 | Crisis helpline + gatekeeper training | Mental health | Med | Low | 4 | 4 | +1 | 2 | Cost-effective |
| I11 | ORS+zinc / pneumonia case mgmt scale-up | Medicine | High | Low | 5 | 5 | +2 | 2 | Dominant |
| I12 | Hypertension community screening+Rx | NCD | High | Low-Med | 4 | 5 | +2 | 3 | Very cost-effective |
| I13 | Heat-action early warning + cooling | Climate/systems | Med-Hi | Low-Med | 4 | 4 | +1 | 3 | Cost-effective |
| I14 | Predictive stock-out prevention (AI) | CS/AI/OR | Med | Low | 4 | 4 | +1 | 3 | Very cost-effective |
| I15 | Value-based strategic purchasing | Economics | Med | ~0 | 3 | 3 | +1 | 4 | Cost-saving |
| I16 | Digital decision-support for CHWs | AI/digital | Med | Low | 4 | 5 | +1 | 3 | Cost-effective |
| I17 | Referral network redesign (network opt) | OR/network | Med-Hi | Low | 3 | 4 | +1 | 3 | Cost-saving |
| I18 | Conditional cash / demand incentives | Economics/behavioral | Med | Med | 3 | 4 | +2 | 3 | Context-dependent |
| I19 | Integrated vector management | One Health | Med-Hi | Med | 3 | 3 | +1 | 4 | Cost-effective |
| I20 | WASH + nutrition co-delivery | Environmental | High | Med | 3 | 4 | +2 | 4 | Cost-effective |

## 5. Ranking method

Interventions are ranked by a transparent composite that the optimizer then *overrides* with
constraint-aware optimization (ranking ≠ allocation):

$$
\text{Score}_I = \frac{e_I \cdot \text{equity}_I \cdot \text{scal}_I}{\text{cost}_I \cdot \text{cmplx}_I}
\;\;\xrightarrow{\text{then}}\;\; \text{MCDA (E08)} \;\xrightarrow{}\; \text{Optimization (E09)}
$$

**Top tier (dominant / cost-saving, high equity):** I03 workforce redistribution, I08
enforcement, I09 means restriction, I11 child-survival bundle, I15 value-based purchasing.
**High-value scalable:** I01, I04, I07, I12, I14, I16. These directly populate the flagship
optimization problems.

## 6. Why a *repository* (not a list)

The repository is a **reusable asset**: each new district/optimization run pulls localized
`e`, `cost`, and `cadre_needs` from the same store, so the marginal cost of a new analysis is
near zero. It is the intervention-side analogue of the MADB ([E04](E04-data-ecosystem.md)) and
ships as a module of the platform ([E12](E12-software-factory.md)).
