import { useState } from 'react'
import { io } from 'socket.io-client'

function App() {

    function sendSocket() {
        var socket = io("http://127.0.0.1:5000/lobby");
        socket.on('connect', function() {
            socket.emit('my event', { data: 'I\'m connected!' });
        });
    }

    return (
        <>
            <button onClick={() => sendSocket()}>Send data</button>
        </>
    )
}

export default App
