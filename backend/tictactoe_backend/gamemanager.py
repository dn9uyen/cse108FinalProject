class Game:
    # Stores info about a game instance
    def __init__(self, gameId):
        self.gameId = gameId
        self.players = [] # usernames, [0]=X, [1]=O
        # 0=X, -1=null, 1 = 0
        self.board = [-1,-1,-1, -1,-1,-1, -1,-1,-1]
        self.currentPlayer = 1


class GameManager:
    games: dict[str, Game] = {}

    def __init__(self):
        pass

    def createGame(self, gameId) -> Game | None:
        # Creates a game, adds it to the game list, and returns the game object
        # Returns none if gameId already exists
        if gameId not in self.games:
            self.games[gameId] = Game(gameId)
            return self.games[gameId]
        else:
            return None

    def removeGame(self, gameId) -> Game | None:
        # Removes a game from the game list and returns the game object
        # Returns none if game doesn't exist
        return self.games.pop(gameId, None)

    def getGame(self, gameId) -> Game | None:
        # Get a game
        return self.games.get(gameId, None)
