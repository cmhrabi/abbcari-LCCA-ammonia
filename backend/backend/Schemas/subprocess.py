from marshmallow import Schema, fields

class SubProcessSchema(Schema):
    name = fields.String(required=True)
    baseline_cost = fields.Float(required=True)
    installation_factor = fields.Float(required=True)
    scaling_factor = fields.Float(required=True)
    learning_rate = fields.Float(required=True)
    efficiency = fields.Float(required=True)
    energy_req = fields.Float(required=True)
    ng_req = fields.Float(required=False)