
from app import app


@app.route('/message')
def get_message():
    return {'message': 'Hello from backend!'}


@app.route('/m2')
def get_another():
    return {'message': 'This is cool'}
