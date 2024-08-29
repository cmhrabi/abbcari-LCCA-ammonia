from backend.calculations.capex import X_n_calc
import pandas as pd

def d_n_calc(d_b_j: list, d_sat_j: list, n):
    output = []

    for i in range(len(d_b_j)):
        output.append([d_b_j[i]])
        for j in range(n):
            n_demand = output[i][j]+((d_sat_j[i]-d_b_j[i])/n)
            output[i].append(n_demand)

    return output

def d_tot_n_calc(d_n: list):
    output = []
    if d_n:
        for i in range(len(d_n[0])):
            output.append(0)
            for j in range(len(d_n)):
                output[i] = output[i] + d_n[j][i]
    
    return output

def d_elec_n_calc(d_n, n_green):
    output = [0]

    for i in range(len(d_n[1])):
        if n_green > i:
            output.append((d_n[1][n_green]/n_green)+output[i])
        else:
            output.append(d_n[1][i])

    return output

def import_export_cost_calc(d_n_elec, x_n, c_import, c_export):
    output = []

    for i in range(len(x_n)):
        if d_n_elec[i] - x_n[i] >= 0:
            output.append((((d_n_elec[i] - x_n[i])*1000)/18.6/0.6826)*c_import[i])
        else:
            output.append((((d_n_elec[i] - x_n[i])*1000)/18.6/0.6826)*c_export[i])

    return output

def main():
    # Inputs (Parameters)
    # General

    # Capex
    X_sat = 240.63
    X_b = 0.01486512
    DR = 0.07
    d = 0.01
    t_o = 2027
    t_f = 2050
    m = 5

    c_import = [0.88, 0.88, 0.88, 0.87, 0.87, 0.86, 0.86, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85]
    c_export = [0.89, 0.89, 0.89, 0.88, 0.88, 0.87, 0.87, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86]

    d_b_j = [87.2977248, 18.61205211, 3.766584138] #PJ
    d_sat_j = [87.2977248, 240.6376568, 127.774] #PJ
    n_green = 2030 #year
    
    x_n, x_n_cumi = X_n_calc(X_sat, X_b, t_o, t_f)

    d_n = d_n_calc(d_b_j, d_sat_j, t_f-t_o)

    d_tot_n = d_tot_n_calc(d_n)
    d_elec_n = [5.71031, 12.65181, 21.02358, 31.05333, 34.40099, 38.11, 42.22, 46.77, 51.81, 57.40, 63.58, 70.44, 78.03, 86.44, 95.76, 106.09, 117.52, 130.19, 144.23, 159.78, 177.00, 196.08, 217.22, 240.64]
    import_export_cost = import_export_cost_calc(d_elec_n, x_n, c_import, c_export)
    count = 0
    dict = {'year': [], 'IE cost': []}
    for i in import_export_cost:
        dict['year'].append(t_o + count)
        dict['IE cost'].append(i)
        count+=1

    df = pd.DataFrame().from_dict(dict)
    print(df.head(5))
    
    # pp = pprint.PrettyPrinter(depth=4)
    # pp.pprint(dict)
    


if __name__ == "__main__":
    main()