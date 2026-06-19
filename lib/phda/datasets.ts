// ─── Scenario datasets ───────────────────────────────────────────────────────
// Calibrated, defensible demonstration data so the app always computes a real
// result. Values mirror the research engines (docs/engines). In production these
// are replaced by the Master Analytical Database (E04) via the data connectors.

import { normaliseWeights } from "./mcda";

export interface PrioritizationScenario {
  alternatives: string[];
  criteria: string[];
  matrix: number[][];
  weightsAhp: number[];
  weightsBwm: number[];
}

export interface AllocationScenario {
  units: string[];
  interventions: string[];
  delta: number[][];
  cost: number[][];
  workforce: number[][];
  equityWeights: number[];
  budget: number;
  workforceTotal: number;
}

export interface AttributionScenario {
  cause: string;
  riskFactors: string[];
  prevalence: number[];
  relativeRisk: number[];
  totalDeaths: number;
  yllPerDeath: number;
  totalYld: number;
  costPerDaly: number;
}

const PRIORITIZATION_CRITERIA = [
  "PH importance",
  "Disease burden",
  "Policy relevance",
  "Evidence gap",
  "Novelty",
  "Data availability",
  "Feasibility",
  "Publication potential",
  "Funding potential",
  "Implementation probability",
];

// Default project portfolio (mirrors E01).
const defaultPrioritization: PrioritizationScenario = {
  alternatives: [
    "Workforce redistribution",
    "RTI trauma system",
    "TB allocation",
    "Child survival",
    "Integrated allocation",
    "Maternal referral",
    "NCD cascade",
    "Emergency/critical care",
    "HIV prevention",
    "Financing formula",
  ],
  criteria: PRIORITIZATION_CRITERIA,
  matrix: [
    [9, 9, 9, 8, 8, 8, 8, 9, 8, 8],
    [9, 9, 9, 8, 8, 8, 7, 9, 8, 8],
    [9, 9, 9, 7, 7, 9, 8, 8, 9, 8],
    [9, 9, 9, 6, 6, 9, 8, 8, 9, 8],
    [9, 9, 9, 9, 9, 6, 5, 9, 8, 6],
    [9, 8, 9, 7, 7, 8, 7, 8, 8, 8],
    [9, 9, 8, 7, 6, 8, 8, 7, 7, 7],
    [9, 8, 8, 7, 7, 7, 6, 8, 8, 7],
    [8, 8, 8, 6, 7, 8, 7, 8, 9, 7],
    [8, 8, 9, 8, 8, 7, 6, 8, 7, 6],
  ],
  weightsAhp: normaliseWeights([
    0.16, 0.14, 0.14, 0.09, 0.07, 0.08, 0.08, 0.08, 0.09, 0.07,
  ]),
  weightsBwm: normaliseWeights([
    0.17, 0.13, 0.13, 0.08, 0.06, 0.09, 0.09, 0.08, 0.1, 0.07,
  ]),
};

const injuryPrioritization: PrioritizationScenario = {
  alternatives: [
    "RTI trauma system",
    "Suicide means-restriction",
    "Drowning prevention",
    "Pesticide poisoning",
    "Burns-care network",
    "Elderly falls",
  ],
  criteria: PRIORITIZATION_CRITERIA,
  matrix: [
    [9, 9, 9, 8, 8, 8, 7, 9, 8, 8],
    [8, 8, 8, 8, 7, 7, 6, 8, 7, 6],
    [7, 7, 8, 9, 8, 5, 7, 8, 6, 7],
    [8, 7, 8, 8, 8, 6, 7, 8, 6, 7],
    [7, 6, 6, 8, 7, 6, 7, 7, 5, 6],
    [7, 7, 7, 8, 7, 6, 7, 7, 5, 6],
  ],
  weightsAhp: defaultPrioritization.weightsAhp,
  weightsBwm: defaultPrioritization.weightsBwm,
};

