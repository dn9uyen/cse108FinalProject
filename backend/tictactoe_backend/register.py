from flask import Blueprint, request, redirect, url_for
from .models import db, User

register_bp = Blueprint('register', __name__)


@register_bp.route("/register", methods=['POST'])
def register():
    username = request.form.get("username")
    password = request.form.get("password")

    if User.query.filter_by(username=username).first():
        return "Username already exists"

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for("login page"))
