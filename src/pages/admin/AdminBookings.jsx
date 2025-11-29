import React, { useState,useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { supabase } from "../../supabaseclient";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: "",
    booking: null,
  });

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase.from("bookinghead").select(`  
    bookingid,
    checkin_date,
    checkout_date,
    total_room_amount,
    total_enhancement_amount,
    payment_status,
    created_at,
    guest(firstname, lastname)`);

      if (error) throw error;
      const formattedBookings = data.map((b) => ({
        id: b.bookingid,
        guestName: `${b.guest.firstname} ${b.guest.lastname}`, // combine first + last
        checkIn: b.checkin_date,
        checkOut: b.checkout_date,
        totalRoomAmount: b.total_room_amount,
        totalEnhancementAmount: b.total_enhancement_amount,
        status: b.payment_status,
        createdAt: b.created_at,
      }));

      setBookings(formattedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const openDialog = (booking, action) => {
    setConfirmDialog({ open: true, action, booking });
  };

  const closeDialog = () => {
    setConfirmDialog({ open: false, action: "", booking: null });
  };

  const handleAction = () => {
    const { booking, action } = confirmDialog;
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id
          ? { ...b, status: action === "confirm" ? "Confirmed" : "Rejected" }
          : b
      )
    );
    closeDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Rejected":
        return "error";
      default:
        return "warning";
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.roomType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h5' fontWeight={700} mb={3}>
        Guest Bookings
      </Typography>

      {/* Search bar */}
      <Box mb={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          size='small'
          placeholder='Search guest or room...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Guest Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Room Type</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Check-in</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Check-out</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id} hover>
                  <TableCell>{booking.guestName}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      variant='filled'
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    {booking.status === "Pending" ? (
                      <>
                        <Button
                          size='small'
                          variant='contained'
                          color='success'
                          sx={{ mr: 1 }}
                          startIcon={<CheckCircle />}
                          onClick={() => openDialog(booking, "confirm")}
                        >
                          Confirm
                        </Button>
                        <Button
                          size='small'
                          variant='outlined'
                          color='error'
                          startIcon={<Cancel />}
                          onClick={() => openDialog(booking, "reject")}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <Typography variant='body2' color='text.secondary'>
                        —
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center' sx={{ py: 3 }}>
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={closeDialog}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
          {confirmDialog.action === "confirm"
            ? "Confirm Booking"
            : "Reject Booking"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 3 }}>
          <Typography>
            Are you sure you want to{" "}
            <strong>
              {confirmDialog.action === "confirm" ? "confirm" : "reject"}
            </strong>{" "}
            the booking for <strong>{confirmDialog.booking?.guestName}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            variant='contained'
            sx={{
              backgroundColor:
                confirmDialog.action === "confirm" ? "#1976d2" : "#d32f2f",
              "&:hover": {
                backgroundColor:
                  confirmDialog.action === "confirm" ? "#1565c0" : "#b71c1c",
              },
            }}
            onClick={handleAction}
          >
            {confirmDialog.action === "confirm" ? "Confirm" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBookings;
