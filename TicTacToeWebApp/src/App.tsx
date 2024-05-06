import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login/login.tsx";
import Register from "./pages/login/register.tsx";
import Page from "./pages/testpage/page.tsx";
import Game from './pages/testpage/Game.tsx';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="page" element={<Page />} />
                    <Route path="game" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
/*
    function sendSocket() {
        var socket = io("http://127.0.0.1:5000/lobby");
        socket.on('connect', function() {
            socket.emit('my event', { data: 'I\'m connected!' });
        });
    }
    <>
            <button onClick={() => sendSocket()}>Send data</button>
        </> */
