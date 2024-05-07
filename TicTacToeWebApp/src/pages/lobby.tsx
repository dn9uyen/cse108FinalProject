import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { gameSocket, lobbySocket } from "../socket";
import { ConnectionManager } from "../components/ConnectionManager";
import LogoutButton from "../components/logoutbutton.tsx";

interface Lobby {
    players: string[];
    lobbyId: string;
}

export default function Lobby() {
    const [lobbyList, setLobbyList] = useState<Lobby[]>([]);

    useEffect(() => {
        lobbySocket.connect();
        console.log("Socket connect", lobbySocket.connected);
        lobbySocket.emit('lobbyRequest');

        lobbySocket.on('lobbyList', (data) => {
            console.log("Received lobbyList data: ", data);
            const parsedData: Lobby[] = JSON.parse(data);
            console.log("Parsed lobbyList data: ", parsedData);
            setLobbyList(parsedData);
        });

        return () => {
            gameSocket.off('lobbyList');
        };
    }, []);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height="100vh"
            width="100vw"
        >
            <Box
                style={{
                    width: "100vw",
                    backgroundColor: "#44344F",
                    padding: "10px 0",
                    marginBottom: "20px",
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" style={{ color: "#fff" }}>GAME LOBBY</Typography>
                <Box style={{ position: "absolute", top: 15, right: 50 }}>
                    <LogoutButton /> {/* Place the LogoutButton at the top right */}
                </Box>
            </Box>
            <ConnectionManager />
            <Box style={{ marginTop: "100px" }}>
                <Typography variant="h3">LIVE GAMES</Typography>
            </Box>
            <List>
                {lobbyList.map((lobby) => (
                    <ListItem
                        key={lobby.lobbyId}
                        style={{ border: "1px solid #ccc", borderRadius: "5px", marginBottom: "5px", backgroundColor: "#f9f9f9" }}
                    >
                        <ListItemText
                            primary={`Players: ${lobby.players.join(', ')}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
