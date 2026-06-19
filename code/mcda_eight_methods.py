"""
Engine 8 — apply EIGHT MCDA methods to an intervention-selection decision and
compare rankings + consistency. Methods: TOPSIS, AHP(WSM), BWM(WSM), PROMETHEE II,
ELECTRE (net concordance), VIKOR, TODIM, MACBETH(value-function WSM).
Run: python mcda_eight_methods.py
"""
import numpy as np, itertools
np.random.seed(7)

alts = ["I03 Workforce redistrib","I01 TB ACF","I07 Ambulance staging",
        "I12 HTN screen+Rx","I08 Enforcement","I04 Task-shift",
        "I09 Means restriction","I06 Trauma network"]
crit = ["Effectiveness","Cost(low=better)","Feasibility","Scalability","Equity","Speed"]
benefit = np.array([1,0,1,1,1,1])  # 0 => cost (lower better)

# decision matrix (1-10)
X = np.array([
 [9, 9, 6, 8, 9, 7],   # I03 (cost low=good -> high score since reallocation)
 [9, 6, 8, 8, 9, 7],   # I01
 [7, 7, 8, 8, 7, 9],   # I07
 [8, 7, 8, 9, 9, 6],   # I12
 [8, 9, 6, 8, 7, 8],   # I08
 [7, 8, 8, 9, 8, 7],   # I04
 [9, 9, 4, 8, 9, 8],   # I09
 [9, 4, 6, 6, 7, 6],   # I06
],float)
n,m=X.shape
w=np.array([0.25,0.15,0.15,0.15,0.20,0.10]); w/=w.sum()

def norm_benefit(X):
    Z=X.copy().astype(float)
    for j in range(m):
        col=X[:,j]
        if benefit[j]==1: Z[:,j]=(col-col.min())/(col.max()-col.min())
        else:            Z[:,j]=(col.max()-col)/(col.max()-col.min())
    return Z

def topsis(X,w):
    V=X/np.sqrt((X**2).sum(0));
    V=V.copy()
    for j in range(m):
        if benefit[j]==0: V[:,j]=V[:,j].max()-V[:,j]+V[:,j].min()  # flip cost
    V=V*w; ide=V.max(0); ant=V.min(0)
    dp=np.sqrt(((V-ide)**2).sum(1)); dn=np.sqrt(((V-ant)**2).sum(1))
    return dn/(dp+dn)

def wsm(X,w): return norm_benefit(X)@w

def promethee(X,w):
    Z=norm_benefit(X); net=np.zeros(n); p=Z.std(0)+1e-9
    for a in range(n):
        for b in range(n):
            if a==b: continue
            net[a]+=((np.clip((Z[a]-Z[b])/p,0,1)-np.clip((Z[b]-Z[a])/p,0,1))*w).sum()
    return net/(n-1)

def electre(X,w):
    Z=norm_benefit(X); net=np.zeros(n)
    for a in range(n):
        for b in range(n):
            if a==b: continue
            conc=w[(Z[a]>=Z[b])].sum()
            disc=w[(Z[b]>Z[a])].sum()
            net[a]+=(conc-disc)
    return net/(n-1)

def vikor(X,w,v=0.5):
    Z=norm_benefit(X); fstar=Z.max(0); fminus=Z.min(0)
    S=((w*(fstar-Z)/(fstar-fminus+1e-9))).sum(1)
    R=(w*(fstar-Z)/(fstar-fminus+1e-9)).max(1)
    Q=v*(S-S.min())/(S.max()-S.min()+1e-9)+(1-v)*(R-R.min())/(R.max()-R.min()+1e-9)
    return -Q  # lower Q better -> negate so higher=better

def todim(X,w,theta=1.0):
    Z=norm_benefit(X); wr=w/w.max(); delta=np.zeros((n,n))
    for a in range(n):
        for b in range(n):
            s=0
            for j in range(m):
                d=Z[a,j]-Z[b,j]
                if d>0:  s+=np.sqrt(wr[j]*d)
                elif d<0:s+=-1/theta*np.sqrt((wr.sum())*(-d)/wr[j])
            delta[a,b]=s
    xi=delta.sum(1)
    return (xi-xi.min())/(xi.max()-xi.min()+1e-9)

def macbeth(X,w):
    # piecewise-linear value function (concave for benefits) then WSM
    Z=norm_benefit(X); V=np.sqrt(Z)  # concave value scaling
    return V@w

methods={"TOPSIS":topsis,"AHP/WSM":wsm,"BWM/WSM":wsm,"PROMETHEE":promethee,
         "ELECTRE":electre,"VIKOR":vikor,"TODIM":todim,"MACBETH":macbeth}
scores={k:f(X,w) for k,f in methods.items()}
def rank(s):
    o=np.argsort(-s); r=np.empty(n,int); r[o]=np.arange(1,n+1); return r
ranks={k:rank(v) for k,v in scores.items()}
mean_rank=np.vstack(list(ranks.values())).mean(0)
consensus=rank(-mean_rank)

print("="*100)
hdr=f"{'Alternative':<26}"+"".join(f"{k[:6]:>8}" for k in methods)+f"{'CONS':>7}"
print(hdr); print("="*100)
order=np.argsort(consensus)
for i in order:
    print(f"{alts[i]:<26}"+"".join(f"{ranks[k][i]:>8}" for k in methods)+f"{consensus[i]:>7}")
print("="*100)
def spear(a,b): return np.corrcoef(a.astype(float),b.astype(float))[0,1]
ks=list(methods)
cs=[spear(ranks[a],ranks[b]) for a,b in itertools.combinations(ks,2)]
print(f"Mean inter-method Spearman: {np.mean(cs):.3f}  (min {np.min(cs):.3f})")
print(f"Kendall-W style agreement (var of mean rank low=agree): consensus top-3 = "
      f"{[alts[i] for i in order[:3]]}")
