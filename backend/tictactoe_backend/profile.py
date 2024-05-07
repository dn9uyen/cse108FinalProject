from flask import Blueprint
from .models import User

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/profile")
def getProfile(username):
    user = User.query.get(username)
    data = {"username": user.username, "wins": user.wins}
    return data
