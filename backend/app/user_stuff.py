from flask import request, send_file, jsonify
from app import app, db, login
from flask_login import UserMixin, current_user, login_user, \
    logout_user, login_required


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), index=True, unique=True)
    password = db.Column(db.String(128))
    def __repr__(self):
        return '<User {}>'.format(self.username)

@login.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()


@app.route('/api/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify(message='Logged out')


@app.route('/api/createuser', methods=['POST'])
def createuser():
    if not 'username' in request.form or len(request.form['username']) == 0:
        return jsonify(message='No username in form sent'), 400
    if not 'password' in request.form or len(request.form['password']) == 0:
        return jsonify(message='No password in form sent'), 400
    # check if username already exists
    user = User.query.filter_by(username=request.form['username']).first()
    if not user is None:
        return jsonify(message='Username is taken'), 400

    # otherwise create it
    db.session.add(User(username=request.form['username'],
        password=request.form['password']))
    db.session.commit()
    #log them in
    return login()


@app.route('/api/login', methods=['POST'])
def login():
    if not 'username' in request.form or len(request.form['username']) == 0:
        return jsonify(message='No username in form sent'), 400
    if not 'password' in request.form or len(request.form['password']) == 0:
        return jsonify(message='No password in form sent'), 400

    if current_user.is_authenticated:
        return jsonify(message='You are already logged in'), 400

    user = User.query.filter_by(username=request.form['username']).first()
    if user is None or user.password != request.form['password']:
        return jsonify(message='Username/Password is incorrect'), 400
    login_user(user)

    return jsonify(message='You have been logged in')


    #if user is None:
    #    return jsonify(message='User does not exist')
    #if not (request.form['password']==user.password):
    #    return jsonify(message='Password is incorrect')

    #login_user(user)
    #return jsonify(message='You have been logged in')
