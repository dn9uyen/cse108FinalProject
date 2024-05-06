import { Paper, Button } from "@mui/material";
import { useState } from "react";
import { io } from "socket.io-client";



export default function Game() {
    let [chat, setChat] = useState("")
    const [board, setBoard] = useState(Array(9).fill(null));

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

    function handleClick(index) {
        const newBoard = [...board];
        // Check if the cell is empty
        if (!newBoard[index]) {
            newBoard[index] = "X"; // For now, assuming the player is always X
            setBoard(newBoard);
            // Here you may want to emit the new board state to the server
        }
    }

    return (
        <Paper>
            <p>game page</p>
            <button onClick={() => sendSocket()}>Connect</button>
            <button onClick={() => doTurn()}>Do turn</button>
            <button onClick={() => sendMessage()}>Send message</button>
            <br />
            <p>chat</p>
            <p>{chat}</p>
            <br />
            <div className="board">
                {board.map((cell, index) => (
                    <button key={index} onClick={() => handleClick(index)}>{cell}</button>
                ))}
            </div>
            <input id="chatInput"></input>
        </Paper>
    )
}