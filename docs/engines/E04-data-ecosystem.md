# Engine 4 — Data Ecosystem Design

Every dataset the PHDA platform ingests, plus the integration architecture and master
analytical database. India-anchored but generalizable (DHS/GBD/WB are global).

## 1. Dataset register

| Dataset | Source | Access | Key variables | Granularity | Quality concerns | Linkage keys |
|---|---|---|---|---|---|---|
| **GBD** | IHME | Open (GHDx) | Deaths, DALYs, YLL/YLD, risk PAFs | State/national, age-sex | Modelled, wide CI sub-nationally | Cause, geography, year |
| **WHO GHO** | WHO | Open API | Indicators, coverage | Country | Aggregated | ISO, year |
| **World Bank / HNP** | WB | Open API | Spending, OOP, macro, poverty | Country/state | Lag, comparability | Country, year |
| **NFHS-5/6** | IIPS/MoHFW | Public unit data | Coverage, anthropometry, mortality, wealth | District, household | Cross-sectional, recall | District code, PSU |
| **DHS** | DHS Program | Registered | As NFHS, multi-country | District/region | Survey timing | Cluster GPS |
| **NCRB (ADSI)** | NCRB | Public reports | Injury, suicide, RTI, poisoning deaths | District | Legal undercount, misclass | District, year |
| **NITI Aayog Health Index** | NITI | Public | Composite system performance | State/district | Composite opacity | State code |
| **HMIS** | MoHFW | Govt portal/API | Service volumes, staffing, stockouts | Facility/sub-centre, monthly | Reporting completeness, errors | Facility ID |
| **IDSP–IHIP** | NCDC | Govt (restricted) | Syndromic/lab surveillance, outbreaks | Block/facility, weekly | Under-reporting, delay | Facility, ICD |
| **NIKSHAY / NTEP** | CTD | Govt (restricted) | TB notifications, outcomes, DRTB | Patient/facility | Private under-notification | Nikshay ID |
| **CMIE (CPHS/Prowess)** | CMIE | Subscription | Household economics, employment | Household/firm | Panel attrition | HH ID, district |
| **Census 2011/26** | RGI | Public | Population, amenities, SC/ST | Village/ward | Vintage | Village code (LGD) |
| **SRS** | RGI | Public | Birth/death rates, life tables | State (bigger units) | Sampling | State, year |
| **NSSO / CES** | MoSPI | Public unit data | Consumption, OOP health, CHE | District | Periodicity | District, HH |
| **National Health Accounts** | NHSRC | Public | Expenditure by source/function | State | Estimation lag | State, year |
| **Insurance / PM-JAY** | NHA | Restricted | Claims, package, cost | Patient/hospital | Coding, selection | Beneficiary ID |
| **Remote sensing** | ISRO/Bhuvan, ESA | Open/registered | Land use, built-up, water | 10–30 m raster | Cloud, processing | Lat/long, tile |
| **Climate** | IMD, ERA5, CMIP6 | Open | Temp, rainfall, humidity, projections | Grid, daily–scenario | Downscaling error | Lat/long, date |
| **Satellite nightlights/PM2.5** | VIIRS, CPCB+sat | Open | Activity, pollution exposure | Grid | Calibration | Lat/long |
| **Mobility** | Telecom/aggregators, Google | Restricted/aggregate | Flows, access time | Cell/aggregate | Privacy, bias | Origin-dest, time |
| **OpenStreetMap** | OSM | Open | Roads, facilities, POIs | Vector | Completeness varies | Geometry, OSM ID |
| **HRMIS** | State NHM | Restricted | Sanctioned/filled posts, cadre | Facility/worker | Vacancy accuracy | Employee/facility ID |
| **Civil Registration (CRS/MCCD)** | RGI | Restricted | Registered deaths, medically certified cause | District | Coverage, ill-defined causes | District, ICD |

## 2. Linkage opportunities (the value is in the joins)

- **Geography spine:** LGD (Local Government Directory) + village/ward codes unify HMIS,
  Census, NFHS, GIS, climate, OSM into one **geo-key**.
- **Facility spine:** facility ID links HMIS, HRMIS, NIKSHAY, IDSP, insurance to a **node**.
- **Person spine (where governed/consented):** ABHA/beneficiary ID for cascade linkage
  (TB, NCD, claims) under privacy controls.
- **Exposure→burden:** climate/pollution grids ↔ geo-key ↔ mortality (attribution, Part 4).
- **Access:** OSM roads + facility GIS + mobility → travel-time surfaces feeding workforce
  & referral optimization (P23, P25).

## 3. Data integration architecture

```
 SOURCES                 INGESTION            STORAGE (lakehouse)        SERVING
 ───────────────         ──────────────       ───────────────────       ───────────────
 APIs / portals  ─┐
 Govt restricted ─┤      Connectors (ELT)     Bronze (raw, immutable)   Feature store
 Survey microdata ┼────► + schema contracts ─►Silver (cleaned,          (curated marts)
 GIS / raster    ─┤      + PII tokenization    conformed, geo/facility   ────► Bayesian
 Climate / sat   ─┘      + validation gates    keyed)                          models
                                               Gold (analytical marts,   ────► Optimizers
                         DQ engine (Part 8) ──► burden/cost/coverage)    ────► Dashboards
```

- **Pattern:** medallion lakehouse (Bronze→Silver→Gold).
- **Governance:** schema contracts, row-level lineage, PII tokenization at ingest, DPDP-Act
  compliant access tiers, audit log.
- **Geospatial:** PostGIS + raster tiles; travel-time precomputed via OSRM/isochrones.

## 4. Master Analytical Database (MADB) — core schema

Conformed star around the **geo × cause × time** grain (see [E12](E12-software-factory.md) for full DDL):

- `dim_geo` (LGD hierarchy, GPS, urban/rural, remoteness, wealth index)
- `dim_facility` (type, level, cadre capacity, EmONC/ICU readiness, GPS)
- `dim_cause` (GBD cause hierarchy, ICD map)
- `dim_intervention` (efficacy, unit cost, cadre needs)
- `dim_time` (year/quarter/month)
- `fact_burden` (geo, cause, time → deaths, YLL, YLD, DALY, CI bounds)
- `fact_coverage` (geo, intervention, time → coverage, fidelity κ)
- `fact_workforce` (facility, cadre, time → sanctioned, filled, functional)
- `fact_cost` (intervention, geo → unit cost, ECEA inputs)
- `fact_exposure` (geo, risk, time → prevalence, exposure level)
- `bridge_attribution` (cause × risk → PAF posterior)

This MADB is the single source feeding the attributable-burden engine ([E06](E06-attributable-burden-engine.md)),
the optimizer ([E09](E09-optimization-engine.md)), and the digital twin ([E10](E10-digital-twin.md)).
