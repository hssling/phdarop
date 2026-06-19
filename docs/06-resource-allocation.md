# Part 6 — Resource Allocation Framework: "Where Should Resources Go?"

The prescriptive framework. Mathematical formulations, algorithms, and workflow. The *solved
demonstration* (LP/MIP/multi-objective/metaheuristic with computed results) is
[E09](engines/E09-optimization-engine.md); this Part is the general formulation across resource types.

## 1. The general allocation problem

Allocate resources $r$ (budget, workforce, infrastructure, interventions) across units $i$ to
maximize equity-weighted avoidable burden averted under feasibility:

$$
\max_{\mathbf{x}}\; A(\mathbf{x}) = \sum_{i,j} w_i\,\Delta_{ij}\,a_{ij}\,x_{ij}
\quad\text{s.t.}\quad
\sum_{ij} c^{r}_{ij} x_{ij} \le \mathcal{R}_r \;\forall r,\;\;
x \in \mathcal{F}
$$

with $a_{ij}=e_j\kappa_{ij}$ (realized effectiveness), $\mathcal F$ encoding integrality, equity
floors, and political-feasibility (transfer-budget) constraints.

## 2. Four resource types → four formulations

| Resource | Decision variable | Formulation | Key constraint |
|---|---|---|---|
| **Budget** | $x_{ij}\in[0,1]$ fraction funded | LP / multi-objective | budget envelope |
| **Workforce** | $g_{ir}$ FTE assigned | assignment MIP | fixed pool, retention, transfer-budget τ |
| **Infrastructure** | $z_f\in\{0,1\}$ open facility | facility-location MIP | capital budget, capacity, access radius |
| **Interventions** | $y_{ij}\in\{0,1\}$ deploy bundle | knapsack/MIP | budget + workforce jointly |

## 3. Multi-objective handling (the four objectives)

Objectives: max deaths averted, max DALYs averted, max equity, min cost. PHDA handles them by:
- **Equity-weighting** inside the objective ($w_i$), plus
- **ε-constraint** on equity floor and cost ceiling to trace the **efficiency–equity frontier**
  (the policymaker chooses the operating point — see E09 §5), and
- **Goal programming** when targets (not just maximization) are specified.
- **NSGA-II / Pareto** sets when a full multi-dimensional frontier is needed.

## 4. Optimization algorithms (selection by structure)

| Structure | Algorithm |
|---|---|
| Continuous, linear | LP (simplex/interior-point, HiGHS) → exact + shadow prices |
| Integer/logical | MIP (branch-and-cut, CBC/Gurobi) |
| Large/decomposable | Benders / column generation (e.g., P38 integrated) |
| Submodular coverage | greedy (1−1/e guarantee) — fast near-optimal |
| Black-box/simulator | Bayesian optimization; particle swarm; differential evolution |
| Multi-objective | ε-constraint, weighted-sum, NSGA-II |

## 5. Uncertainty-aware allocation (PHDA discipline)

Never optimize on point $\Delta$. Production options:
- **Stochastic programming:** maximize $\mathbb{E}_{\theta}[A(\mathbf{x},\theta)]$ over burden-posterior scenarios.
- **Robust optimization:** maximize worst-case over a credible-interval uncertainty set.
- **Chance constraints:** satisfy equity/coverage targets with probability ≥ 1−α.
- **Report allocation stability:** fraction of posterior draws in which each cell is funded.

## 6. Implementation workflow

```
1. Pull Δ posterior (E06) + costs + κ + constraints from MADB (E04)
2. Choose formulation by resource type (table §2) and uncertainty mode (§5)
3. Solve; extract x*, objective, shadow prices (= marginal value of each constraint)
4. Trace efficiency–equity frontier (ε-constraint)
5. Stress in digital twin (E10) for congestion/feedback; iterate optimizer⇄twin
6. Report stability + frontier + shadow prices → policy translation (E13)
7. Implement; monitor κ and realized Δ; re-optimize next cycle (learning loop)
```

## 7. What the framework outputs to decision-makers

- The **allocation** $\mathbf{x}^{*}$ (who gets what), and the **Allocation Inefficiency Index**
  ([Part 3 §3](03-policy-practice-gaps.md)) = burden recoverable at zero cost.
- The **shadow prices**: the most valuable constraint to relax (e.g., "+1 FTE in cadre X averts
  Y DALYs" — directly fundable asks).
- The **frontier**: the priced equity–efficiency trade-off ministers actually choose on.

This Part answers "where should resources go?" with a number, an uncertainty band, and a reason.
