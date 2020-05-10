from flask import request, send_file, jsonify
from app import app
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://sql9338565:notMYpassword!627@sql9.freemysqlhosting.net/sql9338565'
db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    def __repr__(self):
        return '<User {}>'.format(self.username)

login = LoginManager(app)

@app.route('/api/logout', methods=['POST'])
def logout():
    logout_user()


@app.route('/api/createuser', methods=['POST'])
def createuser():
    try:
        console.log(request.form.get('username'))
    except RuntimeError as e:
        return jsonify(message=str(e)), 400


#@app.route('/api/login', methods=['GET','POST'])
#def login():
#    if current_user.is_authenticated:
#        return jsonify(message='You are already logged in!')
    #something to get form data?
#    try:
#        user = User.query.filter_by(username=request.data.username)
#    except RuntimeError as e:
#        return jsonify(message='issue requesting user from db')

#    if user is None or not (request.password==user.password):
#        return jsonify(message = 'Username or password is incorrect')
#    login_user(user)
#    return jsonify(message = "You have been logged in")




#@app.route('/api/createuser', methods=['GET','POST'])
#def createuser():
    #something to get form data?
#    user = User.query.filter_by(username=request.form['userMessage'])
#    if user is not None:
#        return jsonify(message = 'That user already exists')
#    user = User(username=request.form['usernameMessage'],password=request.form['passwordMessage'])
#    db.session.add(user)
#    db.session.commit()
#    return jsonify(message= 'Your account has been created')
