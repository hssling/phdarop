// ─── GET /api/health ─────────────────────────────────────────────────────────
// Lightweight readiness probe used by CI smoke tests and uptime checks.

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "phdarop",
    aiEnabled:
      process.env.PHDA_DETERMINISTIC !== "1" &&
      Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN),
    time: new Date().toISOString(),
  });
}
