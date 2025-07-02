from backend.Schemas.calculation import CalculationSchema
from backend.Schemas.login import LoginSchema
from backend.mongo import Mongo
from flask import Flask, request, jsonify
from flask_cors import CORS, logging
from calculations import lcca
from marshmallow import ValidationError
from os import environ
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": environ.get("FRONTEND_URL")}})
logging.getLogger('flask_cors').level = logging.DEBUG
mongo = Mongo()

@app.route('/api/login', methods=['POST'])
def login():
    schema = LoginSchema()
    data = request.json
    auth0_id = data.get('auth0_id')
    try:
        # Validate request body against schema data types
        result = schema.load(data)
        print(result)
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400
    
    try:
        mongo_collection = mongo.get_collection("users")
        if mongo_collection.find_one({"auth0_id": auth0_id}):
            return jsonify({"message": "User already exists"}), 200
        res = mongo_collection.insert_one({"auth0_id": auth0_id})
    except Exception as e:
        if hasattr(e, 'details'):
            # If the error has a 'details' attribute, it's likely a validation error
            return jsonify({"mongo validation error": e.details}), 400
        print(f"Error inserting user into MongoDB: {e}")
        return jsonify({"error": "Failed to insert user"}), 500
    
    return jsonify({"message": "User signed up successfully"}), 200

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