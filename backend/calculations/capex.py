import math


# Capex
def X_n_calc(X_sat, X_b, t_o, t_f):
    n = t_f - t_o + 1

    r = 0.6212  # ((1 / (t_f - t_o)) * math.log(((0.99 * X_sat) - X_b) / (0.01 * X_b)))
    # print(r)
    X_n_cumulative = []
    X_n = []
    for i in range(n):
        x = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * (i)))

        X_n.append(x)

        if i != 0:
            X_n_cumulative.append(x + X_n_cumulative[i - 1])
        else:
            X_n_cumulative.append(x)
    return X_n, X_n_cumulative


def X_n_gpt(X_sat, X_b, t_o, t_f, r):
    X_n_values = [X_b]
    X_n_inst = [X_b]
    years = t_f - t_o

    for n in range(1, years):
        if n == 1:
            X_n = 1.08 * (2 * X_n_values[-1] - 0)
            X_n_values.append(X_n)
        elif n == 2:
            X_n = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * n))
            X_n_values.append(X_n)
        else:
            X_n = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * n))

            X_n_previous = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * (n - 1)))
            X_n_year_before_previous = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * (n - 2)))

            X_n_minus_1 = X_n_values[-1]
            X_n_minus_2 = X_n_values[-2]

            condition_1 = X_n - X_n_minus_1 < X_n_minus_1 - X_n_minus_2

            condition_2 = (X_n - X_n_previous) > (X_n_previous - X_n_year_before_previous)

            # Apply the conditions
            if condition_1 and condition_2:
                result = 1.08 * (2 * X_n_minus_1 - X_n_minus_2)
            else:
                result = X_n

            # Append the result to the X_n_values list
            X_n_values.append(result)
        temp = X_n_values[n] - X_n_values[n - 1]
        X_n_inst.append(temp)

    # Return the list of X_n values
    return X_n_values, X_n_inst


def alpha_j_calc(LR, i):
    alpha = math.log(1 - LR[i]) / math.log(2)
    return alpha


def pem_Electrolyzer_C_b_calc(Scaling_factor):
    Hydrogen_mass_flow = 17.75303858  #kg/h
    Hydrogen_LHV = 33.33  #kWh/kg
    Electricity_to_hydrogen_eff = 0.6  #% LHV
    PEM_Electrolyzer_Cost_including_replacement_after_10_years = 2029.5
    pre_C_b = pow(Hydrogen_mass_flow * Hydrogen_LHV / Electricity_to_hydrogen_eff, Scaling_factor) * (
                PEM_Electrolyzer_Cost_including_replacement_after_10_years / 1000000)
    return pre_C_b


def N_production_HB_C_b_calc(Scaling_factor):
    Air_seperation_unit_cost = 1614140.3  #USD/(tN2/d)
    Nitrogen_mass_flow_rate = 82.24238154 / 1000  #kg/h --> to convert to Ton
    check_cell_E_and_E_C_4 = 24  # i think cuz hours per day
    pre_C_b = Air_seperation_unit_cost * pow(Nitrogen_mass_flow_rate * check_cell_E_and_E_C_4, Scaling_factor) / 1000000
    return pre_C_b


def HB_electolyser_case_C_b_calc(Scaling_factor):
    HB_reactor_cost = 5974889.7  #USD/(tNH3/d)
    Net_Ammonia_production = 0.1  #tonne/h
    check_cell_E_and_E_C_4 = 24  # i think cuz hours per day
    pre_C_b = HB_reactor_cost * pow(Net_Ammonia_production * check_cell_E_and_E_C_4, Scaling_factor) / 1000000
    return pre_C_b


def C_b_calc(pre_C_b, X_n, alpha):
    canada_us_exchange_rate = [1.32, 1.32, 1.32, 1.3, 1.3, 1.29, 1.29, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28,
                               1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28]
    Net_ammonia_production_year = 0.01486512  #PJ/yr
    C_b = []

    for i in range(len(X_n)):
        C_b_curr = []
        for j in range(len(pre_C_b)):
            C_b_curr.append(
                pre_C_b[j] * pow(X_n[i] / Net_ammonia_production_year, alpha[j]) * canada_us_exchange_rate[i])
        C_b.append(C_b_curr)
        #print(C_b_curr)
    return C_b

