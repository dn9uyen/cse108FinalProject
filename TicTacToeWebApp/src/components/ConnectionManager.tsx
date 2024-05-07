import { Button, Grid, Typography } from "@mui/material";
import { gameSocket, lobbySocket } from "../socket";
import { createSearchParams, useNavigate } from "react-router-dom";

export function ConnectionManager() {
    const navigate = useNavigate();

    function connectGameSocket() {
        navigate({
            pathname: "/game",
            search: `?${createSearchParams({
                gameId: window.crypto.getRandomValues(new Uint8Array(3)).join("")
            })}`
        });
    }

    /*
    function disconnectGameSocket() {
        gameSocket.disconnect();
    }

    function connectLobbySocket() {
        lobbySocket.connect();
    }

    function disconnectLobbySocket() {
        lobbySocket.disconnect();
    }
    */
    return (

        <Grid item xs={3}>
            <Button
                variant="contained"
                color="primary"
                onClick={connectGameSocket}

                sx={{ borderRadius: "5px", height: "60px", backgroundColor: "#44344F", color: "white" }}
            >
                <Typography variant="button">Create A Game</Typography>
            </Button>
        </Grid>

    );
}
