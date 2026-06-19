# Contributing

Thanks for helping build the open science of Public Health Decision Analytics.

## Ground rules
1. **The analytical core stays deterministic.** Anything in `lib/phda/` must be a pure,
   testable function. No LLM calls, no randomness without a fixed seed. Numbers shown to
   decision-makers must be reproducible.
2. **AI never invents numbers.** `lib/ai/` may classify questions and write prose, strictly
   grounded on computed facts, always with a deterministic fallback.
3. **Every change keeps CI green:** `npm run typecheck && npm run build` must pass.

## Dev workflow
```bash
npm install
npm run dev
npm run typecheck     # before pushing
npm run lint
```
Work on a branch; open a PR to `main`. CI runs lint → typecheck → build → smoke test.

## Adding a new engine / analysis type
1. Add the pure engine in `lib/phda/<name>.ts` with explicit inputs/outputs in `types.ts`.
2. Add a calibrated scenario in `datasets.ts` (and document its provenance).
3. Wire it into `pipeline.ts` (new `analysisType` branch + report section + recommendation).
4. Extend `heuristicExtract` (keywords) and the AI schema in `extract.ts`.
5. Surface KPIs in `components/ReportView.tsx` if useful.
6. Document it in `docs/METHODS.md`.

## Replacing demo data with real data
`datasets.ts` is the seam. Implement connectors to your Master Analytical Database
(HMIS/NFHS/GBD/programme data) returning the same scenario shapes. See
[engines/E04-data-ecosystem.md](engines/E04-data-ecosystem.md).

## Code style
TypeScript strict mode; small pure functions; comments explain *why*, not *what*. Match the
surrounding style.

## Reporting issues
Include the question asked, the returned `report.id`, and whether AI was enabled.
