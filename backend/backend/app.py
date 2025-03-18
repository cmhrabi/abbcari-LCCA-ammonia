import math
from backend.Schemas.calculation import CalculationSchema
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin, logging
from calculations import capex, lcca
from marshmallow import ValidationError
from os import environ

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": environ.get("FRONTEND_URL")}})
logging.getLogger('flask_cors').level = logging.DEBUG

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
    
    if result["lcca_type"] == "phi":
        lcca_data, LCCA = lcca.lcca_phi(result)
    else:
        lcca_data, LCCA = lcca.lcca_psi(result)

    return jsonify(
        capex_elec=lcca_data["C_capex_e"],
        opex_elec=lcca_data["C_opex_e"],
        emissions_elec=lcca_data["emissions_e"],
        capex_conv=lcca_data["C_capex_c"],
        capex_loss_conv=lcca_data["C_capex_loss_c"],
        opex_conv=lcca_data["C_opex_c"],
        emissions_conv=lcca_data["emissions_c"],
        import_export=lcca_data["import_export"],
        LCCA = LCCA
    )

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)