# Part 2 — Research Portfolio: 50 Projects

Projects are grouped into four programmes. Each carries the eleven required fields. To keep
this navigable, two **flagship projects per programme** are written in full template form;
the remaining projects use a dense structured row carrying the same fields in compressed
form. All projects instantiate the Avoidable-Burden Decision Chain (ABDC) and feed the
shared objective $A(\mathbf{x})$.

**Field key:** T=Title · R=Rationale · G=Evidence gap · N=Novelty · O=Objectives ·
CF=Conceptual framework · D=Data · M=Methodology · X=Expected outputs · P=Policy relevance ·
Pub=Publication opportunities.

---

## A. Disease Programmes (P01–P14)

### P01 — TB (FLAGSHIP, full template)
- **T:** Optimal geographic allocation of TB case-finding and treatment under a fixed NTEP budget.
- **R:** TB remains a top infectious killer; case detection gaps and spatial mismatch between burden and resources drive avoidable deaths.
- **G:** District-level optimization coupling notification gaps, drug-resistance, and cost has not been done with calibrated uncertainty.
- **N:** First Bayesian small-area TB burden posterior piped directly into an MIP allocation of ACF (active case finding), diagnostics (NAAT), and DST capacity.
- **O:** (1) Estimate district avoidable TB deaths $\Delta$; (2) optimize ACF + diagnostic placement; (3) quantify DALYs averted vs status quo.
- **CF:** ABDC with cascade-of-care loss as the implementation operator $\kappa$.
- **D:** NIKSHAY notifications, prevalence survey, drug-resistance survey, HMIS, cost data, GIS.
- **M:** BYM2 spatial model → PAF for diagnostic delay → MIP facility/effort allocation → PSA.
- **X:** District optimal ACF map; DALYs-averted estimate; open code; policy brief.
- **P:** Directly actionable by National TB Elimination Programme budget cycle.
- **Pub:** *Lancet Global Health*, *PLoS Medicine*, *IJTLD*.

### P02 — HIV (FLAGSHIP, full template)
- **T:** Reallocating HIV prevention (PrEP, testing, viral-load) to minimize incidence per rupee.
- **R:** Flat/declining HIV funding demands allocative efficiency to sustain epidemic control.
- **G:** Sub-national PrEP/test-and-treat optimization with transmission feedback is rare in LMIC routine-data settings.
- **N:** Couples a compartmental transmission model's incidence elasticity to a network-aware allocation optimizer.
- **O:** Minimize new infections + AIDS deaths under budget; identify reallocation winners/losers.
- **CF:** ABDC + transmission-dynamic counterfactual (averted infections cascade forward).
- **D:** SACS/NACO programme data, IBBS surveys, ART registry, unit costs.
- **M:** Calibrated compartmental model → marginal incidence per intervention → MIP/greedy submodular allocation.
- **X:** Optimal prevention mix by district; incidence-averted curves.
- **P:** Feeds NACO strategic planning and Global Fund concept notes.
- **Pub:** *Lancet HIV*, *JIAS*, *AIDS*.

### P03 — Malaria
R: Residual transmission + elimination push. G: ITN/IRS/larviciding spatial mix unoptimized vs receptivity. N: Coupling vectorial-capacity (climate-driven) to network optimization of vector control. O: Maximize cases averted per unit; map elimination feasibility. CF: One-Health-linked ABDC. D: NVBDCP/IDSP, entomology, rainfall/temperature, GIS. M: Spatiotemporal Bayesian risk → vectorial capacity → MIP allocation. X: Vector-control allocation map. P: NVBDCP micro-stratification. Pub: *Malaria Journal*, *Lancet ID*.

### P04 — Dengue
R: Rising urban dengue, costly outbreaks. G: Pre-emptive vector control & surge-bed allocation poorly optimized. N: Digital-twin of a city dengue season driving anticipatory resource pre-positioning. O: Minimize severe cases + outbreak cost. CF: ABDC + early-warning trigger. D: IDSP, climate, breeding-site GIS, hospital census. M: ABM/system-dynamics twin → reinforcement-learning surge policy. X: Anticipatory action playbook. P: Urban local-body planning. Pub: *PLoS NTD*, *eLife*.

