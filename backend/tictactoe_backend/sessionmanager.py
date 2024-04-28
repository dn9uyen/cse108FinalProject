class Session:
    # Stores info about a game session
    def __init__(self, sessionId):
        self.sessionId = sessionId


class SessionManager:
    sessions = {}  # sessionId: Session object

    def __init__(self):
        pass

    def createSession(self, sessionId):
        # Creates a session, adds it to the session list, and returns the session object
        # Returns none if sessionId already exists
        if sessionId not in self.sessions:
            self.sessions[sessionId] = Session(sessionId)
            return self.sessions[sessionId]
        else:
            return None

    def removeSession(self, sessionId):
        # Removes a session from the session list and returns the session object
        # Returns none if session doesn't exist
        return self.sessions.pop(sessionId, None)

    def getSession(self, sessionId):
        # Get a session
        # Returns none if session doesn't exist
        return self.sessions.get(sessionId, None)
