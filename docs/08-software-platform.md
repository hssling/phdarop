# Part 8 — Software Platform

The open-source ecosystem. Full module map, architecture, database DDL, API, and tech stack
are specified in the **Software Factory** engine, [E12](engines/E12-software-factory.md). This Part
summarizes the design commitments that make the platform fundable and adoptable.

## 1. Nine required modules → engine mapping

Data ingestion · quality control · Bayesian modelling · decision analytics · optimization ·
visualization · policy simulation · digital twin · report generation — all specified in
[E12 §1](engines/E12-software-factory.md), with the data spine in [E04](engines/E04-data-ecosystem.md).

## 2. Architecture (summary)

Three-tier: **presentation** (Next.js web + dashboards + NL query + PDF briefs) → **API/application**
(FastAPI gateway, RBAC, job queue, audit log) → **data spine** (medallion lakehouse + PostGIS +
MADB + model registry). Stateless, scalable compute workers per job type. Full diagram in
[E12 §2](engines/E12-software-factory.md) and [figures/diagrams.md](../figures/diagrams.md).

## 3. Database design

Conformed star schema (geo × cause × time) — DDL in [E12 §3](engines/E12-software-factory.md). Every
analysis run is versioned with its data snapshot + model in MLflow → any past recommendation is
reproducible and auditable (the legitimacy requirement, Part 1 §1.4).

## 4. API structure

Decision-oriented endpoints (`/burden/estimate`, `/attribution/paf`, `/mcda/rank`,
`/optimize/allocate`, `/twin/simulate`, `/report/brief`, `/ask`, `/runs/{id}`) — full spec in
[E12 §4](engines/E12-software-factory.md). The API *is* the pipeline ([Part 7](07-decision-analytics-pipeline.md))
exposed as services.

## 5. Technology stack

Python (FastAPI, PyMC/NumPyro, Pyomo/OR-Tools, Mesa/PySD), PostgreSQL+PostGIS, DuckDB/Parquet
lakehouse, Next.js + deck.gl, MLflow, containerized infra (cloud or on-prem for data
sovereignty), LLM-via-gateway with tool-calling guardrails for the AI layer.

## 6. Design commitments (what funders/ministries care about)

- **Open-source, public-good** (Apache-2.0 core) — no vendor lock-in for ministries.
- **Reproducibility CI** — every release must reproduce reference results; every brief traces
  to a run ID.
- **Data sovereignty** — deployable on-prem; PII tokenized at ingest; DPDP-Act-aligned access tiers.
- **Composability** — each study contributes a reusable module; the platform compounds in value.
- **Uncertainty & equity native** — credible intervals and distributional impact are first-class,
  not afterthoughts.

## 7. Deployment & open-source strategy

Compressed three-wave rollout (core flagship → MCDA/twin/reports → AI layer + multi-state) and
OSS governance (RFCs, semver, community modules) in [E12 §6–7](engines/E12-software-factory.md).
The platform is both a **research instrument** (Parts 2/9) and a **deployable decision-support
product** (the World Bank/ministry contract in [Part 10](10-funding-strategy.md)).