def pur_inst_each_calc(C_b,X_n_inst,X_n,X_b,Y,scaling_factor,tech, reforming_val, alpha):
    # ** check later come back to this V IMPORTANT

    exchange = [1.32, 1.32, 1.32, 1.3, 1.3, 1.29, 1.29, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28,
                               1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28, 1.28]
    reforming_blue = []
    reforming_grey = []

    for i in range(len(X_n)):
        reforming_blue.append(round(8.867887126*pow((X_n[i]/X_b),alpha[tech])* exchange[i], 5))

    # print(reforming_blue)

    for i in range(len(X_n)):
        reforming_grey.append(round(6.373533174 * pow((X_n[i] / X_b), alpha[tech]) * exchange[i], 5))
    # print(reforming_grey)
    C_pur = []
    C_inst = []
    for j in range(len(X_n)):

        #not 100% C36,37
        C = (C_b[j][tech] * pow((X_n_inst[j] / X_b), scaling_factor[tech])) + (pow(reforming_blue[j] * (X_n_inst[j] / X_b), 0.6663 / 1.391361257)) + (C_b[j][1] * pow((X_n_inst[j] / X_b), scaling_factor[1]))

        C_i = (1+Y[tech]) * C_b[j][tech]*pow((X_n_inst[j] / X_b), scaling_factor[tech]) + (1+Y[1])*pow(reforming_grey[j] * (X_n_inst[j] / X_b), 0.6663 ) + (1+Y[1])* C_b[j][1] * pow((X_n_inst[j] / X_b), scaling_factor[1])
        #
        # C_sum += C
        # C_sum_i += C_i

        C_pur.append(C)
        C_inst.append(C_i)
    # C6
    # print(C_b)
    # C300
    # print(X_n)
    # C36
    # print(C_pur)
    # C37
    # print(C_inst)
    #
    return C_pur, C_inst

def pur_inst_cost_calc(C_b, X_n, X_b, Y, scaling_factor):
    # C_i_pur & C_i_inst Calculation
    C_pur = []
    C_inst = []
    for j in range(len(X_n)):
        C_sum = 0
        C_sum_i = 0
        for i in range(len(scaling_factor)):
            if j == 0:
                C = C_b[j][i] * pow((X_n[j] / X_b), scaling_factor[i])
            else:
                C = C_b[j][i] * pow(((X_n[j] - X_n[j - 1]) / X_b), scaling_factor[i])
            C_i = (1 + Y[i]) * C

            C_sum += C
            C_sum_i += C_i

        C_pur.append(C_sum)
        C_inst.append(C_sum_i)

    return C_pur, C_inst


def capex_o_calc(C_pur, C_inst, S_dir, S_indir, S_wc):
    C_dir = []
    C_indir = []
    C_wc = []
    C_capex_o = []
    C_indir_dir = []

    for j in range(len(C_pur)):
        C_dir_j = C_pur[j] * S_dir
        C_indir_j = (C_inst[j] + C_dir_j) * S_indir
        C_wc_j = (C_inst[j] + C_dir_j + C_indir_j) * S_wc
        C_capex_o_j = C_inst[j] + C_dir_j + C_indir_j + C_wc_j
        C_dir.append(C_dir_j)
        C_indir.append(C_indir_j)
        C_wc.append(C_wc_j)
        C_indir_dir_j= C_inst[j] + C_pur[j]*S_dir + (C_inst[j] + C_pur[j]*S_dir)*S_indir
        C_indir_dir.append(C_indir_dir_j)
        C_capex_o.append(C_capex_o_j)

    # print(C_indir_dir)

    return C_indir_dir, C_capex_o


def PV_capex_calc(DR, t_f, t_o):
    n = t_f - t_o
    PV_capex = []

    for i in range(n + 5):
        PV_capex.append(1 / pow(1 + DR, i))

    return PV_capex


def C_capex_calc(C_capex_o, PV_capex):
    C_capex = []
    for i in range(len(C_capex_o)):
        C_capex.append(PV_capex[i + 4] * C_capex_o[i])
    return C_capex

def C_capex_loss_calc(C_capex, dep_rate, use):
    C_capex_loss = []
    for i in range(len(C_capex)):
        C_capex_loss.append(C_capex[i] * pow(1-dep_rate,use))
    return C_capex_loss

