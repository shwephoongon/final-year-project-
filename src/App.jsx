import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import { Box, Typography } from "@mui/material";

function App() {
  return (
    <>
      <NavigationBar />
      {/* Hero Video Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "calc(100vh - 50px)", // full viewport minus navbar height
          overflow: "hidden",
        }}
      >
        {/* Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src='/hero.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
        {/* Gradient Overlay */}
        {/* <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
    }}
  /> */}
        {/* Overlay Text */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontFamily: "'Times New Roman', serif",
              fontWeight: 600,
              textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" }, // responsive
            }}
          >
            Welcome to Global Home
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;
