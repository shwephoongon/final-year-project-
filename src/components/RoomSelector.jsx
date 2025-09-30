import React, { useState } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  IconButton,
  Drawer,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";

export default function RoomSelector({ onRoomCountChange }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0 }, // default first room
  ]);

  // Add new room
  const addRoom = () => {
    if (rooms.length < 5) {
      setRooms([...rooms, { adults: 1, children: 0 }]);
    }
  };

  // Update room counts
  const updateRoom = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  // Remove room
  const removeRoom = (index) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        startIcon={<PeopleIcon sx={{ fontSize: 22 }} />}
        onClick={() => setDrawerOpen(true)}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          justifyContent: "flex-start",
          width: 280,
          fontWeight: 600,
          px: 3,
          py: 1.5,
          cursor: "pointer",
          color: "#1976d2",
          backgroundColor: "white",
          border: "2px solid transparent",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#f8f8f8",
            borderColor: "#1976d2",
            boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
            transform: "translateY(-1px)",
          },
        }}
      >
        {rooms.length} Room{rooms.length > 1 ? "s" : ""},{" "}
        {rooms.reduce((a, r) => a + r.adults + r.children, 0)} Guest{rooms.reduce((a, r) => a + r.adults + r.children, 0) > 1 ? "s" : ""}
      </Button>

      {/* Drawer */}
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 400,
            borderRadius: "16px 0 0 16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2.5,
            bgcolor: "#1976d2",
            color: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Box>
            <Typography variant='h5' sx={{ fontWeight: 700, mb: 0.5 }}>
              Rooms & Guests
            </Typography>
            <Typography variant='caption' sx={{ opacity: 0.9 }}>
              Select up to 5 rooms
            </Typography>
          </Box>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, bgcolor: "#fafafa", flexGrow: 1, overflowY: "auto" }}>

          {rooms.map((room, index) => (
            <Box
              key={index}
              sx={{
                mb: 2.5,
                p: 3,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography variant='h6' sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                  Room {index + 1}
                </Typography>
                {rooms.length > 1 && (
                  <Button
                    size='small'
                    onClick={() => removeRoom(index)}
                    sx={{
                      color: "#d32f2f",
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "#ffebee",
                      },
                    }}
                  >
                    Remove
                  </Button>
                )}
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {/* Adults */}
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                mb={2}
              >
                <Typography sx={{ fontWeight: 500, color: "#424242" }}>Adults</Typography>
                <FormControl size='small'>
                  <Select
                    value={room.adults}
                    onChange={(e) =>
                      updateRoom(index, "adults", Number(e.target.value))
                    }
                    sx={{
                      minWidth: 80,
                      borderRadius: 1.5,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Children */}
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography sx={{ fontWeight: 500, color: "#424242" }}>
                  Children
                  <Typography component="span" variant="caption" sx={{ ml: 1, color: "#9e9e9e" }}>
                    (0-17 years)
                  </Typography>
                </Typography>
                <FormControl size='small'>
                  <Select
                    value={room.children}
                    onChange={(e) =>
                      updateRoom(index, "children", Number(e.target.value))
                    }
                    sx={{
                      minWidth: 80,
                      borderRadius: 1.5,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e0e0e0",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          ))}

          {/* Add Room Button */}
          <Button
            variant='outlined'
            fullWidth
            startIcon={<AddIcon />}
            onClick={addRoom}
            disabled={rooms.length >= 5}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                borderColor: "#1565c0",
                bgcolor: "rgba(25, 118, 210, 0.04)",
              },
              "&:disabled": {
                borderColor: "#e0e0e0",
                color: "#bdbdbd",
              },
            }}
          >
            Add Another Room
          </Button>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "2px solid #e0e0e0",
            bgcolor: "white",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Button
            variant='contained'
            fullWidth
            onClick={() => {
              setDrawerOpen(false);
              // Notify parent of room count change
              if (onRoomCountChange) {
                onRoomCountChange(rooms.length);
              }
            }}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              bgcolor: "#1976d2",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                bgcolor: "#1565c0",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            Done
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