# # Opex
# def PV_opex_cal(DR, t_f, t_o):
#     n = t_f - t_o
#     PV_opex = []
#     for i in range(n):
#         PV_opex.append((math.pow(1 + DR, i + 1) - 1) / (DR * math.pow(1 + DR, i + 1)))
#     return PV_opex
#
#
# def C_s_energy_calc(PV_opex, t_f, t_o, C_s):
#     C_s_bar = {}
#     C_s_bar_sum = {}
#     PV_sum = 0
#     i = 0
#     # *** not sure
#     for key in C_s.keys():
#         C_s_bar_sum[key] = C_s_bar[key] + C_s[key] * PV_opex[i]
#         PV_sum += PV_opex[i]
#
#     for key in C_s_bar_sum.keys():
#         C_s_bar[key] = C_s_bar_sum[key] / PV_sum
#
#     return C_s_bar
#
#
# def ER_calc(ER_b, X_n, X_b, eff, alpha_j):
#     ER = []
#     ER_sum = []
#     for i in range(len(X_n)):
#         ER.append([])  # here i is the year where as in our paper it is tech i ***NEED TO FIX
#         ER_sum.append({})
#         for j in range(len(ER_b)):
#             ER[i].append({})
#             for key in ER_b[j].keys():
#                 if i != 0:
#                     ER[i][j][key] = ((1 - eff) * ER_b[j][key] * math.pow(X_n[i] / X_b, alpha_j[j]) + eff * ER_b[j][key]) * ((X_n[i] - X_n[i - 1]) / X_b)
#                 else:
#                     # ask not sure
#                     ER[i][j][key] = ((1 - eff) * ER_b[j][key] * math.pow(X_n[i] / X_b, alpha_j[j]) + eff * ER_b[j][key])
#     return ER, ER_sum
#
#
# def C_j_s_calc(ER, T_op, C_s_bar):
#     # here ER is given by tech so it is [{}] not [[{}]]
#     C_j_s = [{}]
#
#     for j in range(len(ER)):
#         for key in C_s_bar.keys():
#             C_j_s[j][key] = ER[j][key] * C_s_bar[key] * T_op
#
#     return C_j_s
#
#
# def C_energy_calc(C_j_s):
#     C_energy = 0
#
#     for j in range(len(C_j_s)):
#         for key in C_j_s[j].keys():
#             C_energy += C_j_s[j][key]
#
#     return C_energy
#
#
# def C_H2O_bar_calc(C_H2O, T_op, WR):
#     C_H2O_bar = WR * C_H2O * T_op
#     return C_H2O_bar
#
#
# def C_opex_bar_calc(C_energy, C_H2O, C_opex_add, theta):
#     C_opex_bar = (C_energy + C_H2O + C_opex_add) * (1 / (1 - theta))
#     return C_opex_bar
#
#
# def C_opex_calc(PV_opex, C_opex_bar):
#     C_opex = PV_opex * C_opex_bar
#     return C_opex

# Opex Calc Excel

def ER_calc(ER_b, X_n, alpha_list):  # ER_b = [[]]
    ER = []  # Learning rate opex[tech{year[]}]

    for i in range(len(ER_b)):
        ER_i = []
        for n in range(len(X_n)):
            result = ((1 - ER_b[i][1]) * ER_b[i][0] * math.pow(X_n[n] / X_n[0], alpha_list[i])) + ER_b[i][1] * ER_b[i][
                0]
            ER_i.append(result)
        ER.append(ER_i)
    return ER


def tot_calc(ER, X_inst):
    total = []
    for i in range(len(X_inst)):
        year_tot = 0
        for j in range(len(ER)):
            year_tot += ER[j][i]
        year_tot = year_tot * (X_inst[i] / X_inst[0])
        total.append(year_tot)
    return total

def tot_NG_calc(NG_req, X_n,X_inst,X_b,alpha_j,tech):
    NG_req_i = []
    total = []

    for i in range(len(X_n)):
        NG_req_i.append(NG_req*pow((X_n[i]/X_b), alpha_j[tech]))
    # print(NG_req_i)

    for i in range(len(NG_req_i)):
        total.append(NG_req_i[i]*(X_inst[i]/X_b))
    return total

