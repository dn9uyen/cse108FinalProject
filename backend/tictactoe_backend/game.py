from flask import Blueprint, json
from flask_socketio import join_room, send, emit

from tictactoe_backend.socketauth import authenticated_only
from tictactoe_backend import socketio
from tictactoe_backend.gamemanager import GameManager

game_bp = Blueprint("game", __name__)

gameManager = GameManager()


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
    # data = '''{
    #             {
    #               players: ["p1", "p2"],
    #               lobbyId: "123",
    #             },
    #             {
    #               players: ["p3", "p4"],
    #               lobbyId: "321",
    #             }
    #           }'''
    print(json.dumps(games))
    emit("lobbyList", json.dumps(games))

 
@socketio.on('joinGame', namespace='/game')
def onJoin(json):
    gameId = json["gameId"]
    username = json["username"]
    gameManager.createGame(gameId)
    gameManager.joinGame(gameId, username)
    join_room(gameId)
    # send game state and players to joining player
    send(gameId, to=gameId)

@socketio.on("disconnectEvent", namespace="/game")
def onDisconnect(json):
    gameId = json["gameId"]
    username = json["username"]
    gameManager.leaveGame(gameId, username)


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
            emit("gameStateUpdate", {"board": board, "currentPlayer": currentPlayer}, to=gameId)
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
    message = json["message"]
    emit("chatBroadcast", json, to=gameId)

@game_bp.route("/game")
def sessionPage():
    return "a"
