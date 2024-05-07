import { Box, Typography } from "@mui/material";
import ChatBox from "../components/ChatBox";
import { useEffect, useState } from "react";
import { gameSocket } from "../socket"
import Cookies from "js-cookie"

export default function Game(props: any) { // TODO: pass game id from lobby
    const [player1Username, setPlayer1Username] = useState("");
    const [player2Username, setPlayer2Username] = useState("");
    const [chat, setChat] = useState<String[]>([""]);
    const [board, setBoard] = useState(Array(9).fill(-1));
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    useEffect(() => {
        function onConnect() {
            gameSocket.emit('joinGame', { sid: gameSocket.id, gameId: gameId, username: Cookies.get("username") });
            console.log(gameSocket.connected)
        }

        function onDisconnect() {
        }

        function onChatBroadcast(json: any) {
            setChat(chat.concat([json["message"]]));
            console.log("here")
        }

        function onGameStateUpdate(json: any) {
            setBoard(json["board"])
            console.log(json["currentPlayer"])
        }

        function onGameInfo(jsonData: any) {
            const players = jsonData["players"];
            if (players && players.length >= 2) {
                const player1 = players[0];
                const player2 = players[1];
                setPlayer1Username(player1);
                setPlayer2Username(player2);
                 console.log("Player 1 username:", player1);
                 console.log("Player 2 username:", player2);
            }
        }

        gameSocket.on('connect', onConnect);
        gameSocket.on('disconnect', onDisconnect);
        gameSocket.on('chatBroadcast', (json) => { onChatBroadcast(json) });
        gameSocket.on('gameStateUpdate', (json) => { onGameStateUpdate(json) });
        gameSocket.on('gameInfo', (jsonData) => { onGameInfo(jsonData) });

        gameSocket.connect();
        console.log(gameSocket.listeners("chatBroadcast"))

        return () => {
            gameSocket.off('connect', onConnect);
            gameSocket.off('disconnect', onDisconnect);
            gameSocket.off('chatBroadcast', onChatBroadcast);
            gameSocket.off('gameStateUpdate', onGameStateUpdate);
            gameSocket.off('gameInfo', onGameInfo)
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

                <Box sx={{ display: "flex", alignItems: "center", padding: '10px 0', textAlign: 'center', marginBottom: '20px' }}>
                    <Box sx={{ display: "flex", backgroundColor: "#96939B", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center", paddingBottom: "15px", textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#fff', backgroundColor: "black", display: "flex", width: "100%", justifyContent: "center", padding: "10px 0" }}>PLAYER 1</Typography>
                        <Typography sx={{ fontSize: "20px", color: '#fff', margin: "10px 0" }}>{player1Username}</Typography>
                        <Typography sx={{ fontSize: "20px", color: '#fff' }}># WINS</Typography>
                    </Box>
                    <Box sx={{ display: "flex", backgroundColor: "#FC814A", flexDirection: "column", width: "100%", alignItems: "center", justifyContent: "center", paddingBottom: "15px", textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#fff', backgroundColor: "black", display: "flex", width: "100%", justifyContent: "center", padding: "10px 0" }}>PLAYER 2</Typography>
                        <Typography sx={{ fontSize: "20px", color: '#fff', margin: "10px 0" }}>{player2Username}</Typography>
                        <Typography sx={{ fontSize: "20px", color: '#fff' }}># WINS</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '175px' }}>
                    <div className="board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '5px', justifyContent: 'center' }}>
                        {board.map((cell, index) => (
                            <button key={index} onClick={() => handleClick(index)} style={{
                                width: '100px',
                                height: '100px',
                                fontSize: '2rem',
                                backgroundColor: "#E8E8E8",
                                color: "#564256",
                                cursor: "pointer",
                                transition: 'opacity 0.3s',
                                opacity: 0.7
                            }}
                                onMouseEnter={(e) => (e.target as HTMLElement).style.opacity = '1'}
                                onMouseLeave={(e) => (e.target as HTMLElement).style.opacity = '0.7'}>
                                {cell === 0 ? 'X' : cell === 1 ? 'O' : ''}
                            </button>
                        ))}
                    </div>
                </Box>
                <Box sx={{ padding: '10px 0', textAlign: 'center', marginTop: '20px' }}>
                    <Typography variant="h3" sx={{ color: '#000' }}>TIC TAC TOE</Typography>
                </Box>
            </Box>
        </Box>
    )
}
