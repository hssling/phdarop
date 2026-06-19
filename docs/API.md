# API Reference

Base URL: your deployment origin (e.g. `https://phdarop.vercel.app`).

## `POST /api/analyze`

Run a full decision analysis on a natural-language question.

### Request
```json
{ "question": "Where should we allocate the TB budget across districts to avert the most deaths?" }
```
- `question` *(string, required, ≤2000 chars)* — plain-language public-health decision question.

### Response `200`
```json
{
  "report": {
    "id": "rep_ab12cd34",
    "question": "...",
    "generatedAt": "2026-06-19 10:42 UTC",
    "request": { "analysisType": "allocation", "domain": "TB", "equityEmphasis": "high", "source": "ai", "confidence": 0.9 },
    "headline": "Resource allocation — TB",
    "executiveSummary": "...",
    "sections": [ { "heading": "...", "body": "...", "table": { "columns": [], "rows": [] } } ],
    "recommendations": [ { "decision": "...", "evidence": "...", "cost": "...", "benefit": "...", "risks": "...", "monitoring": "..." } ],
    "methodsUsed": ["..."],
    "limitations": ["..."],
    "aiNarrative": true,
    "raw": { "mcda": {}, "allocation": {}, "attribution": {}, "indices": {} }
  },
  "markdown": "# Resource allocation — TB\n..."
}
```

`raw` holds the full computed objects (rankings, allocation matrix, frontier, stability, PAFs,
indices) for programmatic consumers.

### Errors
| Status | Meaning |
|---|---|
| `400` | Missing/invalid `question` or malformed JSON |
| `500` | Analysis failure (returns `{ error, detail }`) |

### Analysis types (auto-detected)
`prioritization` · `allocation` · `attribution` · `gap-diagnosis` · `overview` (runs all).

## `GET /api/health`
```json
{ "status": "ok", "service": "phdarop", "aiEnabled": false, "time": "..." }
```

## Notes
- The endpoint works with **no API keys** (deterministic mode). Set `AI_GATEWAY_API_KEY` to
  enable AI question-parsing and narrative; set `PHDA_DETERMINISTIC=1` to force it off.
- All numeric outputs are computed by the engines in `lib/phda/` and are reproducible.
