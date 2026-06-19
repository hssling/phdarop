# Engine 8 — Decision Analytics Engine (Eight MCDA Methods)

A multi-criteria decision framework that applies **eight** MCDA methods to the same decision,
evaluates consistency, and recommends the most robust solution. Demonstrated on an
intervention-selection problem (8 interventions × 6 criteria).

> Computed: [code/mcda_eight_methods.py](../../code/mcda_eight_methods.py). Re-runnable.

## 1. The eight methods (and their distinct logics)

| Method | Aggregation logic | Sensitivity to |
|---|---|---|
| **TOPSIS** | Distance to ideal & anti-ideal | Outliers / extreme alternatives |
| **AHP** | Eigenvector weights → weighted sum | Pairwise consistency (CR) |
| **BWM** | Best/worst anchored weights → weighted sum | Fewer comparisons, robust weights |
| **PROMETHEE II** | Pairwise outranking flows | Preference-function thresholds |
| **ELECTRE** | Concordance/discordance outranking | Veto thresholds |
| **VIKOR** | Compromise (group utility vs individual regret) | Trade-off parameter v |
| **TODIM** | Prospect-theory gains/losses | Loss-aversion θ |
| **MACBETH** | Qualitative→value function → weighted sum | Value-curve shape |

Using eight diverse logics is a *robustness test*: if a winner survives prospect-theoretic
(TODIM), distance-based (TOPSIS), and outranking (ELECTRE/PROMETHEE) methods alike, the
recommendation is method-independent.

## 2. Results (rankings by method)

| Alternative | TOPSIS | AHP | BWM | PROM | ELECTRE | VIKOR | TODIM | MACBETH | **Consensus** |
|---|---|---|---|---|---|---|---|---|---|
| **I01 TB active case finding** | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | **1** |
| **I12 HTN screening + Rx** | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | **2** |
| **I03 Workforce redistribution** | 6 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | **3** |
| I09 Means restriction | 7 | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 4 |
| I06 Trauma network | 3 | 5 | 5 | 6 | 7 | 5 | 8 | 6 | 5 |
| I04 Task-shifting | 5 | 6 | 6 | 5 | 6 | 7 | 6 | 5 | 6 |
| I07 Ambulance staging | 4 | 7 | 7 | 7 | 5 | 8 | 4 | 8 | 7 |
| I08 Enforcement | 8 | 8 | 8 | 8 | 8 | 6 | 7 | 7 | 8 |

## 3. Consistency evaluation

- **Mean inter-method Spearman = 0.80** (min 0.45). Strong but not perfect agreement —
  exactly what we want: the methods are genuinely different, yet converge on the top.
- **I01 and I12 are rank-1 and rank-2 under *all eight* methods** → unconditionally robust
  recommendations.
- **I03 (workforce) is rank-3 under seven of eight methods**; TOPSIS alone demotes it to 6th
  because its low-cost "reallocation" profile sits near the anti-ideal on the raw cost axis —
  a known TOPSIS artifact when a cost criterion is near-zero. The seven-method consensus
  overrides this; I03 is robustly third *as an intervention*, while being first *as a
  systems project* (different decision, see [E01](E01-prioritization-engine.md)).
- **Disagreement concentrates in the mid-pack** (I06/I07/I04) — where, appropriately,
  uncertainty is highest and the decision is least consequential.

## 4. Uncertainty & sensitivity

- Weight perturbation (as in [E01](E01-prioritization-engine.md), Dirichlet around base weights)
  leaves the top-2 invariant; mid-pack order shuffles within ±2 ranks.
- VIKOR trade-off parameter $v\in[0,1]$ and TODIM loss-aversion $\theta\in[1,2.5]$ were varied;
  top-3 stable.

## 5. Recommendation (most robust solution)

**Adopt I01 (TB active case finding) and I12 (hypertension screening+treatment) as the
unconditional first-wave interventions**, with **I03 (workforce redistribution)** as the
systems enabler that raises the fidelity ($\kappa$) of *both*. This trio is method-robust and
maps onto two of the three flagship programmes (TB; Health-Systems Allocation).

## 6. Governance note

MCDA *ranks*; it does not *allocate*. The robust ranking here is the **input** to the
constraint-aware optimizer ([E09](E09-optimization-engine.md)), which decides *how much* of each,
*where*, under budget and workforce limits. MCDA answers "which are good"; optimization
answers "how much of each, given everything is scarce and interacting."
