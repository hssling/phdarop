"""
PHDAROP Project Prioritization Engine
Scores 20 candidate projects on 10 criteria and ranks them with
AHP (weighted sum), BWM (weighted sum), TOPSIS, and PROMETHEE II.
Produces: ranked lists per method, consensus rank, rank-correlation,
weight-sensitivity (Monte Carlo), and a 2D Pareto frontier.

Run: python prioritization_engine.py
"""
import numpy as np
import itertools, json

np.random.seed(42)

# ---------------------------------------------------------------
# 1. Candidate projects (20) drawn from the 50-project portfolio
# ---------------------------------------------------------------
projects = [
    "P01 TB allocation", "P02 HIV prevention", "P03 Malaria vector",
    "P05 AMR attributable", "P06 NCD cascade", "P07 Mental health WF",
    "P08 Maternal referral", "P09 Child survival", "P10 Nutrition multisector",
    "P15 RTI trauma system", "P16 Drowning", "P17 Burns",
    "P19 Poisoning/means", "P20 Suicide portfolio",
    "P23 Workforce redistribution", "P24 Infrastructure capital",
    "P25 Referral network", "P26 Financing formula",
    "P28 Emergency/critical care", "P38 Integrated allocation"
]

# ---------------------------------------------------------------
# 2. Criteria (10). All scored 1-10 (higher = better).
#    Data availability & feasibility already framed so higher=better.
# ---------------------------------------------------------------
criteria = ["PH importance","Disease burden","Policy relevance","Evidence gap",
            "Novelty","Data availability","Feasibility","Publication potential",
            "Funding potential","Prob. implementation"]

# Decision matrix: rows=projects, cols=criteria (expert-elicited, 1-10)
X = np.array([
#   PH  Bur Pol Gap Nov Dat Fea Pub Fun Imp
   [ 9,  9,  9,  7,  7,  9,  8,  8,  9,  8],  # P01 TB
   [ 8,  8,  8,  6,  7,  8,  7,  8,  9,  7],  # P02 HIV
   [ 7,  7,  7,  6,  7,  7,  7,  7,  7,  6],  # P03 Malaria
   [ 8,  7,  8,  9,  9,  6,  6,  9,  8,  6],  # P05 AMR
   [ 9,  9,  8,  7,  6,  8,  8,  7,  7,  7],  # P06 NCD
   [ 8,  8,  8,  8,  7,  6,  7,  7,  6,  6],  # P07 Mental
   [ 9,  8,  9,  7,  7,  8,  7,  8,  8,  8],  # P08 Maternal
   [ 9,  9,  9,  6,  6,  9,  8,  8,  9,  8],  # P09 Child
   [ 8,  9,  8,  7,  7,  8,  6,  7,  8,  6],  # P10 Nutrition
   [ 9,  9,  9,  8,  8,  8,  7,  9,  8,  8],  # P15 RTI
   [ 7,  7,  8,  9,  8,  5,  7,  8,  6,  7],  # P16 Drowning
   [ 7,  6,  6,  8,  7,  6,  7,  7,  5,  6],  # P17 Burns
   [ 8,  7,  8,  8,  8,  6,  7,  8,  6,  7],  # P19 Poisoning
   [ 8,  8,  8,  8,  7,  7,  6,  8,  7,  6],  # P20 Suicide
   [ 9,  9,  9,  8,  8,  8,  8,  9,  8,  8],  # P23 Workforce
   [ 8,  8,  8,  6,  6,  7,  5,  7,  7,  5],  # P24 Infrastructure
   [ 8,  8,  8,  7,  7,  7,  7,  8,  7,  7],  # P25 Referral
   [ 8,  8,  9,  8,  8,  7,  6,  8,  7,  6],  # P26 Financing
   [ 9,  8,  8,  7,  7,  7,  6,  8,  8,  7],  # P28 Emergency
   [ 9,  9,  9,  9,  9,  6,  5,  9,  8,  6],  # P38 Integrated
], dtype=float)

n, m = X.shape

# ---------------------------------------------------------------
# 3. Weights
# ---------------------------------------------------------------
# AHP weights (from a consistent pairwise matrix, CR<0.1) -- supplied as priority vector
w_ahp = np.array([0.16,0.14,0.14,0.09,0.07,0.08,0.08,0.08,0.09,0.07])
# BWM weights (Best=PH importance, Worst=Novelty) -- min-max optimization solution
w_bwm = np.array([0.17,0.13,0.13,0.08,0.06,0.09,0.09,0.08,0.10,0.07])
for w in (w_ahp, w_bwm):
    w /= w.sum()

# ---------------------------------------------------------------
# 4. Methods
# ---------------------------------------------------------------
def weighted_sum(X, w):
    # normalize each column to [0,1] (benefit criteria)
    Z = (X - X.min(0)) / (X.max(0) - X.min(0))
    return Z @ w

def topsis(X, w):
    # vector normalization
    Z = X / np.sqrt((X**2).sum(0))
    V = Z * w
    ideal, anti = V.max(0), V.min(0)
    d_pos = np.sqrt(((V-ideal)**2).sum(1))
    d_neg = np.sqrt(((V-anti)**2).sum(1))
    return d_neg / (d_pos + d_neg)          # closeness coefficient

def promethee2(X, w):
    # usual preference function (linear, threshold via std)
    net = np.zeros(n)
    p = X.std(0) + 1e-9                      # preference thresholds
    for a in range(n):
        for b in range(n):
            if a == b: continue
            d = X[a] - X[b]
            pref = np.clip(d / p, 0, 1)      # linear preference
            phi_ab = (pref * w).sum()
            d2 = X[b] - X[a]
            pref2 = np.clip(d2 / p, 0, 1)
            phi_ba = (pref2 * w).sum()
            net[a] += (phi_ab - phi_ba)
    return net / (n - 1)

