import { Box } from "@mui/material"
import { gameSocket } from "../socket"
import Cookies from "js-cookie"

export default function ChatBox(props: any) {
    const sendMessage = () => {
        let text = document.getElementById("chatInput")?.value;
        gameSocket.emit("sendMessage", { gameId: props.gameId, message: text, username: Cookies.get("username") });
    }

    return (
        <Box>
            <p>Chat Box</p>
            <br></br>
            <p>{props.chat}</p>
            <br></br>
            <input id="chatInput"></input>
            <button onClick={() => sendMessage()}>Send message</button>
        </Box>
    )
}
