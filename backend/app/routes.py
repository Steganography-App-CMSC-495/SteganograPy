from flask import request, jsonify, Response
from app import app
from src import steg_core as core
from io import BytesIO
from werkzeug.wsgi import FileWrapper

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

    # below we encrypt the message into the image, putting 'steg-py'
    # at the beginning for detection later

    try:
        image = core.dataToImage(core.evenOddEncryption(
            core.getImageData(request.files['image']), 'steg-py.' +
                request.form['message']))
    except RuntimeError as e:
        return jsonify(message=str(e)), 400

    img_io = BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)
    w = FileWrapper(img_io)
    return Response(w, mimetype="image/png", direct_passthrough=True)


@app.route('/api/decode', methods=['POST'])
def decode():
    msg = core.evenOddDecryption(core.getImageData(request.files['image']))
    if not msg.startswith('steg-py'):
        return jsonify(message='Image does not contain a message'), 400

    return jsonify(message=msg.split('.')[1])