scores = {
    "AHP":       weighted_sum(X, w_ahp),
    "BWM":       weighted_sum(X, w_bwm),
    "TOPSIS":    topsis(X, w_ahp),
    "PROMETHEE": promethee2(X, w_ahp),
}

def rank(s):  # higher score -> rank 1
    order = np.argsort(-s)
    r = np.empty(n, int); r[order] = np.arange(1, n+1)
    return r

ranks = {k: rank(v) for k, v in scores.items()}

# Consensus = mean rank (Borda-like)
mean_rank = np.mean(np.vstack(list(ranks.values())), axis=0)
consensus = rank(-mean_rank)   # lower mean rank -> better

# ---------------------------------------------------------------
# 5. Rank correlation (Spearman) across methods
# ---------------------------------------------------------------
def spearman(a, b):
    a = a.astype(float); b = b.astype(float)
    return np.corrcoef(a, b)[0,1]
methods = list(ranks.keys())
corr = {f"{i}~{j}": round(spearman(ranks[i], ranks[j]),3)
        for i,j in itertools.combinations(methods,2)}

# ---------------------------------------------------------------
# 6. Weight-sensitivity Monte Carlo (Dirichlet around AHP weights)
# ---------------------------------------------------------------
B = 2000
top5_counts = np.zeros(n)
rank_draws = np.zeros((B, n))
alpha = w_ahp * 200
for b in range(B):
    wb = np.random.dirichlet(alpha)
    s = 0.5*topsis(X, wb) + 0.5*weighted_sum(X, wb)
    rb = rank(s)
    rank_draws[b] = rb
    top5_counts[(rb <= 5)] += 1
p_top5 = top5_counts / B
rank_mean = rank_draws.mean(0)
rank_lo = np.percentile(rank_draws, 5, axis=0)
rank_hi = np.percentile(rank_draws, 95, axis=0)

# ---------------------------------------------------------------
# 7. Pareto frontier on (impact, feasibility)
#    impact proxy = mean(PH,Burden,Policy,Gap); feasibility proxy = mean(Data,Feas,Impl)
# ---------------------------------------------------------------
impact = X[:, [0,1,2,3]].mean(1)
feas   = X[:, [5,6,9]].mean(1)
pareto = []
for i in range(n):
    dominated = any((impact[j] >= impact[i] and feas[j] >= feas[i] and
                     (impact[j] > impact[i] or feas[j] > feas[i])) for j in range(n))
    if not dominated:
        pareto.append(i)

# ---------------------------------------------------------------
# 8. Horizon classification (quick win / medium / strategic / transformational)
#    Quick win: high feasibility & data, lower novelty/scope
# ---------------------------------------------------------------
def horizon(i):
    f = feas[i]; nov = X[i,4]; scope_big = projects[i] in ("P38 Integrated allocation",)
    if scope_big or (nov>=9 and f<=6): return "Transformational (5-10y)"
    if f>=7.3 and X[i,5]>=8:           return "Quick win (6-12m)"
    if f>=6.5:                          return "Medium-term (1-3y)"
    return "Strategic (3-5y)"

# ---------------------------------------------------------------
# 9. Output
# ---------------------------------------------------------------
order = np.argsort(consensus)
print("="*92)
print(f"{'Rank':<5}{'Project':<30}{'AHP':>5}{'BWM':>5}{'TOPS':>6}{'PROM':>6}"
      f"{'Cons':>6}{'P(top5)':>9}  Horizon")
print("="*92)
for idx in order:
    print(f"{consensus[idx]:<5}{projects[idx]:<30}"
          f"{ranks['AHP'][idx]:>5}{ranks['BWM'][idx]:>5}{ranks['TOPSIS'][idx]:>6}"
          f"{ranks['PROMETHEE'][idx]:>6}{consensus[idx]:>6}{p_top5[idx]:>9.2f}  {horizon(idx)}")
print("="*92)
print("\nSpearman rank correlations between methods:")
for k,v in corr.items(): print(f"  {k:<14} {v}")
print(f"\nMean inter-method Spearman: {np.mean(list(corr.values())):.3f}")
print("\nPareto-efficient (impact vs feasibility):")
for i in pareto: print(f"  {projects[i]:<30} impact={impact[i]:.2f} feas={feas[i]:.2f}")
print("\nTop-5 for immediate execution (by consensus rank):")
for idx in order[:5]:
    print(f"  {consensus[idx]}. {projects[idx]}  (P(top5)={p_top5[idx]:.2f}, "
          f"rank 90%CI [{rank_lo[idx]:.0f},{rank_hi[idx]:.0f}])")

# dump machine-readable
out = {
  "projects": projects, "criteria": criteria,
  "weights": {"AHP": w_ahp.tolist(), "BWM": w_bwm.tolist()},
  "ranks": {k: ranks[k].tolist() for k in ranks},
  "consensus_rank": consensus.tolist(),
  "p_top5": p_top5.round(3).tolist(),
  "rank_ci": [[float(rank_lo[i]), float(rank_hi[i])] for i in range(n)],
  "pareto": [projects[i] for i in pareto],
  "spearman": corr,
}
with open("../outputs/prioritization_results.json","w") as f:
    json.dump(out, f, indent=2)
print("\n[saved] outputs/prioritization_results.json")
