import { useState, useEffect } from "react";
import { gameSocket, lobbySocket } from "../socket";
import { ConnectionManager } from "../components/ConnectionManager";

interface Lobby {
    players: string[];
    lobbyId: string;
}

export default function Lobby() {
    const [lobbyList, setLobbyList] = useState<Lobby[]>([]);

    useEffect(() => {
        lobbySocket.connect(); // something like this. It won't show anything unless you have game made in another tab
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
        <div>
            <ConnectionManager/>
            <h1>Lobby</h1>
            <ul>
                {lobbyList.map((lobby) => (
                    <li key={lobby.lobbyId}>
                        Players: {lobby.players.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}
