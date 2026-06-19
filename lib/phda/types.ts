// ─── PHDA shared types ───────────────────────────────────────────────────────
// These mirror the master notation register (formulas/notation.md) so the web
// app and the research engines speak the same language.

export type AnalysisType =
  | "prioritization" // rank projects/interventions (MCDA)
  | "allocation" // optimize resources across units (LP/MIP)
  | "attribution" // attributable burden (PAF / counterfactual)
  | "gap-diagnosis" // compute the six gap indices
  | "overview"; // full pipeline summary across all of the above

export interface ExtractedRequest {
  analysisType: AnalysisType;
  domain: string; // e.g. "TB", "road traffic injury", "health workforce"
  budget?: number; // resource envelope (million), allocation only
  workforce?: number; // FTE ceiling, allocation only
  equityEmphasis?: "low" | "balanced" | "high";
  notes?: string; // anything else the model extracted from the prompt
  confidence: number; // 0–1 confidence in the classification
  source: "ai" | "heuristic";
}

// ── MCDA ──────────────────────────────────────────────────────────────────────
export interface McdaResult {
  alternatives: string[];
  criteria: string[];
  methodRanks: Record<string, number[]>; // method -> rank per alternative
  consensusRank: number[];
  scoresByMethod: Record<string, number[]>;
  meanInterMethodSpearman: number;
  order: number[]; // indices sorted best→worst by consensus
}

// ── Optimization ──────────────────────────────────────────────────────────────
export interface AllocationResult {
  units: string[];
  interventions: string[];
  budget: number;
  workforce: number;
  allocation: number[][]; // x_ij in [0,1]
  optimizedEqWtdDalys: number;
  statusQuoEqWtdDalys: number;
  rawDalys: number;
  budgetUsed: number;
  workforceUsed: number;
  valueOfAnalyticsPct: number; // % more eq-wtd DALYs vs status quo
  allocationInefficiencyIndex: number; // AII = 1 - SQ/OPT
  frontier: { equityFloor: number; rawDalys: number; eqWtdDalys: number }[];
  stability: number[][]; // fraction of MC draws each cell is funded
}

// ── Attribution ───────────────────────────────────────────────────────────────
export interface AttributionResult {
  riskFactors: string[];
  paf: number[]; // per risk factor
  jointPaf: number;
  attributable: {
    deaths: number;
    yll: number;
    yld: number;
    daly: number;
    cost: number;
  };
  totalBurden: { deaths: number; daly: number; cost: number };
}

// ── Gap indices ───────────────────────────────────────────────────────────────
export interface GapIndices {
  PPGI: number;
  IFI: number;
  AII: number;
  RMI: number;
  PBI: number;
  HEDI: number;
  bindingGap: string;
  cascadeBottleneck?: string;
}

// ── Report ────────────────────────────────────────────────────────────────────
export interface ReportSection {
  heading: string;
  body: string; // markdown
  table?: { columns: string[]; rows: (string | number)[][] };
}

export interface PolicyRecommendation {
  decision: string;
  evidence: string;
  cost: string;
  benefit: string;
  risks: string;
  monitoring: string;
}

export interface Report {
  id: string;
  question: string;
  generatedAt: string;
  request: ExtractedRequest;
  headline: string;
  executiveSummary: string;
  sections: ReportSection[];
  recommendations: PolicyRecommendation[];
  limitations: string[];
  methodsUsed: string[];
  aiNarrative: boolean; // whether the AI layer enriched the prose
  raw: {
    mcda?: McdaResult;
    allocation?: AllocationResult;
    attribution?: AttributionResult;
    indices?: GapIndices;
  };
}
