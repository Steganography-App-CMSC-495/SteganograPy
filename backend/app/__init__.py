from flask import Flask, request, send_file, Response

app = Flask(__name__)

from app import routes
