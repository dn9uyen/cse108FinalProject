from flask import Blueprint, json, jsonify, request
from flask_socketio import join_room, send, emit

from tictactoe_backend.socketauth import authenticated_only
from tictactoe_backend import socketio
from tictactoe_backend.gamemanager import GameManager
from tictactoe_backend.models import User, db

game_bp = Blueprint("game", __name__)

gameManager = GameManager()

connectedSockets = {} # socketId: {username:"", gameId:""}

def check_win(board):
    win_conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
        [0, 4, 8], [2, 4, 6]  # Diagonals
    ]
    for condition in win_conditions:
        if ((board[condition[0]] == board[condition[1]] == board[condition[2]])
                and board[condition[0]] != -1 and board[condition[1]] != -1 and board[condition[2]] != -1):
            return True
    return False


@socketio.on("lobbyRequest", namespace="/lobby")
def lobbyRequest():
    games = []
    for gameId, gameObject in gameManager.games.items():
        gameData = {"lobbyId": gameId, "players": gameObject.players}
        games.append(gameData)
    print(json.dumps(games))
    emit("lobbyList", json.dumps(games))

 
@socketio.on('joinGame', namespace='/game')
def onJoin(jsonData):
    gameId = jsonData["gameId"]
    username = jsonData["username"]
    gameManager.createGame(gameId)
    gameManager.joinGame(gameId, username)
    join_room(gameId)
    connectedSockets[request.sid] = {"username": username, "gameId": gameId}
    # send game state and players to joining player
    data = {"gameState": gameManager.getGame(gameId).board, "players": gameManager.getGame(gameId).players}
    emit("gameInfo", json.dumps(data), to=gameId)

@socketio.on("disconnect", namespace="/game")
def onDisconnect():
    username = connectedSockets[request.sid]["username"]
    gameId = connectedSockets[request.sid]["gameId"]
    gameManager.leaveGame(gameId, username)
    print(username, gameId)


@socketio.on("turnSubmit", namespace="/game")
def doTurn(json):
    # call game logic to process then send new game state to players
    # verify player is in room before doing stuff
    gameId = json["gameId"]
    gameObject = gameManager.getGame(gameId)
    if (gameObject != None):
        board = gameObject.board
        currentPlayer = gameObject.currentPlayer
    else:
        return "invalid game id"

    if (json["username"] != gameObject.players[currentPlayer]):
        return

    print(currentPlayer)

    move_index = int(json.get("moveIndex"))
    if move_index is not None and board:
        board[move_index] = currentPlayer
        if check_win(board):
            emit("gameWin", {"winner": "X" if currentPlayer==1 else "0"}, to=gameId)
            emit("gameStateUpdate", {"board": board, "currentPlayer": -1}, to=gameId)
            gameObject.currentPlayer = -1
            user = User.query.get(gameObject.players[currentPlayer])
            user.wins += 1
            db.session.commit()
            print(user.wins)
        elif -1 not in board:
            emit("gameTie", to=gameId)
            emit("gameStateUpdate", {"board": board, "currentPlayer": -1}, to=gameId)
            gameObject.currentPlayer = -1
        else:
            # Send updated game state to players
            newPlayer = 1 if currentPlayer==0 else 0
            gameObject.currentPlayer = newPlayer
            emit("gameStateUpdate", {"board": board, "currentPlayer": newPlayer}, to=gameId)


@socketio.on("sendMessage", namespace="/game")
def sendMessage(json):
    # chat message feature
    # verify player is in room before doing stuff
    gameId = json["gameId"]
    emit("chatBroadcast", json, to=gameId)

@game_bp.route("/game")
def sessionPage():
    return "a"
