# PHDAROP — Public Health Decision Analytics & Resource Optimization

[![CI](https://github.com/hssling/phdarop/actions/workflows/ci.yml/badge.svg)](./.github/workflows/ci.yml)
[![Deploy](https://github.com/hssling/phdarop/actions/workflows/deploy.yml/badge.svg)](./.github/workflows/deploy.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](#license)

**🔴 Live demo: [phdarop.vercel.app](https://phdarop.vercel.app)** · Research dataset on [Kaggle](https://www.kaggle.com/datasets/jkhospital/phdarop-public-health-decision-analytics)

> **Ask a public-health question in plain language → get a computed, reproducible,
> policy-grade decision report.** Prioritization, resource optimization, attributable
> burden, and gap diagnostics — powered by deterministic operations-research and
> decision-science engines, not by a language model guessing numbers.

This repository contains **two coupled things**:

1. **A deployable web app** (Next.js, Vercel-ready) that serves the analytics through a prompt interface.
2. **A 10-year research programme blueprint** (the science behind the app) — see [Research programme](#research-programme).

---

## ✨ What it does

A user types something like *"Where should we spend the district TB budget to avert the most
deaths, prioritizing poorer areas?"* and gets back a structured report containing:

- **Question understanding** — the prompt is classified (prioritization / allocation /
  attribution / gap-diagnosis / overview) and parameters extracted.
- **Computed analytics** — real algorithms run:
  - **MCDA** (AHP, BWM, TOPSIS, PROMETHEE II) with a consensus ranking + method-agreement metric.
  - **Resource optimization** (linear programming via a real solver) with an **efficiency–equity frontier** and Monte-Carlo **allocation stability**.
  - **Attributable burden** (population attributable fractions → attributable deaths/DALYs/cost).
  - **Six gap indices** (PPGI, IFI, AII, RMI, PBI, HEDI).
- **Policy recommendations** — each with evidence, cost, benefit, risks, and monitoring.
- **Downloadable Markdown report**, KPIs, tables, methods, and an honest limitations section.

### Why the outputs are trustworthy
The analytical core is **deterministic TypeScript** ported from the research engines and is
unit-reproducible. The optional AI layer (Vercel AI Gateway) only (a) interprets the question
and (b) writes prose *grounded strictly on the computed numbers*. **With no API keys at all the
app is fully functional** — it just produces the deterministic narrative instead of an AI one.

---

## 🚀 Quickstart

```bash
# 1. Install
npm install

# 2. (optional) add AI for richer question-parsing + prose
cp .env.example .env.local
#   set AI_GATEWAY_API_KEY=...   (leave blank to run deterministic-only)

# 3. Run
npm run dev
# open http://localhost:3000
```

No database, no external services required to run locally.

---

## 🧱 Architecture

```
                 ┌────────────────────────── Browser ──────────────────────────┐
                 │  app/page.tsx  (prompt UI)  →  components/ReportView.tsx     │
                 └───────────────────────────┬─────────────────────────────────┘
                                             │ POST /api/analyze { question }
                 ┌───────────────────────────▼─────────────────────────────────┐
                 │  app/api/analyze/route.ts  (Node runtime, Fluid Compute)     │
                 │   1. lib/ai/extract.ts      NL → ExtractedRequest (AI|heur.) │
                 │   2. lib/phda/pipeline.ts   orchestrates the engines         │
                 │   3. lib/ai/narrative.ts    optional grounded prose          │
                 │   4. lib/phda/report.ts     → Report JSON + Markdown         │
                 └───────────────────────────┬─────────────────────────────────┘
                 ┌───────────────────────────▼─────────────────────────────────┐
                 │  Deterministic engines (lib/phda/)                           │
                 │   mcda.ts · optimization.ts · attribution.ts · indices.ts    │
                 │   datasets.ts (calibrated scenarios → MADB in production)    │
                 └──────────────────────────────────────────────────────────────┘
```

Full detail: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · API: [docs/API.md](docs/API.md) ·
Methods: [docs/METHODS.md](docs/METHODS.md) · Deploy: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

### Tech stack
Next.js 15 (App Router) · React 19 · TypeScript · `javascript-lp-solver` (real LP) ·
Vercel AI SDK + AI Gateway (optional) · Vercel Fluid Compute · GitHub Actions CI/CD.

---

## 🔌 API

`POST /api/analyze` → `{ report, markdown }`

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"question":"Optimize a 40 million budget with 25 staff across districts, prioritizing equity."}'
```

`GET /api/health` → readiness probe (used by CI smoke test). See [docs/API.md](docs/API.md).

---

## 🌐 Deploy to Vercel

**Option A — Git integration (recommended, zero-config):**
1. Push this repo to GitHub.
2. Import it in the [Vercel dashboard](https://vercel.com/new). Framework auto-detects as Next.js.
3. (Optional) add `AI_GATEWAY_API_KEY` and `PHDA_MODEL` env vars. Done.

**Option B — CI deploy:** the included [deploy workflow](.github/workflows/deploy.yml) promotes
`main` to production using `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets. It
**self-skips** if the token is absent, so it never breaks a fork.

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Full guide incl. env vars and OIDC: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## 🔁 CI/CD

[`ci.yml`](.github/workflows/ci.yml) on every push/PR: **install → lint → typecheck → build →
smoke test** (boots the server and exercises `/api/health` and `/api/analyze`). Runs in
deterministic mode so it needs **no secrets**. [`deploy.yml`](.github/workflows/deploy.yml)
ships `main` to Vercel production after merge.

---

## 🗂 Repository layout

```
app/            Next.js App Router (UI + API routes)
components/     React components (ReportView)
lib/phda/       Deterministic analytical engines + pipeline + report builder
lib/ai/         Optional AI layer (question extraction, narrative) w/ fallback
docs/           App docs (ARCHITECTURE, API, METHODS, DEPLOYMENT, CONTRIBUTING)
                + the 10-year research programme (00–12, engines/)
code/           Python research engines (computed results that the TS core mirrors)
figures/ formulas/ outputs/   Research diagrams, notation, computed JSON
.github/workflows/   CI + deploy
```

---

## 📚 Research programme

The app operationalizes a full **10-year research blueprint** that founds a new field,
**Public Health Decision Analytics (PHDA)**. Highlights (all in `docs/` and `docs/engines/`):

- [Field creation](docs/01-field-creation.md) · [50-project portfolio](docs/02-research-portfolio.md)
- [Six gap indices](docs/03-policy-practice-gaps.md) · [Attributable burden](docs/04-attributable-burden.md)
- [Methods toolkit](docs/05-analytical-toolkit.md) · [Resource allocation](docs/06-resource-allocation.md)
- [Decision pipeline](docs/07-decision-analytics-pipeline.md) · [Software platform](docs/08-software-platform.md)
- [100 manuscripts](docs/09-publication-strategy.md) · [Funding strategy](docs/10-funding-strategy.md)
- [Implementation roadmap](docs/11-implementation-roadmap.md) · [Future vision](docs/12-future-vision.md)
- **Engines E01–E14** (computed): [prioritization](docs/engines/E01-prioritization-engine.md),
  [optimization](docs/engines/E09-optimization-engine.md), … see [docs/engines/](docs/engines/).

**Headline computed result** (reproducible, `code/optimization_engine.py` and the TS core):
optimal reallocation averts **+41.7% equity-weighted DALYs at constant budget**
(Allocation Inefficiency Index ≈ 0.29); MCDA methods agree at Spearman ≈ 0.985.

---

## ⚠️ Responsible use

This is decision-*support*. Demonstration scenarios use calibrated illustrative parameters;
**replace them with your Master Analytical Database (HMIS/NFHS/GBD/programme data) before any
real allocation decision.** Equity weights are normative and should be set deliberatively with
an explicit floor. Every report ships its assumptions, uncertainty, and limitations.

## License

Apache-2.0. See [LICENSE](LICENSE).

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).
