import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Import Button from Material-UI

const BackToLobby = () => {
    const navigate = useNavigate();

    const handleBackToLobby = () => {
        navigate("/lobby");
    };

    return (
        <Button variant="contained" sx={{backgroundColor: "#A9DBB8", color: "black"}} onClick={handleBackToLobby}>
            Back
        </Button>
    );
};

export default BackToLobby;
