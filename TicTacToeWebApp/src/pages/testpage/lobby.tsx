import { useState, useEffect } from "react";
import { socket } from "../../socket";

interface Lobby {
    players: string[];
    lobbyId: string;
}

export default function Lobby() {
    const [lobbyList, setLobbyList] = useState<Lobby[]>([]);

    useEffect(() => {
        console.log("Socket connect", socket.connected);
        socket.emit('lobbyRequest');

        socket.on('lobbyList', (data) => {
            console.log("Received lobbyList data: ", data);
            const parsedData: Lobby[] = JSON.parse(data);
            console.log("Parsed lobbyList data: ", parsedData);
            setLobbyList(parsedData);
        });

        return () => {
            socket.off('lobbyList');
        };
    }, []);

    return (
        <div>
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
