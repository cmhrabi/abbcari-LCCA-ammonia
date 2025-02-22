import math
from backend.Schemas.calculation import CalculationSchema
from flask import Flask, request, jsonify, make_response
from os import environ
from calculations import capex
from marshmallow import ValidationError

app = Flask(__name__)

@app.route('/api/calc', methods=['POST'])
def calc_lcca():
    schema = CalculationSchema()
    data = request.json
    try:
        # Validate request body against schema data types
        result = schema.load(data)
        print(result)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400
    
    X_n, X_n_inst = capex.X_n_gpt(result["final_demand"], result["baseline_demand"], result["start_year"], result["final_year"], 0.6212)
    elec_tech = result["electrified"]

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


    C_b = capex.C_b_calc(C_b_pre_e, X_n, alpha_list_e)
    print(C_b)
    C_pur, C_inst = capex.pur_inst_cost_calc(C_b, X_n, result["baseline_demand"], installation_factors_e, scaling_factors_e)
    C_indir_dir, C_capex_o = capex.capex_o_calc(C_pur, C_inst, elec_tech["direct_cost_factor"], elec_tech["indirect_cost_factor"], elec_tech["wc_cost_factor"])

    PV_capex = capex.PV_capex_calc(result["discount_rate"], result["final_year"], result["start_year"])

    #C173
    C_capex = capex.C_capex_calc(C_capex_o, PV_capex)

#     #P2A Stuff
#     water_consumption_P2A = 3.808056
#     Electricity_price = [
#         108.12, 108.40, 108.56, 108.51, 108.71, 108.35, 108.96, 109.03,
#         109.21, 109.37, 109.71, 109.97, 110.27, 110.47, 110.74, 111.42,
#         112.13, 112.70, 113.43, 114.07, 114.65, 115.15, 115.83, 116.74,
#         116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
#         116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
#         116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74, 116.74,
#         116.74
#     ]

#     #Opex
#     ER = ER_calc(ER_b, X_n, alpha_list)
#     # print(ER)
#     total = tot_calc(ER, X_n_inst)
#     C_dir = C_dir_calc(t_o, t_f, water_consumption_P2A, X_n_inst, total, Electricity_price)

#     C_opex_o = C_opex_o_calc(t_f,t_o, X_n_inst, C_indir_dir, C_dir)

#     PV_opex = PV_opex_cal(DR, t_f, t_o)

#     #C174
#     C_opex = C_opex_calc(PV_opex,C_opex_o)

#     #Emissions
#     #grey
#     ER_g = ER_calc(ER_grey, X_n, alpha_list)
#     # print(ER_g)
#     total_g = tot_calc(ER_g, X_n_inst)
#     lifetime_op_emissions_grey = op_emissions_calc(X_n_inst,X_b,t_f,t_o,T_op, total_g, 10.82,0.190062218)
#     emissions_grey = emissions_calc(lifetime_op_emissions_grey)

#     # print(emissions_grey)
#     #P2A



#     # C187

#     C_pur_grey, C_inst_grey = pur_inst_each_calc(C_b, X_n_inst,X_n, X_b, Y, scaling_factor,2, 8.867887126, alpha_list)
#     C_indir_dir_grey, C_capex_grey_o = capex_o_calc(C_pur_grey, C_inst_grey, S_dir, S_indir, S_wc)
#     C_capex_grey = C_capex_calc(C_capex_grey_o, PV_capex)

#     C_capex_grey_loss = C_capex_loss_calc(C_capex_grey, 0.118, 20)

#     #C186 Opex gain

#     NG_price = [
#         33.16, 35.54, 37.44, 39.62, 40.96, 44.49, 47.34, 50.61, 53.70, 56.75,
#         59.84, 63.02, 65.74, 68.89, 71.57, 73.86, 78.05, 81.81, 85.27, 88.65,
#         92.31, 95.31, 98.12, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
#         101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
#         101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05, 101.05,
#         101.05, 101.05
#     ]
#     water_consumption_grey = 0.190062218
#     total_grey = tot_NG_calc(0.887651929,X_n,X_n_inst,X_b,alpha_list,1)

#     C_dir_grey = C_dir_calc(t_o, t_f, water_consumption_grey, X_n_inst, total_grey, NG_price)
#     # print(C_dir_grey)
#     #
#     # print(C_indir_dir_grey)
#     C_opex_grey_o = C_opex_o_calc(t_f, t_o, X_n_inst, C_indir_dir_grey, C_dir_grey)
#     # print(C_opex_grey_o)
#     C_opex_grey = C_opex_calc(PV_opex,C_opex_grey_o)
#     # print(C_opex_grey)

#     # import Export calc
#     Ammonia_demand = [
#     5.71031170, 12.65180775, 21.02357730, 31.05332624, 34.40098668, 38.10953699,
#     42.21788237, 46.76912219, 51.81100206, 57.39641474, 63.58395504, 70.43853447,
#     78.03206226, 86.44419970, 95.76319586, 106.08681338, 117.52335407, 130.19279505,
#     144.22804740, 159.77635053, 177.00081675, 196.08214248, 217.22050388, 240.63765678, 273.64783562
# ]

#     import_export = import_export_calc(Ammonia_demand,X_n)

#     #P2A Emissions C259
#     # ER calced above
#     # print(total)
#     lifetime_op_emissions= op_emissions_calc(X_n_inst, X_b, t_f, t_o, T_op, total,0,1.586690153)
#     # print(lifetime_op_emissions)
#     lifetime_op_emissions = lifetime_net_P2A(lifetime_op_emissions,X_n_inst, X_b)
#     # print(lifetime_op_emissions)
#     emissions = emissions_calc(lifetime_op_emissions)
#     # print(emissions)



#     # LCCA Calculation
#     #                   C177            C187*           C186            C280        C267            C259
#     LCCA = LCCA_calc(C_capex,C_opex,C_capex_grey_loss,C_opex_grey,import_export, emissions_grey, emissions)
#     print(LCCA)
    return jsonify(
        capex = C_capex,
    )

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)