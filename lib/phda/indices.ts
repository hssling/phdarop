// ─── Six Gap Indices ─────────────────────────────────────────────────────────
// Part 3 diagnostic indices. Each is normalised to [0,1] (0 = no gap).

import type { GapIndices } from "./types";

export interface IndexInputs {
  // PPGI: policy targets vs observed (per indicator), with weights + floors
  ppgi: { target: number; observed: number; floor: number; weight: number }[];
  // IFI: retention fractions along the implementation cascade
  cascade: { step: string; retention: number }[];
  // AII: achieved vs optimal avoidable-burden averted (from optimizer)
  achievedAverted: number;
  optimalAverted: number;
  // RMI: resource share vs need share per unit
  resourceShare: number[];
  needShare: number[];
  // PBI: avoidable vs total burden
  avoidableBurden: number;
  totalBurden: number;
  // HEDI: stratum rates vs best-off reference
  stratumRates: { rate: number; popShare: number }[];
}

export function computeIndices(inp: IndexInputs): GapIndices {
  // PPGI — weighted truncated relative shortfall
  const wsum = inp.ppgi.reduce((s, x) => s + x.weight, 0) || 1;
  const PPGI =
    inp.ppgi.reduce((s, x) => {
      const short = Math.max(0, x.target - x.observed);
      const span = x.target - x.floor || 1;
      return s + (x.weight / wsum) * Math.min(1, short / span);
    }, 0);

  // IFI — 1 - product of retentions; binding step = weakest link
  const eff = inp.cascade.reduce((p, c) => p * c.retention, 1);
  const IFI = 1 - eff;
  let bottleneck = inp.cascade[0]?.step;
  let worst = 1;
  for (const c of inp.cascade)
    if (1 - c.retention > 1 - worst) {
      worst = c.retention;
      bottleneck = c.step;
    }

  // AII — fraction of attainable benefit lost to misallocation
  const AII = 1 - inp.achievedAverted / (inp.optimalAverted || 1);

  // RMI — index of dissimilarity between resource and need shares
  const rTot = inp.resourceShare.reduce((s, v) => s + v, 0) || 1;
  const nTot = inp.needShare.reduce((s, v) => s + v, 0) || 1;
  const RMI =
    0.5 *
    inp.resourceShare.reduce(
      (s, r, i) => s + Math.abs(r / rTot - inp.needShare[i] / nTot),
      0
    );

  // PBI — preventable fraction
  const PBI = inp.avoidableBurden / (inp.totalBurden || 1);

  // HEDI — population-weighted excess over best-off, normalised
  const ref = Math.min(...inp.stratumRates.map((s) => s.rate));
  const HEDI =
    inp.stratumRates.reduce(
      (s, x) => s + x.popShare * Math.max(0, x.rate - ref),
      0
    ) / (ref || 1);

  const indexMap: Record<string, number> = {
    "Policy–Practice Gap": PPGI,
    "Implementation Failure": IFI,
    "Allocation Inefficiency": AII,
    "Resource Mismatch": RMI,
    "Preventable Burden": PBI,
    "Health Equity Deficit": Math.min(1, HEDI),
  };
  const bindingGap = Object.entries(indexMap).sort((a, b) => b[1] - a[1])[0][0];

  const r3 = (v: number) => Math.round(v * 1000) / 1000;
  return {
    PPGI: r3(PPGI),
    IFI: r3(IFI),
    AII: r3(AII),
    RMI: r3(RMI),
    PBI: r3(PBI),
    HEDI: r3(Math.min(1, HEDI)),
    bindingGap,
    cascadeBottleneck: bottleneck,
  };
}
