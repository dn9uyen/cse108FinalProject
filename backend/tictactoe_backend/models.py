from sqlalchemy import Column, String, Integer
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .__init__ import db, login_manager


@login_manager.user_loader
def get_user(user_id):
    return User.query.get(user_id)


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)
