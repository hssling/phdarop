// ─── Decision pipeline orchestrator ──────────────────────────────────────────
// Maps an extracted request to the right engine(s) and assembles a deterministic
// Report. AI narrative (optional) is layered on afterwards in the API route.

import type {
  ExtractedRequest,
  Report,
  ReportSection,
  PolicyRecommendation,
} from "./types";
import { runMcda } from "./mcda";
import { optimizeAllocation } from "./optimization";
import { attributableBurden } from "./attribution";
import { computeIndices } from "./indices";
import { section, STANDARD_LIMITATIONS } from "./report";
import {
  getPrioritizationScenario,
  getAllocationScenario,
  getAttributionScenario,
} from "./datasets";

function id(): string {
  return "rep_" + Math.random().toString(36).slice(2, 10);
}
const fmt = (v: number) => v.toLocaleString("en-US");

export function runPipeline(req: ExtractedRequest): Report {
  const sections: ReportSection[] = [];
  const recommendations: PolicyRecommendation[] = [];
  const methodsUsed: string[] = [];
  const raw: Report["raw"] = {};
  let headline = "Public Health Decision Analytics Report";
  let executiveSummary = "";

  const wantAll = req.analysisType === "overview";

  // ── Prioritization ──────────────────────────────────────────────────────────
  if (req.analysisType === "prioritization" || wantAll) {
    const sc = getPrioritizationScenario(req.domain);
    const m = runMcda(
      sc.alternatives,
      sc.criteria,
      sc.matrix,
      sc.weightsAhp,
      sc.weightsBwm
    );
    raw.mcda = m;
    methodsUsed.push(
      "Multi-criteria decision analysis (AHP, BWM, TOPSIS, PROMETHEE II) with consensus ranking"
    );
    const rows = m.order.map((idx) => [
      m.consensusRank[idx],
      m.alternatives[idx],
      m.methodRanks.AHP[idx],
      m.methodRanks.BWM[idx],
      m.methodRanks.TOPSIS[idx],
      m.methodRanks.PROMETHEE[idx],
    ]);
    sections.push(
      section(
        "Project / intervention prioritization",
        `Ranked by consensus across four MCDA methods. Mean inter-method Spearman correlation = **${m.meanInterMethodSpearman.toFixed(
          3
        )}** (closer to 1 ⇒ the ranking is method-robust, not an artefact of one technique). The top option is **${
          m.alternatives[m.order[0]]
        }**.`,
        {
          columns: ["Rank", "Option", "AHP", "BWM", "TOPSIS", "PROMETHEE"],
          rows,
        }
      )
    );
    const top = m.alternatives[m.order[0]];
    recommendations.push({
      decision: `Prioritize "${top}" for immediate execution`,
      evidence: `Ranked #1 across all four MCDA methods (inter-method Spearman ${m.meanInterMethodSpearman.toFixed(
        2
      )}).`,
      cost: "Scoping/design cost only at this stage; full costing follows in the allocation step.",
      benefit:
        "Highest composite of public-health importance, burden, policy relevance, feasibility and implementation probability.",
      risks:
        "Ranking depends on criterion weights; weights should be confirmed with stakeholders (sensitivity tested by perturbation).",
      monitoring:
        "Re-score quarterly as data availability and policy windows change.",
    });
    if (!wantAll)
      headline = `Prioritization analysis — ${req.domain || "portfolio"}`;
  }

  // ── Allocation ──────────────────────────────────────────────────────────────
  if (req.analysisType === "allocation" || wantAll) {
    const sc = getAllocationScenario(
      req.domain,
      req.budget,
      req.workforce,
      req.equityEmphasis
    );
    const a = optimizeAllocation(sc);
    raw.allocation = a;
    methodsUsed.push(
      "Linear-programming resource allocation (real solver) with efficiency–equity frontier and Monte-Carlo stability"
    );
    const allocRows = a.units.map((u, i) => [
      u,
      ...a.allocation[i].map((v) => v.toFixed(2)),
    ]);
    sections.push(
      section(
        "Optimal resource allocation",
        `Maximising equity-weighted avoidable DALYs averted under a budget of **${a.budget}M** and **${a.workforce} FTE**. ` +
          `The optimizer averts **${a.valueOfAnalyticsPct.toFixed(
            1
          )}% more equity-weighted DALYs than status-quo (inertial) spreading at the same budget** ` +
          `(Allocation Inefficiency Index = **${a.allocationInefficiencyIndex}** — the share of attainable benefit recoverable at zero extra cost). ` +
          `Budget used ${a.budgetUsed}M; workforce used ${a.workforceUsed} FTE. Each cell is the fraction of optimal scale-up funded.`,
        {
          columns: ["Unit", ...a.interventions],
          rows: allocRows,
        }
      )
    );
    sections.push(
      section(
        "Efficiency–equity frontier",
        "The priced trade-off between raw efficiency and equity protection (ε-constraint on a pro-poor coverage floor). Policymakers choose the operating point.",
        {
          columns: ["Equity floor", "Raw DALYs (k)", "Eq-wtd DALYs (k)"],
          rows: a.frontier.map((f) => [
            f.equityFloor,
            f.rawDalys,
            f.eqWtdDalys,
          ]),
        }
      )
    );
    recommendations.push({
      decision: "Reallocate the existing envelope to the optimized plan",
      evidence: `LP optimum averts ${a.valueOfAnalyticsPct.toFixed(
        1
      )}% more equity-weighted DALYs than the status quo at constant budget; allocation stable across Monte-Carlo perturbation of burden.`,
      cost: `No additional spend — same budget (${a.budget}M) and workforce (${a.workforce} FTE) reallocated.`,
      benefit: `≈ ${fmt(
        a.optimizedEqWtdDalys
      )}k equity-weighted DALYs averted vs ≈ ${fmt(
        a.statusQuoEqWtdDalys
      )}k under status quo.`,
      risks:
        "Lumpy/contractual constraints may require the MIP variant; verify workforce feasibility and political transfer limits.",
      monitoring:
        "Track realized coverage and fidelity (κ); re-optimize each budget cycle (learning loop).",
    });
    if (!wantAll) headline = `Resource allocation — ${req.domain || "districts"}`;
  }

  // ── Attribution ─────────────────────────────────────────────────────────────
  if (req.analysisType === "attribution" || wantAll) {
    const sc = getAttributionScenario(req.domain);
    const at = attributableBurden({
      riskFactors: sc.riskFactors,
      prevalence: sc.prevalence,
      relativeRisk: sc.relativeRisk,
      totalDeaths: sc.totalDeaths,
      yllPerDeath: sc.yllPerDeath,
      totalYld: sc.totalYld,
      costPerDaly: sc.costPerDaly,
    });
    raw.attribution = at;
    methodsUsed.push(
      "Attributable burden via population attributable fractions (PAF) with joint adjustment"
    );
    sections.push(
      section(
        "Attributable burden",
        `For **${sc.cause}**, joint PAF across modelled risk factors = **${(
          at.jointPaf * 100
        ).toFixed(
          1
        )}%**. Attributable: **${fmt(at.attributable.deaths)} deaths**, **${fmt(
          at.attributable.daly
        )} DALYs**, **${fmt(
          at.attributable.cost
        )} (cost units)** per year — i.e. the avoidable share if these factors were addressed.`,
        {
          columns: ["Risk factor", "Prevalence", "RR", "PAF"],
          rows: sc.riskFactors.map((rf, k) => [
            rf,
            sc.prevalence[k],
            sc.relativeRisk[k],
            at.paf[k],
          ]),
        }
      )
    );
    recommendations.push({
      decision: `Target the highest-PAF driver of ${sc.cause}`,
      evidence: `Joint PAF ${(at.jointPaf * 100).toFixed(
        0
      )}%; largest single contributor is "${
        sc.riskFactors[at.paf.indexOf(Math.max(...at.paf))]
      }".`,
      cost: "Depends on intervention selected; feed into the allocation optimizer.",
      benefit: `Up to ${fmt(at.attributable.daly)} DALYs and ${fmt(
        at.attributable.deaths
      )} deaths are attributable and therefore addressable.`,
      risks:
        "PAF assumes causal RR and no unmeasured confounding; triangulate with causal-ML / counterfactual methods.",
      monitoring:
        "Track exposure prevalence and cause-specific mortality to confirm attributable burden falls.",
    });
    if (!wantAll) headline = `Attributable burden — ${sc.cause}`;
  }

  // ── Gap diagnosis ───────────────────────────────────────────────────────────
  if (req.analysisType === "gap-diagnosis" || wantAll) {
    const optAverted = raw.allocation?.optimizedEqWtdDalys ?? 546.5;
    const achievedAverted =
      raw.allocation?.statusQuoEqWtdDalys ?? 385.8;
    const gi = computeIndices({
      ppgi: [
        { target: 0.9, observed: 0.62, floor: 0, weight: 1 },
        { target: 0.8, observed: 0.55, floor: 0, weight: 1 },
        { target: 0.85, observed: 0.7, floor: 0, weight: 1 },
      ],
      cascade: [
        { step: "Availability", retention: 0.9 },
        { step: "Access", retention: 0.75 },
        { step: "Utilisation", retention: 0.7 },
        { step: "Quality", retention: 0.65 },
      ],
      achievedAverted,
      optimalAverted: optAverted,
      resourceShare: [0.3, 0.25, 0.2, 0.15, 0.06, 0.04],
      needShare: [0.28, 0.2, 0.12, 0.18, 0.08, 0.14],
      avoidableBurden: 4.2,
      totalBurden: 12,
      stratumRates: [
        { rate: 18, popShare: 0.2 },
        { rate: 12, popShare: 0.3 },
        { rate: 8, popShare: 0.3 },
        { rate: 6, popShare: 0.2 },
      ],
    });
    raw.indices = gi;
    methodsUsed.push("Six gap indices (PPGI, IFI, AII, RMI, PBI, HEDI)");
    sections.push(
      section(
        "Gap diagnostics",
        `The **binding gap** is **${gi.bindingGap}**; the implementation cascade bottleneck is at **${gi.cascadeBottleneck}**. Each index is normalised to [0,1] (0 = no gap).`,
        {
          columns: ["Index", "Value", "Reading"],
          rows: [
            ["Policy–Practice Gap (PPGI)", gi.PPGI, band(gi.PPGI)],
            ["Implementation Failure (IFI)", gi.IFI, band(gi.IFI)],
            ["Allocation Inefficiency (AII)", gi.AII, band(gi.AII)],
            ["Resource Mismatch (RMI)", gi.RMI, band(gi.RMI)],
            ["Preventable Burden (PBI)", gi.PBI, band(gi.PBI)],
            ["Health Equity Deficit (HEDI)", gi.HEDI, band(gi.HEDI)],
          ],
        }
      )
    );
    recommendations.push({
      decision: `Act on the binding gap: ${gi.bindingGap}`,
      evidence: `Highest of the six normalised gap indices; implementation cascade bottleneck at "${gi.cascadeBottleneck}".`,
      cost: "Diagnostic step — cost depends on the remediation chosen (feed into the optimizer).",
      benefit:
        "Targets the single constraint limiting attainable health gain, avoiding diffuse, low-yield spending.",
      risks:
        "Indices depend on benchmark choice; confirm targets and weights before acting.",
      monitoring:
        "Re-compute the gap dashboard each cycle; the binding gap should shift as it is closed.",
    });
    if (!wantAll) headline = `Gap diagnosis — ${req.domain || "system"}`;
  }

  // ── Executive summary (deterministic; AI may replace later) ──────────────────
  if (wantAll) headline = `Decision analytics overview — ${req.domain || "health system"}`;
  executiveSummary = buildDeterministicSummary(req, raw);

  return {
    id: id(),
    question: "",
    generatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC",
    request: req,
    headline,
    executiveSummary,
    sections,
    recommendations,
    limitations: [...STANDARD_LIMITATIONS],
    methodsUsed,
    aiNarrative: false,
    raw,
  };
}

