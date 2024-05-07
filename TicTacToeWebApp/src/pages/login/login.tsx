import React, { useState } from "react";
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentialError, setCredentialError] = useState(false);

    const handleClickTogglePassword = () => { setShowPassword(!showPassword); }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username = form.username.value;
        const password = form.password.value;

        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": username, "password": password })
        });

        if (response.status !== 400) {
            setCredentialError(false);
            navigate("/lobby");
        } else {
            setCredentialError(true);
        }
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={10} sx={{ padding: "15px", width: "max-content" }}>
                <h3 style={{ textAlign: "center", margin: 0 }}>Login</h3>

                <form onSubmit={handleSubmit}>
                    <Paper elevation={5} sx={{ width: "max-content", marginTop: "15px" }}>
                        <FormControl sx={{ width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                required
                                error={credentialError}
                                name="username"
                                type="text"
                                label="Username"
                            />
                        </FormControl>
                    </Paper>

                    <Paper elevation={5} sx={{ width: "max-content", marginTop: "20px" }}>
                        <FormControl sx={{ width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                required
                                error={credentialError}
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
                    </Paper>
                    <FormHelperText error sx={{ visibility: credentialError ? "visible" : "hidden" }}>
                        {credentialError ? "Incorrect username or password" : ""}
                    </FormHelperText>

                    <Box textAlign="center" sx={{ marginTop: "20px" }}>
                        <Button type="submit" variant="contained" sx={{ padding: "10px", width: "100%" }} > Login</Button>
                    </Box>
                </form>

                <Divider sx={{ marginTop: "10px", opacity: 1 }}>or</Divider>

                <Box textAlign="center" sx={{ marginTop: "10px" }}>
                    <Button onClick={() => { navigate("/register") }} variant="outlined" sx={{ padding: "10px", width: "100%" }}> Create account</Button>
                </Box>

            </Paper>
        </Box>
    )
}

export default Login;