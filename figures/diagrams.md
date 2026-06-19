# PHDAROP — Framework, Causal, and Architecture Diagrams

All diagrams in one place (Mermaid + ASCII). Referenced throughout Parts 1–12 and engines E01–E14.

## 1. The Avoidable-Burden Decision Chain (ABDC) — master framework

```mermaid
flowchart LR
  D[(Data / MADB)] --> B[1. Burden<br/>B_idt]
  B --> A[2. Attribute<br/>PAF, CFA, η]
  A --> AV[3. Avoidable<br/>Δ = B − B*]
  AV --> O[4. Optimize<br/>max A&#40;x&#41;]
  O --> V[5. Value of Info<br/>EVPI gate]
  V --> DEC[6. Decide<br/>MCDA → d*]
  DEC --> IMP[7. Implement<br/>fidelity κ]
  IMP --> RE[8. Re-measure<br/>B']
  RE -.feedback.-> B
```

## 2. Conceptual model — the master objective (annotated)

```
            equity weight   avoidable burden   realized effectiveness   decision
                  │                │                    │                  │
   A(x) =  Σ Σ   w_i      ·      Δ_ij        ·        a_ij        ·      x_ij
          i j
   s.t.   Σ cost·x ≤ Budget ,  Σ wf·x ≤ Workforce ,  equity floor ,  x ∈ F
   ───────────────────────────────────────────────────────────────────────────
   Part 4 gives Δ · Part 5 gives a · Part 3 measures the gap · Part 6/E09 solves for x*
```

## 3. Causal pathway (workforce → avoidable burden) — DAG

```mermaid
graph LR
  REMOTE[Remoteness] --> STAFF[Staffing]
  POL[Political/seniority] --> STAFF
  INFRA[Infrastructure] --> STAFF
  INFRA --> CARE[Effective care]
  STAFF --> CARE
  DEMAND[Care-seeking] --> CARE
  REMOTE --> DEMAND
  WEALTH[Wealth] --> DEMAND
  WEALTH --> PRIV[Private substitution] --> CARE
  CARE --> BURDEN[Avoidable mortality/DALYs]
  REMOTE --> BURDEN
  WEALTH --> BURDEN
```

## 4. Systems map — causal-loop (workforce dynamics)

```mermaid
graph TD
  S[Staffing high-need sites] -->|+| C[Effective coverage]
  C -->|+| O[Outcomes/trust]
  O -->|+| Dm[Demand]
  Dm -->|+| W[Workload]
  W -->|-| R[Retention/morale]
  R -->|+| S
  INC[Retention incentives] -->|+| R
  POL[Need-based policy] -->|+| S
  AUD[Functionality audit] -->|+| C
```

## 5. Decision pipeline (11 stages) — see Part 7 for the full annotated version

```mermaid
flowchart TD
  P1[1 Problem ID] --> P2[2 Contributors] --> P3[3 Attributable Δ] --> P4[4 Interventions]
  P4 --> P5[5 Evidence synth] --> P6[6 MCDA] --> VOI{VoI gate} --> P7[7 Optimize]
  P7 --> P9[9 Twin stress-test] --> P8[8 Policy recommend] --> P10[10 Monitor] --> P11[11 Evaluate]
  P11 -. feedback .-> P1
```

## 6. Software architecture — see E12/Part 8

```mermaid
flowchart TD
  UI[Presentation: web · dashboards · NL query · PDF briefs]
  API[API/App: FastAPI gateway · RBAC · job queue · audit]
  subgraph Workers
    AN[Analytics] ; BY[Bayesian] ; OP[Optimization] ; TW[Twin/Sim]
  end
  DATA[(Data spine: lakehouse · PostGIS · MADB · model registry)]
  UI --> API --> Workers --> DATA
  Workers --> API --> UI
```

## 7. Optimizer ⇄ Digital-twin loop (signature method)

```mermaid
flowchart LR
  OPT[Optimizer E09<br/>proposes x*] --> TWIN[Digital twin E10<br/>simulates under uncertainty]
  TWIN -->|realized DALYs, congestion, failure modes| OPT
  TWIN --> OUT[Dynamic-robust allocation]
```

## 8. Three flagship programmes (org → projects)

```mermaid
flowchart TD
  C[C-PHDA] --> F1[F1 Injury Prevention]
  C --> F2[F2 TB Elimination]
  C --> F3[F3 Allocation Efficiency]
  F1 --> P15[P15 RTI]; F1 --> P16[P16 Drowning]; F1 --> P20[P20 Suicide]
  F2 --> P01[P01 TB allocation]
  F3 --> P23[P23 Workforce]; F3 --> P26[P26 Financing]; F3 --> P38[P38 Integrated capstone]
```

## 9. Efficiency–equity frontier (schematic; computed values in E09)

```
 raw DALYs
 averted │ ●───●───●───●───●───●───●───●───●
   (k)   │                                  ●╮  equity protection
         │                                    ╰●  costs ~3% efficiency
         └────────────────────────────────────────► equity floor (0 → 1)
         the policymaker chooses the operating point on this curve
```

All Mermaid blocks render in GitHub/most markdown viewers; ASCII fallbacks are provided where
layout matters.
