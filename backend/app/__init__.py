from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config.from_pyfile('settings.py')

login = LoginManager()
login.init_app(app)
db = SQLAlchemy(app)

from app import routes
from app import user_stuff
