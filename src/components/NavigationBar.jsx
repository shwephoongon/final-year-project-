import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavigationBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        boxShadow: "none",
        height: "50px", // thin navbar
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: "50px", px: { xs: 1, sm: 3 } }}>
        {/* Left side */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'left',
            flexGrow: 1,
            fontFamily: "'Times New Roman', serif",
            fontWeight: 500,
            fontSize: "1rem",
          }}
        >
          Global Home
        </Typography>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!isMobile && (
            <>
              <Typography
                sx={{
                  fontFamily: "'Times New Roman', serif",
                  cursor: "pointer",
                }}
              >
                Join
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Times New Roman', serif",
                  cursor: "pointer",
                }}
              >
                Sign In
              </Typography>
            </>
          )}
          <IconButton color="inherit" size="small">
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" size="small">
            <LoginIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
