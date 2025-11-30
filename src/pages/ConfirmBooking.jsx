import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import BookingDetails from "../components/BookingDetails";
import { useState } from "react";
import { supabase } from "../supabaseclient";
import BookingProgress from "../components/BookingProgress";

const ConfirmBooking = () => {
  const bookedRooms = JSON.parse(localStorage.getItem("selectedRooms")) || [];
  let searchData = JSON.parse(localStorage.getItem("searchdata")) || [];
  //const bookedRooms = storedRooms[0];
  const totalRate = bookedRooms.reduce(
    (sum, room) => sum + (room.offerType?.rateprice || 0),
    0
  );
  const [guest, setGuest] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetnumber: "",
    streetname: "",
    city: "",
    state: "",
    country: "",
  });

  const textFieldStyle = {
    flex: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      "& fieldset": {
        borderColor: "#e0e0e0",
      },
      "&:hover fieldset": {
        borderColor: "#1976d2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
    "&:not(:last-child)": {
      mr: 2,
    },
  };

  const handleConfirmBooking = async () => {
    try {
      // -----------------------------------------
      // 1. Insert guest
      // -----------------------------------------
      const { data: guestData, error: guestError } = await supabase
        .from("guest")
        .insert([
          {
            firstname: guest.firstname,
            lastname: guest.lastname,
            email: guest.email,
            phone: guest.phone,
            streetnumber: guest.streetnumber,
            streetanme: guest.streetname,
            city: guest.city,
            state: guest.state,
            country: guest.country,
          },
        ])
        .select("guestid")
        .single();

      if (guestError) throw guestError;

      const guestid = guestData.guestid;

      const totalRoomAmount = bookedRooms.reduce((sum, room) => {
        const rate = room.offerType?.rateprice || 0;
        const nights = searchData.nights || 1;
        return sum + rate * nights;
      }, 0);

      const { data: bookingHeadData, error: bookingHeadError } = await supabase
        .from("bookinghead")
        .insert([
          {
            guestid: guestid,
            checkin_date: searchData.fromDate,
            checkout_date: searchData.toDate,
            total_room_amount: totalRoomAmount,
            total_enhancement_amount: 0,
            payment_status: "Pending",
            created_at: new Date(),
            nights: searchData.nights,
          },
        ])
        .select("bookingid")
        .single();

      if (bookingHeadError) throw bookingHeadError;

      const bookingid = bookingHeadData.bookingid;

      const roomDetailsPayload = bookedRooms.map((room) => ({
        bookingid: bookingid,
        roomtypeid: room.roomData.roomtypeid, // TODO: map your real roomtypeid
        rate_per_night: room.offerType.rateprice,
        qty: room.quantity,
        room_total: room.offerType.rateprice * room.quantity,
      }));

      const { error: detailError } = await supabase
        .from("bookingroomdetail")
        .insert(roomDetailsPayload);

      if (detailError) throw detailError;

      alert("✔ Booking Confirmed Successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        py: 5,
        width: "100%",
      }}
    >
      <Box sx={{ width: "90%" }}>
        <BookingProgress currentPage='Checkout' />
      </Box>
      {/* Page Header */}
      <Container maxWidth={false} sx={{ width: "90%", mb: 4 }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
        >
          Confirm Your Booking
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Please review your details and complete your reservation
        </Typography>
      </Container>

      <Container maxWidth={false} sx={{ width: "90%" }}>
        {/* ===== Guest Information Grid ===== */}

        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid
            item
            container
            direction='column'
            spacing={2}
            sx={{ width: "60%" }}
          >
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 3,
                  borderRadius: 3,
                  minHeight: 220,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ fontWeight: 700, color: "#1a1a1a", mb: 3 }}
                >
                  Guest Information
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* First Name + Last Name */}
                <Box display='flex' mb={2}>
                  <TextField
                    label='First Name'
                    value={guest.firstname}
                    onChange={(e) =>
                      setGuest({ ...guest, firstname: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Last Name'
                    value={guest.lastname}
                    onChange={(e) =>
                      setGuest({ ...guest, lastname: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Email + Phone */}
                <Box display='flex' mb={2}>
                  <TextField
                    label='Email'
                    value={guest.email}
                    onChange={(e) =>
                      setGuest({ ...guest, email: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Phone'
                    value={guest.phone}
                    onChange={(e) =>
                      setGuest({ ...guest, phone: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Address (full width) */}
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label='Address'
                    value={guest.address}
                    onChange={(e) =>
                      setGuest({ ...guest, address: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* City + Zip */}
                <Box display='flex' mb={2}>
                  <TextField
                    label='City'
                    value={guest.city}
                    onChange={(e) =>
                      setGuest({ ...guest, city: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Zip Code'
                    value={guest.zip}
                    onChange={(e) =>
                      setGuest({ ...guest, zip: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* State + Country */}
                <Box display='flex' mb={1}>
                  <TextField
                    label='State'
                    value={guest.state}
                    onChange={(e) =>
                      setGuest({ ...guest, state: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Country'
                    value={guest.country}
                    onChange={(e) =>
                      setGuest({ ...guest, country: e.target.value })
                    }
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>
              </Box>
            </Grid>
            {/* </Grid> */}

            {/* ===== Card Details Grid ===== */}
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 3,
                  borderRadius: 3,
                  minHeight: 150,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <Typography
                  variant='h5'
                  sx={{ fontWeight: 700, color: "#1a1a1a", mb: 3 }}
                >
                  Payment Details
                </Typography>

                {/* Cardholder Name + Card Number */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Cardholder Name *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Card Number *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Expiration Date + CVV */}
                <Box display='flex'>
                  <TextField
                    label='Expiration Date (MM/YY) *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='CVV *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Continue Button */}
                {/* <Box mt={2}>
                <Button variant="contained" color="primary" fullWidth>
                  Continue to Payment
                </Button>
              </Box> */}
              </Box>
            </Grid>

            {/* Checkboxes Box */}
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#bdbdbd",
                        "&.Mui-checked": {
                          color: "#1976d2",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant='body2'>
                      I have understood and agree to the Booking Conditions and
                      agree to the Privacy Policy
                    </Typography>
                  }
                  sx={{ mb: 1 }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#bdbdbd",
                        "&.Mui-checked": {
                          color: "#1976d2",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant='body2'>
                      Please email me special offers and updates
                    </Typography>
                  }
                />
              </Box>
            </Grid>
            {/* Confirm Booking Button */}
            <Grid item>
              <Box display='flex' justifyContent='center' mt={2}>
                <Button
                  variant='contained'
                  size='large'
                  onClick={handleConfirmBooking}
                  sx={{
                    bgcolor: "#4caf50",
                    textTransform: "none",
                    px: 6,
                    py: 2,
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                    "&:hover": {
                      bgcolor: "#45a049",
                      boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Confirm Booking
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={3.5}
            container
            direction='column'
            spacing={2}
            sx={{ width: "35%" }}
          >
            <Grid item sx={{ flex: 8 }}>
              <BookingDetails />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ConfirmBooking;
