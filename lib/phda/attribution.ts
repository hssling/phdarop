// ─── Attributable Burden ─────────────────────────────────────────────────────
// Population attributable fractions and attributable burden, per Part 4 / E06.

import type { AttributionResult } from "./types";

export interface AttributionInputs {
  riskFactors: string[];
  prevalence: number[]; // p_k, exposure prevalence [0,1]
  relativeRisk: number[]; // RR_k
  totalDeaths: number;
  yllPerDeath: number; // standard life expectancy at age of death
  totalYld: number; // prevalent YLD for the cause
  costPerDaly: number; // economic cost per DALY (for attributable cost)
}

/** Categorical PAF for a single risk factor. */
export function pafSingle(p: number, rr: number): number {
  const num = p * (rr - 1);
  return num / (1 + num);
}

/** Combined PAF for independent risk factors (multiplicative complement). */
export function pafJoint(prevalence: number[], rr: number[]): number {
  const sum = prevalence.reduce((s, p, k) => s + p * (rr[k] - 1), 0);
  return sum / (1 + sum);
}

export function attributableBurden(inp: AttributionInputs): AttributionResult {
  const paf = inp.prevalence.map((p, k) => pafSingle(p, inp.relativeRisk[k]));
  const jointPaf = pafJoint(inp.prevalence, inp.relativeRisk);

  const yll = inp.totalDeaths * inp.yllPerDeath;
  const totalDaly = yll + inp.totalYld;

  const attDeaths = jointPaf * inp.totalDeaths;
  const attYll = jointPaf * yll;
  const attYld = jointPaf * inp.totalYld;
  const attDaly = jointPaf * totalDaly;
  const attCost = attDaly * inp.costPerDaly;

  const round = (v: number) => Math.round(v);

  return {
    riskFactors: inp.riskFactors,
    paf: paf.map((v) => Math.round(v * 1000) / 1000),
    jointPaf: Math.round(jointPaf * 1000) / 1000,
    attributable: {
      deaths: round(attDeaths),
      yll: round(attYll),
      yld: round(attYld),
      daly: round(attDaly),
      cost: round(attCost),
    },
    totalBurden: {
      deaths: round(inp.totalDeaths),
      daly: round(totalDaly),
      cost: round(totalDaly * inp.costPerDaly),
    },
  };
}
