import { Button } from "@mui/material"
import { createSearchParams, useNavigate } from "react-router-dom";

export default function JoinButton(props: any) {
    const navigate = useNavigate();
    const joinGame = (gameId: string) => {
        navigate({
            pathname: "/game",
            search: `?${createSearchParams({
                gameId: gameId
            })}`
        });
    }

    return (
        <Button onClick={() => joinGame(props.gameId)} variant="outlined" sx={{ marginRight: "10%" }}>Join</Button>
    )
}
