// ─── Resource Allocation Optimization ────────────────────────────────────────
// Faithful TypeScript port of code/optimization_engine.py using a real LP solver
// (javascript-lp-solver). Maximises equity-weighted avoidable DALYs averted
// subject to budget and workforce ceilings, then compares to status quo and
// traces the efficiency–equity frontier.

import solver from "javascript-lp-solver";
import type { AllocationResult } from "./types";

export interface AllocationInputs {
  units: string[];
  interventions: string[];
  delta: number[][]; // avoidable DALYs (k) per fully-funded unit
  cost: number[][]; // cost (million) per unit scale-up
  workforce: number[][]; // FTE per unit scale-up
  equityWeights: number[]; // per unit
  budget: number;
  workforceTotal: number;
}

interface LpModel {
  optimize: string;
  opType: "max" | "min";
  constraints: Record<string, { max?: number; min?: number }>;
  variables: Record<string, Record<string, number>>;
}

function key(i: number, j: number): string {
  return `x_${i}_${j}`;
}

/** Build and solve the continuous LP for a given equity-floor (0 = none). */
function solveLp(inp: AllocationInputs, equityFloor: number) {
  const { units, interventions, delta, cost, workforce, equityWeights } = inp;
  const I = units.length;
  const J = interventions.length;

  const model: LpModel = {
    optimize: "value",
    opType: "max",
    constraints: {
      budget: { max: inp.budget },
      workforce: { max: inp.workforceTotal },
    },
    variables: {},
  };

  // Optional pro-poor coverage floor on the poorest third of units.
  const poorIdx = equityWeights
    .map((w, i) => [w, i] as const)
    .sort((a, b) => b[0] - a[0])
    .slice(0, Math.max(1, Math.floor(I / 3)))
    .map(([, i]) => i);
  if (equityFloor > 0) {
    model.constraints["equityfloor"] = { min: equityFloor * poorIdx.length * J };
  }

  for (let i = 0; i < I; i++) {
    for (let j = 0; j < J; j++) {
      const v: Record<string, number> = {
        value: equityWeights[i] * delta[i][j],
        budget: cost[i][j],
        workforce: workforce[i][j],
      };
      // upper bound x <= 1
      const capName = `cap_${i}_${j}`;
      model.constraints[capName] = { max: 1 };
      v[capName] = 1;
      if (equityFloor > 0 && poorIdx.includes(i)) v["equityfloor"] = 1;
      model.variables[key(i, j)] = v;
    }
  }

  const res = solver.Solve(model) as Record<string, number> & {
    feasible: boolean;
    result: number;
  };

  const alloc: number[][] = Array.from({ length: I }, () =>
    new Array(J).fill(0)
  );
  for (let i = 0; i < I; i++)
    for (let j = 0; j < J; j++) {
      const val = res[key(i, j)];
      alloc[i][j] = Math.min(1, Math.max(0, val ?? 0));
    }
  return { alloc, feasible: res.feasible };
}

function eqWtdDalys(inp: AllocationInputs, x: number[][]): number {
  let s = 0;
  for (let i = 0; i < inp.units.length; i++)
    for (let j = 0; j < inp.interventions.length; j++)
      s += inp.equityWeights[i] * inp.delta[i][j] * x[i][j];
  return s;
}
function rawDalys(inp: AllocationInputs, x: number[][]): number {
  let s = 0;
  for (let i = 0; i < inp.units.length; i++)
    for (let j = 0; j < inp.interventions.length; j++)
      s += inp.delta[i][j] * x[i][j];
  return s;
}
function used(inp: AllocationInputs, x: number[][], field: "cost" | "workforce") {
  const m = inp[field];
  let s = 0;
  for (let i = 0; i < inp.units.length; i++)
    for (let j = 0; j < inp.interventions.length; j++) s += m[i][j] * x[i][j];
  return s;
}

/** Status quo = inertial equal coverage fraction across all cells, scaled to
 *  exhaust the binding constraint (the real-world default). */
function statusQuo(inp: AllocationInputs): number[][] {
  const I = inp.units.length;
  const J = inp.interventions.length;
  const ones: number[][] = Array.from({ length: I }, () => new Array(J).fill(1));
  const costAll = used(inp, ones, "cost");
  const wfAll = used(inp, ones, "workforce");
  const scale = Math.min(1, inp.budget / costAll, inp.workforceTotal / wfAll);
  return ones.map((r) => r.map((v) => v * scale));
}

export function optimizeAllocation(inp: AllocationInputs): AllocationResult {
  const { alloc } = solveLp(inp, 0);
  const sq = statusQuo(inp);

  const optEq = eqWtdDalys(inp, alloc);
  const sqEq = eqWtdDalys(inp, sq);
  const valueOfAnalyticsPct = ((optEq - sqEq) / (sqEq || 1)) * 100;
  const aii = 1 - sqEq / (optEq || 1);

  // Efficiency–equity frontier via the equity floor (ε-constraint).
  const frontier: AllocationResult["frontier"] = [];
  for (let f = 0; f <= 1.0001; f += 0.2) {
    const { alloc: a, feasible } = solveLp(inp, f);
    if (feasible)
      frontier.push({
        equityFloor: Math.round(f * 100) / 100,
        rawDalys: Math.round(rawDalys(inp, a) * 10) / 10,
        eqWtdDalys: Math.round(eqWtdDalys(inp, a) * 10) / 10,
      });
  }

  // Allocation stability: Monte-Carlo perturbation of delta (±15%).
  const I = inp.units.length;
  const J = inp.interventions.length;
  const draws = 60;
  const counts: number[][] = Array.from({ length: I }, () =>
    new Array(J).fill(0)
  );
  let seed = 12345;
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let d = 0; d < draws; d++) {
    const perturbed: AllocationInputs = {
      ...inp,
      delta: inp.delta.map((r) => r.map((v) => v * (0.85 + 0.3 * rng()))),
    };
    const { alloc: a } = solveLp(perturbed, 0);
    for (let i = 0; i < I; i++)
      for (let j = 0; j < J; j++) if (a[i][j] > 0.5) counts[i][j] += 1;
  }
  const stability = counts.map((r) => r.map((c) => c / draws));

  return {
    units: inp.units,
    interventions: inp.interventions,
    budget: inp.budget,
    workforce: inp.workforceTotal,
    allocation: alloc.map((r) => r.map((v) => Math.round(v * 100) / 100)),
    optimizedEqWtdDalys: Math.round(optEq * 10) / 10,
    statusQuoEqWtdDalys: Math.round(sqEq * 10) / 10,
    rawDalys: Math.round(rawDalys(inp, alloc) * 10) / 10,
    budgetUsed: Math.round(used(inp, alloc, "cost") * 10) / 10,
    workforceUsed: Math.round(used(inp, alloc, "workforce") * 10) / 10,
    valueOfAnalyticsPct: Math.round(valueOfAnalyticsPct * 10) / 10,
    allocationInefficiencyIndex: Math.round(aii * 1000) / 1000,
    frontier,
    stability: stability.map((r) => r.map((v) => Math.round(v * 100) / 100)),
  };
}
