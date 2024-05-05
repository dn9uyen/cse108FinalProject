import { useState } from 'react'
import { io } from 'socket.io-client'

function App() {

    function sendSocket() {
        var socket = io("http://127.0.0.1:5000/game");
        socket.on('connect', function() {
            socket.emit('joinGame', { gameId: "12333" });
        });
    }

    function doTurn() {
        var socket = io("http://127.0.0.1:5000/game");
        socket.emit('doTurn', { gameId: "12333" });
    }

    function sendMessage() {
        var socket = io("http://127.0.0.1:5000/game");
        socket.emit('sendMessage', { gameId: "12333", message:"hello everyone" });
    }


    return (
        <>
            <button onClick={() => sendSocket()}>Connect to room</button>
            <button onClick={() => doTurn()}>Do turn</button>
            <button onClick={() => sendMessage()}>Send chat</button>
        </>
    )
}

export default App
