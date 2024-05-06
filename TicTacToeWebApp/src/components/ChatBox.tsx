import { Box } from "@mui/material"
import { socket } from "../socket"
import { useEffect } from "react";


export default function ChatBox(props: any) {

    const sendMessage = () => {
        let text = document.getElementById("chatInput")?.value;
        socket.emit("sendMessage", { gameId: "123", message: text });
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
