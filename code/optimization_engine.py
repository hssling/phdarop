"""
Engine 9 — Resource Allocation Optimizer (PHDAROP)
A stylized but real district x intervention allocation problem solved by:
  (1) Linear Programming (continuous scale-up)          -> scipy.linprog
  (2) Mixed-Integer Programming (lumpy facility choices) -> PuLP/CBC
  (3) Multi-objective (epsilon-constraint: DALYs vs equity) -> frontier
  (4) Metaheuristic (differential evolution) cross-check  -> scipy
Objective: maximize equity-weighted avoidable DALYs averted s.t. budget & workforce.
Run: python optimization_engine.py
"""
import numpy as np
from scipy.optimize import linprog, differential_evolution
import pulp, json
np.random.seed(3)

# ---- Problem data: 6 districts x 4 interventions ----
districts=["D1 high-burden poor","D2 high-burden","D3 mid","D4 mid-poor","D5 low","D6 low-remote"]
intervs=["TB ACF","HTN screen+Rx","Maternal EmONC","Child bundle"]
I,J=len(districts),len(intervs)

# Avoidable DALYs per fully-funded unit (Delta * realized effectiveness), thousands
Delta = np.array([
 [40,38,30,42],
 [35,33,26,36],
 [22,24,18,25],
 [28,26,22,30],
 [12,14,10,15],
 [18,20,15,22],
],float)
cost = np.array([   # cost per unit scale-up (million)
 [6,5,7,4],
 [6,5,7,4],
 [5,4,6,3],
 [5,4,6,3],
 [4,3,5,3],
 [5,4,6,4],
],float)
workforce = np.array([  # health-worker FTE needed per unit
 [3,2,4,2],
 [3,2,4,2],
 [2,2,3,2],
 [2,2,3,2],
 [2,1,3,1],
 [3,2,4,2],
],float)
equity_w = np.array([1.6,1.3,1.0,1.4,0.8,1.5])  # pro-poor/remote weights
B_budget = 55.0    # million  (scarce: ~half of full-funding cost -> forces choices)
W_total  = 30.0    # FTE      (binding workforce ceiling)
c=cost.flatten(); d=Delta.flatten(); f=workforce.flatten()
ew=np.repeat(equity_w,J)

# ============ (1) LP: continuous x in [0,1] ============
# maximize sum ew*d*x  => minimize -ew*d*x
obj=-(ew*d)
A_ub=np.vstack([c, f]); b_ub=[B_budget, W_total]
bounds=[(0,1)]*(I*J)
lp=linprog(obj,A_ub=A_ub,b_ub=b_ub,bounds=bounds,method="highs")
x_lp=lp.x.reshape(I,J)
dalys_lp=(ew*d*lp.x).sum()
raw_dalys_lp=(d*lp.x).sum()

# status-quo: historical/inertial EQUAL coverage fraction across ALL cells
# (resources spread thin regardless of burden/equity -- the real-world default)
frac=1.0
x_sq=frac*np.ones(I*J)
scale=min(1, B_budget/(c*x_sq).sum(), W_total/(f*x_sq).sum())
x_sq=x_sq*scale                         # uniform fraction that exhausts the binding constraint
dalys_sq=(ew*d*x_sq).sum(); raw_sq=(d*x_sq).sum()

# ============ (2) MIP: lumpy 'open program' binaries with fixed cost ============
prob=pulp.LpProblem("alloc_mip",pulp.LpMaximize)
y={(i,j):pulp.LpVariable(f"y_{i}_{j}",cat="Binary") for i in range(I) for j in range(J)}
prob += pulp.lpSum(ew[i*J+j]*Delta[i,j]*y[(i,j)] for i in range(I) for j in range(J))
prob += pulp.lpSum(cost[i,j]*y[(i,j)] for i in range(I) for j in range(J)) <= B_budget
prob += pulp.lpSum(workforce[i,j]*y[(i,j)] for i in range(I) for j in range(J)) <= W_total
# equity floor: each of 2 poorest districts gets >=2 programs
for i in [0,3,5]:
    prob += pulp.lpSum(y[(i,j)] for j in range(J)) >= 2