### P05 — AMR
R: AMR is a slow pandemic with weak quantification of attributable burden in LMICs. G: Attributable AMR deaths/cost at sub-national level largely unknown. N: Causal-ML estimation of AMR-attributable mortality + stewardship allocation optimizer. O: Estimate AMR-attributable $\Delta$; optimize stewardship + diagnostics placement. CF: Counterfactual "susceptible-infection" world. D: AMR surveillance (ICMR-AMRSN), prescription audit, microbiology. M: Targeted maximum likelihood estimation (TMLE) → MIP. X: AMR attributable-burden atlas. P: National Action Plan on AMR. Pub: *Lancet Microbe*, *Lancet ID*.

### P06 — NCDs (hypertension/diabetes cascade)
R: Massive NCD burden, leaky care cascade. G: Where in the cascade does reallocation avert most DALYs? N: Cascade-decomposition + allocation across screening/treatment/adherence. O: Optimize cascade investment. CF: ABDC with cascade loss as $\kappa$. D: NPCDCS, NFHS, claims. M: Multilevel cascade model → decomposition → LP allocation. X: Cascade investment frontier. P: NP-NCD planning. Pub: *Lancet Global Health*, *BMJ Global Health*.

### P07 — Mental health
R: Huge treatment gap (>80%). G: Optimal task-shared workforce placement unquantified. N: Workforce-location optimization for community mental-health under scarcity. O: Maximize treated prevalence per counsellor. CF: ABDC + access counterfactual. D: NMHS, DMHP, workforce registry. M: Facility-location + queueing for counsellor caseload. X: Counsellor deployment map. P: District Mental Health Programme. Pub: *Lancet Psychiatry*, *World Psychiatry*.

### P08 — Maternal health
R: Persistent maternal mortality clusters. G: Referral-network + EmONC bed optimization rarely causal. N: Network optimization of referral chains minimizing avoidable maternal deaths. O: Optimize EmONC placement + referral routing. CF: Three-delays counterfactual. D: HMIS, MDSR, facility EmONC readiness, road network. M: Bayesian MMR small-area → network flow / p-median. X: Referral-network redesign. P: LaQshya / JSSK. Pub: *Lancet Global Health*, *BJOG*.

### P09 — Child health
R: Under-5 mortality concentrated in pockets. G: Bundled-intervention allocation (vaccines+ORS+pneumonia) suboptimal. N: Joint multi-intervention child-survival optimizer with equity floor. O: Maximize under-5 deaths averted equitably. CF: Lives-Saved-Tool counterfactual extended. D: NFHS, HMIS, immunization (U-WIN). M: LiST-linked burden → equity-constrained MIP. X: Child-survival investment map. P: RMNCH+A. Pub: *Lancet*, *Pediatrics*.

### P10 — Nutrition
R: Stunting/anaemia drag DALYs and human capital. G: Cross-sector (health+ICDS+WASH) allocation unintegrated. N: Multi-sector nutrition allocation with human-capital valuation. O: Maximize DALYs + future productivity per rupee across sectors. CF: ABDC + human-capital counterfactual. D: NFHS, POSHAN, ICDS. M: Multilevel + system dynamics → multi-sector LP. X: POSHAN allocation dashboard. P: POSHAN Abhiyaan. Pub: *Lancet*, *Maternal & Child Nutrition*.

### P11 — Hepatitis (B/C elimination)
R: Elimination targets, financing gap. G: Test-and-treat geographic optimization absent. N: Elimination-pathway optimizer. O: Min infections/deaths per rupee. CF: Cascade counterfactual. D: NVHCP. M: Transmission model → MIP. X: Elimination roadmap. P: NVHCP. Pub: *J Hepatology*, *Lancet GH*.

