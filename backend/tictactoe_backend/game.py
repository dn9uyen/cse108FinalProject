from flask import Blueprint, request
from flask_socketio import join_room, send, emit

from tictactoe_backend import socketio
from tictactoe_backend.gamemanager import GameManager

game_bp = Blueprint("game", __name__)

gameManager = GameManager()

@socketio.on('joinGame', namespace='/game')
def onJoin(json):
    gameId = json["gameId"]
    gameManager.createGame(gameId)
    join_room(gameId)
    # send game state and players to joining player
    send(gameId, to=gameId)

@socketio.on("doTurn", namespace="/game")
def doTurn(json):
    # call game logic to process then send new game state to players
    # verify player is in room before doing stuff
    gameId = json["gameId"]
    send(gameManager.getGame(gameId).gameState, to=gameId)

@socketio.on("sendMessage", namespace="/game")
def sendMessage(json):
    # chat message feature
    # verify player is in room before doing stuff
    gameId = json["gameId"]
    message = json["message"]
    emit("messageBroadcast", json, to=gameId)

@game_bp.route("/game")
def sessionPage():
    return "a"
