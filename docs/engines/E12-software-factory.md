# Engine 12 — Software Factory: The PHDA Platform

An open-source software ecosystem that automates the entire decision pipeline, named
**OptiHealth** (working title). Ten modules, one data spine, one decision API.

## 1. Module map

| # | Module | Function | Key libs |
|---|---|---|---|
| 1 | **Ingestion** | Connectors (API/file/DB), schema contracts, ELT | Airbyte/Meltano, dlt |
| 2 | **Quality control** | Validation, anomaly detection, completeness, lineage | Great Expectations, pandera |
| 3 | **Analytics core** | Burden, decomposition, descriptive epi | pandas, polars, statsmodels |
| 4 | **Bayesian modelling** | SAE, hierarchical, attribution posteriors | PyMC, NumPyro, Stan |
| 5 | **Decision analytics** | MCDA (8 methods), CEA/ECEA, VoI | custom (E08), `pymcdm` |
| 6 | **Optimization** | LP/MIP/multi-obj/metaheuristic | PuLP, OR-Tools, Pyomo, pymoo |
| 7 | **Visualization** | Maps, frontiers, dashboards | Plotly, deck.gl, kepler.gl |
| 8 | **Policy simulation / Digital twin** | ABM/SD/network scenarios | Mesa, PySD, NetworkX |
| 9 | **Report generation** | Auto policy briefs, manuscripts | Quarto, Jinja, WeasyPrint |
| 10 | **AI-assisted recommendations** | NL query → analysis → explained recommendation | LLM + guardrails, RAG over MADB |

## 2. Architecture

```
        ┌──────────────────────────── PRESENTATION ───────────────────────────┐
        │  Web app (Next.js) · Dashboards · NL "ask the system" · Report PDFs  │
        └───────────────┬─────────────────────────────────────────────────────┘
                        │ REST/GraphQL + WebSocket (long jobs)
        ┌───────────────▼──────────── APPLICATION / API ──────────────────────┐
        │ FastAPI gateway · auth/RBAC · job queue (Celery/Redis) · audit log   │
        └───────┬─────────────┬──────────────┬───────────────┬────────────────┘
       analytics        bayesian        optimization      twin/sim   (workers)
                │             │              │               │
        ┌───────▼─────────────▼──────────────▼───────────────▼────────────────┐
        │            DATA SPINE: Lakehouse (Bronze/Silver/Gold) + MADB         │
        │   PostGIS · object store (Parquet) · feature store · model registry  │
        └──────────────────────────────────────────────────────────────────────┘
```

- **Stateless compute workers** (Fluid-Compute / containerized) scale per job type.
- **Model registry** (MLflow) versions every Bayesian/optimization model + its data snapshot
  → full reproducibility of any past recommendation.

## 3. Database schema (MADB core DDL sketch)

```sql
CREATE TABLE dim_geo (geo_id BIGINT PRIMARY KEY, lgd_code TEXT, name TEXT,
  level TEXT, parent_id BIGINT, geom GEOMETRY(MultiPolygon,4326),
  remoteness REAL, wealth_index REAL);
CREATE TABLE dim_facility (fac_id BIGINT PRIMARY KEY, geo_id BIGINT REFERENCES dim_geo,
  type TEXT, level INT, emonc_ready BOOL, icu_beds INT, geom GEOMETRY(Point,4326));
CREATE TABLE dim_cause (cause_id INT PRIMARY KEY, gbd_code TEXT, name TEXT, parent_id INT);
CREATE TABLE dim_intervention (int_id INT PRIMARY KEY, name TEXT, efficacy REAL,
  unit_cost NUMERIC, cadre_needs JSONB);
CREATE TABLE fact_burden (geo_id BIGINT, cause_id INT, year INT,
  deaths REAL, yll REAL, yld REAL, daly REAL, daly_lo REAL, daly_hi REAL,
  PRIMARY KEY (geo_id,cause_id,year));
CREATE TABLE fact_workforce (fac_id BIGINT, cadre TEXT, year INT,
  sanctioned INT, filled INT, functional INT, PRIMARY KEY(fac_id,cadre,year));
CREATE TABLE bridge_attribution (cause_id INT, risk_id INT, geo_id BIGINT, year INT,
  paf_mean REAL, paf_lo REAL, paf_hi REAL);
```

## 4. API design (decision-oriented endpoints)

```
POST /v1/burden/estimate        {geo, cause, model}        -> posterior summary
POST /v1/attribution/paf        {cause, risks, geo}        -> attributable burden + CI
POST /v1/mcda/rank              {alternatives, criteria, weights, methods[]} -> rankings+consensus
POST /v1/optimize/allocate      {budget, workforce, equity_weights, constraints} -> x*, frontier
POST /v1/twin/simulate          {scenario, horizon}        -> trajectories + CI
POST /v1/report/brief           {analysis_id, audience}    -> policy brief PDF
POST /v1/ask                    {nl_query}                 -> routed analysis + explanation
GET  /v1/runs/{id}              -> full provenance (data snapshot, model, params)
```

## 5. Technology stack

- **Backend:** Python 3.13, FastAPI, Pyomo/OR-Tools, PyMC/NumPyro, Mesa.
- **Data:** PostgreSQL+PostGIS, DuckDB/Parquet lakehouse, Redis, MLflow.
- **Frontend:** Next.js (App Router), deck.gl/Plotly, shadcn/ui.
- **Infra:** containerized workers, IaC, CI/CD, observability; deployable on cloud or
  on-prem (ministry data-sovereignty).
- **AI layer:** LLM via gateway with strict tool-calling guardrails; RAG grounded in MADB +
  method docs; every recommendation cites its computation run.

## 6. Deployment roadmap (compressed)

1. **Wave 0 (weeks):** core MADB + ingestion + Bayesian + optimization + a single flagship
   dashboard (workforce or TB). CLI + minimal web.
2. **Wave 1:** MCDA + report generation + twin (single district).
3. **Wave 2:** AI-assisted layer, multi-state, role-based access, public data portal.

## 7. Open-source strategy

- Permissive core (Apache-2.0); **public goods** posture for ministries/researchers.
- Governance: open RFCs, semantic versioning, reproducibility CI (every PR must reproduce a
  reference result), `GATHER`/`CHEERS`-aware report templates.
- Community: documented method modules so each new study contributes a reusable component —
  the platform compounds in value with every project (Parts 2/9).
