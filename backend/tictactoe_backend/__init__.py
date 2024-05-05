from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from flask_login import LoginManager

socketio = SocketIO(cors_allowed_origins="*")
login_manager = LoginManager()


def create_app():
    # Create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY="dev",
    )
    CORS(app)

    # Register blueprints
    from tictactoe_backend.login import login_bp
    app.register_blueprint(login_bp)

    from tictactoe_backend.lobby import lobby_bp
    app.register_blueprint(lobby_bp)

    from tictactoe_backend.game import game_bp
    app.register_blueprint(game_bp)

    login_manager.init_app(app)
    socketio.init_app(app)

    return app
