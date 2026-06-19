# Engine 10 — Digital Twin of the Health System

A computational replica of a district/state health system that lets policymakers simulate
decisions *before* committing resources — the "flight simulator" for health policy.

## 1. What the twin represents (state variables)

| Layer | Entities | State |
|---|---|---|
| **Population** | Synthetic agents (age, sex, wealth, location, risk profile, care-seeking) | Health states, exposures |
| **Disease** | Cause-specific incidence/progression | Burden $B_{idt}$, transmission where relevant |
| **Facilities** | Sub-centres → district hospitals | Capacity, readiness, queues |
| **Workforce** | Cadres by facility | Posted/functional FTE, fatigue |
| **Financing** | Budgets, schemes, OOP | Flows, fund balances, CHE risk |
| **Interventions** | Coverage, fidelity $\kappa$ | Realized effectiveness $a_{ij}$ |
| **Outcomes** | Deaths, DALYs, equity, cost | Time series, distributions |

## 2. Three coupled model engines

1. **Agent-based model (ABM)** — individuals seek care, get served or queue, recover/die;
   captures heterogeneity, access frictions, equity, and emergent congestion. Used for
   referral, workforce, surge, and inequity dynamics.
2. **System-dynamics (SD) model** — stocks/flows and feedback loops (the causal-loop diagram
   in [E02 §12](E02-project-architecture.md)); captures workforce attrition spirals, demand
   feedback, programme interactions over time.
3. **Network model** — referral graph, transmission/contact network, supply chain; captures
   flow, percolation, and structural bottlenecks.

These are coupled: ABM agents move on the network; SD governs slow variables (workforce,
budgets) that parameterize the ABM; the network constrains both.

## 3. Calibration & validation (so it's decision-grade, not a toy)

- **Calibration:** Bayesian (ABC / history-matching) to reproduce observed burden, coverage,
  utilization from the MADB ([E04](E04-data-ecosystem.md)).
- **Validation:** out-of-sample on held-out districts/years; **decision-validation** — the twin
  must rank a set of known past policy changes in the correct order, not merely fit levels.
- **Uncertainty:** ensemble of calibrated parameter sets; every scenario output is a
  distribution with credible intervals.

## 4. Simulatable decisions (policy levers)

- **New policies:** need-based transfer rule, value-based purchasing, means restriction.
- **Budget changes:** ±X% envelope; reallocation across districts/programmes.
- **Intervention packages:** turn on/off bundles from the repository ([E07](E07-solution-discovery-engine.md)).
- **Shocks:** outbreak, heatwave, flood, workforce strike — resilience testing.
- **Workforce:** redistribution plans from the optimizer ([E09](E09-optimization-engine.md)).

## 5. Twin ⇄ optimizer loop (the key innovation)

```
Optimizer (E09) proposes allocation x*  ──►  Digital twin simulates x* under uncertainty
        ▲                                              │
        │   updated Δ, κ, congestion effects           ▼
        └──────────  twin returns realized DALYs, equity, queue effects, failure modes
```

The optimizer assumes static $\Delta$ and $\kappa$; the twin reveals **second-order effects**
(congestion, demand feedback, attrition) the LP cannot see. Iterating the two yields
allocations that are optimal *and* dynamically robust — PHDA's signature method.

## 6. Outputs / scenario products

- Scenario comparison dashboards (deaths/DALYs/equity/cost trajectories with CIs).
- "What-if" report cards for ministers (each lever's projected impact + uncertainty).
- Stress-test resilience scores under shocks.
- Implementation-scenario library feeding the roadmap ([Part 11](../11-implementation-roadmap.md)).

## 7. Tech (see [E12](E12-software-factory.md))

Mesa/AnyLogic-style ABM (Python), SD via PySD, networks via NetworkX/igraph, calibration via
`pyABC`/`emcee`, served behind the platform's simulation API; GPU/parallel for ensemble runs;
ships as the **Digital Twin module** of the open-source ecosystem.
