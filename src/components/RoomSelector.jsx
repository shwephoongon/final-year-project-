import { useState } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function RoomSelector() {
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
        variant="contained"
        onClick={() => setDrawerOpen(true)}
        sx={{
          backgroundColor: "white",
          color: "#1976d2",
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        {rooms.length} Room{rooms.length > 1 ? "s" : ""},{" "}
        {rooms.reduce((a, r) => a + r.adults + r.children, 0)} Guests
      </Button>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 320, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select Rooms & Guests
          </Typography>

          {rooms.map((room, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  Room {index + 1}
                </Typography>
                {rooms.length > 1 && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeRoom(index)}
                  >
                    Remove
                  </Button>
                )}
              </Stack>

              {/* Adults */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography>Adults</Typography>
                <FormControl size="small">
                  <Select
                    value={room.adults}
                    onChange={(e) =>
                      updateRoom(index, "adults", Number(e.target.value))
                    }
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <MenuItem key={n} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              {/* Children */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Children</Typography>
                <FormControl size="small">
                  <Select
                    value={room.children}
                    onChange={(e) =>
                      updateRoom(index, "children", Number(e.target.value))
                    }
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
            variant="outlined"
            fullWidth
            onClick={addRoom}
            disabled={rooms.length >= 5}
            sx={{ mb: 2 }}
          >
            + Add Room
          </Button>

          {/* Done Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDrawerOpen(false)}
          >
            Done
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
