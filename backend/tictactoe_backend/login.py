from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from .models import User


login_bp = Blueprint("login", __name__)


@login_bp.route("/")
@login_required
def index():
    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "User is logged in."}), 200


@login_bp.route("/page")
@login_required
def page_view():
    if not current_user.is_authenticated:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "User is logged in."}), 200


@login_bp.route("/login", methods=['GET', 'POST'])
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
@login_required
def logout():
    logout_user()
    print("loaded user")
    return jsonify({"message": "successfully logged out."}), 200
