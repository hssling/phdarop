# Deployment

## Prerequisites
- Node.js ≥ 20, npm.
- (Optional) a Vercel account and the Vercel CLI (`npm i -g vercel`) for CLI deploys.
- (Optional) a Vercel **AI Gateway** key for the AI layer.

## Local
```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production build locally
```

## Environment variables
| Var | Required | Purpose |
|---|---|---|
| `AI_GATEWAY_API_KEY` | No | Enables AI question-parsing + narrative via Vercel AI Gateway. Auto-injected on Vercel with OIDC. |
| `PHDA_MODEL` | No | Gateway model id, e.g. `anthropic/claude-sonnet-4.5`, `openai/gpt-4o-mini`. |
| `PHDA_DETERMINISTIC` | No | Set `1` to disable all AI calls. CI uses this. |

Copy `.env.example` → `.env.local` for local dev. **The app runs fully without any of these.**

## Deploy to Vercel — Option A (recommended)
1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo. Framework auto-detects (Next.js).
3. Add env vars (optional) → Deploy. Every push gets a preview URL; `main` → production.

This uses Vercel's native Git integration with **Fluid Compute** (the `/api/analyze` function
runs full Node.js with up to the configured `maxDuration`). No `vercel.json` changes needed
beyond the included function duration override.

## Deploy to Vercel — Option B (CI/CLI)
Set repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. The
[`deploy.yml`](../.github/workflows/deploy.yml) workflow runs on `main`:
`vercel pull → vercel build --prod → vercel deploy --prebuilt --prod`. It **self-skips** if
`VERCEL_TOKEN` is absent.

Manual CLI:
```bash
vercel            # preview
vercel --prod     # production
```

## Modern config note (`vercel.ts`)
This repo ships a minimal `vercel.json` for maximum compatibility. You may migrate to the
TypeScript-native [`vercel.ts`](https://vercel.com/docs/project-configuration/vercel-ts)
(`npm i @vercel/config`) for dynamic config — functionally equivalent for this app.

## Other hosts
Any Node host works: `npm run build && npm start`. Ensure the `/api/analyze` route runs on a
Node (not edge-only) runtime — it already declares `export const runtime = "nodejs"`.

## Post-deploy smoke test
```bash
curl https://YOUR-APP/api/health
curl -X POST https://YOUR-APP/api/analyze -H "Content-Type: application/json" \
  -d '{"question":"Diagnose the biggest gaps in our health system."}'
```
