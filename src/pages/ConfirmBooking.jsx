import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import BookingDetails from "../components/BookingDetails";

const ConfirmBooking = () => {
  const stayDetails = {
    checkIn: "2025-10-01",
    checkOut: "2025-10-05",
    nights: 4,
  };

  const bookedRooms = [
    { name: "Chamber King City View", rate: 150, quantity: 1 },
    { name: "Deluxe Queen Room", rate: 120, quantity: 2 },
  ];

  const totalPrice = bookedRooms.reduce(
    (acc, room) => acc + room.rate * room.quantity * stayDetails.nights,
    0
  );
  const textFieldStyle = {
    flex: 1,
    "& .MuiInput-underline:before": {
      borderBottomColor: "#ccc",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#999",
    },
    "&:not(:last-child)": {
      mr: 2,
    },
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#e6f0ff",
        minHeight: "100vh",
        py: 4,
        width: "100%",
      }}
    >
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
                  borderRadius: 2,
                  minHeight: 220,
                }}
              >
                <Typography variant='h6' fontWeight='bold' gutterBottom>
                  Guest Information
                </Typography>

                {/* First + Last Name */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='First Name *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Last Name *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Email + Phone */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Email *'
                    type='email'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Phone *'
                    type='tel'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Address (Full Row) */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label='Address *'
                    variant='standard'
                    sx={{
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#ccc",
                      },
                      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottomColor: "#999",
                      },
                    }}
                  />
                </Box>

                {/* Zip + City */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Zip Code *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='City *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* State + Country */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='State *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Country *'
                    variant='standard'
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
                  borderRadius: 2,
                  minHeight: 150,
                }}
              >
                <Typography variant='h6' fontWeight='bold' gutterBottom>
                  Card Details
                </Typography>

                {/* Cardholder Name + Card Number */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Cardholder Name *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Card Number *'
                    variant='standard'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Expiration Date */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Expiration Date *'
                    variant='standard'
                    sx={{ flex: 1 }}
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
              <Box sx={{ backgroundColor: "white", p: 3, borderRadius: 2 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label='I have understood and agree to the Booking Conditions and agree to the Privacy Policy'
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label='Please email me special offers and updates'
                />
              </Box>
            </Grid>
            {/* Confirm Booking Button */}
            <Grid item>
              <Box display='flex' justifyContent='center' mt={2}>
                <Button variant='contained' color='primary' size='large'>
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
              <BookingDetails
                stayDetails={stayDetails}
                bookedRooms={bookedRooms}
                totalPrice={totalPrice}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ConfirmBooking;
