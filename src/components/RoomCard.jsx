import React from "react";
import { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Grid,
  Collapse,
  Button,
  Fade,
  Divider,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KingBedIcon from "@mui/icons-material/KingBed";

export default function RoomCard({ room, idx }) {
  const [selectedBed, setSelectedBed] = useState("Queen");
  const [showOffers, setShowOffers] = useState(false);

  const amenitiesList = [
    {
      key: "Wi-Fi",
      label: "Free Wi-Fi",
      icon: <WifiIcon fontSize='inherit' color='primary' />,
    },
    {
      key: "Breakfast",
      label: "Breakfast",
      icon: <FreeBreakfastIcon fontSize='inherit' color='primary' />,
    },
    {
      key: "Private Bath",
      label: "Private Bath",
      icon: <BathtubIcon fontSize='inherit' color='primary' />,
    },
  ];

  return (
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          border: "1px solid #e0e0e0", // light grey border
          Height: 400,
        }}
      >
        {/* Left: Image */}
        <Box
          component='img'
          src='/sampleroom.jfif'
          alt={room.title}
          sx={{
            width: 500,
            height: 400,
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Right: Text Content */}
        <Box sx={{ flex: 1,paddingLeft:5 }}>
          <Box sx={{}}>
            <Typography
              variant='h6'
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "1.5rem",marginTop:2 }}
            >
              {room.title}
            </Typography>

            {/* <Typography
                    variant='body2'
                    color='text.secondary'
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {room.size}
                  </Typography> */}

            {/* Bed type selector */}
            <Stack direction='row' spacing={1} mb={3}>
              {["Queen", "King", "Twin"].map((bed) => (
                <Chip
                  key={bed}
                  label={bed}
                  //icon={<KingBedIcon />}
                  clickable
                  // color={"white"}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: selectedBed == bed ? "#286fd2ff" : "white",
                    color: selectedBed == bed ? "white" : "#286fd2ff",
                    border: "1px solid #989ca4",
                    // borderStyle: "solid",
                    // borderWidth: 1,
                    // borderColor: "grey",
                    // backgroundColor:'white'
                  }}
                  onClick={() => setSelectedBed(bed)}
                />
              ))}
            </Stack>
            <Box display={"flex"} flexDirection={"row"}>
              <Box
                sx={{
                  //borderRight: "1px solid #ccc",
                  //height: "100%",
                  width: "65%",
                }}
              >
                <Typography variant='body2' gutterBottom sx={{ mb: 3 }}>
                  {room.description}
                </Typography>

                {amenitiesList.map((amenity) => {
                  return (
                    <Stack
                      key={amenity.key}
                      direction='row' // Column layout
                      spacing={2} // Space between icon and text
                      alignItems='center' // Center horizontally
                      sx={{ width: "140px", paddingBottom: 1 }} // Fixed width for uniformity
                    >
                      {amenity.icon}
                      <Typography
                        variant='body2'
                        sx={{ fontSize: "0.9rem", textAlign: "center" }}
                      >
                        {amenity.label}
                      </Typography>
                    </Stack>
                  );
                })}
              </Box>
                <Box sx={{ paddingLeft: 8 }}>
                  <Typography>28 m2 | 300ft2</Typography>
                  <Typography>2 guests</Typography>

                  <Box sx={{ marginTop: 12 }}>
                    <Typography variant='body2'>From</Typography>
                    <Typography variant='h5'>$336/Night</Typography>
                </Box>
                  <Box sx={{marginTop:2}}>
                    <Button sx={{ backgroundColor: "#4caf50"}}>
                      <Typography color='white'>View Offers</Typography>
                    </Button>
                  </Box>
              </Box>
            </Box>

            {/* Price + Button */}
            {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 1,
                      //pb: 3,
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
                  </Box> */}

            {/* Expandable offers */}
            {/* <Collapse in={showOffers} sx={{ mt: 3 }}>
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
            </Collapse> */}
          </Box>
        </Box>
      </Paper>
  );
}