def C_dir_calc(t_o, t_f, water_consumption, X_inst, total_elec, elec_price):  #C113
    C_dir = []
    Op_hrs_year = 8000
    Water_price_ton = 1.35
    net_ammonia_production_year = 0.01486512
    lifetime = t_f - t_o
    annual_cost_addition = []
    # Water Requirement Calculation C102
    water_requirement = []
    for i in range(lifetime):
        water = water_consumption * (X_inst[i] / net_ammonia_production_year)
        water_requirement.append(water)
    #Annual Cost Addition Calc C102
    for i in range(lifetime):
        annual_cost = (water_requirement[i] / 24) * Op_hrs_year * (Water_price_ton / 1000000)
        annual_cost_addition.append(annual_cost)
    # Annual cost for added capacity calc
    annual_cost_added_capacity = []
    sum_elec = 0
    for i in range(lifetime):
        sum_elec += elec_price[i]
    #print(annual_cost_addition)
    #print(sum_elec)
    # C62
    for i in range(lifetime):
        # sumproduct bullshit:
        t = [year for year in range(t_o, t_f)]
        sumproduct=0
        for j in range(lifetime):
            sumproduct += elec_price[i+j]*t[j]
        annual_elec_cost = total_elec[i] * Op_hrs_year * sumproduct / (sum(t) * 1000000)
        annual_cost_added_capacity.append(annual_elec_cost)
        # not working ask calum because this is bullshit

    for i in range(lifetime):
        C_dir.append(annual_cost_added_capacity[i]+annual_cost_addition[i])

    return C_dir

# left: C121, C123, C124, C125

def C_opex_o_calc(t_f, t_o, X_n_inst, C_indir_dir, C_dir): # C121
    lifetime = t_f - t_o

    operating_supervision_share = 0.15
    maintenance_labor_share = 0.02
    maintenance_material_share = 0.02
    operating_supplies_share = 0.15
    laboratory_charges_share = 0.2
    insurance_and_taxes_share = 0.02
    plant_overhead_costs_share = 0.6
    administrative_cost_share = 0.25
    distribution_marketing_rnd_share = 0.1

    additional_cost = []

    for i in range(lifetime):
        # labour hrs
        # Ammonia calorific value is 18.6 GJ/Tonne
        installed_capacity = 1000000000*X_n_inst[i]*1000/(18.6 * 8000)
        operating_labour = (2.13* math.pow(installed_capacity, 0.242)*7*8000/24)*37.5/1000000
        # print(operating_labour)
        # Operating supervision
        operating_supervision = operating_supervision_share * operating_labour

        # maintenence labour
        maintenance_labour = maintenance_labor_share * C_indir_dir[i]

        # maintenance material
        maintenance_material = maintenance_material_share * C_indir_dir[i]

        # operating supplies
        operating_supplies = operating_supplies_share * (maintenance_labour + maintenance_material)

        # laboratory charges
        laboratory_charges = laboratory_charges_share * operating_labour

        # insurance and taxes
        tax = insurance_and_taxes_share * C_indir_dir[i]

        plant_overhead = plant_overhead_costs_share * (operating_labour + operating_supervision + maintenance_labour)

        administrative_cost = administrative_cost_share*plant_overhead

        additional_cost.append((C_dir[i] + operating_labour + operating_supervision + maintenance_labour + maintenance_material + operating_supplies + laboratory_charges + tax + plant_overhead+ administrative_cost)/(1-distribution_marketing_rnd_share))


    return additional_cost

def PV_opex_cal(DR, lifetime):
    PV_opex= (math.pow(1 + DR, lifetime) - 1) / (DR * math.pow(1 + DR, lifetime))
    return PV_opex

def C_opex_calc(PV_opex, C_opex_bar):
    C_opex = []
    for i in range(len(C_opex_bar)):
        C_opex.append(PV_opex * C_opex_bar[i])
    return C_opex

#Emissions

