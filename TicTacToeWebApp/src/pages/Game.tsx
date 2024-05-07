import { Box, Typography } from "@mui/material";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { gameSocket } from "../socket"
import Cookies from "js-cookie"

export default function Game(props: any) { // TODO: pass game id from lobby
    const [chat, setChat] = useState<String[]>([""]);
    const [board, setBoard] = useState(Array(9).fill(-1));
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    useEffect(() => {
        function onConnect() {
            gameSocket.emit('joinGame', { gameId: gameId, username: Cookies.get("username") });
            console.log(gameSocket.connected)
        }

        function onDisconnect() {
            gameSocket.emit("disconnectEvent", { gameId: gameId, username: Cookies.get("username") })
        }

        function onChatBroadcast(json: any) {
            setChat(chat.concat([json["message"]]));
            console.log("here")
        }

        function onGameStateUpdate(json: any) {
            setBoard(json["board"])
            console.log(json["currentPlayer"])
        }

        gameSocket.on('connect', onConnect);
        gameSocket.on('disconnect', onDisconnect);
        gameSocket.on('chatBroadcast', (json) => { onChatBroadcast(json) });
        gameSocket.on('gameStateUpdate', (json) => { onGameStateUpdate(json) });

        gameSocket.connect();
        console.log(gameSocket.listeners("chatBroadcast"))

        return () => {
            gameSocket.off('connect', onConnect);
            gameSocket.off('disconnect', onDisconnect);
            gameSocket.off('chatBroadcast', onChatBroadcast);
            gameSocket.off('gameStateUpdate', onGameStateUpdate);
        };
    }, []);

    function handleClick(index: number) {
        const newBoard = [...board];
        // Check if the cell is empty
        if (newBoard[index] == -1) {
            gameSocket.emit("turnSubmit", { gameId: gameId, username: Cookies.get("username"), moveIndex: index })
        }
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ width: '25%', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <ChatBox chat={chat} gameId={gameId} />
            </Box>
            <Box sx={{ flexGrow: 1, padding: '20px' }}>
                <Box sx={{ backgroundColor: '#44344F', padding: '10px 0', textAlign: 'center', marginBottom: '20px' }}>
                    <Typography variant="h3" sx={{ color: '#fff' }}>TIC TAC TOE</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '175px' }}>
                    <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px', justifyContent: 'center' }}>
                        {board.map((cell, index) => (
                            <button key={index} onClick={() => handleClick(index)} style={{ width: '100px', height: '100px', fontSize: '2rem' }}>{cell}</button>
                        ))}
                    </div>
                </Box>
            </Box>
        </Box>
    )
}
