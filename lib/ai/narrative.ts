// ─── Narrative enrichment ────────────────────────────────────────────────────
// Optionally rewrites the executive summary and a policy brief in fluent prose,
// strictly grounded on the COMPUTED numbers passed in. If AI is unavailable the
// deterministic summary already produced by the pipeline is used unchanged.

import type { Report } from "../phda/types";

const AI_DISABLED =
  process.env.PHDA_DETERMINISTIC === "1" ||
  (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN);

export async function enrichNarrative(report: Report): Promise<Report> {
  if (AI_DISABLED) return report;
  try {
    const { generateText } = await import("ai");
    const model = process.env.PHDA_MODEL || "anthropic/claude-sonnet-4.5";

    const grounding = JSON.stringify(
      {
        question: report.question,
        analysisType: report.request.analysisType,
        domain: report.request.domain,
        headlineFacts: facts(report),
        recommendations: report.recommendations.map((r) => r.decision),
      },
      null,
      2
    );

    const { text } = await generateText({
      model,
      prompt:
        "You are a public-health policy writer. Write a tight, decision-focused executive " +
        "summary (120-180 words) for a minister/programme officer. Use ONLY the computed facts " +
        "in the JSON below — never invent numbers. Be concrete about the avoidable burden and " +
        "the no-extra-cost gain where present. Plain, authoritative prose; no markdown headers.\n\n" +
        grounding,
    });
    if (text && text.trim().length > 40) {
      return { ...report, executiveSummary: text.trim(), aiNarrative: true };
    }
    return report;
  } catch {
    return report;
  }
}

function facts(report: Report): Record<string, unknown> {
  const f: Record<string, unknown> = {};
  const r = report.raw;
  if (r.mcda)
    f.topPriority = {
      option: r.mcda.alternatives[r.mcda.order[0]],
      methodAgreementSpearman: Number(
        r.mcda.meanInterMethodSpearman.toFixed(2)
      ),
    };
  if (r.allocation)
    f.allocation = {
      valueOfAnalyticsPct: r.allocation.valueOfAnalyticsPct,
      allocationInefficiencyIndex: r.allocation.allocationInefficiencyIndex,
      optimizedEqWtdDalysK: r.allocation.optimizedEqWtdDalys,
      statusQuoEqWtdDalysK: r.allocation.statusQuoEqWtdDalys,
      budget: r.allocation.budget,
      workforce: r.allocation.workforce,
    };
  if (r.attribution)
    f.attribution = {
      jointPafPct: Number((r.attribution.jointPaf * 100).toFixed(0)),
      attributableDeaths: r.attribution.attributable.deaths,
      attributableDalys: r.attribution.attributable.daly,
    };
  if (r.indices) f.bindingGap = r.indices.bindingGap;
  return f;
}
