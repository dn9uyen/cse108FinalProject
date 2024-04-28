from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

socketio = SocketIO(cors_allowed_origins="*")
login_manager = LoginManager()
db = SQLAlchemy()


def create_app():
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
        SQLALCHEMY_DATABASE_URI="sqlite:///tictactoe.sqlite"

    )
    CORS(app)

    # initialize db
    db.init_app(app)

    # Register blueprints
    from .login import login_bp
    app.register_blueprint(login_bp)

    from .lobby import lobby_bp
    app.register_blueprint(lobby_bp)

    from .register import register_bp
    app.register_blueprint(register_bp)

    login_manager.init_app(app)
    socketio.init_app(app)

    return app
