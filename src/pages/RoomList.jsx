import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Collapse,
  Tabs,
  Tab,
  Fade,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KingBedIcon from "@mui/icons-material/KingBed";
import BookingProgress from "../components/BookingProgress";

const roomData = {
  Deluxe: [
    {
      title: "Deluxe Queen Room",
      size: "350 sq ft / 32 sqm",
      description:
        "A modern and comfortable room featuring premium bedding, ensuite bathroom, and large windows with city views.",
      price: 120,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
    {
      title: "Deluxe King Room",
      size: "370 sq ft / 34 sqm",
      description:
        "Spacious king bed room with city views, premium bedding, and ensuite bathroom.",
      price: 140,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
  ],
  Suite: [
    {
      title: "Junior Suite",
      size: "500 sq ft / 46 sqm",
      description:
        "Large suite with separate living area, luxurious king bed, and ensuite bathroom.",
      price: 220,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
  ],
  Standard: [
    {
      title: "Standard Queen Room",
      size: "280 sq ft / 26 sqm",
      description: "Comfortable room with queen bed and basic amenities.",
      price: 90,
      amenities: ["Wi-Fi", "Breakfast"],
    },
  ],
};

const RoomList = () => {
  const [selectedBed, setSelectedBed] = useState("Queen");
  const [showOffers, setShowOffers] = useState(false);
  const [activeTab, setActiveTab] = useState("Deluxe");

  return (
    <Box sx={{ backgroundColor: "#f0f8ff", minHeight: "100vh" }}>
      <Box
        sx={{
          width: "60%", // align with stepper
          mx: "auto",
          display: "flex",
          alignItems: "center",
          gap: 1, // minimal space between date and button
          mb: 2,
        }}
      >
        {/* Date Range */}
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            color: "#1976d2", // highlight with blue
          }}
        >
          Aug 20, 2025 - Aug 25, 2025
        </Typography>

        {/* Modify Button */}
        <Button
          variant='outlined'
          sx={{
            borderColor: "#1976d2",
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: 500,
            fontSize: "0.8rem",
            textTransform: "none",
            px: 2,
            py: 0.5,
            "&:hover": {
              backgroundColor: "#bbdefb",
              borderColor: "#1976d2",
            },
          }}
        >
          Modify
        </Button>
      </Box>
      <BookingProgress />

      {/* Tabs */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: 3,
          width: "85%", // match the card stack width
          mx: "auto", // keep it centered horizontally in the viewport
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor='primary'
          indicatorColor='primary'
          centered
        >
          {Object.keys(roomData).map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
      </Box>

      {/* Room Cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: 4,
        }}
      >
        <Stack spacing={3} sx={{ width: "85%" }}>
          {roomData[activeTab].map((room, idx) => (
            <Fade in key={idx}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  minHeight: 350,
                }}
              >
                {/* Left: Image */}
                <Box
                  component='img'
                  src='/sampleroom.jfif'
                  alt={room.title}
                  sx={{
                    width: "27%",
                    height: 250,
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                {/* Right: Text Content */}
                <Box sx={{ flex: 1, p: 4 }}>
                  <Typography variant='h6' gutterBottom>
                    {room.title}
                  </Typography>

                  <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {room.size}
                  </Typography>

                  {/* Bed type selector */}
                  <Stack direction='row' spacing={1} mb={3}>
                    {["Queen", "King", "Twin"].map((bed) => (
                      <Chip
                        key={bed}
                        label={bed}
                        icon={<KingBedIcon />}
                        clickable
                        color={selectedBed === bed ? "primary" : "default"}
                        onClick={() => setSelectedBed(bed)}
                      />
                    ))}
                  </Stack>

                  <Typography variant='body2' gutterBottom sx={{ mb: 3 }}>
                    {room.description}
                  </Typography>

                  {/* Amenities */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    {room.amenities.includes("Wi-Fi") && (
                      <Grid item xs={6} sm={4}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <WifiIcon fontSize='small' />
                          <Typography variant='body2'>Free Wi-Fi</Typography>
                        </Stack>
                      </Grid>
                    )}
                    {room.amenities.includes("Breakfast") && (
                      <Grid item xs={6} sm={4}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <FreeBreakfastIcon fontSize='small' />
                          <Typography variant='body2'>Breakfast</Typography>
                        </Stack>
                      </Grid>
                    )}
                    {room.amenities.includes("Private Bath") && (
                      <Grid item xs={6} sm={4}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                          <BathtubIcon fontSize='small' />
                          <Typography variant='body2'>Private Bath</Typography>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>

                  {/* Price + Button */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 1,
                      pb: 3,
                    }}
                  >
                    <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                      ${room.price} / night
                    </Typography>
                    <Button
                      variant='outlined'
                      onClick={() => setShowOffers(!showOffers)}
                    >
                      {showOffers ? "Hide offers" : "See more offers"}
                    </Button>
                  </Box>

                  {/* Expandable offers */}
                  <Collapse in={showOffers} sx={{ mt: 3 }}>
                    <Stack spacing={1}>
                      <Paper variant='outlined' sx={{ p: 2 }}>
                        Room only — ${room.price}
                      </Paper>
                      <Paper variant='outlined' sx={{ p: 2 }}>
                        Bed & Breakfast — ${room.price + 15}
                      </Paper>
                      <Paper variant='outlined' sx={{ p: 2 }}>
                        Half-board — ${room.price + 40}
                      </Paper>
                    </Stack>
                  </Collapse>
                </Box>
              </Paper>
            </Fade>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomList;
