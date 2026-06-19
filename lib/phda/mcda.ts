// ─── Multi-Criteria Decision Analysis ────────────────────────────────────────
// Faithful TypeScript port of code/prioritization_engine.py and
// code/mcda_eight_methods.py. Deterministic and unit-testable.

import type { McdaResult } from "./types";

type Matrix = number[][];

/** Min–max normalise each column to [0,1] for benefit criteria. */
function normaliseBenefit(X: Matrix): Matrix {
  const n = X.length;
  const m = X[0].length;
  const out = X.map((r) => r.slice());
  for (let j = 0; j < m; j++) {
    let lo = Infinity;
    let hi = -Infinity;
    for (let i = 0; i < n; i++) {
      lo = Math.min(lo, X[i][j]);
      hi = Math.max(hi, X[i][j]);
    }
    const span = hi - lo || 1;
    for (let i = 0; i < n; i++) out[i][j] = (X[i][j] - lo) / span;
  }
  return out;
}

export function weightedSum(X: Matrix, w: number[]): number[] {
  const Z = normaliseBenefit(X);
  return Z.map((row) => row.reduce((s, v, j) => s + v * w[j], 0));
}

/** TOPSIS — closeness to the ideal solution (all benefit criteria). */
export function topsis(X: Matrix, w: number[]): number[] {
  const n = X.length;
  const m = X[0].length;
  // vector normalisation
  const denom = Array.from({ length: m }, (_, j) =>
    Math.sqrt(X.reduce((s, r) => s + r[j] * r[j], 0)) || 1
  );
  const V = X.map((r) => r.map((v, j) => (v / denom[j]) * w[j]));
  const ideal = Array.from({ length: m }, (_, j) =>
    Math.max(...V.map((r) => r[j]))
  );
  const anti = Array.from({ length: m }, (_, j) =>
    Math.min(...V.map((r) => r[j]))
  );
  return Array.from({ length: n }, (_, i) => {
    const dp = Math.sqrt(
      V[i].reduce((s, v, j) => s + (v - ideal[j]) ** 2, 0)
    );
    const dn = Math.sqrt(
      V[i].reduce((s, v, j) => s + (v - anti[j]) ** 2, 0)
    );
    return dn / (dp + dn || 1);
  });
}

/** PROMETHEE II — net outranking flow with linear preference functions. */
export function promethee(X: Matrix, w: number[]): number[] {
  const Z = normaliseBenefit(X);
  const n = Z.length;
  const m = Z[0].length;
  // preference thresholds = per-criterion std dev
  const mean = Array.from({ length: m }, (_, j) =>
    Z.reduce((s, r) => s + r[j], 0) / n
  );
  const p = Array.from({ length: m }, (_, j) =>
    Math.sqrt(Z.reduce((s, r) => s + (r[j] - mean[j]) ** 2, 0) / n) + 1e-9
  );
  const net = new Array(n).fill(0);
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      if (a === b) continue;
      let phiAB = 0;
      let phiBA = 0;
      for (let j = 0; j < m; j++) {
        const d = (Z[a][j] - Z[b][j]) / p[j];
        phiAB += Math.min(Math.max(d, 0), 1) * w[j];
        const d2 = (Z[b][j] - Z[a][j]) / p[j];
        phiBA += Math.min(Math.max(d2, 0), 1) * w[j];
      }
      net[a] += phiAB - phiBA;
    }
  }
  return net.map((v) => v / (n - 1 || 1));
}

/** Rank: highest score → rank 1. */
export function rank(scores: number[]): number[] {
  const order = scores
    .map((s, i) => [s, i] as const)
    .sort((a, b) => b[0] - a[0]);
  const r = new Array(scores.length).fill(0);
  order.forEach(([, idx], pos) => (r[idx] = pos + 1));
  return r;
}

export function spearman(a: number[], b: number[]): number {
  const n = a.length;
  const ma = a.reduce((s, v) => s + v, 0) / n;
  const mb = b.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return num / (Math.sqrt(da * db) || 1);
}

/**
 * Run AHP(WSM), BWM(WSM), TOPSIS and PROMETHEE on one decision matrix and
 * return per-method + consensus rankings plus an agreement metric.
 */
export function runMcda(
  alternatives: string[],
  criteria: string[],
  X: Matrix,
  weightsAhp: number[],
  weightsBwm: number[]
): McdaResult {
  const scoresByMethod: Record<string, number[]> = {
    AHP: weightedSum(X, weightsAhp),
    BWM: weightedSum(X, weightsBwm),
    TOPSIS: topsis(X, weightsAhp),
    PROMETHEE: promethee(X, weightsAhp),
  };
  const methodRanks: Record<string, number[]> = {};
  for (const k of Object.keys(scoresByMethod))
    methodRanks[k] = rank(scoresByMethod[k]);

  const n = alternatives.length;
  const meanRank = Array.from({ length: n }, (_, i) => {
    const rs = Object.values(methodRanks).map((r) => r[i]);
    return rs.reduce((s, v) => s + v, 0) / rs.length;
  });
  const consensusRank = rank(meanRank.map((v) => -v));

  // mean inter-method Spearman
  const methods = Object.keys(methodRanks);
  const pairs: number[] = [];
  for (let i = 0; i < methods.length; i++)
    for (let j = i + 1; j < methods.length; j++)
      pairs.push(spearman(methodRanks[methods[i]], methodRanks[methods[j]]));
  const meanInterMethodSpearman =
    pairs.reduce((s, v) => s + v, 0) / (pairs.length || 1);

  const order = consensusRank
    .map((r, i) => [r, i] as const)
    .sort((a, b) => a[0] - b[0])
    .map(([, i]) => i);

  return {
    alternatives,
    criteria,
    methodRanks,
    consensusRank,
    scoresByMethod,
    meanInterMethodSpearman,
    order,
  };
}

/** Normalise a weight vector to sum to 1. */
export function normaliseWeights(w: number[]): number[] {
  const s = w.reduce((a, b) => a + b, 0) || 1;
  return w.map((v) => v / s);
}