def op_emissions_calc(X_n,X_b,t_f,t_o,op_hrs, elec_usage, onsite_upstream_emissions, water_consumption):
    # C240 water utility emission
    water_em_intensity = 0.0000281793 * 1000000
    # water_consumption = 0.190062218 #for grey H2
    water_requirement = []
    water_utility_emission = []

    for i in range(len(X_n)):
        water_requirement.append(water_consumption * (X_n[i]/X_b))

    for i in range(len(X_n)):
        water_utility_emission.append(water_em_intensity * water_requirement[i] * (t_f-t_o) * op_hrs/24)

    # C222 on site up stream emissions

    # onsite_upstream_emissions = 10.82 # grey H2 **** thinking of changing these to inputs since same calc for p2a different iputs
    hydrogen_flow = 17.75304
    onsite_upstream = []

    for i in range(len(X_n)):
        onsite_upstream.append(hydrogen_flow * onsite_upstream_emissions * 1000 * op_hrs * (t_f-t_o) *X_n[i]/X_b)

    # C210 electricity emissions
    electricity_emissions=[]
    electricity_em_intensity = [89.540742185233, 89.017561826546, 88.084472912088, 85.290291470357, 71.402483972780,
           57.645698603552, 46.115350764231, 35.803463179290, 26.369001218888, 24.855865473382,
           23.856153225816, 23.068904750921, 22.778510718673, 22.605790131205, 23.696917712470,
           25.477140089392, 26.548197781866, 26.651246604948, 27.033078165963, 28.522132905138,
           30.182957454054, 31.981269529615, 33.719336172295, 34.260032641605, 34.260032641605,
           34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605,
           34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605,
           34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605,
           34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605,
           34.260032641605, 34.260032641605, 34.260032641605, 34.260032641605]

    for i in range(len(X_n)):
        avg = 0
        for j in range((t_f-t_o)):
            avg += electricity_em_intensity[i+j]
        avg = avg/(t_f-t_o)
        electricity_emissions.append(avg*elec_usage[i]*op_hrs*(t_f-t_o)*1000)
    # print(electricity_emissions)
    # C263
    lifetime_op_emissions = []
    for i in range (len(X_n)):
        lifetime_op_emissions.append(electricity_emissions[i] + onsite_upstream[i] + water_utility_emission[i])

    return lifetime_op_emissions

def lifetime_net_P2A(lifetime_op_emissions,X_n,X_b):
    lifetime_net_P2A = []
    for i in range(len(lifetime_op_emissions)):
        lifetime_net_P2A.append(lifetime_op_emissions[i]+(2279807 * 1000*(X_n[i]/X_b)))
    return lifetime_net_P2A

def emissions_calc(lifetime_op_emissions):
    emissions = []
    emissions.append(lifetime_op_emissions[0])
    for i in range(len(lifetime_op_emissions)):
        if i != 0:
            emissions.append(lifetime_op_emissions[i]+emissions[i-1])
    return emissions

# Import Export
def import_export_calc(Ammonia_demand, X_n):
    ammonia_calorific_value = 18.6  # GJ/tonne
    ammonia_density = 0.6826  # kg/L
    canada_avg_cost_import = [
        0.87843798873104, 0.87843798873104, 0.87843798873104, 0.86512832223511,
        0.86512832223511, 0.85847348898715, 0.85847348898715, 0.85181865573919,
        0.85181865573919, 0.85181865573919, 0.85181865573919, 0.85181865573919,
        0.85181865573919, 0.85181865573919, 0.85181865573919, 0.85181865573919,
        0.85181865573919, 0.85181865573919, 0.85181865573919, 0.85181865573919,
        0.85181865573919, 0.85181865573919, 0.85181865573919, 0.85181865573919, 0.85181865573919
    ]

    canada_avg_revenue_export = [
        0.89001345170197, 0.89001345170197, 0.89001345170197, 0.87652839940345,
        0.87652839940345, 0.86978587325419, 0.86978587325419, 0.86304334710494,
        0.86304334710494, 0.86304334710494, 0.86304334710494, 0.86304334710494,
        0.86304334710494, 0.86304334710494, 0.86304334710494, 0.86304334710494,
        0.86304334710494, 0.86304334710494, 0.86304334710494, 0.86304334710494,
        0.86304334710494, 0.86304334710494, 0.86304334710494, 0.86304334710494, 0.86304334710494
    ]

    Imports_needed = []
    import_export_i = []

    for i in range(len(X_n)):
        Imports_needed.append(Ammonia_demand[i]-X_n[i])
    # print(Imports_needed)

    for i in range(len(X_n)):
        if Imports_needed[i] > 0:
            import_export_i.append(1000*(Imports_needed[i]/(ammonia_density*ammonia_calorific_value))*canada_avg_cost_import[i])
        else:
            import_export_i.append(1000*(Imports_needed[i]/(ammonia_density*ammonia_calorific_value))*canada_avg_revenue_export[i])
    return import_export_i

