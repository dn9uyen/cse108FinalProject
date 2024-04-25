import { useState } from 'react'
import { io } from 'socket.io-client'

function App() {

    function sendSocket() {
        let socket = io();
        socket.on('connectEvent', () => {
            socket.emit('testData', { data: 'I\'m connected!' });
        });
        console.log("Connected")
        return "1"
    }

    return (
        <>
            <button onClick={ ()=>sendSocket() }>Send data</button>
        </>
    )
}

export default App
