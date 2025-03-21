from backend.Schemas.costs import CostsSchema
from backend.Schemas.subprocess import SubProcessSchema
from marshmallow import Schema, fields

class BaseProcessSchema(Schema):
    name = fields.String(required=True)
    subprocesses = fields.List(fields.Nested(SubProcessSchema),  required=True)
    water_consumption = fields.Float(required=True)
    direct_costs = fields.List(fields.Nested(CostsSchema), required=False)
    indirect_costs = fields.List(fields.Nested(CostsSchema), required=False)
    installation_cost = fields.Float(required=False)
    wc_cost = fields.Float(required=False)
    direct_cost_factor = fields.Float(required=False)
    indirect_cost_factor = fields.Float(required=False)
    wc_cost_factor = fields.Float(required=False)
    bottom_up = fields.Boolean(required=True)

class ConvProcessSchema(BaseProcessSchema):
    depreciation = fields.Float(required=True)
    duration = fields.Float(required=True)
    onsite_upstream_emmisions = fields.Float(required=True)
