import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"


export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [usernameError, setUsernameError] = React.useState(false);

    const handleClickTogglePassword = () => { setShowPassword(!showPassword); }

    // Submit account info to backend
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;

        const response = await fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": username, "password": password})
        });
        if (response.status != 403) {
            setUsernameError(false);
            navigate("/lobby");
            Cookies.set("username", username);
        }
        else {
            setUsernameError(true);
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={10} sx={{ padding: "15px", width: "max-content" }}>
                <h3 style={{ textAlign: "center", margin: 0 }}>Account Creation</h3>

                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <Paper elevation={5} sx={{ width: "max-content", marginTop: "15px" }}>
                        <FormControl sx={{ width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                required
                                error={usernameError}
                                name="username"
                                type="text"
                                label="Password"
                            />
                        </FormControl>
                    </Paper >
                    <FormHelperText error sx={{ visibility: usernameError ? "visible" : "hidden" }}>
                        {usernameError ? "Username already exists" : ""}
                    </FormHelperText>

                    {/* Password */}
                    <Paper elevation={5} sx={{ width: "max-content", marginTop: "20px" }}>
                        <FormControl sx={{ width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                required
                                name="password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickTogglePassword}>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Paper >

                    {/* Submit button */}
                    <Box textAlign="center" sx={{ marginTop: "20px" }}>
                        <Button type="submit" variant="contained" sx={{ padding: "10px", width: "100%" }} > Create Account</Button>
                    </Box>
                </form>

                <Divider sx={{ marginTop: "10px", opacity: 1 }}>or</Divider>

                <Box textAlign="center" sx={{ marginTop: "10px" }}>
                    <Button onClick={() => { navigate("/") }} variant="outlined" sx={{ padding: "10px", width: "100%" }}>Login instead</Button>
                </Box>
            </Paper >
        </Box>
    )
}
