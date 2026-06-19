// ─── Question understanding ──────────────────────────────────────────────────
// Classifies a free-text question into an ExtractedRequest. Uses the AI Gateway
// when available; always falls back to a deterministic keyword classifier so the
// app is fully functional with no API keys.

import { z } from "zod";
import type { AnalysisType, ExtractedRequest } from "../phda/types";

const AI_DISABLED =
  process.env.PHDA_DETERMINISTIC === "1" ||
  (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN);

const schema = z.object({
  analysisType: z.enum([
    "prioritization",
    "allocation",
    "attribution",
    "gap-diagnosis",
    "overview",
  ]),
  domain: z.string(),
  budget: z.number().optional(),
  workforce: z.number().optional(),
  equityEmphasis: z.enum(["low", "balanced", "high"]).optional(),
  notes: z.string().optional(),
});

export function heuristicExtract(q: string): ExtractedRequest {
  const t = q.toLowerCase();
  let analysisType: AnalysisType = "overview";
  // Allocation is checked before prioritization: "allocate ... prioritizing the
  // poor" is an allocation question even though it contains "prioriti".
  if (
    /alloc|budget|optimi|where should|distribute|deploy|spend|resourc|invest/.test(
      t
    )
  )
    analysisType = "allocation";
  else if (
    /priorit|rank|which.*(project|intervention|program|first)|shortlist|sequence/.test(
      t
    )
  )
    analysisType = "prioritization";
  else if (
    /attribut|caus|how many.*(death|daly)|preventable|avoidable|paf|burden/.test(
      t
    )
  )
    analysisType = "attribution";
  else if (/gap|inefficien|mismatch|equity deficit|bottleneck|failure/.test(t))
    analysisType = "gap-diagnosis";

  // domain detection
  const domains: [RegExp, string][] = [
    [/tb|tuberculosis/, "TB"],
    [/hiv|aids/, "HIV"],
    [/malaria/, "malaria"],
    [/dengue/, "dengue"],
    [/amr|antimicrob|resistance/, "AMR"],
    [/road|rti|traffic|trauma|crash/, "road traffic injury"],
    [/drown/, "drowning"],
    [/burn/, "burns"],
    [/fall/, "falls"],
    [/suicide|self.?harm/, "suicide"],
    [/poison|pesticide/, "poisoning"],
    [/injur/, "injury"],
    [/workforce|staff|human resourc|hrh|doctor|nurse/, "health workforce"],
    [/maternal|pregnan|obstetr/, "maternal health"],
    [/child|under.?5|neonat|infant/, "child health"],
    [/nutrition|stunt|anaemia|anemia/, "nutrition"],
    [/mental|depress|psych/, "mental health"],
    [/ncd|diabet|hypertens|cardio|cancer/, "NCDs"],
    [/climate|heat|flood/, "climate & health"],
    [/referral|emergency|critical care|icu/, "emergency care"],
    [/financ|purchas|insurance|pmjay/, "health financing"],
  ];
  let domain = "public health";
  for (const [re, name] of domains)
    if (re.test(t)) {
      domain = name;
      break;
    }

  // numeric hints
  const budgetMatch = t.match(/(\d+(?:\.\d+)?)\s*(?:m|million|cr|crore)?\s*budget|budget[^0-9]{0,12}(\d+(?:\.\d+)?)/);
  const budget = budgetMatch
    ? parseFloat(budgetMatch[1] || budgetMatch[2])
    : undefined;
  const wfMatch = t.match(/(\d+(?:\.\d+)?)\s*(?:fte|staff|workers?)/);
  const workforce = wfMatch ? parseFloat(wfMatch[1]) : undefined;

  let equityEmphasis: ExtractedRequest["equityEmphasis"] = "balanced";
  if (/equit|pro.?poor|fair|disparit|inequit/.test(t)) equityEmphasis = "high";
  if (/pure efficien|max.*daly.*only|ignore equit/.test(t))
    equityEmphasis = "low";

  return {
    analysisType,
    domain,
    budget,
    workforce,
    equityEmphasis,
    confidence: domain === "public health" ? 0.55 : 0.8,
    source: "heuristic",
  };
}

export async function extractRequest(q: string): Promise<ExtractedRequest> {
  const fallback = heuristicExtract(q);
  if (AI_DISABLED) return fallback;

  try {
    // Lazy import so the app builds/runs even if the AI SDK is absent.
    const { generateObject } = await import("ai");
    const model = process.env.PHDA_MODEL || "anthropic/claude-sonnet-4.5";
    const { object } = await generateObject({
      model,
      schema,
      prompt:
        "You route public-health decision questions to an analytics engine. " +
        "Classify the question and extract parameters. analysisType must be one of: " +
        "prioritization (rank projects/interventions), allocation (optimize resources/budget), " +
        "attribution (attributable/avoidable burden), gap-diagnosis (diagnose system gaps), " +
        "overview (general — run everything). domain = the disease/system area in 1-4 words. " +
        "budget = number in millions if stated; workforce = FTE if stated; " +
        "equityEmphasis = low|balanced|high. Question:\n" +
        q,
    });
    return {
      ...object,
      equityEmphasis: object.equityEmphasis ?? "balanced",
      confidence: 0.9,
      source: "ai",
    };
  } catch {
    return fallback;
  }
}
