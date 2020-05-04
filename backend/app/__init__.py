from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = "localhost"
app.config['MYSQL_USER'] = "root"
app.config['MYSQL_PASSWORD'] = ""
app.config['MYSQL_DB'] = "Steganography"

mysql = MySQL(app)

@app.route('/')
def sample():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users")
    fetchdata = cursor.fetchall()
    cursor.close()
    
from app import routes