### P12 — Neglected tropical diseases
R: NTDs entrench poverty. G: MDA + WASH co-allocation suboptimal. N: Joint MDA-WASH optimizer. O: Max DALYs averted. CF: ABDC. D: NTD surveillance, WASH. M: Spatial Bayesian → MIP. X: Co-allocation map. P: NTD programmes. Pub: *PLoS NTD*.

### P13 — Vaccine-preventable diseases / immunization equity
R: Zero-dose children clusters. G: Outreach-session allocation vs equity unoptimized. N: Zero-dose targeting optimizer with equity weights. O: Min zero-dose children. CF: Coverage counterfactual. D: U-WIN, NFHS, GIS. M: Small-area coverage → equity MIP. X: Outreach micro-plan. P: Universal Immunization Programme. Pub: *Vaccine*, *Lancet GH*.

### P14 — Respiratory / air-pollution-linked disease
R: Air pollution drives huge respiratory/cardiac burden. G: Health-sector vs source-control allocation tradeoff unquantified. N: Cross-sector pollution-health optimizer. O: Max DALYs averted per rupee (clinical vs environmental). CF: Counterfactual clean-air exposure. D: CPCB air data, HMIS, GBD. M: Exposure-response + PAF → cross-sector LP. X: Pollution-health investment case. P: NCAP + health. Pub: *Lancet Planetary Health*.

---

## B. Injury Programmes (P15–P22)

### P15 — Road traffic injury (FLAGSHIP, full template)
- **T:** Optimizing trauma-system geography and enforcement to minimize avoidable RTI deaths.
- **R:** RTIs kill disproportionately among the young; the "golden hour" is routinely missed.
- **G:** Joint optimization of trauma-center placement, ambulance staging, and enforcement allocation is absent in LMIC settings.
- **N:** Couples a crash-risk spatial model to a combined facility-location + ambulance-queueing + enforcement-allocation optimizer.
- **O:** Minimize pre-hospital + in-hospital avoidable deaths within transport and budget constraints.
- **CF:** Three-delays trauma counterfactual; $\kappa$ = pre-hospital care coverage.
- **D:** iRAD crash data, ambulance GPS (108), hospital trauma capacity, road network.
- **M:** Spatial crash model → p-median trauma centers → M/M/c ambulance queueing → MIP enforcement.
- **X:** Trauma-system redesign map; ambulance staging plan; deaths-averted estimate.
- **P:** Feeds MoRTH/NHM trauma-care and Good Samaritan policy.
- **Pub:** *Injury Prevention*, *Lancet Public Health*, *Accident Analysis & Prevention*.

### P16 — Drowning
R: Leading child injury death, invisible in data. G: Burden under-counted; intervention siting unoptimized. N: Burden reconstruction + barrier/childcare/swim-training allocation. O: Min child drowning deaths. CF: Counterfactual supervision/barriers. D: Verbal autopsy, MDSR, GIS waterbodies. M: Bayesian burden reconstruction → MIP siting. X: Drowning-prevention micro-plan. P: State child-safety policy. Pub: *Injury Prevention*, *BMJ GH*.

### P17 — Burns
R: High burns burden among women; severe DALYs. G: Burn-unit + prevention allocation unstudied. N: Burn-care network optimization. O: Min burns DALYs. CF: Care-access counterfactual. D: Hospital burn registry, HMIS. M: Small-area burden → facility location. X: Burn-care network plan. P: NPPCB. Pub: *Burns*, *Injury*.

### P18 — Falls (elderly)
R: Ageing population, rising fall fractures. G: Community fall-prevention allocation absent. N: Geriatric fall-prevention targeting. O: Min fall DALYs/cost. CF: Counterfactual home-safety + exercise coverage. D: LASI, hospital data. M: Risk model → equity LP. X: Fall-prevention targeting. P: NPHCE. Pub: *Age & Ageing*, *Injury Prev*.

