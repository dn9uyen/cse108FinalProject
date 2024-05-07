import { Box, Paper } from "@mui/material";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { gameSocket } from "../socket"
import { ConnectionManager } from "../components/ConnectionManager";
import Cookies from "js-cookie"

export default function Game() {
    let [chat, setChat] = useState([]);
    const [board, setBoard] = useState(Array(9).fill(-1));
    const gameId = "123"

    useEffect(() => {
        function onConnect() {
            gameSocket.emit('joinGame', { gameId: gameId, username: Cookies.get("username") });
        }

        function onDisconnect() {
            gameSocket.emit("disconnectEvent", {gameId: gameId, username: Cookies.get("username")})
        }

        function onChatBroadcast(json: any) {
            setChat(chat.concat(json["message"]));
        }

        function onGameStateUpdate(json: any) {
            setBoard(json["board"])
        }

        gameSocket.on('connect', onConnect);
        gameSocket.on('disconnect', onDisconnect);
        gameSocket.on('chatBroadcast', (json) => { onChatBroadcast(json) });
        gameSocket.on('gameStateUpdate', (json) => { onGameStateUpdate(json) });

        return () => {
            gameSocket.off('connect', onConnect);
            gameSocket.off('disconnect', onDisconnect);
            gameSocket.off('chatBroadcast', onChatBroadcast);
            gameSocket.off('gameStateUpdate', onGameStateUpdate);
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
            gameSocket.emit("turnSubmit", { gameId: gameId, username: Cookies.get("username"), moveIndex: index })
            gameSocket.emit("lobbyRequest")
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
