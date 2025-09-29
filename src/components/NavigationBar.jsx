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
      position='static'
      sx={{
        backgroundColor: "#ffffff",
        color: "#000000",
        boxShadow: "none",
        height: "60px", // slightly taller to fit logo nicely
        justifyContent: "center",
        borderBottom: "1px solid #e0e0e0", // ✅ light grey underline
        // backgroundColor: "#ffffff",
        // color: "#000000",
        // boxShadow: "none",
        // height: "60px", // slightly taller to fit logo nicely
        // justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: "60px", px: { xs: 1, sm: 3 } }}>
        {/* Left side: Easy Hotel Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component='span'
              sx={{
                fontFamily: "Pacifico, cursive", // script font for "Easy"
                fontSize: "28px",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "#0B72FF",
                textShadow: "0 2px 8px rgba(11,114,255,0.1)",
              }}
            >
              Easy
            </Typography>
            <Typography
              component='span'
              sx={{
                fontFamily: "Montserrat, sans-serif", // clean font for "HOTEL"
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#374151",
                mt: "-2px",
              }}
            >
              HOTEL
            </Typography>
          </Box>
        </Box>

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
          {/* <IconButton color="inherit" size="small">
            <PersonIcon />
          </IconButton>
          <IconButton color="inherit" size="small">
            <LoginIcon />
          </IconButton> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
