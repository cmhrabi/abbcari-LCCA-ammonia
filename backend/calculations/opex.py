import math


def PV_opex_cal(DR, t_f, t_o):
    n = t_f - t_o
    PV_opex = []
    for i in range(n):
        PV_opex.append((math.pow(1 + DR, i + 1) - 1) / (DR * math.pow(1 + DR, i + 1)))
    return PV_opex


def C_s_energy_calc(PV_opex, t_f, t_o, C_s):
    C_s_bar = {}
    C_s_bar_sum = {}
    PV_sum = 0
    i = 0
    # *** not sure
    for key in C_s.keys():
        C_s_bar_sum[key] = C_s_bar[key] + C_s[key] * PV_opex[i]
        PV_sum += PV_opex[i]

    for key in C_s_bar_sum.keys():
        C_s_bar[key] = C_s_bar_sum[key] / PV_sum

    return C_s_bar


def ER_calc(ER_b, X_n, X_b, eff, alpha_j):
    ER = []
    ER_sum = []
    for i in range(len(X_n)):
        ER.append([])  # here i is the year where as in our paper it is tech i ***NEED TO FIX
        ER_sum.append({})
        for j in range(len(ER_b)):
            ER[i].append({})
            for key in ER_b[j].keys():
                if i != 0:
                    ER[i][j][key] = ((1 - eff) * ER_b[j][key] * math.pow(X_n[i] / X_b, alpha_j[j]) + eff * ER_b[j][
                        key]) * ((X_n[i] - X_n[i - 1]) / X_b)
                else:
                    # ask not sure
                    ER[i][j][key] = ((1 - eff) * ER_b[j][key] * math.pow(X_n[i] / X_b, alpha_j[j]) + eff * ER_b[j][key])

    return ER, ER_sum


def C_j_s_calc(ER, T_op, C_s_bar):
    # here ER is given by tech so it is [{}] not [[{}]]
    C_j_s = [{}]

    for j in range(len(ER)):
        for key in C_s_bar.keys():
            C_j_s[j][key] = ER[j][key] * C_s_bar[key] * T_op

    return C_j_s


def C_energy_calc(C_j_s):
    C_energy = 0

    for j in range(len(C_j_s)):
        for key in C_j_s[j].keys():
            C_energy += C_j_s[j][key]

    return C_energy


def C_H2O_bar_calc(C_H2O, T_op, WR):
    C_H2O_bar = WR * C_H2O * T_op
    return C_H2O_bar


def C_opex_bar_calc(C_energy, C_H2O, C_opex_add, theta):
    C_opex_bar = (C_energy + C_H2O + C_opex_add) * (1 / (1 - theta))
    return C_opex_bar


def C_opex_calc(PV_opex, C_opex_bar):
    C_opex = PV_opex * C_opex_bar
    return C_opex


def main():
    # Inputs (Parameters)
    # General

    # Capex
    X_sat = 240.64
    X_b = 0.0149
    LR = [0.13, 0.1, 0.1]
    C_b = [
        {
            "electrolysis": 2.64,
            "nitrogen": 2.97,
            "HB": 12.22
        }
    ]
    S_dir = 0.33
    S_indir = 0.5
    S_wc = 0.05
    DR = 0.07
    d = 0.01
    Y = [0.33, 0, 0.7]
    E = 1
    t_o = 2027
    t_f = 2050
    m = 5

    # Opex
    T_op = 8000
    eff = 0.6
    ER_b = [
        {
            "elec": 0.986181293,
            "nat": 0
        },
        {
            "elec": 0.034624043,
            "nat": 0
        },
        {
            "elec": 0.0778,
            "nat": 0
        }
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
