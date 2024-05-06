from flask import Blueprint

lobby_bp = Blueprint("lobby", __name__)

@lobby_bp.route("/lobby")
def lobbyPageExample():
    return "lobby page"
