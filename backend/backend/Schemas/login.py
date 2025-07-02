from marshmallow import Schema, fields

class LoginSchema(Schema):
    auth0_id = fields.String(required=True)