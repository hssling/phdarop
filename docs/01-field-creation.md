# Part 1 — Field Creation: Public Health Decision Analytics (PHDA)

## 1.1 Naming the field

**Chosen name: Public Health Decision Analytics (PHDA).**

Candidates considered and rejected:
- *Computational Public Health* — too tool-centric; omits the normative/decision core.
- *Health Systems Optimization Science* — omits causal attribution and equity.
- *Decision Epidemiology* — elegant but understates economics and operations.

PHDA is chosen because it names the three irreducible commitments of the field:
**Public health** (population welfare and equity as the objective), **Decision** (the unit
of analysis is an actionable allocation, not merely an estimate), and **Analytics** (the
method is quantitative, causal, and optimizing).

## 1.2 Philosophy

PHDA rests on five philosophical commitments:

1. **Consequentialist with a deontic floor.** The objective is to maximize population
   health, but subject to inviolable equity constraints (no stratum's burden may be traded
   below a floor). Pure utilitarianism is rejected; pure egalitarianism is unaffordable.
   PHDA formalizes the compromise as *constrained welfare maximization with equity weights*.

2. **Counterfactual realism.** A burden is only a *problem* relative to an achievable
   alternative world. PHDA refuses to treat raw burden as the target; it targets the
   **avoidable** fraction, defined against an explicit, defensible counterfactual.

3. **Decisions over estimates.** An estimate that cannot change an allocation is, for PHDA,
   incomplete. Every analysis terminates in a recommended action with quantified
   uncertainty and a value-of-information statement.

4. **Honest uncertainty.** Bayesian by default. Point estimates without posteriors are
   treated as malpractice in a field whose outputs move budgets.

5. **Systems over silos.** Interventions interact, resources are shared, and feedback loops
   dominate. PHDA models the health system as a complex adaptive system, not a list of
   independent programmes.

## 1.3 Theoretical foundations

PHDA is built on four theoretical pillars, each contributing a formal object:

| Pillar | Source disciplines | Formal contribution |
|---|---|---|
| **Causal-counterfactual theory** | Epidemiology, Rubin/Pearl causal inference | The avoidable burden $\Delta = B - B^{*}$ |
| **Welfare-optimization theory** | Welfare economics, operations research | The constrained objective $\max A(\mathbf{x})$ |
| **Decision theory under uncertainty** | Bayesian decision science, MCDA | The optimal act $d^{*}=\arg\max_d \mathbb{E}[U]$ |
| **Complex-systems & implementation theory** | Complexity science, implementation science | The realized-effectiveness operator $a = e\cdot\kappa$ |

These four combine into the **PHDA master program**:

$$
d^{*} \;=\; \arg\max_{\mathbf{x}\in\mathcal{F}} \;\mathbb{E}_{\theta\sim p(\theta\mid \text{data})}\Big[\sum_{i,j} w_i\,\Delta_{ij}(\theta)\,a_{ij}(\theta)\,x_{ij}\Big]
$$

subject to budget, workforce, equity-floor, and feasibility constraints $\mathcal{F}$,
with $\theta$ the full posterior over epidemiologic, economic, and implementation parameters.

## 1.4 Epistemological basis

PHDA's epistemology is **decision-relevant Bayesian pragmatism**:

- **Truth criterion:** a model is "good enough" when further data collection would not
  change the recommended decision (formalized via Expected Value of Perfect Information).
- **Evidence hierarchy is reorganized by decision leverage**, not by study design alone.
  A well-identified natural experiment that moves an allocation outranks an RCT that
  cannot be generalized to the decision context.
- **Triangulation as validity.** Causal claims must survive at least two independent
  identification strategies (e.g., PAF + difference-in-differences) before they enter an
  optimization.
- **Transparency as legitimacy.** Because PHDA outputs are normative (they move money),
  every recommendation ships with its assumptions, equity weights, and a sensitivity
  dashboard. Reproducibility is a *political* requirement, not only a scientific one.

## 1.5 Historical evolution (the lineage PHDA synthesizes)

