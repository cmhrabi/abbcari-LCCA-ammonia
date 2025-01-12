import math


# Capex
def X_n_calc(X_sat, X_b, t_o, t_f):
    n = t_f - t_o + 1

    r = 0.6212  # ((1 / (t_f - t_o)) * math.log(((0.99 * X_sat) - X_b) / (0.01 * X_b)))
    print(r)
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

    for j in range(len(C_pur)):
        C_dir_j = C_pur[j] * S_dir
        C_indir_j = (C_inst[j] + C_dir_j) * S_indir
        C_wc_j = (C_inst[j] + C_dir_j + C_indir_j) * S_wc
        C_capex_o_j = C_inst[j] + C_dir_j + C_indir_j + C_wc_j
        C_dir.append(C_dir_j)
        C_indir.append(C_indir_j)
        C_wc.append(C_wc_j)
        C_capex_o.append(C_capex_o_j)

    return C_capex_o


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
    #Annual Cost Addition Calc
    for i in range(lifetime):
        annual_cost = (water_requirement[i] / 24) * Op_hrs_year * (Water_price_ton / 1000000)
        annual_cost_addition.append(annual_cost)
    # Annual cost for added capacity calc
    annual_cost_added_capacity = []
    sum_elec = 0
    for i in range(lifetime):
        sum_elec += elec_price[i]
    # print(sum_elec)
    for i in range(lifetime):
        annual_elec_cost = total_elec[i]*Op_hrs_year*sum_elec/1000000
        annual_cost_added_capacity.append(annual_elec_cost)
        # not working ask calum because this is bullshit
    #print(annual_cost_added_capacity)
    for i in range(lifetime):
        C_dir.append(annual_cost_added_capacity[i]+annual_cost_addition[i])


def C_opex_calc(C_dir, C_op, C_other, C_Overhead, C_admin, theta):
    C_opex = C_dir + C_op + C_other + C_Overhead + C_admin / (1 - theta)
    return C_opex


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

    C_b = C_b_calc(C_b_pre, X_n, alpha_list)

    C_pur, C_inst = pur_inst_cost_calc(C_b, X_n, X_b, Y, scaling_factor)

    C_capex_o = capex_o_calc(C_pur, C_inst, S_dir, S_indir, S_wc)

    PV = PV_capex_calc(DR, t_f, t_o)

    C_capex = C_capex_calc(C_capex_o, PV)

    print(C_capex)

    #P2A Stuff
    water_consumption = 3.808056
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
    total = tot_calc(ER, X_n_inst)
    C_dir_calc(t_o, t_f, water_consumption, X_n_inst, total, Electricity_price)

    #print(ER)



if __name__ == "__main__":
    main()
