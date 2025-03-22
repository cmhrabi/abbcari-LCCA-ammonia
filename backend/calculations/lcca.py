import math
from calculations import capex

def lcca_pre_calc(data):
    exchange_rate, electricity_em_intensity, electricity_price, NG_price = capex.set_up(data["province"])
    X_n, X_n_inst = capex.X_n_gpt(data["final_demand"], data["baseline_demand"], data["start_year"], data["final_year"], 0.6212)
    
    # capex electrified
    elec_tech = data["electrified"]
    C_b_pre_e = []
    alpha_list_e = []
    installation_factors_e = []
    scaling_factors_e = []
    for subprocess in elec_tech["subprocesses"]:
        C_b_pre_e.append(subprocess["baseline_cost"])
        alpha = math.log(1 - subprocess["learning_rate"]) / math.log(2)
        alpha_list_e.append(alpha)
        installation_factors_e.append(subprocess["installation_factor"])
        scaling_factors_e.append(subprocess["scaling_factor"])
    C_b = capex.C_b_calc(C_b_pre_e, X_n, alpha_list_e, exchange_rate)
    C_pur, C_inst = capex.pur_inst_cost_calc(C_b, X_n, data["baseline_demand"], installation_factors_e, scaling_factors_e)
    C_indir_dir, C_dir, C_wc, C_indir = capex.costs_calc(C_pur, C_inst, elec_tech["direct_cost_factor"], elec_tech["indirect_cost_factor"], elec_tech["wc_cost_factor"])
    C_capex_o = capex.capex_o_calc(C_inst, C_dir, C_indir, C_wc)
    PV_capex = capex.PV_capex_calc(data["discount_rate"], data["final_year"], data["start_year"])
    #C173
    C_capex_e = capex.C_capex_calc(C_capex_o, PV_capex)

    prod_per_hour = (data["baseline_demand"]*1000000)/(333*18.6)

    #Opex electrified
    ER_e_base = [[subprocess["energy_req"], 1-subprocess["efficiency"]] for subprocess in elec_tech["subprocesses"]]
    ER_e = capex.ER_calc(ER_e_base, X_n, alpha_list_e)
    total_e = capex.tot_calc(ER_e, X_n_inst)
    C_dir_e = capex.C_dir_calc(data["start_year"], data["final_year"], elec_tech["water_consumption"] * prod_per_hour, X_n_inst, total_e, electricity_price)
    C_opex_o_e = capex.C_opex_o_calc(data["final_year"], data["start_year"], X_n_inst, C_indir_dir, C_dir_e)
    PV_opex_e = capex.PV_opex_cal(data["discount_rate"], data["final_year"] - data["start_year"])
    C_opex_e = capex.C_opex_calc(PV_opex_e,C_opex_o_e)

    #Elec Emissions C259
    lifetime_op_emissions_e= capex.op_emissions_calc(X_n_inst, data["baseline_demand"], data["final_year"], data["start_year"], data["operating_hours"], total_e,0,elec_tech["water_consumption"] * prod_per_hour, electricity_em_intensity)
    lifetime_op_emissions_e = capex.lifetime_net_P2A(lifetime_op_emissions_e,X_n_inst, data["baseline_demand"])
    emissions_e = capex.emissions_calc(lifetime_op_emissions_e)

    #C186 Capex conventional
    conv_tech = data["conventional"]

    C_b_pre_c = []
    alpha_list_c = []
    installation_factors_c = []
    scaling_factors_c = []
    for subprocess in conv_tech["subprocesses"]:
        C_b_pre_c.append(subprocess["baseline_cost"])
        alpha = math.log(1 - subprocess["learning_rate"]) / math.log(2)
        alpha_list_c.append(alpha)
        installation_factors_c.append(subprocess["installation_factor"])
        scaling_factors_c.append(subprocess["scaling_factor"])
    C_b_c = capex.C_b_calc(C_b_pre_c, X_n, alpha_list_c, exchange_rate)

    C_pur_c, C_inst_c = capex.pur_inst_cost_calc(C_b_c, X_n, data["baseline_demand"], installation_factors_c, scaling_factors_c)
    C_indir_dir_c, C_dir_c, C_wc_c, C_indir_c = capex.costs_calc(C_pur, C_inst, conv_tech["direct_cost_factor"], conv_tech["indirect_cost_factor"], conv_tech["wc_cost_factor"])
    C_capex_c = capex.capex_o_calc(C_inst_c, C_dir_c, C_indir_c, C_wc_c)
    C_capex_loss_c = capex.C_capex_loss_calc(C_capex_c, conv_tech["depreciation"], conv_tech["duration"]) if conv_tech.get("depreciation", 0) > 0 and data.get("lcca_type", "psi") == "phi" else [0] * (data["final_year"] - data["start_year"])

