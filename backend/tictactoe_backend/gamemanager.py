class Game:
    # Stores info about a game instance
    def __init__(self, gameId):
        self.gameId = gameId
        self.gameState = [0,0,0, 0,0,0, 0,0,0]


class GameManager:
    games = {}  # gameId: Game object

    def __init__(self):
        pass

    def createGame(self, gameId):
        # Creates a game, adds it to the game list, and returns the game object
        # Returns none if gameId already exists
        if gameId not in self.games:
            self.games[gameId] = Game(gameId)
            return self.games[gameId]
        else:
            return None

    def removeGame(self, gameId):
        # Removes a game from the game list and returns the game object
        # Returns none if game doesn't exist
        return self.games.pop(gameId, None)

    def getGame(self, gameId):
        # Get a game
        # Returns none if game doesn't exist
        return self.games.get(gameId, None)