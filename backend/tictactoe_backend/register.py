from flask import Blueprint, jsonify, request, redirect, url_for
from .models import db, User

register_bp = Blueprint('register', __name__)


@register_bp.route("/register", methods=['POST'])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 403

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Registration successful"}), 200
