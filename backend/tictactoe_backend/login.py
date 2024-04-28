from flask import Blueprint, request, redirect, url_for
from flask_login import login_user, logout_user, login_required
from .models import User


login_bp = Blueprint("login", __name__)


@login_bp.route("/")
@login_required
def index():
    return "login page"


@login_bp.route("/login", methods=["POST"])
def login():
    username = request.form.get("username")
    password = request.form.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.verify_password(password):
        login_user(user)
        # far more concise than frontend redirecting
        return redirect(url_for("lobby.lobbyPageExample"))
    else:
        return "Invalid username and or password"


@login_bp.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login page"))
