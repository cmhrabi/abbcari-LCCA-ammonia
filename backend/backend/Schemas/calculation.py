from backend.Schemas.process import BaseProcessSchema
from marshmallow import Schema, fields

class CalculationSchema(Schema):
    name = fields.String(required=True)
    electrified = fields.Nested(BaseProcessSchema, required=True)
    conventional = fields.Nested(BaseProcessSchema, required=True)
    lcca_type = fields.String(required=True)
    start_year = fields.Integer(required=True)
    final_year = fields.Integer(required=True)
    discount_rate = fields.Float(required=True)
    province = fields.String(required=True)
    operating_hours = fields.Float(required=True)
    final_demand = fields.Float(required=True)
    baseline_demand = fields.Float(required=True)