prob.solve(pulp.PULP_CBC_CMD(msg=0))
x_mip=np.array([[int(y[(i,j)].value()) for j in range(J)] for i in range(I)])
dalys_mip=(ew*d*x_mip.flatten()).sum(); raw_mip=(d*x_mip.flatten()).sum()
cost_mip=(cost*x_mip).sum(); wf_mip=(workforce*x_mip).sum()

# ============ (3) Multi-objective: epsilon-constraint (efficiency vs equity gap) ============
# objective1 = raw DALYs; constraint on min equity-weighted coverage of poorest cluster
frontier=[]
for floor in np.linspace(0,1,11):
    obj2=-(d)  # maximize raw DALYs
    # add constraint: weighted coverage of poor districts (0,3,5) >= floor * their max
    Apoor=np.zeros(I*J)
    for i in [0,3,5]:
        for j in range(J): Apoor[i*J+j]=-1.0  # -sum x_poor <= -floor*9
    A=np.vstack([c,f,Apoor]); b=[B_budget,W_total,-floor*9]
    r=linprog(obj2,A_ub=A,b_ub=b,bounds=bounds,method="highs")
    if r.success:
        xr=r.x; frontier.append((floor,(d*xr).sum(),(ew*d*xr).sum()))

# ============ (4) Metaheuristic cross-check (differential evolution) ============
def neg_val(x):
    pen=0
    if (c*x).sum()>B_budget: pen+=1e3*((c*x).sum()-B_budget)
    if (f*x).sum()>W_total:  pen+=1e3*((f*x).sum()-W_total)
    return -(ew*d*x).sum()+pen
de=differential_evolution(neg_val,bounds,maxiter=200,seed=1,tol=1e-7,polish=True)
dalys_de=-neg_val(de.x)

# ---- report ----
print("="*78)
print("RESOURCE ALLOCATION OPTIMIZATION — results")
print("="*78)
print(f"Budget={B_budget}M  Workforce={W_total} FTE\n")
print(f"Status-quo (proportional spread):  equity-wtd DALYs={dalys_sq:6.1f}k  raw={raw_sq:6.1f}k")
print(f"(1) LP continuous optimum:         equity-wtd DALYs={dalys_lp:6.1f}k  raw={raw_dalys_lp:6.1f}k"
      f"  [budget used {(c*lp.x).sum():.0f}M, WF {(f*lp.x).sum():.0f}]")
print(f"(2) MIP lumpy + equity floor:      equity-wtd DALYs={dalys_mip:6.1f}k  raw={raw_mip:6.1f}k"
      f"  [budget {cost_mip:.0f}M, WF {wf_mip:.0f}]")
print(f"(4) Diff-evolution cross-check:    equity-wtd DALYs={dalys_de:6.1f}k  (LP gap "
      f"{100*(dalys_lp-dalys_de)/dalys_lp:+.2f}%)")
gain=100*(dalys_lp-dalys_sq)/dalys_sq
print(f"\n>>> Value of Analytics: LP averts {gain:.1f}% more equity-weighted DALYs "
      f"than status-quo at SAME budget.")

print("\nLP allocation (fraction funded):")
print("            "+"".join(f"{j[:9]:>11}" for j in intervs))
for i in range(I):
    print(f"{districts[i]:<22}"+"".join(f"{x_lp[i,j]:>11.2f}" for j in range(J)))

print("\nMIP allocation (1=open program):")
print("            "+"".join(f"{j[:9]:>11}" for j in intervs))
for i in range(I):
    print(f"{districts[i]:<22}"+"".join(f"{x_mip[i,j]:>11d}" for j in range(J)))

print("\nEfficiency-equity frontier (epsilon-constraint):")
print(f"{'equity-floor':>13}{'raw DALYs(k)':>14}{'eqwtd DALYs(k)':>16}")
for fl,raw,eq in frontier:
    print(f"{fl:>13.1f}{raw:>14.1f}{eq:>16.1f}")

json.dump({
 "status_quo_eqwtd":dalys_sq,"lp_eqwtd":dalys_lp,"mip_eqwtd":dalys_mip,
 "de_eqwtd":dalys_de,"value_of_analytics_pct":gain,
 "lp_alloc":x_lp.round(3).tolist(),"mip_alloc":x_mip.tolist(),
 "frontier":[[float(a),float(b),float(c2)] for a,b,c2 in frontier],
}, open("../outputs/optimization_results.json","w"), indent=2)
print("\n[saved] outputs/optimization_results.json")
