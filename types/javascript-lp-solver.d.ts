declare module "javascript-lp-solver" {
  interface Model {
    optimize: string;
    opType: "max" | "min";
    constraints: Record<string, { max?: number; min?: number; equal?: number }>;
    variables: Record<string, Record<string, number>>;
    ints?: Record<string, 1>;
    binaries?: Record<string, 1>;
  }
  interface SolveResult {
    feasible: boolean;
    result: number;
    bounded?: boolean;
    [variable: string]: number | boolean | undefined;
  }
  const solver: {
    Solve: (model: Model) => SolveResult;
  };
  export default solver;
}