// Default 6-district × 4-intervention allocation problem (mirrors E09).
const defaultAllocation: AllocationScenario = {
  units: [
    "D1 high-burden poor",
    "D2 high-burden",
    "D3 mid",
    "D4 mid-poor",
    "D5 low",
    "D6 low-remote",
  ],
  interventions: ["TB ACF", "HTN screen+Rx", "Maternal EmONC", "Child bundle"],
  delta: [
    [40, 38, 30, 42],
    [35, 33, 26, 36],
    [22, 24, 18, 25],
    [28, 26, 22, 30],
    [12, 14, 10, 15],
    [18, 20, 15, 22],
  ],
  cost: [
    [6, 5, 7, 4],
    [6, 5, 7, 4],
    [5, 4, 6, 3],
    [5, 4, 6, 3],
    [4, 3, 5, 3],
    [5, 4, 6, 4],
  ],
  workforce: [
    [3, 2, 4, 2],
    [3, 2, 4, 2],
    [2, 2, 3, 2],
    [2, 2, 3, 2],
    [2, 1, 3, 1],
    [3, 2, 4, 2],
  ],
  equityWeights: [1.6, 1.3, 1.0, 1.4, 0.8, 1.5],
  budget: 55,
  workforceTotal: 30,
};

const attributionScenarios: Record<string, AttributionScenario> = {
  default: {
    cause: "the selected condition",
    riskFactors: [
      "Late diagnosis / access gap",
      "Treatment non-completion",
      "Comorbid risk exposure",
    ],
    prevalence: [0.35, 0.25, 0.4],
    relativeRisk: [2.4, 1.9, 1.6],
    totalDeaths: 12000,
    yllPerDeath: 30,
    totalYld: 90000,
    costPerDaly: 1200,
  },
  tb: {
    cause: "tuberculosis",
    riskFactors: [
      "Diagnostic delay",
      "Treatment loss-to-follow-up",
      "Undernutrition",
      "Drug resistance",
    ],
    prevalence: [0.4, 0.18, 0.45, 0.06],
    relativeRisk: [2.6, 2.2, 1.8, 3.0],
    totalDeaths: 22000,
    yllPerDeath: 28,
    totalYld: 130000,
    costPerDaly: 1000,
  },
  injury: {
    cause: "road-traffic injury",
    riskFactors: [
      "Pre-hospital care delay",
      "Non-helmet/seatbelt use",
      "Speeding",
      "Drink-driving",
    ],
    prevalence: [0.55, 0.5, 0.45, 0.2],
    relativeRisk: [2.1, 1.9, 2.3, 2.5],
    totalDeaths: 18000,
    yllPerDeath: 38,
    totalYld: 70000,
    costPerDaly: 1400,
  },
};

function detectDomainKey(domain: string): "tb" | "injury" | "default" {
  const d = domain.toLowerCase();
  if (/tb|tuberculosis/.test(d)) return "tb";
  if (/inj|rti|road|trauma|drown|burn|fall|suicide|poison/.test(d))
    return "injury";
  return "default";
}

export function getPrioritizationScenario(
  domain: string
): PrioritizationScenario {
  return detectDomainKey(domain) === "injury"
    ? injuryPrioritization
    : defaultPrioritization;
}

export function getAllocationScenario(
  domain: string,
  budget?: number,
  workforce?: number,
  equityEmphasis?: "low" | "balanced" | "high"
): AllocationScenario {
  const base: AllocationScenario = {
    ...defaultAllocation,
    delta: defaultAllocation.delta.map((r) => r.slice()),
    cost: defaultAllocation.cost.map((r) => r.slice()),
    workforce: defaultAllocation.workforce.map((r) => r.slice()),
    equityWeights: defaultAllocation.equityWeights.slice(),
  };
  if (typeof budget === "number" && budget > 0) base.budget = budget;
  if (typeof workforce === "number" && workforce > 0)
    base.workforceTotal = workforce;
  if (equityEmphasis === "high")
    base.equityWeights = base.equityWeights.map((w) => w ** 1.5);
  else if (equityEmphasis === "low")
    base.equityWeights = base.equityWeights.map(() => 1);
  return base;
}

export function getAttributionScenario(domain: string): AttributionScenario {
  return attributionScenarios[detectDomainKey(domain)];
}