### P19 — Poisoning (pesticide self-harm + accidental)
R: Pesticide ingestion a major rural death cause. G: Means-restriction + treatment allocation unoptimized. N: Means-restriction policy optimization linked to treatment capacity. O: Min poisoning deaths. CF: Access-to-lethal-means counterfactual. D: NCRB, hospital data, agri sales. M: Causal effect of bans → MIP treatment siting. X: Means-restriction + antidote-stocking plan. P: Pesticide regulation + emergency care. Pub: *Lancet GH*, *Clinical Toxicology*.

### P20 — Suicide / self-harm
R: High suicide rates in young adults & farmers. G: Multi-component prevention allocation untested. N: Portfolio optimization of means-restriction + crisis lines + gatekeeper training. O: Min suicide deaths equitably. CF: ABDC multi-lever. D: NCRB, NMHS, helpline data. M: Causal synthesis → MCDA + MIP. X: District suicide-prevention portfolio. P: National Suicide Prevention Strategy. Pub: *Lancet Psychiatry*, *Crisis*.

### P21 — Occupational injury
R: Informal-sector injury invisible. G: Burden + inspection allocation unknown. N: Inspection-resource optimization. O: Min occupational DALYs. CF: Safety-coverage counterfactual. D: ESIC, factory inspectorate. M: Burden reconstruction → MIP inspection. X: Inspection allocation. P: Labour + health. Pub: *Occup Environ Med*.

### P22 — Violence (interpersonal/GBV)
R: GBV major hidden burden. G: Service (one-stop-centre) placement unoptimized. N: GBV-service network optimization with access equity. O: Max survivor access. CF: Access counterfactual. D: NFHS, crime data, OSC registry. M: Small-area need → facility location. X: OSC siting plan. P: One Stop Centre / Mission Shakti. Pub: *Lancet PH*, *Violence Against Women*.

---

## C. Health Systems Programmes (P23–P38)

### P23 — Workforce (FLAGSHIP, full template)
- **T:** Need-based health-workforce redistribution to minimize avoidable mortality from access gaps.
- **R:** Maldistribution, not absolute shortage, drives much avoidable burden; postings are political/historical.
- **G:** No operational, need-based, equity-weighted optimizer for cadre placement at district/facility level.
- **N:** Couples workload-indicators-of-staffing-need (WISN) + burden posterior to a multi-cadre assignment optimization with retention constraints.
- **O:** Minimize population-weighted access deficit; redistribute within fixed sanctioned strength.
- **CF:** Access-to-effective-care counterfactual; $\kappa$ = staffed-and-functional fraction.
- **D:** HRMIS, facility registry, HMIS workload, NFHS, GIS travel time.
- **M:** WISN + Bayesian burden → multi-objective assignment MIP (coverage + equity + feasibility).
- **X:** Cadre redistribution plan; access-deficit map; retention-risk flags.
- **P:** Directly feeds NHM HR planning and state recruitment/transfer policy.
- **Pub:** *Human Resources for Health*, *Health Policy & Planning*, *BMJ GH*.

### P24 — Infrastructure
R: Facilities mismatched to need. G: Capital allocation not optimized vs burden+access. N: Capital-investment optimizer (build/upgrade/close). O: Max access per capital rupee. CF: Access counterfactual. D: HMIS, facility survey, GIS. M: Multi-period facility location (capacity expansion). X: Capital plan. P: PM-ABHIM / NHM infra. Pub: *Health Policy Plan*, *Soc Sci Med*.

### P25 — Referral systems
R: Broken referrals cause avoidable deaths. G: Referral network rarely modelled as flow. N: Network-flow referral optimization + bypass analysis. O: Min effective-care delay. CF: Three-delays. D: Referral registry, ambulance GPS, capacity. M: Min-cost flow + queueing. X: Referral redesign. P: Hub-and-spoke policy. Pub: *Health Systems*, *BMC HSR*.

### P26 — Health financing
R: Allocation formulas weakly need-based. G: Inter-district allocation formula not optimized vs avoidable burden. N: Optimal financing-formula derivation + ECEA equity layer. O: Derive need+equity allocation weights. CF: Status-quo formula. D: NHA, PFMS, burden, poverty. M: Optimization-derived weights + ECEA. X: New allocation formula. P: Finance Commission / NHM PIP. Pub: *Health Economics*, *Health Policy Plan*.

