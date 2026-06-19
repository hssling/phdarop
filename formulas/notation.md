# PHDAROP Master Notation Register

A single, shared symbol set used across all Parts so the *burden → attribution → optimization → decision* chain is mathematically continuous.

## Indices and sets

| Symbol | Meaning |
|---|---|
| $i \in \mathcal{I}$ | Geographic unit (district, block, facility catchment) |
| $j \in \mathcal{J}$ | Intervention / programme option |
| $k \in \mathcal{K}$ | Risk factor / contributor / exposure |
| $s \in \mathcal{S}$ | Population stratum (age × sex × wealth quintile × social group) |
| $t \in \mathcal{T}$ | Time period (year/quarter) |
| $d \in \mathcal{D}$ | Disease / cause |
| $r$ | Resource type (budget, workforce cadre, bed, device) |

## Burden quantities

| Symbol | Meaning | Unit |
|---|---|---|
| $B_{idt}$ | Total burden (deaths, DALYs) in unit $i$, cause $d$, time $t$ | deaths or DALY |
| $M_{idt}$ | Mortality count | deaths |
| $Y_{idt}$ | YLL + YLD | DALY |
| $N_{ist}$ | Population at risk | persons |
| $\mu_{ist}$ | Incidence/mortality rate | per 100k |

## Attribution quantities (Part 4)

| Symbol | Meaning |
|---|---|
| $\mathrm{PAF}_{k}$ | Population attributable fraction for risk factor $k$ |
| $\eta_{k\to d}$ | Mediated / pathway-specific attributable share |
| $\mathrm{RR}_{k}$ | Relative risk for exposure $k$ |
| $p_{k}$ | Prevalence of exposure $k$ |
| $B^{*}_{idt}$ | Counterfactual burden under ideal exposure/coverage |
| $\Delta_{idt} = B_{idt} - B^{*}_{idt}$ | **Avoidable (preventable) burden** |

## Coverage, effectiveness, cost (Parts 5–6)

| Symbol | Meaning |
|---|---|
| $c_{ij}$ | Coverage of intervention $j$ in unit $i$ ($0\le c \le 1$) |
| $e_{j}$ | Efficacy/effectiveness of intervention $j$ |
| $\kappa_{ij}$ | Implementation fidelity (0–1) |
| $a_{ij} = e_j \kappa_{ij}$ | Realized effectiveness |
| $\text{cost}_{ij}$ | Unit cost of delivering $j$ in $i$ |
| $\lambda$ | Cost-effectiveness threshold (cost per DALY averted) |
| $w_i$ | Equity weight for unit/stratum $i$ |

## Decision variables (Part 6)

| Symbol | Meaning |
|---|---|
| $x_{ij} \in [0,1]$ | Fraction of optimal scale-up of $j$ funded in $i$ |
| $b_i$ | Budget allocated to unit $i$ |
| $z_{f}\in\{0,1\}$ | Open facility $f$ (binary, facility-location) |
| $g_{ir}$ | Units of resource $r$ assigned to $i$ |
| $\mathbf{x}^{*}$ | Optimal allocation vector |
| $d^{*}$ | Recommended decision (policy action) |

## Gap indices (Part 3)

| Symbol | Meaning |
|---|---|
| $\mathrm{PPGI}$ | Policy–Practice Gap Index |
| $\mathrm{IFI}$ | Implementation Failure Index |
| $\mathrm{AII}$ | Allocation Inefficiency Index |
| $\mathrm{RMI}$ | Resource Mismatch Index |
| $\mathrm{PBI}$ | Preventable Burden Index |
| $\mathrm{HEDI}$ | Health Equity Deficit Index |

## Core identity used throughout

Avoidable burden averted by allocation $\mathbf{x}$:

$$
A(\mathbf{x}) \;=\; \sum_{i\in\mathcal I}\sum_{j\in\mathcal J} w_i \,\underbrace{\Delta_{ij}}_{\text{avoidable}}\, a_{ij}\, x_{ij}
\quad\text{subject to}\quad \sum_{i,j}\text{cost}_{ij}\,x_{ij}\le \mathcal B
$$

This single objective is the spine of Parts 3 (gaps = unrealized $A$), 4 ($\Delta$), 6 (maximize $A$), and 7 (decide on $\mathbf{x}^*$).