```
1662  Graunt/Petty — "Political Arithmetick": counting deaths as governance
1854  Snow — spatial attribution of cholera to a water source
1947  Operations Research — wartime resource allocation under constraint
1968  Cochrane — "Effectiveness and Efficiency"
1972  Rubin — potential-outcomes causal inference
1977  WHO — Health For All / district health systems
1993  World Bank — DALYs and the Global Burden of Disease
2000s GBD scales; CEA institutionalized (NICE, DCP)
2010s Causal ML; precision public health; implementation science formalized
2020  COVID-19 — exposes the decision layer globally; modelling enters policy
2026  PHDA — unifies attribution + optimization + decision into one science
```

PHDA is the synthesis step: each ancestor contributed a *piece* (counting, attribution,
optimization, valuation, implementation), but none owned the **continuous chain**.

## 1.6 Conceptual framework

The **Avoidable-Burden Decision Chain (ABDC)** — the central framework:

```
        ┌─────────────┐   ┌──────────────┐   ┌───────────────┐   ┌──────────────┐
 DATA ─►│  1. BURDEN  │─► │ 2. ATTRIBUTE │─► │ 3. AVOIDABLE  │─► │ 4. OPTIMIZE  │
        │   B_idt     │   │  PAF, η      │   │   Δ = B − B*  │   │   max A(x)   │
        └─────────────┘   └──────────────┘   └───────────────┘   └──────┬───────┘
                                                                        │
        ┌─────────────┐   ┌──────────────┐   ┌───────────────┐   ┌──────▼───────┐
        │ 8. RE-MEAS. │◄─ │ 7. IMPLEMENT │◄─ │ 6. DECIDE     │◄─ │ 5. VALUE OF  │
        │   B'        │   │   fidelity κ │   │   d* (MCDA)   │   │   INFO       │
        └──────┬──────┘   └──────────────┘   └───────────────┘   └──────────────┘
               │
               └────────────────► feedback to 1 (learning health system)
```

Each box maps to a Part of this programme (Parts 3–7) and a module of the software
platform (Part 8). The loop closes into a **learning health system**.

## 1.7 Methodological foundations

PHDA inherits and integrates five method families (detailed in [Part 5](05-analytical-toolkit.md)):

1. **Burden & attribution** — decomposition, PAF, counterfactual modelling, mediation.
2. **Bayesian inference** — hierarchical models, small-area estimation, posterior decision.
3. **Causal inference & causal ML** — DAGs, targeted learning, double ML, RL for policy.
4. **Optimization** — LP, MIP, facility location, queueing, network flow.
5. **Decision analysis** — CEA/ECEA, MCDA (AHP/BWM/TOPSIS/PROMETHEE/ELECTRE), VoI.

The integration principle: **shared parameters and shared uncertainty.** The posterior from
the Bayesian burden model *is* the uncertainty propagated into the optimizer; the optimizer's
shadow prices *are* the value-of-information signals fed back to data collection.

## 1.8 Applications

- National/state **resource reallocation** within fixed envelopes.
- **Gap diagnostics** (Part 3 indices) for accountability dashboards.
- **Outbreak and surge** allocation (beds, oxygen, staff) under uncertainty.
- **Intervention portfolio selection** under budget and workforce ceilings.
- **Equity audits** with quantified deficit and remediation cost.
- **Digital twins** of districts for counterfactual policy simulation.

## 1.9 Limitations (stated honestly)

- **Data quality ceiling.** Optimization is only as honest as the burden posterior;
  garbage-in propagates. PHDA mitigates with explicit measurement-error models, not denial.
- **Counterfactual contestability.** The choice of $B^{*}$ is normative; PHDA makes it
  explicit and offers a menu (frontier, peer-benchmark, biological-minimum) rather than
  hiding one.
- **Optimization can entrench measured inequity** if equity weights are mis-set; hence the
  deontic floor and mandatory equity dashboards.
- **Behavioral and political feasibility** are partially outside the model; PHDA couples to
  implementation science but cannot guarantee uptake.
- **Model multiplicity / researcher degrees of freedom.** Addressed by pre-registration of
  the decision model and multiverse sensitivity analysis.

## 1.10 Future directions

- **Causal foundation models** for health systems trained on multi-country routine data.
- **Real-time learning health systems** where allocation updates monthly from new data.
- **Mechanism-design extensions** for incentive-compatible allocation across agencies.
- **Planetary-health coupling** linking climate/One-Health drivers into the burden model.
- **Global PHDA commons** — shared, federated, privacy-preserving decision infrastructure.

See [figures/diagrams.md](../figures/diagrams.md) for the full framework, causal-pathway, and
architecture diagrams.