#     #C186 Opex conventional
    NG_price = [
        33.16, 35.54, 37.44, 39.62, 40.96, 44.49, 47.34, 50.61, 53.70, 56.75,
        59.84, 63.02, 65.74, 68.89, 71.57, 73.86, 78.05, 81.81, 85.27, 88.65,
        92.31, 95.31, 98.12, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05
    ]
    total_c = [sum(elements) for elements in zip(*(capex.tot_NG_calc(subprocess["ng_req"], X_n, X_n_inst, data["baseline_demand"], alpha_list_c, i) for i, subprocess in enumerate(conv_tech["subprocesses"]) if subprocess.get("ng_req", 0) > 0))]
    C_dir_c = capex.C_dir_calc(data["start_year"], data["final_year"], conv_tech["water_consumption"] * prod_per_hour, X_n_inst, total_c, NG_price)
    C_opex_o_c = capex.C_opex_o_calc(data["final_year"], data["start_year"], X_n_inst, C_indir_dir_c, C_dir_c)
    PV_opex_c = capex.PV_opex_cal(data["discount_rate"], conv_tech["duration"])
    C_opex_c = capex.C_opex_calc(PV_opex_c, C_opex_o_c)

    # Emissions conventional C267
    ER_c_base = [[subprocess["energy_req"], 1-subprocess["efficiency"]] for subprocess in conv_tech["subprocesses"]]
    ER_c = capex.ER_calc(ER_c_base, X_n, alpha_list_c)
    total_c = capex.tot_calc(ER_c, X_n_inst)
    lifetime_op_emissions_c = capex.op_emissions_calc(X_n_inst, data["baseline_demand"], data["final_year"], data["start_year"], data["operating_hours"], total_c, conv_tech["onsite_upstream_emmisions"],conv_tech["water_consumption"] * prod_per_hour, electricity_em_intensity)
    emissions_c = capex.emissions_calc(lifetime_op_emissions_c)

    # import Export calc
    Ammonia_demand = [
        5.71031170, 12.65180775, 21.02357730, 31.05332624, 34.40098668, 38.10953699,
        42.21788237, 46.76912219, 51.81100206, 57.39641474, 63.58395504, 70.43853447,
        78.03206226, 86.44419970, 95.76319586, 106.08681338, 117.52335407, 130.19279505,
        144.22804740, 159.77635053, 177.00081675, 196.08214248, 217.22050388, 240.63765678, 273.64783562
    ]
    import_export = capex.import_export_calc(Ammonia_demand, X_n)

    return { "C_capex_c": C_capex_c, "C_capex_e": C_capex_e, "C_capex_loss_c": C_capex_loss_c, "C_capex_c": C_capex_c, "C_opex_c": C_opex_c, "C_opex_e": C_opex_e, "import_export": import_export, "emissions_c": emissions_c, "emissions_e": emissions_e }

def lcca_phi(data):
    lcca_params = lcca_pre_calc(data)
    return lcca_params, capex.LCCA_calc(lcca_params["C_capex_e"], lcca_params["C_opex_e"], lcca_params["C_capex_loss_c"], lcca_params["C_opex_c"], lcca_params["import_export"],  lcca_params["emissions_c"], lcca_params["emissions_e"])

def lcca_psi(data):
    lcca_params = lcca_pre_calc(data)
    return lcca_params, capex.LCCA_psi_calc(lcca_params["C_capex_e"], lcca_params["C_opex_e"], lcca_params["C_capex_c"], lcca_params["C_opex_c"], lcca_params["import_export"], lcca_params["emissions_c"], lcca_params["emissions_e"])