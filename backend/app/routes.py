
from app import app


@app.route('/message')
def get_current_time():
    return {'message': 'Hello from backend!'}
