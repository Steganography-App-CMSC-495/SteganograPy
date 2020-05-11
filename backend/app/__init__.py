from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
<<<<<<< HEAD
from flask_cors import CORS
=======
>>>>>>> ad9d33217a79dbe586a67b682e35deddf59d7835

app = Flask(__name__)

app.config.from_pyfile('settings.py')

login = LoginManager()
login.init_app(app)
db = SQLAlchemy(app)

from app import routes
from app import user_stuff
