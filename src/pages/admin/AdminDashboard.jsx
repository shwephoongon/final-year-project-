import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HotelIcon from "@mui/icons-material/Hotel";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const sampleRooms = [
  { id: 1, roomNo: "101", floor: 1, type: "Single", price: 75, status: "Available" },
  { id: 2, roomNo: "102", floor: 1, type: "Double", price: 100, status: "Available" },
  { id: 3, roomNo: "201", floor: 2, type: "Suite", price: 150, status: "Occupied" },
  { id: 4, roomNo: "202", floor: 2, type: "Double", price: 120, status: "Available" },
  { id: 5, roomNo: "301", floor: 3, type: "Single", price: 85, status: "Available" },
];

const preBookings = [
  { id: "PB001", guestName: "John Doe", checkIn: "2025-10-12", checkOut: "2025-10-15" },
  { id: "PB002", guestName: "Alice Smith", checkIn: "2025-10-16", checkOut: "2025-10-20" },
];

const AdminDashboard = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingMode, setBookingMode] = useState("new");
  const [selectedPreBooking, setSelectedPreBooking] = useState("");
  const [bookingData, setBookingData] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const filteredRooms = sampleRooms.filter(
    (room) =>
      room.roomNo.toLowerCase().includes(search.toLowerCase()) ||
      room.floor.toString().includes(search)
  );

  const groupedRooms = filteredRooms.reduce((acc, room) => {
    acc[room.floor] = acc[room.floor] || [];
    acc[room.floor].push(room);
    return acc;
  }, {});

  const handleRoomClick = (room) => {
    if (room.status === "Occupied") return;
    setSelectedRoom(room);
    setOpenDialog(true);
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = () => {
    if (bookingMode === "prebooking" && selectedPreBooking) {
      console.log("Confirmed pre-booking:", selectedPreBooking, "→ Room:", selectedRoom);
    } else {
      console.log("New booking submitted:", { room: selectedRoom, bookingData });
    }
    setOpenDialog(false);
    setBookingData({ name: "", checkIn: "", checkOut: "", guests: 1 });
    setSelectedPreBooking("");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#fafafa" }}>
      {/* Header */}
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
          color: theme.palette.primary.main,
        }}
      >
        Room Availability Overview
      </Typography>

      {/* Search */}
      <TextField
        placeholder="Search by Room Number or Floor..."
        variant="outlined"
        size="medium"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          mb: 5,
          maxWidth: 480,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      {/* Rooms grouped by floor */}
      {Object.keys(groupedRooms)
        .sort((a, b) => a - b)
        .map((floor) => (
          <Box key={floor} sx={{ mb: 6 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: theme.palette.primary.main,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Floor {floor}
            </Typography>
            <Grid container spacing={3}>
              {groupedRooms[floor].map((room) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={room.id}>
                  <Card
                    onClick={() => handleRoomClick(room)}
                    sx={{
                      borderRadius: 3,
                      cursor: room.status === "Available" ? "pointer" : "not-allowed",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
                      transition: "0.25s",
                      backgroundColor: "#fff",
                      "&:hover": {
                        transform:
                          room.status === "Available" ? "translateY(-4px)" : "none",
                        boxShadow:
                          room.status === "Available"
                            ? "0 8px 20px rgba(25,118,210,0.15)"
                            : "none",
                      },
                      opacity: room.status === "Available" ? 1 : 0.6,
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", py: 3 }}>
                      <HotelIcon
                        sx={{
                          fontSize: 38,
                          color:
                            room.status === "Available"
                              ? theme.palette.primary.main
                              : "#9e9e9e",
                        }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
                        Room {room.roomNo}
                      </Typography>
                      <Typography color="text.secondary" sx={{ fontSize: "0.9rem" }}>
                        {room.type} Room
                      </Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        ${room.price} / night
                      </Typography>
                      <Typography
                        sx={{
                          mt: 1,
                          color:
                            room.status === "Available" ? "green" : theme.palette.error.main,
                          fontWeight: 600,
                        }}
                      >
                        {room.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

      {/* Booking Form Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontFamily: "Montserrat, sans-serif",
            color: theme.palette.primary.main,
          }}
        >
          Book Room {selectedRoom?.roomNo}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            Choose Booking Option
          </Typography>
          <RadioGroup
            row
            value={bookingMode}
            onChange={(e) => setBookingMode(e.target.value)}
            sx={{ mb: 2 }}
          >
            <FormControlLabel
              value="prebooking"
              control={<Radio color="primary" />}
              label="Use Pre-booking"
            />
            <FormControlLabel
              value="new"
              control={<Radio color="primary" />}
              label="Create New Booking"
            />
          </RadioGroup>

          {bookingMode === "prebooking" ? (
            <TextField
              select
              label="Select a Pre-booking"
              fullWidth
              margin="dense"
              value={selectedPreBooking}
              onChange={(e) => setSelectedPreBooking(e.target.value)}
            >
              {preBookings.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.id} — {b.guestName} ({b.checkIn} to {b.checkOut})
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <>
              <TextField
                label="Guest Name"
                name="name"
                fullWidth
                margin="dense"
                value={bookingData.name}
                onChange={handleBookingChange}
              />
              <TextField
                label="Check-in Date"
                name="checkIn"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={bookingData.checkIn}
                onChange={handleBookingChange}
              />
              <TextField
                label="Check-out Date"
                name="checkOut"
                type="date"
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                value={bookingData.checkOut}
                onChange={handleBookingChange}
              />
              <TextField
                label="No. of Guests"
                name="guests"
                type="number"
                fullWidth
                margin="dense"
                value={bookingData.guests}
                onChange={handleBookingChange}
                inputProps={{ min: 1 }}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBookingSubmit}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
