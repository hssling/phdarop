# Engine 14 — Centre for Public Health Decision Analytics (C-PHDA): Blueprint

The institutional home that turns PHDA from a programme into a permanent science, organized
around the **three flagship programmes** the prioritization engine independently validated
([E01](E01-prioritization-engine.md)).

## 1. Vision & mission

- **Vision:** *No life lost to a decision that better analytics could have changed.*
- **Mission:** Build the science, software, and people that convert health data into optimal,
  equitable, implementable resource decisions — and prove, district by district, that it
  averts avoidable burden.

## 2. Governance

```
                 ┌────────────────────────────┐
                 │  Governing Board (Chair:    │  policy + finance + academic + community
                 │  Health Secretary / Dean)   │
                 └──────────────┬──────────────┘
        ┌───────────────────────┼───────────────────────┐
   Scientific Advisory     Director (C-PHDA)      Ethics & Equity Board
   (international)               │                 (independent veto on equity floor)
        ┌──────────┬────────────┼────────────┬───────────┐
   Methods Core  Software   Flagship       Policy &     Training &
   (research)    Core (eng) Programmes (3) Translation  Capacity
```

Decision cadence: quarterly programme review; annual scientific + impact audit; public
release of methods and (governed) results.

## 3. Divisions & staffing (lean, compressed start)

| Division | Core roles | Wave-0 headcount |
|---|---|---|
| **Methods Core** | epidemiologist, biostatistician, Bayesian statistician, health economist, causal-ML scientist, OR/optimization scientist, network scientist | 7 |
| **Software Core** | software architect, 3 engineers (data/backend/frontend), MLOps, GIS specialist | 6 |
| **Flagship Programmes** | 3 programme leads + 2 analysts each | 9 |
| **Policy & Translation** | policy analyst, implementation scientist, science writer | 3 |
| **Training & Capacity** | curriculum lead + fellows | 2 + fellows |
| **Operations** | director, programme manager, data-governance/legal | 3 |
| **Total Wave-0** | | **~30** |

## 4. The three flagship programmes (the engine output)

### Flagship 1 — National Injury Prevention Decision Analytics
- **Projects:** P15 RTI (anchor), P16 drowning, P17 burns, P18 falls, P20 suicide, P19 poisoning.
- **Why:** injury is high-burden, data-rich (iRAD, NCRB, 108-GPS), policy-hungry, and almost
  untouched by optimization → fastest path to multiple high-impact papers + visible policy wins.
- **Headline deliverable:** state trauma-system + means-restriction optimal plan; deaths-averted estimate.

### Flagship 2 — TB Elimination Optimization
- **Projects:** P01 (anchor) — missed cases, diagnostic-delay reduction, ACF/diagnostic
  allocation, private-sector engagement.
- **Why:** elimination mandate + rich routine data (NIKSHAY) + clear budget owner (NTEP) +
  cascade-mediation methods showcase.
- **Headline deliverable:** district optimal ACF/diagnostic map; cascade-attributable deaths.

### Flagship 3 — Health-Systems Allocation Efficiency
- **Projects:** P23 workforce (top-ranked), P24 infrastructure, P25 referral, P26 financing,
  building toward P38 integrated allocation (the capstone).
- **Why:** the rank-1 project; reusable platform; cross-cutting — raises κ for *every* other
  programme; directly fundable by World Bank/ministry.
- **Headline deliverable:** need-based workforce + financing formula; the Value-of-Analytics paper.

These three jointly exercise every engine (E01–E13) and produce the first wave of manuscripts
(M2/M4/M5/M7) and the reusable platform.

## 5. Budget (compressed, indicative)

| Bucket | Wave-0 share |
|---|---|
| Personnel (~30 FTE) | 55% |
| Software/compute/data | 15% |
| Field/data-collection/validation | 12% |
| Policy translation & convening | 8% |
| Training/fellowships | 6% |
| Operations/governance/M&E | 4% |

Funded via the mapped portfolio ([Part 10](../10-funding-strategy.md)): anchor institutional grant
(ICMR/DHR or Wellcome/Gates) + project grants per flagship + World Bank/ministry deployment
contract.

## 6. Partnerships

Ministry/State Health Depts (data + adoption) · NHSRC/NITI Aayog · academic biostat/OR/CS
departments · IHME/GBD · WHO country office · World Bank HNP · philanthropies (Gates/Wellcome)
· implementing NGOs (field validation) · OSS community (platform).

## 7. Strategic plan (compressed)

- **Phase 1 (months, "sprint"):** stand up Methods+Software cores; deliver one flagship
  demonstrator end-to-end (data → optimization → policy brief → dashboard) with the
  Value-of-Analytics result; publish M1 (field-founding) + M2/M5.
- **Phase 2 (~1 year, district→state):** all three flagships at state scale; platform Wave-1;
  10 manuscripts; first adopted action plan.
- **Phase 3 (~2–3 years, national):** integrated allocation (P38); national platform
  deployment; training programme + fellowships; 30+ manuscripts.
- **Phase 4 (stretch, global):** federated multi-country PHDA commons; One-Health capstone
  (P50); the field is self-sustaining with its own conference and curriculum.

## 8. Global positioning

Position C-PHDA as **the** reference institution for health decision analytics: own the field's
founding literature (M1), the open-source platform (E12), the methods (CFA, twin⇄optimizer
loop), and the training pipeline — so that "PHDA" and the Centre are synonymous, the way
"GBD" and IHME are. First-mover advantage in a white space that funders are actively seeking
to fill.

---

### Engine series complete

Engines E01–E14 operationalize Prompts 1–14 end-to-end. They sit on top of the conceptual
Parts 1–2 already delivered, and connect to the remaining Parts (3–12) which provide the
formal indices, methods compendium, software/funding/implementation roadmaps, and future
vision. See the [README](../../README.md) for the full map.
