import { Button, Grid, Typography } from "@mui/material";
import { gameSocket, lobbySocket } from "../socket";

export function ConnectionManager() {
    function connectGameSocket() {
        gameSocket.connect();
    }

    function disconnectGameSocket() {
        gameSocket.disconnect();
    }

    function connectLobbySocket() {
        lobbySocket.connect();
    }

    function disconnectLobbySocket() {
        lobbySocket.disconnect();
    }

    return (
        <>
            <button onClick={connectGameSocket}>Connect game socket</button>
            <button onClick={disconnectGameSocket}>Disconnect game socket</button>
            <button onClick={connectLobbySocket}>Connect lobby socket</button>
            <button onClick={disconnectLobbySocket}>Disconnect lobby socket</button>

        </>
    );
}
