from backend.Schemas.subprocess import SubProcessSchema
from marshmallow import Schema, fields

class BaseProcessSchema(Schema):
    name = fields.String(required=True)
    direct_cost_factor = fields.Float(required=True)
    indirect_cost_factor = fields.Float(required=True)
    wc_cost_factor = fields.Float(required=True)
    subprocesses = fields.List(fields.Nested(SubProcessSchema),  required=True)
    water_consumption = fields.Float(required=True)

class ConvProcessSchema(BaseProcessSchema):
    depreciation = fields.Float(required=True)
    duration = fields.Float(required=True)
    onsite_upstream_emmisions = fields.Float(required=True)