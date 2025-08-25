from datetime import datetime
from backend.Schemas.analysis import AnalysisSchema
from backend.Schemas.calculation import CalculationSchema
from backend.Schemas.login import LoginSchema
from backend.mongo import Mongo
from flask import Flask, request, jsonify
from flask_cors import CORS, logging
from calculations import lcca
from marshmallow import ValidationError
from os import environ
from dotenv import load_dotenv
from bson.objectid import ObjectId

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": environ.get("FRONTEND_URL")}})
logging.getLogger('flask_cors').level = logging.DEBUG
mongo = Mongo()

@app.route('/api/save', methods=['POST'])
def save_analysis():
    schema = AnalysisSchema()
    data = request.json
    try:
        result = schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    analysis_id = data.get('analysis_id')
    try:
        mongo_collection = mongo.get_collection("analyses")
        
        if not analysis_id:
            # Check if analysis with same name already exists for this user
            existing_analysis = mongo_collection.find_one({
                "auth0_id": data.get('auth0_id'),
                "name": data.get('name')
            })
            
            if existing_analysis:
                # Update existing analysis
                data_without_id = {k: v for k, v in data.items() if k != 'analysis_id'}
                mongo_collection.update_one(
                    {"_id": existing_analysis["_id"]},
                    {"$set": {**data_without_id, "date_updated": datetime.now()}},
                )
                return jsonify({
                    "message": "Analysis updated successfully",
                    "analysis_id": str(existing_analysis["_id"])
                }), 200
            else:
                # Create new analysis
                result = mongo_collection.insert_one({**data, "date_created": datetime.now()})
                return jsonify({
                    "message": "Analysis saved successfully",
                    "analysis_id": str(result.inserted_id)
                }), 200
        else:
            # Update existing analysis by ID
            data_without_id = {k: v for k, v in data.items() if k != 'analysis_id'}
            mongo_collection.update_one(
                {"_id": ObjectId(analysis_id)},
                {"$set": {**data_without_id, "date_updated": datetime.now()}},
            )
            return jsonify({
                "message": "Analysis updated successfully",
                "analysis_id": analysis_id
            }), 200
    except Exception as e:
        print(f"Error saving analysis to MongoDB: {e}")
        return jsonify({"error": "Failed to save analysis"}), 500

@app.route('/api/analyses/<auth0_id>', methods=['GET'])
def get_analyses(auth0_id):
    try:
        mongo_collection = mongo.get_collection("analyses")
        analyses = list(mongo_collection.find({"auth0_id": auth0_id}))
        analyses = [{"_id": str(analysis["_id"]), "name": str(analysis["name"])} for analysis in analyses]
        return jsonify(analyses), 200
    except Exception as e:
        print(f"Error retrieving analyses from MongoDB: {e}")
        return jsonify({"error": "Failed to retrieve analyses"}), 500
    
@app.route('/api/analysis/<auth0_id>/<analysis_id>', methods=['GET'])
def get_analysis(auth0_id, analysis_id):
    try:
        mongo_collection = mongo.get_collection("analyses")
        analysis = mongo_collection.find_one({"_id": ObjectId(analysis_id), "auth0_id": auth0_id})
        if not analysis:
            return jsonify({"error": "Analysis not found"}), 404
        return jsonify({**analysis, "_id": str(analysis["_id"])}), 200
    except Exception as e:
        print(f"Error retrieving analysis from MongoDB: {e}")
        return jsonify({"error": "Failed to retrieve analysis"}), 500

@app.route('/api/login', methods=['POST'])
def login():
    schema = LoginSchema()
    data = request.json
    auth0_id = data.get('auth0_id')
    try:
        result = schema.load(data)
    except ValidationError as err:
        return jsonify(err.messages), 400
    
    try:
        mongo_collection = mongo.get_collection("users")
        if mongo_collection.find_one({"auth0_id": auth0_id}):
            return jsonify({"message": "User already exists"}), 200
        res = mongo_collection.insert_one({"auth0_id": auth0_id, "date_created": datetime.now()})
    except Exception as e:
        if hasattr(e, 'details'):
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