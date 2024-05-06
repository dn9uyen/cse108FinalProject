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
            // socket.emit('joinGame', { gameId: gameId });
        }

        function onDisconnect() {
        }

        function onChatBroadcast(json: any) {
            console.log(chat);
            setChat(chat.concat(json["message"]));
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chatBroadcast', (json) => { onChatBroadcast(json) });

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chatBroadcast', onChatBroadcast);
        };
    }, []);

    function handleClick(index: number) {
        const newBoard = [...board];
        // Check if the cell is empty
        if (!newBoard[index]) {
            newBoard[index] = "X"; // For now, assuming the player is always X
            setBoard(newBoard);
            // Here you may want to emit the new board state to the server
            socket.emit("turnSubmit", {gameId: gameId})
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
