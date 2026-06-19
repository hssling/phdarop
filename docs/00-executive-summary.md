# Executive Summary — PHDAROP

**Public Health Decision Analytics and Resource Optimization Programme**

## The problem

Health systems in low- and middle-income countries (and many high-income ones) do not
fail primarily for lack of knowledge of *what works*. They fail at the **decision layer**:
the translation of evidence into *where, to whom, how much, and in what sequence* resources
are deployed. The result is a large, recurring, and largely **avoidable** burden:

- Deaths that effective, affordable interventions would have prevented.
- DALYs lost to conditions with proven, scalable solutions left unfunded.
- Money spent on low-value care while high-value care is rationed.
- Inequities that persist because allocation is driven by history and politics, not need.

No existing discipline owns this decision layer end-to-end. Epidemiology quantifies burden
but not allocation. Health economics ranks interventions but not their geographic
deployment under real constraints. Operations research optimizes logistics but is rarely
coupled to causal burden estimates. Implementation science explains failure but seldom
in a quantitative, optimizable form.

## The solution: a new field

PHDAROP founds **Public Health Decision Analytics (PHDA)** — a discipline whose object is
the *avoidable-burden decision chain*:

> **Measure burden → attribute it to causes → compute the counterfactual (avoidable) gap →
> optimize allocation against that gap → recommend a decision → implement → re-measure.**

PHDA fuses epidemiology, health-systems science, economics, AI/ML, operations research,
decision science, complexity science, and implementation science around one continuous
mathematical objective (see [formulas/notation.md](../formulas/notation.md)).

## What the programme delivers

| # | Deliverable | Form |
|---|---|---|
| 1 | **The PHDA field** | Philosophy, theory, epistemology, conceptual framework (Part 1) |
| 2 | **50 research projects** | Disease, injury, health-systems, One Health programmes (Part 2) |
| 3 | **Six diagnostic indices** | PPGI, IFI, AII, RMI, PBI, HEDI — with formulas (Part 3) |
| 4 | **Attributable-burden engine** | PAF, counterfactual, causal ML, Bayesian, mediation (Part 4) |
| 5 | **Methods compendium** | 30+ methods with theory, assumptions, applications (Part 5) |
| 6 | **Resource-allocation optimizer** | LP/MIP/RL formulations for money, people, beds (Part 6) |
| 7 | **Decision pipeline** | 11-stage analytics workflow (Part 7) |
| 8 | **Open-source platform** | 9-module software ecosystem (Part 8) |
| 9 | **100 manuscripts** | Ranked, with journals and designs (Part 9) |
| 10 | **Funding map** | ICMR/DHR/WHO/World Bank/Gates/Wellcome/NIH/UKRI/Horizon (Part 10) |
| 11 | **Compressed roadmap** | Sprint → district → state → national (Part 11) |

## The headline metric

The programme is governed by a single north-star quantity, the **Avoidable Burden Averted
per unit spend** under optimal versus status-quo allocation:

$$
\text{Value of Analytics (VoA)} = \frac{A(\mathbf{x}^{*}) - A(\mathbf{x}^{\text{status quo}})}{\mathcal{B}}
$$

Pilot hypothesis: PHDA-guided reallocation of *existing* budgets averts **15–40% more
DALYs at zero additional cost** in the first analytic cycle — the central, testable,
fundable claim of the programme.

## Why now

- Routine health data (HMIS, civil registration, claims, geospatial) is finally dense
  enough for unit-level optimization.
- Causal ML and Bayesian computation are mature enough for honest uncertainty.
- Cheap compute makes district-level digital twins feasible.
- Funders (Gates, Wellcome, WHO, World Bank) are explicitly seeking "decision support"
  and "data-to-policy" investments.

## The ask

A founding investment to stand up: a methods core, a software-engineering core, three
disease/system demonstrator tracks, and a policy-translation unit — structured to produce
publishable science *and* a live decision-support deployment within the first compressed
delivery cycle (see [Part 11](11-implementation-roadmap.md)).
