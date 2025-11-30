// src/pages/admin/AdminLogin.jsx
import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { supabase } from "../../supabaseclient";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/bookings");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate("/admin/bookings");
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please enter email and password");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate("/admin/bookings");
    }
  };

  return (
  <Box
      sx={{
        all: "unset",           // remove all inherited styles
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",        // full viewport height
        backgroundColor: "#f5f5f5",
        position: "fixed",      // ensure it covers full page
        top: 0,
        left: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
          mx: 2, // small horizontal padding on mobile
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={3} align="center">
          Admin Login
        </Typography>

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {errorMsg && (
          <Typography color="error" variant="body2" mt={1}>
            {errorMsg}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, backgroundColor: "#1976d2" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
