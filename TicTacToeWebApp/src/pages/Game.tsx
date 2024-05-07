import { Box, Paper } from "@mui/material";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { socket } from "../socket"
import { ConnectionManager } from "../components/ConnectionManager";

export default function Game() {
    let [chat, setChat] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(null));
    const gameId = "123"

    useEffect(() => {
        function onConnect() {
            socket.emit('joinGame', { gameId: gameId });
        }

        function onDisconnect() {
            socket.emit("disconnectEvent", {gameId: gameId, username: "PUTUSERNAMEHERE"})
        }

        function onChatBroadcast(json: any) {
            setChat(chat.concat(json["message"]));
        }

        function onGameStateUpdate(json: any) {
            setBoard(json["board"])
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chatBroadcast', (json) => { onChatBroadcast(json) });
        socket.on('gameStateUpdate', (json) => { onGameStateUpdate(json) });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chatBroadcast', onChatBroadcast);
            socket.off('gameStateUpdate', onGameStateUpdate);
        };
    }, []);

    function handleClick(index: number) {
        const newBoard = [...board];
        // Check if the cell is empty
        if (!newBoard[index]) {
            // client doesn't need to handle board updates because server sends it
            //newBoard[index] = "X"; // For now, assuming the player is always X
            //setBoard(newBoard);
            // Here you may want to emit the new board state to the server
            socket.emit("turnSubmit", { gameId: gameId, moveIndex: index })
            socket.emit("lobbyRequest")
        }
    }


    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper>
                <p>game page</p>
                <ConnectionManager />
                <br></br>
                <ChatBox chat={chat} />
                <br></br>
                <div className="board">
                    {board.map((cell, index) => (
                        <button key={index} onClick={() => handleClick(index)}>{cell}</button>
                    ))}
                </div>
            </Paper>

        </Box>
    )
}