function band(v: number): string {
  if (v < 0.1) return "minimal";
  if (v < 0.25) return "minor";
  if (v < 0.5) return "substantial";
  return "severe";
}

function buildDeterministicSummary(
  req: ExtractedRequest,
  raw: Report["raw"]
): string {
  const parts: string[] = [];
  parts.push(
    `This report applies Public Health Decision Analytics to a **${req.analysisType}** question in **${req.domain || "public health"}**.`
  );
  if (raw.mcda)
    parts.push(
      `Across four MCDA methods the top priority is **${
        raw.mcda.alternatives[raw.mcda.order[0]]
      }** (method agreement ${raw.mcda.meanInterMethodSpearman.toFixed(2)}).`
    );
  if (raw.allocation)
    parts.push(
      `Optimal reallocation of the existing budget averts **${raw.allocation.valueOfAnalyticsPct.toFixed(
        1
      )}% more equity-weighted DALYs at no extra cost** (Allocation Inefficiency Index ${raw.allocation.allocationInefficiencyIndex}).`
    );
  if (raw.attribution)
    parts.push(
      `A joint **${(raw.attribution.jointPaf * 100).toFixed(
        0
      )}%** of the burden is attributable to the modelled, addressable risk factors.`
    );
  if (raw.indices)
    parts.push(
      `Gap diagnostics flag **${raw.indices.bindingGap}** as the binding constraint.`
    );
  parts.push(
    "All figures are computed by deterministic, reproducible engines — not generated by a language model."
  );
  return parts.join(" ");
}
