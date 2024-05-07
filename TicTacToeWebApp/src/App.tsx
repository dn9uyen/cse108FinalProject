import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./pages/login/login.tsx";
import Register from "./pages/login/register.tsx";
import Lobby from "./pages/testpage/lobby.tsx";
import Game from './pages/Game';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="lobby" element={<Lobby />} />
                    <Route path="game" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