### P27 — Digital health
R: Digital investments rarely prioritized by impact. G: Which digital interventions, where, avert most burden? N: Portfolio optimization of digital-health investments. O: Max DALYs averted per digital rupee. CF: ABDC. D: ABDM, programme data. M: CEA + MCDA + MIP. X: Digital investment case. P: ABDM strategy. Pub: *Lancet Digital Health*, *npj Digital Medicine*.

### P28 — Emergency / critical care
R: ICU/oxygen scarcity exposed by COVID. G: Surge capacity placement under uncertainty unsolved. N: Stochastic optimization of ICU/oxygen pre-positioning. O: Min unmet critical-care demand. CF: Counterfactual surge readiness. D: Hospital census, oxygen, IDSP. M: Stochastic/robust MIP + queueing. X: Surge pre-positioning plan. P: PM-ABHIM critical care. Pub: *Lancet GH*, *Critical Care*.

### P29 — Supply chain / essential medicines
R: Stockouts drive avoidable deaths. G: Inventory + last-mile optimization weakly burden-linked. N: Burden-weighted inventory optimization. O: Min stockout-attributable burden. CF: Availability counterfactual. D: DVDMS, logistics. M: Inventory theory + network optimization. X: Stocking policy. P: Free Drugs Initiative. Pub: *Production & Operations Mgmt*, *BMJ GH*.

### P30 — Primary care / HWC (Ayushman Arogya Mandir)
R: HWC scale-up needs prioritization. G: Service-package + placement optimization absent. N: Package + siting joint optimizer. O: Max population effective coverage. CF: Access counterfactual. D: HWC dashboard, NFHS. M: Coverage model + facility location. X: HWC prioritization. P: AB-HWC. Pub: *Lancet GH*, *PLoS Med*.

### P31 — Quality of care
R: Coverage without quality wastes resources. G: Quality-improvement investment not optimized. N: QI-investment allocation by avoidable-burden leverage. O: Max DALYs from quality gains. CF: Effective-coverage counterfactual. D: NQAS, LaQshya audits. M: Effective-coverage decomposition → LP. X: QI investment map. P: NQAS. Pub: *BMJ Quality & Safety*.

### P32 — Insurance / PM-JAY strategic purchasing
R: Purchasing not value-based. G: Package-rate + coverage optimization for value absent. N: Value-based purchasing optimization. O: Max health per claim rupee. CF: Status-quo purchasing. D: PM-JAY claims. M: ECEA + optimization. X: Value-based package design. P: NHA/PM-JAY. Pub: *Health Affairs*, *Health Econ*.

### P33 — Governance / accountability
R: Weak accountability sustains gaps. G: No quantitative governance-gap diagnostic linked to outcomes. N: Governance-gap index (Part 3) validated against outcomes. O: Quantify governance→outcome link. CF: Benchmark governance. D: Surveys, audit, HMIS. M: Latent-variable SEM + multilevel. X: Governance dashboard. P: NHM monitoring. Pub: *Health Policy Plan*, *Governance*.

### P34 — Catastrophic health expenditure
R: OOP pushes millions into poverty. G: Attributable CHE + remediation allocation unquantified. N: Attributable-CHE estimation + financial-protection optimizer. O: Min CHE/impoverishment per rupee. CF: Counterfactual full protection. D: NSSO/CES, NHA. M: ECEA + causal estimation. X: Financial-protection investment case. P: PM-JAY expansion. Pub: *Lancet GH*, *Health Econ*.

### P35 — Surveillance / IDSP-IHIP
R: Late detection costs lives/money. G: Surveillance-resource placement vs detection value unoptimized. N: Value-of-surveillance optimizer. O: Max early-detection value per rupee. CF: Detection-delay counterfactual. D: IDSP-IHIP, lab network. M: VoI + facility location. X: Surveillance investment plan. P: IHIP. Pub: *Emerging Infectious Diseases*.

