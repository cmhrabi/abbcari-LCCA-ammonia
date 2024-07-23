import math


# Capex
def X_n_calc(X_sat, X_b, t_o, t_f):
    n = t_f - t_o + 1

    r = (1 / (t_f - t_o)) * math.log(((0.99 * X_sat) - X_b) / (0.01 * X_b))

    X_n_cumulative = []
    X_n = []
    for i in range(n):
        x = X_sat / (1 + ((X_sat - X_b) / X_b) * math.exp(-r * i))

        X_n.append(x)

        if i != 0:
            X_n_cumulative.append(x + X_n_cumulative[i - 1])
        else:
            X_n_cumulative.append(x)
    return X_n, X_n_cumulative


def alpha_j_calc(LR, i):
    alpha = math.log(1 - LR[i]) / math.log(2)
    return alpha


def pur_inst_cost_calc(C_b, X_n, X_b, E, Y, alpha, i):
    # C_i_pur & C_i_inst Calculation
    C_pur = 0
    C_inst = 0
    for j in range(len(X_n)):
        if j != 0:
            C = C_b[i] * pow((X_n[j] / X_b), alpha) * pow(((X_n[j] - X_n[j - 1]) / X_b), E)
        else:
            C = C_b[i] * pow((X_n[j] / X_b), alpha) * pow((X_n[j] / X_b), E)
        C_pur += C
        C_inst += C * (1 + Y[i])

    return C_pur, C_inst


def capex_o_calc(C_pur, C_inst, S_dir, S_indir, S_wc, i):
    C_dir = C_pur * S_dir
    C_indir = (C_inst + C_dir) * S_indir
    C_wc = (C_inst + C_dir + C_indir) * S_wc

    C_capex_o = C_inst + C_dir + C_indir + C_wc
    return C_capex_o


def PV_capex_calc(DR, t_f, t_o):
    n = t_f - t_o
    PV_capex = []

    for i in range(n):
        PV_capex.append(1 / pow(1 + DR, i + 2))

    return PV_capex


def C_capex_calc(C_capex_o, PV_capex, i):
    C_capex = PV_capex[i] * C_capex_o
    return C_capex


# Opex
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
    ER = [[{}]]
    for i in range(len(X_n)):  # here i is the year where as in our paper it is tech i ***NEED TO FIX
        for j in range(len(ER_b)):
            for key in ER_b[j].keys():
                if i != 0:
                    ER[i][j][key] = ((1 - eff) * ER_b[i][j][key] * math.pow(X_n[i] / X_b, alpha_j) + eff * ER_b[i][j][
                        key]) * ((X_n[i] - X_n[i - 1]) / X_b)
                else:
                    # ask not sure
                    ER[i][j][key] = (
                                (1 - eff) * ER_b[i][j][key] * math.pow(X_n[i] / X_b, alpha_j) + eff * ER_b[i][j][key])
    return ER


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


def C_capex(PV_opex, C_opex_bar):
    C_capex = PV_opex * C_opex_bar
    return C_capex


def main():
    # Inputs (Parameters)
    # General

    # Capex
    X_sat = 240.64
    X_b = 0.01486512
    LR = [0.3, 0.5]
    C_b = [100, 200]
    S_dir = 0.33
    S_indir = 0.5
    S_wc = 0.05
    DR = 0.07
    d = 0.01
    Y = [0.33, 0.07]
    E = 1
    t_o = 2027
    t_f = 2050
    m = 5

    # Opex
    T_op = 8000
    eff = 0
    ER_b = [
        [
            {
                "elec": [200, 350],
                "nat": [300, 500]
            },
            {
                "elec": [150, 200],
                "nat": [100, 150]
            }
        ],
        [
            {
                "elec": [200, 350],
                "nat": [300, 500]
            },
            {
                "elec": [150, 200],
                "nat": [100, 150]
            }
        ]
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

    # Calc all X_n
    X_n, X_n_cumulative = X_n_calc(X_sat, X_b, t_o, t_f)

    # Calc alpha_j
    alpha = alpha_j_calc(LR, 0)

    # Calc C_Capex_o
    C_pur, C_inst = pur_inst_cost_calc(C_b, X_n, X_b, E, Y, alpha, 0)
    C_capex_o = capex_o_calc(C_pur, C_inst, S_dir, S_indir, S_wc, 0)

    # Calc PV
    PV = PV_capex_calc(DR, t_f, t_o)

    # Calc C_capex
    C_capex = C_capex_calc(C_capex_o, PV, 0)

    print(f"X_n is: {X_n}")
    print(f"X_n cumulative is: {X_n_cumulative}")
    print(f"C_capex is: {C_capex}")


if __name__ == "__main__":
    main()
