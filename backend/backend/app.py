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
    except ValidationError as err:
        # Return a nice message if validation fails
        return jsonify(err.messages), 400

    return jsonify(
        result
    )

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)