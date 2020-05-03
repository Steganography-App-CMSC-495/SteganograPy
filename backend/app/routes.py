from flask import request, send_file, jsonify
from app import app
from src import steg_core as core
from io import BytesIO

@app.route('/api/encode', methods=['POST'])
def encode():

    # validate form entry
    if not 'image' in request.files:
        return jsonify(message='No image key in the request files.'), 400

    if not 'message' in request.form:
        return jsonify(message='No message key in the request form.'), 400

    if len(request.form['message']) == 0:
        return jsonify(message='Message is empty.'), 400

    if len(request.files['image'].filename) == 0:
        return jsonify(message='Empty file submitted.'), 400

    try:
        image = core.dataToImage(core.evenOddEncryption(
            core.getImageData(request.files['image']), request.form['message']))
    except RuntimeError as e:
        return jsonify(message=str(e)), 400

    img_io = BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')


@app.route('/api/decode', methods=['POST'])
def decode():
    return core.evenOddDecryption(core.getImageData(request.files['image']))
