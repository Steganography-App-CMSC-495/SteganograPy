from flask import request, send_file
from app import app
from src import steg_core as core
from io import BytesIO

@app.route('/api/encode', methods=['POST'])
def encode():
    image = core.dataToImage(core.evenOddEncryption(
        core.getImageData(request.files['image']), request.form['message']))

    img_io = BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')


@app.route('/api/decode', methods=['POST'])
def decode():
    return core.evenOddDecryption(core.getImageData(request.files['image']))