### P36 — Laboratory networks
R: Diagnostic access uneven. G: Lab-hub placement + sample-transport unoptimized. N: Hub-and-spoke lab optimization. O: Min diagnostic turnaround/cost. CF: Access counterfactual. D: Lab registry, transport. M: Hub location + routing. X: Lab network plan. P: IPHL / Free Diagnostics. Pub: *BMC HSR*.

### P37 — Health information systems / data quality
R: Poor data corrupts decisions. G: Where does data-quality investment most improve decisions? N: Decision-value-of-data-quality framework. O: Prioritize data-quality investment by decision leverage. CF: Perfect-data counterfactual (EVPI). D: HMIS audits. M: EVPI + measurement-error models. X: Data-quality priority list. P: HMIS strengthening. Pub: *JAMIA*, *Pop Health Metrics*.

### P38 — Multi-programme integrated allocation
R: Vertical programmes compete inefficiently. G: Cross-programme allocation rarely jointly optimized. N: Whole-of-portfolio integrated optimizer (the programme's capstone systems project). O: Max total DALYs averted across all programmes under one envelope. CF: Sum of siloed counterfactuals. D: All programme datasets. M: Large-scale MIP / decomposition (Benders). X: Integrated state health budget. P: State PIP / Treasury. Pub: *Lancet*, *Nature Medicine*.

---

## D. One Health Programmes (P39–P50)

### P39 — Climate change & health (FLAGSHIP, full template)
- **T:** Optimizing climate-adaptation health investments to minimize avoidable heat/flood/vector burden.
- **R:** Climate shocks are now a leading and growing driver of avoidable burden; adaptation budgets are unallocated by impact.
- **G:** No coupled climate–health–allocation model exists at district level for adaptation prioritization.
- **N:** Couples downscaled climate projections to a health-impact model and an adaptation-portfolio optimizer (heat action, cooling, vector control, resilient facilities).
- **O:** Maximize avoidable climate-attributable DALYs averted per adaptation rupee under projected scenarios.
- **CF:** Counterfactual climate-stable exposure; scenario-based (SSP) avoidable burden.
- **D:** IMD/CMIP downscaled climate, HMIS, mortality, GIS flood/heat maps.
- **M:** Exposure-response + attribution → scenario ensemble → robust/stochastic portfolio MIP.
- **X:** District climate-health adaptation investment plan; heat-action targeting.
- **P:** State Action Plans on Climate Change & Health (NPCCHH).
- **Pub:** *Lancet Planetary Health*, *Nature Climate Change*, *Environmental Health Perspectives*.

### P40 — Zoonoses / spillover risk
R: Spillover risk concentrated and unmonitored. G: Surveillance placement at human-animal interface unoptimized. N: Cross-sector zoonotic-surveillance optimizer. O: Max spillover-detection value. CF: Detection counterfactual. D: Animal+human surveillance, land use. M: Risk model + VoI siting. X: One-Health surveillance plan. P: NOHM (National One Health Mission). Pub: *Lancet Planetary Health*, *EID*.

### P41 — Vector control (cross-disease)
R: Vector control fragmented across diseases. G: Integrated vector management not optimized jointly. N: Multi-disease integrated vector-control optimizer. O: Max DALYs averted across malaria+dengue+chikungunya. CF: ABDC. D: Entomology, climate, case data. M: Joint spatial model + MIP. X: IVM plan. P: NVBDCP/NCVBDC. Pub: *Malaria J*, *PLoS NTD*.

### P42 — Environmental health (water & sanitation)
R: WASH gaps drive enteric/NTD burden. G: WASH-health co-investment not optimized. N: Cross-sector WASH-health optimizer. O: Max enteric-DALYs averted per rupee. CF: Coverage counterfactual. D: JJM, SBM, NFHS. M: PAF + cross-sector LP. X: WASH-health investment case. P: Jal Jeevan / Swachh Bharat. Pub: *Lancet Planetary Health*, *EHP*.

### P43 — Air quality & health (One-Health framing)
R: See P14; here integrated with agriculture/energy sources. N: Multi-sector airshed optimizer. O: Max DALYs averted across health+source control. CF: Clean-air counterfactual. D: CPCB, emissions inventory. M: Source-apportionment + optimization. X: Airshed action plan. P: NCAP. Pub: *Lancet Planetary Health*.

### P44 — Food systems & NCD/nutrition
R: Diet drives NCD + undernutrition dual burden. G: Food-policy levers not optimized for health. N: Food-environment policy optimizer. O: Max DALYs averted (taxes, reformulation, fortification). CF: Diet counterfactual. D: Consumption surveys, GBD diet. M: Comparative risk assessment + policy optimization. X: Food-policy package. P: FSSAI + health. Pub: *Lancet*, *Nature Food*.

### P45 — Antimicrobial use in agriculture (One-Health AMR)
R: Agricultural AMU drives human AMR. G: Cross-sector AMU-reduction allocation absent. N: One-Health AMR stewardship optimizer. O: Min AMR burden across sectors. CF: AMU-reduction counterfactual. D: Veterinary AMU, human AMR. M: Coupled model + optimization. X: One-Health AMR plan. P: NAP-AMR. Pub: *Lancet Microbe*, *Nature Sustainability*.

### P46 — Disaster / extreme-event health resilience
R: Floods/cyclones disrupt services. G: Resilience investment not optimized vs disruption burden. N: Health-system resilience optimizer under shocks. O: Min service-disruption DALYs. CF: Resilience counterfactual. D: Disaster records, facility GIS. M: Robust/stochastic optimization. X: Resilience investment plan. P: NDMA + health. Pub: *Lancet Planetary Health*, *Disasters*.

### P47 — Urban health systems
R: Urban poor underserved despite density. G: Urban facility/outreach allocation unoptimized. N: Urban-slum-targeted optimizer with equity. O: Max effective coverage in urban poor. CF: Access counterfactual. D: NUHM, census slum data. M: Facility location + equity. X: Urban health plan. P: NUHM. Pub: *J Urban Health*, *Lancet GH*.

### P48 — Migration & mobile populations
R: Migrants fall through cracks. G: Service models for mobility unoptimized. N: Mobility-aware service optimization. O: Max migrant coverage. CF: Continuity counterfactual. D: Migration data, programme data. M: Network + mobility model. X: Migrant-health service design. P: NHM portability. Pub: *Lancet Migration*, *SSM*.

### P49 — Planetary co-benefits (health + climate mitigation)
R: Some health policies also cut emissions. G: Co-benefit optimization rare. N: Joint health-climate co-benefit optimizer. O: Max combined health+climate value. CF: Dual counterfactual. D: Health + emissions data. M: Multi-objective optimization. X: Co-benefit policy set. P: NDC + health. Pub: *Lancet Planetary Health*, *Nature Sustainability*.

### P50 — One-Health integrated decision platform (capstone)
R: One-Health decisions span ministries with no shared analytics. G: No integrated cross-sector decision platform. N: The programme's One-Health capstone: a shared digital twin coupling human-animal-environment burden to cross-ministry allocation. O: Demonstrate cross-sector optimal allocation. CF: Sum of siloed counterfactuals. D: All One-Health datasets. M: Coupled digital twin + large-scale optimization. X: Cross-ministry decision platform. P: National One Health Mission. Pub: *Nature*, *Lancet Planetary Health*.

---

## Portfolio logic

- **Methodological coherence:** every project is one instantiation of the ABDC, so methods,
  code, and the software platform are *shared assets*, not re-built per project.
- **Capstones (P38, P50)** integrate the vertical projects into whole-portfolio optimization —
  the scientific climax of the programme.
- **Sequencing** maps to [Part 11](11-implementation-roadmap.md): flagships (P01, P15, P23, P39)
  are the compressed first-cycle demonstrators.
