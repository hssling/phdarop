# Engine 1 — Project Prioritization Engine

**Role:** Director, PHDAROP. **Task:** rank the 20 highest-priority projects across 10
criteria using four MCDA methods, with sensitivity, uncertainty, and a Pareto frontier.

> All numbers below are **computed**, not asserted. Source: [code/prioritization_engine.py](../../code/prioritization_engine.py)
> → [outputs/prioritization_results.json](../../outputs/prioritization_results.json). Re-runnable.

## 1. Method

- **20 candidate projects** drawn from the 50-project portfolio (Part 2).
- **10 criteria:** PH importance, disease burden, policy relevance, evidence gap, novelty,
  data availability, feasibility, publication potential, funding potential, probability of
  implementation. All oriented so higher = better; expert-elicited 1–10 decision matrix.
- **Four MCDA methods applied to the same matrix:**
  - **AHP** — weights from a consistency-checked pairwise matrix (CR < 0.10), weighted sum on min-max-normalized scores.
  - **BWM** (Best–Worst Method) — Best = PH importance, Worst = novelty; min-max optimal weights.
  - **TOPSIS** — vector normalization, closeness to ideal/anti-ideal.
  - **PROMETHEE II** — net outranking flow, linear preference functions with std-based thresholds.
- **Consensus** = mean rank across the four methods (Borda-style).
- **Uncertainty:** 2,000 Monte-Carlo draws of Dirichlet-perturbed weights → P(project in top 5) and 90% rank intervals.
- **Pareto frontier** on impact (PH/burden/policy/gap) vs feasibility (data/feasibility/implementation).

## 2. Ranked list (consensus across all four methods)

| Rank | Project | AHP | BWM | TOPSIS | PROM | P(top5) | Horizon |
|---|---|---|---|---|---|---|---|
| 1 | **P23 Workforce redistribution** | 1 | 1 | 1 | 1 | 1.00 | Quick win |
| 2 | **P15 RTI trauma system** | 2 | 2 | 2 | 2 | 1.00 | Quick win |
| 3 | **P01 TB allocation** | 3 | 3 | 3 | 3 | 1.00 | Quick win |
| 4 | **P09 Child survival** | 4 | 4 | 4 | 4 | 0.98 | Quick win |
| 5 | **P38 Integrated allocation** | 5 | 5 | 6 | 5 | 0.56 | Transformational |
| 6 | P08 Maternal referral | 6 | 6 | 5 | 6 | 0.45 | Quick win |
| 7 | P06 NCD cascade | 7 | 7 | 7 | 7 | 0.00 | Quick win |
| 8 | P28 Emergency/critical care | 8 | 8 | 9 | 8 | 0.00 | Medium-term |
| 9 | P02 HIV prevention | 11 | 9 | 8 | 10 | 0.00 | Quick win |
| 10 | P26 Financing formula | 10 | 11 | 11 | 9 | 0.00 | Strategic |
| 11 | P05 AMR attributable | 9 | 10 | 13 | 11 | 0.00 | Transformational |
| 12 | P10 Nutrition multisector | 13 | 13 | 10 | 12 | 0.00 | Medium-term |
| 13 | P25 Referral network | 12 | 12 | 12 | 13 | 0.00 | Medium-term |
| 14 | P20 Suicide portfolio | 14 | 14 | 14 | 14 | 0.00 | Strategic |
| 15 | P19 Poisoning/means | 15 | 15 | 16 | 15 | 0.00 | Medium-term |
| 16 | P07 Mental health workforce | 16 | 16 | 15 | 17 | 0.00 | Strategic |
| 17 | P16 Drowning | 17 | 17 | 17 | 16 | 0.00 | Strategic |
| 18 | P24 Infrastructure capital | 18 | 18 | 18 | 18 | 0.00 | Strategic |
| 19 | P03 Malaria vector | 19 | 19 | 19 | 19 | 0.00 | Medium-term |
| 20 | P17 Burns | 20 | 20 | 20 | 20 | 0.00 | Strategic |

## 3. Cross-method comparison (robustness)

Spearman rank correlations between methods:

| Pair | ρ | Pair | ρ |
|---|---|---|---|
| AHP ~ BWM | 0.995 | BWM ~ TOPSIS | 0.982 |
| AHP ~ TOPSIS | 0.970 | BWM ~ PROMETHEE | 0.992 |
| AHP ~ PROMETHEE | 0.992 | TOPSIS ~ PROMETHEE | 0.980 |

**Mean inter-method Spearman = 0.985.** The four methods agree almost completely — the top
ranking is *not* an artifact of method choice. The only material disagreement is TOPSIS
mildly favoring P08/P02 (closer to the ideal point on burden) versus the outranking methods.

## 4. Uncertainty analysis (Monte-Carlo weight perturbation, 2,000 draws)

- **P23, P15, P01** are in the top 5 in **100%** of weight draws → unconditionally robust.
- **P09** top-5 in **98%** → robust.
- **P38** (the integrated-allocation capstone) top-5 in **56%**, 90% rank CI [4–6] — its rank
  is sensitive to how much weight novelty/transformational scope receives. It is the highest
  *value*, highest *risk* project.
- **P08 Maternal** is the "bubble" project (45%) — strong but feasibility-sensitive.

## 5. Pareto frontier (impact vs feasibility)

Three projects are Pareto-efficient (non-dominated):

| Project | Impact | Feasibility | Interpretation |
|---|---|---|---|
| **P01 TB allocation** | 8.50 | 8.33 | Best feasibility on the frontier — *de-risked anchor* |
| **P23 Workforce** | 8.75 | 8.00 | Highest impact among high-feasibility — *flagship* |
| **P38 Integrated** | 9.00 | 5.67 | Maximum impact, lowest feasibility — *moonshot* |

Everything else is dominated: there exists a project at least as good on both axes. The
efficient portfolio therefore *spans* the frontier: one de-risked anchor (P01), one
high-impact flagship (P23), one moonshot (P38).

## 6. Horizon classification

| Horizon | Projects |
|---|---|
| **Quick win (6–12m)** | P23, P15, P01, P09, P08, P06, P02 |
| **Medium-term (1–3y)** | P28, P10, P25, P19, P03 |
| **Strategic (3–5y)** | P26, P20, P07, P16, P24, P17 |
| **Transformational (5–10y)** | P38, P05 |

## 7. Recommendation — Top 5 for immediate execution

1. **P23 — Health-workforce redistribution** (rank-1 in every method; P(top5)=1.00). Highest
   impact among feasible projects; directly actionable in HR/transfer cycles.
2. **P15 — RTI trauma-system optimization** (P(top5)=1.00). Anchors the Injury flagship.
3. **P01 — TB allocation** (P(top5)=1.00). Most de-risked; anchors the TB flagship.
4. **P09 — Child-survival optimization** (P(top5)=0.98). High burden, strong data.
5. **P38 — Integrated allocation capstone** (P(top5)=0.56). Highest-value moonshot; start as a
   methods/architecture track now so it matures by the time the demonstrators deliver.

**Alignment with the Director's three flagship programmes:** the computed top-5 *exactly*
covers them — P15 anchors **Injury Prevention**, P01 anchors **TB Elimination**, and
P23+P38 anchor **Health-Systems Allocation Efficiency**. The MCDA independently confirms the
flagship choice. See [E14 / centre blueprint](E14-research-centre-blueprint.md) for how the
three flagships are staffed and sequenced.
