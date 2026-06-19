# Engine 9 — Resource Allocation Optimization Engine

The prescriptive core of PHDA. A stylized but **fully solved** 6-district × 4-intervention
allocation problem demonstrates the programme's central, fundable claim.

> Computed: [code/optimization_engine.py](../../code/optimization_engine.py) →
> [outputs/optimization_results.json](../../outputs/optimization_results.json). Re-runnable.

## 1. Problem

Maximize equity-weighted avoidable DALYs averted, subject to a **scarce** budget (₹55M) and
a binding workforce ceiling (30 FTE):

$$
\max_{x}\;\sum_{i}\sum_{j} w_i\,\Delta_{ij}\,x_{ij}
\quad\text{s.t.}\quad
\sum_{ij}\text{cost}_{ij}x_{ij}\le \mathcal B,\;\;
\sum_{ij}\text{wf}_{ij}x_{ij}\le W,\;\;
x_{ij}\in[0,1]
$$

with equity weights $w_i$ favoring poor/remote districts, and $\Delta_{ij}$ the avoidable
DALYs from [E06](E06-attributable-burden-engine.md).

## 2. Four solution methods, compared

| Method | Form | Equity-wtd DALYs averted (k) | Notes |
|---|---|---|---|
| **Status quo** (inertial equal spread) | uniform coverage | **385.8** | resources spread thin regardless of burden |
| **(1) Linear programming** | continuous $x\in[0,1]$ | **546.5** | scipy HiGHS; budget fully used (₹55M, 27 FTE) |
| **(2) Mixed-integer programming** | binary "open programme" + **equity floor** | **541.6** | PuLP/CBC; poorest districts guaranteed ≥2 programmes |
| **(4) Differential evolution** | metaheuristic cross-check | **522.3** | within 4.4% of LP → LP optimum confirmed |

Goal programming, particle-swarm, and Bayesian optimization are supported by the same
interface; DE is shown as the independent global cross-check.

## 3. The headline result — Value of Analytics

> **The LP optimum averts 41.7% more equity-weighted DALYs than the status-quo allocation
> at exactly the same budget and workforce.**

This is the programme's central testable claim (exec summary's "15–40% more DALYs at zero
additional cost"), here *realized at the upper end* in a scarce-resource regime. The MIP
variant, which additionally enforces an equity floor, retains a +40% gain — showing equity
protection is nearly free here.

## 4. What the optimizer *decides* (and why it's non-obvious)

LP allocation (fraction funded):

| District | TB ACF | HTN | Maternal EmONC | Child bundle |
|---|---|---|---|---|
| D1 high-burden poor | 1.00 | 1.00 | 0.29 | 1.00 |
| D2 high-burden | 1.00 | 1.00 | 0.00 | 1.00 |
| D3 mid | 0.00 | 0.00 | 0.00 | 1.00 |
| D4 mid-poor | 1.00 | 1.00 | 0.00 | 1.00 |
| D5 low | 0.00 | 0.00 | 0.00 | 0.00 |
| D6 low-remote | 0.00 | 1.00 | 0.00 | 1.00 |

Insights the optimizer surfaces that intuition misses:
- **Child bundle is funded almost everywhere** — highest $\Delta$ per rupee and per FTE; the
  optimizer recognizes it as the universal "buy."
- **Maternal EmONC is mostly de-funded under this tight envelope** despite high raw impact —
  it is workforce-intensive (4 FTE/unit), so under the binding 30-FTE ceiling it loses on the
  *shadow price of workforce*, not on burden. This is exactly the kind of counterintuitive,
  constraint-driven trade-off that point-estimate intuition gets wrong.
- **D5 (low burden) is dropped entirely**; **D1 (high-burden poor) is fully funded** — equity
  weighting + burden concentration drives resources to need.

The **MIP** (lumpy, with equity floor) instead *forces* maternal EmONC into D1 and guarantees
the poorest districts ≥2 programmes — trading ~1% efficiency for political/ethical robustness.

## 5. Efficiency–equity frontier (ε-constraint multi-objective)

Raw DALYs stay at ~389k until the equity floor exceeds 0.9, then fall to 376k at a full floor
— i.e., **strong equity protection costs only ~3% of raw efficiency here.** The frontier is the
object ministers actually choose on: it makes the equity-efficiency trade-off explicit and
priced, rather than hidden.

## 6. Uncertainty-aware optimization (production form)

The demonstration uses point $\Delta$; the production optimizer ingests the **burden
posterior** ([E06](E06-attributable-burden-engine.md)) and solves either:
- **Stochastic programming** (expected DALYs over posterior scenarios), or
- **Robust optimization** (maximize worst-case over a credible-interval uncertainty set),
- reporting allocation **stability** (how often each cell is funded across posterior draws) —
  the optimization analogue of E01's P(top-5).

## 7. Algorithms available in the engine

LP (HiGHS) · MIP (CBC/Gurobi) · goal programming · weighted & ε-constraint multi-objective ·
NSGA-II evolutionary (Pareto sets) · particle-swarm · Bayesian optimization (expensive
simulators) · greedy submodular (fast near-optimal for coverage). Method auto-selected by
problem structure per the decision tree in [E05](E05-analytical-framework.md).

This engine is the destination of the whole pipeline: it consumes $\Delta$ (E06), the ranked
interventions (E07/E08), and feeds policy translation (E13) and the dashboards (E12).
