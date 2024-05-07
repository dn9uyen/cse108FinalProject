import { Box, Typography, TextField, Button } from "@mui/material"
import { gameSocket } from "../socket"
import Cookies from "js-cookie"

export default function ChatBox(props: any) {
    const sendMessage = () => {
        let text = document.getElementById("chatInput")?.value;
        gameSocket.emit("sendMessage", { gameId: props.gameId, message: text, username: Cookies.get("username") });
    }

    return (
        <Box sx={{ width: 200, height: 400, padding: 2, border: 1, borderColor: 'grey.300', backgroundColor: "#D9D9D9", borderRadius: 2, overflowY: 'scroll', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ display: "flex", justifyContent:"center", fontWeight: 'bold', marginBottom: 2 }}>CHAT BOX</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flexGrow: 1 }}>
                {props.chat.map((message: string, index: number) => (
                    <Box key={index} sx={{ backgroundColor: 'primary.main', color: 'white', py: 1, px: 2, borderRadius: 2, maxWidth: '70%', fontSize: "1rem", alignSelf: 'flex-start', marginBottom: 1 }}>
                        {message}
                    </Box>
                ))}
            </Box>
            <TextField id="chatInput" variant="outlined" size="small" sx={{ marginTop: 2, width: "100%", backgroundColor: "#fff" }} />
            <Button onClick={() => sendMessage()} variant="contained" color="primary" sx={{ marginTop: 2, width: '100%', borderRadius: 0 }}>Send Bubble</Button>
        </Box>
    )
}
