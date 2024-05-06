import { Box, Paper } from "@mui/material";
import GameBoard from "../components/GameBoard";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { socket } from "../socket"
import { ConnectionManager } from "../components/ConnectionManager";

export default function Game() {
    let [chat, setChat] = useState("");
    const gameId = "123"

    useEffect(() => {
        function onConnect() {
            socket.emit('joinGame', { gameId: gameId });
            console.log(socket.listeners("chatBroadcast"));
        }

        function onDisconnect() {
        }

        function onChatBroadcast(json: any) {
            setChat(chat + json["message"]);
            console.log("here")
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('chatBroadcast', (json) => { onChatBroadcast(json); console.log("here")});

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('chatBroadcast', onChatBroadcast);
        };
    }, []);

    function doTurn() {
        socket.emit('doTurn', { gameId: "123" });
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper>
                <p>game page</p>
                <ConnectionManager/>
                <button onClick={() => doTurn()}>Do turn</button>
                <br></br>
                <ChatBox chat={chat}/>
                <br></br>
                <GameBoard />
            </Paper>

        </Box>
    )
}
