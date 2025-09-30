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
      {/* Page Header */}
      <Container maxWidth={false} sx={{ width: "90%", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}>
          Confirm Your Booking
        </Typography>
        <Typography variant="body1" color="text.secondary">
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
                <Typography variant='h5' sx={{ fontWeight: 700, color: "#1a1a1a", mb: 3 }}>
                  Guest Information
                </Typography>

                {/* First + Last Name */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='First Name *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Last Name *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Email + Phone */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Email *'
                    type='email'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Phone *'
                    type='tel'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* Address (Full Row) */}
                <Box mb={3}>
                  <TextField
                    fullWidth
                    label='Address *'
                    variant='outlined'
                    size='small'
                    sx={{
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
                    }}
                  />
                </Box>

                {/* Zip + City */}
                <Box display='flex' mb={3}>
                  <TextField
                    label='Zip Code *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='City *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                </Box>

                {/* State + Country */}
                <Box display='flex'>
                  <TextField
                    label='State *'
                    variant='outlined'
                    size='small'
                    sx={textFieldStyle}
                  />
                  <TextField
                    label='Country *'
                    variant='outlined'
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
                <Typography variant='h5' sx={{ fontWeight: 700, color: "#1a1a1a", mb: 3 }}>
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
              <Box sx={{ 
                backgroundColor: "white", 
                p: 3, 
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
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
                    <Typography variant="body2">
                      I have understood and agree to the Booking Conditions and agree to the Privacy Policy
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
                    <Typography variant="body2">
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
