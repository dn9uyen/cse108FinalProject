from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()

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

    socketio.init_app(app)
    return app
