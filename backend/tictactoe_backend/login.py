from flask import Blueprint
from tictactoe_backend import login_manager

login_bp = Blueprint("login", __name__)

@login_bp.route("/login")
def loginPageExample():
    return "login page"
