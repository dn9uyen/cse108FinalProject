import { Paper } from "@mui/material";
import { useState } from "react";
import { io } from "socket.io-client";



export default function Game() {
    let [chat, setChat] = useState("")

    function sendSocket() {
        const socket = io("http://127.0.0.1:5000/game");
        socket.on('connect', function() {
            socket.emit('joinGame', { gameId: "12332" });
        });

        socket.on("messageBroadcast", (json) => {
            setChat(chat + json["message"])

        })
    }

    function doTurn() {
        const socket = io("http://127.0.0.1:5000/game");
        socket.emit('doTurn', { gameId: "12332" });
    }

    function sendMessage() {
        let text = document.getElementById("chatInput")?.value;
        const socket = io("http://127.0.0.1:5000/game");
        socket.emit("sendMessage", { gameId: "12332", message: text });
    }

    return (
        <Paper>
            <p>game page</p>
            <button onClick={() => sendSocket()}>Connect</button>
            <button onClick={() => doTurn()}>Do turn</button>
            <button onClick={() => sendMessage()}>Send message</button>
            <br></br>
            <p>chat</p>
            <p>{chat}</p>
            <br></br>
            <input id="chatInput"></input>
        </Paper>
    )
}
