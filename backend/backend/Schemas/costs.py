from marshmallow import Schema, fields

class CostsSchema(Schema):
    name = fields.String(required=True)
    cost = fields.Float(required=True)
    error = fields.String(required=False)