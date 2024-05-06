import { BrowserRouter, Route, Routes } from "react-router-dom"
import Game from './pages/Game';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
