import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button"; // Import Button from Material-UI

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch("/logout")
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Failed to logout", error);
            });
    };

    return (
        <Button variant="contained" sx={{backgroundColor: "#B3C2F2", color: "black"}} onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
