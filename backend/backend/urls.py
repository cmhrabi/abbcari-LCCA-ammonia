from flask import current_app as app
from backend.api.users import hello_world

app.add_url_rule('/', 'test', view_func=hello_world)