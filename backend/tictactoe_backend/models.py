from sqlalchemy import Column, String, Integer
from flask_login import UserMixin, LoginManager
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy


login_manager = LoginManager()
db = SQLAlchemy()

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    username = Column(String(120), unique=True, nullable=False, primary_key=True)
    password = Column(String(128), nullable=False)
    wins = Column(Integer, nullable=False)

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
        self.wins = 0;

    def verify_password(self, password):
        return check_password_hash(self.password, password)


@login_manager.user_loader
def load_user(username):
    return User.query.filter_by(username=username).first()