def LCCA_calc(C_capex , C_opex, C_capex_grey, C_opex_grey, import_export, emissions_grey, emissions):
    LCCA = []
    cumulative = 0
    for i in range(len(C_capex)):
        cumulative += C_capex[i] + C_opex[i] + C_capex_grey[i] - C_opex_grey[i] + import_export[i]
        LCCA.append(cumulative*1000000/((emissions_grey[i] - emissions[i])/1000000))

    # print(Cumulative_PV_C)
    return LCCA



def main():
    # Inputs (Parameters)
    # General

    # Capex
    X_sat = 238.23
    X_b = 0.01486512
    LR = [0.13, 0.1, 0.1]
    C_b = [
        {
            "electrolysis": 2.64,
            "nitrogen": 2.97,
            "HB": 12.22
        }
    ]
    scaling_factor = [1, 0.49, 0.5]
    S_dir = 0.33
    S_indir = 0.5
    S_wc = 0.05
    DR = 0.07
    d = 0.01
    Y = [0.33, 0, 0.7]
    E = 1
    t_o = 2025
    t_f = 2050
    m = 5

    # Opex
    T_op = 8000
    eff = 0.6
    ER_b = [
        [0.986181293, 0.6],
        [0.034624043, 0],
        [0.0778, 0]
    ] #elec hb

    ER_grey = [
        [0.017, 0],
        [0.034624043, 0],
        [0.0778, 0]
    ]

    C_s = {
        "elec": [200, 350],
        "nat": [200, 500]
    }
    WR = [100, 150]
    C_H2O = 100
    C_opex_add = 0
    theta = 0.1  # marketing and distribution factor
    CO2_per_ammonia = 2.013

    X_n, X_n_inst = X_n_gpt(X_sat, X_b, t_o, t_f, 0.6212)

    C_b_pre = []

    for i in range(len(scaling_factor)):
        if i == 0:
            C_b_pre.append(pem_Electrolyzer_C_b_calc(scaling_factor[i]))
        if i == 1:
            C_b_pre.append(N_production_HB_C_b_calc(scaling_factor[i]))
        if i == 2:
            C_b_pre.append(HB_electolyser_case_C_b_calc(scaling_factor[i]))
    alpha_list = []
    for i in range(len(LR)):
        alpha_list.append(alpha_j_calc(LR, i))
    # print(alpha_list)

    C_b = C_b_calc(C_b_pre, X_n, alpha_list)
    # print(C_b)

    # print(C_pur_g)
    # print(C_inst_grey)

    C_pur, C_inst = pur_inst_cost_calc(C_b, X_n, X_b, Y, scaling_factor)

    C_indir_dir, C_capex_o = capex_o_calc(C_pur, C_inst, S_dir, S_indir, S_wc)
    # print(C_capex_o)


    PV_capex = PV_capex_calc(DR, t_f, t_o)

    #C173
    C_capex = C_capex_calc(C_capex_o, PV_capex)
    # print(C_capex)

    #P2A Stuff
    water_consumption_P2A = 3.808056
    Electricity_price = [
        108.12, 108.40, 108.56, 108.51, 108.71, 108.35, 108.96, 109.03,
        109.21, 109.37, 109.71, 109.97, 110.27, 110.47, 110.74, 111.42,
        112.13, 112.70, 113.43, 114.07, 114.65, 115.15, 115.83, 116.74,
        116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
        116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
        116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
        116.74
    ]

    #Opex
    ER = ER_calc(ER_b, X_n, alpha_list)
    # print(ER)
    total = tot_calc(ER, X_n_inst)
    C_dir = C_dir_calc(t_o, t_f, water_consumption_P2A, X_n_inst, total, Electricity_price)

    C_opex_o = C_opex_o_calc(t_f,t_o, X_n_inst, C_indir_dir, C_dir)

    PV_opex = PV_opex_cal(DR, (t_f-t_o))

    #C174
    C_opex = C_opex_calc(PV_opex,C_opex_o)

    #Emissions
    #grey
    ER_g = ER_calc(ER_grey, X_n, alpha_list)
    # print(ER_g)
    total_g = tot_calc(ER_g, X_n_inst)
    lifetime_op_emissions_grey = op_emissions_calc(X_n_inst,X_b,t_f,t_o,T_op, total_g, 10.82,0.190062218)
    emissions_grey = emissions_calc(lifetime_op_emissions_grey)

    # print(emissions_grey)
    #P2A



    # C187

    C_b_pre_grey = [2.252380011, 9.256259378, 6.373533174]
    alpha_list_grey = [math.log(1 - 0.1) / math.log(2), math.log(1 - 0.1) / math.log(2),math.log(1 - 0.11) / math.log(2)]
    C_b_grey = C_b_calc(C_b_pre_grey, X_n, alpha_list_grey)
    # print(C_b_grey)

    inst_fact_grey = [0, 0.7, 0]
    scaling_factor_g = [0.49, 0.5, 0.6663]
    C_pur_grey, C_inst_grey = pur_inst_cost_calc(C_b_grey, X_n, X_b, inst_fact_grey, scaling_factor_g)

    # C_pur_grey, C_inst_grey = pur_inst_each_calc(C_b, X_n_inst,X_n, X_b, Y, scaling_factor,2, 8.867887126, alpha_list)
    C_indir_dir_grey, C_capex_grey_o = capex_o_calc(C_pur_grey, C_inst_grey, S_dir, S_indir, S_wc)
    print(C_capex_grey_o)
    C_capex_grey = C_capex_calc(C_capex_grey_o, PV_capex)
    # print(C_capex_grey)

    C_capex_grey_loss = C_capex_loss_calc(C_capex_grey, 0.118, 20)
    # print(C_capex_grey_loss)
    #C186 Opex gain

    NG_price = [
        33.16, 35.54, 37.44, 39.62, 40.96, 44.49, 47.34, 50.61, 53.70, 56.75,
        59.84, 63.02, 65.74, 68.89, 71.57, 73.86, 78.05, 81.81, 85.27, 88.65,
        92.31, 95.31, 98.12, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
        101.05, 101.05
    ]
    water_consumption_grey = 0.190062218
    total_grey = tot_NG_calc(0.887651929,X_n,X_n_inst,X_b,alpha_list_grey,2)
    print(total_grey)
    # print(total_grey)
    C_dir_grey = C_dir_calc(t_o, t_f, water_consumption_grey, X_n_inst, total_grey, NG_price)
    # print(C_dir_grey)
    # print(C_dir_grey)
    #
    # print(C_indir_dir_grey)
    C_opex_grey_o = C_opex_o_calc(t_f, t_o, X_n_inst, C_indir_dir_grey, C_dir_grey)
    # print(C_opex_grey_o)
    PV_opex_old = PV_opex_cal(DR, 20)
    C_opex_grey = C_opex_calc(PV_opex_old,C_opex_grey_o)
    # print(C_opex_grey)

    # import Export calc
    Ammonia_demand = [
    5.71031170, 12.65180775, 21.02357730, 31.05332624, 34.40098668, 38.10953699,
    42.21788237, 46.76912219, 51.81100206, 57.39641474, 63.58395504, 70.43853447,
    78.03206226, 86.44419970, 95.76319586, 106.08681338, 117.52335407, 130.19279505,
    144.22804740, 159.77635053, 177.00081675, 196.08214248, 217.22050388, 240.63765678, 273.64783562
]

    import_export = import_export_calc(Ammonia_demand,X_n)

    #P2A Emissions C259
    # ER calced above
    # print(total)
    lifetime_op_emissions= op_emissions_calc(X_n_inst, X_b, t_f, t_o, T_op, total,0,1.586690153)
    # print(lifetime_op_emissions)
    lifetime_op_emissions = lifetime_net_P2A(lifetime_op_emissions,X_n_inst, X_b)
    # print(lifetime_op_emissions)
    emissions = emissions_calc(lifetime_op_emissions)
    # print(emissions)



    # LCCA Calculation
    #                   C177            C187*           C186            C280        C267            C259
    # print(C_capex)
    # print(C_opex)
    # print(C_capex_grey_loss)
    # print(C_opex_grey)
    # print(import_export)
    # print(emissions_grey)
    # print(emissions)


    #                   C177            C187           C186 *           C280        C267            C259
    LCCA = LCCA_calc(C_capex,C_opex,C_capex_grey_loss,C_opex_grey,import_export, emissions_grey, emissions)
    # print(LCCA)




if __name__ == "__main__":
    main()
