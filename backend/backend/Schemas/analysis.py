from backend.Schemas.calculation import CalculationSchema
from marshmallow import Schema, fields

class AnalysisSchema(CalculationSchema):
    auth0_id = fields.String(required=True)
    analysis_id = fields.String(required=False)
