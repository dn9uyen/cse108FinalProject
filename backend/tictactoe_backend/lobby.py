from flask import Blueprint, request, redirect, url_for, jsonify
from .__init__ import socketio

lobby_bp = Blueprint("lobby", __name__)


@lobby_bp.route("/lobby")
def lobbyPageExample():
    return "lobby page"


@socketio.on('my event', namespace='/lobby')
def handle_my_custom_event(json):
    print('received json: ' + str(json))
