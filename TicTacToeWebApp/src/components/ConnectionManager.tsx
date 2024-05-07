import { Button, Grid, Typography } from "@mui/material";
import { gameSocket, lobbySocket } from "../socket";

export function ConnectionManager() {
    function connectGameSocket() {
        gameSocket.connect();
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
