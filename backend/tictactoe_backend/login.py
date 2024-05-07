from flask import Blueprint, jsonify, request, redirect, url_for
from flask_login import login_user, logout_user, login_required
from .models import User


login_bp = Blueprint("login", __name__)


@login_bp.route("/")
@login_required
def index():
    return "login page"


@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if user and user.verify_password(password):
        login_user(user)
        return jsonify({"message": "Logged in successfully"}), 200
    else:
        return jsonify({"error": "Invalid username and or password."}), 400


@login_bp.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("login page"))
