// src/pages/HomePage.jsx
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { addDays, isAfter, format } from "date-fns";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import SpaIcon from "@mui/icons-material/Spa";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function HomePage() {
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState(new Date()); // ✅ default today
  const [toDate, setToDate] = useState(addDays(new Date(), 1)); // ✅ default tomorrow
  const [error, setError] = useState(""); // for validation messages
  const navigate = useNavigate();

  const onPressBooking = () => {
    // Reset error first
    setError("");

    if (!location) {
      setError("Please select a destination.");
      return;
    }

    if (isAfter(fromDate, toDate)) {
      setError("To Date must be after From Date.");
      return;
    }

    // All good, navigate
    navigate("/RoomList");
  };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", overflow: "auto", bgcolor: "#ffffff" }}>
      {/* ✅ Filter Bar on top, outside the image */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          bgcolor: "white",
          px: 3,
          py: 2,
          borderRadius: "0 0 12px 12px",
          alignItems: "flex-start", // ✅ align children at the top
          justifyContent: "center",
          width: "100%",
          borderBottom: "1px solid #e0e0e0", // ✅ light grey underline
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Select Box */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ fontSize: "1rem" }}>Destination</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label='Destination'
              sx={{ fontSize: "1rem" }}
            >
              <MenuItem value='yangon'>Yangon</MenuItem>
              <MenuItem value='mandalay'>Mandalay</MenuItem>
              <MenuItem value='bagan'>Bagan</MenuItem>
            </Select>
          </FormControl>
          {/* ✅ Error message under Destination */}
          {error && (
            <Typography
              sx={{
                color: "red",
                mt: 0.5,
                fontSize: "0.85rem",
              }}
            >
              {error}
            </Typography>
          )}
        </Box>

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/* <DatePicker
            label='From Date'
            //value={fromDate}
            value={format(fromDate, "dd/MM/yyyy")}
            minDate={new Date()}
            onChange={(newValue) => setFromDate(newValue)}
          /> */}
          <DatePicker
            label='From Date'
            value={fromDate}
            minDate={new Date()}
            onChange={(newValue) => setFromDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                value={fromDate ? format(fromDate, "dd/MM/yyyy") : ""}
              />
            )}
          />
          <DatePicker
            label='To Date'
            value={toDate}
            minDate={fromDate || new Date()}
            onChange={(newValue) => setToDate(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                value={toDate ? format(toDate, "dd/MM/yyyy") : ""}
              />
            )}
          />
        </LocalizationProvider>

        {/* Book Button */}
        <Button
          variant='contained'
          color='primary'
          onClick={onPressBooking}
          sx={{
            // borderRadius: "10px",
            px: 6,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Book
        </Button>
      </Box>

      {/* Hero Image Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          mb: 6,
        }}
      >
        <Box
          component="img"
          src='/homepic.webp'
          alt='Hotel background'
          sx={{
            width: "90%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        />
        {/* Overlay Text */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            color: "white",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
            Welcome to Easy Hotel
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 400 }}>
            Experience luxury and comfort in the heart of the city
          </Typography>
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center", mb: 1, color: "#1a1a1a" }}>
          Why Choose Us
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 5 }}>
          Discover what makes Easy Hotel the perfect choice for your stay
        </Typography>
        
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {[
            { icon: <StarIcon sx={{ fontSize: 40 }} />, title: "Premium Quality", desc: "5-star rated service and accommodations" },
            { icon: <CheckCircleIcon sx={{ fontSize: 40 }} />, title: "Best Price Guarantee", desc: "Lowest rates guaranteed or we match it" },
            { icon: <WifiIcon sx={{ fontSize: 40 }} />, title: "Free High-Speed WiFi", desc: "Stay connected throughout your visit" },
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ 
                height: "100%", 
                textAlign: "center", 
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 3,
                transition: "all 0.3s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  transform: "translateY(-8px)",
                },
              }}>
                <Box sx={{ color: "#1976d2", mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Amenities Section */}
      <Box sx={{ bgcolor: "#f8fafb", py: 8, mb: 8 }}>
        <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h3" sx={{ fontWeight: 700, textAlign: "center", mb: 1, color: "#1a1a1a" }}>
            Hotel Amenities
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary", mb: 5 }}>
            Everything you need for a comfortable and memorable stay
          </Typography>
          
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {[
              { icon: <RestaurantIcon />, title: "Fine Dining", desc: "Gourmet restaurant & room service" },
              { icon: <PoolIcon />, title: "Swimming Pool", desc: "Rooftop infinity pool with city views" },
              { icon: <FitnessCenterIcon />, title: "Fitness Center", desc: "24/7 state-of-the-art gym" },
              { icon: <SpaIcon />, title: "Spa & Wellness", desc: "Full-service spa and massage" },
              { icon: <LocalParkingIcon />, title: "Free Parking", desc: "Complimentary valet parking" },
              { icon: <WifiIcon />, title: "Business Center", desc: "Meeting rooms and workspaces" },
            ].map((amenity, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 2,
                  p: 2.5,
                  bgcolor: "white",
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#1976d2",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}>
                  <Box sx={{ color: "#1976d2", fontSize: 32 }}>{amenity.icon}</Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {amenity.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {amenity.desc}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ mb: 8, textAlign: "center" }}>
        <Box sx={{ 
          p: 6, 
          bgcolor: "#1976d2", 
          borderRadius: 3,
          color: "white",
          boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            Ready to Book Your Stay?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Experience unparalleled comfort and hospitality. Book now and enjoy exclusive rates!
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate("/RoomList")}
            sx={{
              bgcolor: "white",
              color: "#1976d2",
              px: 6,
              py: 2,
              fontWeight: 700,
              fontSize: "1.1rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#f5f5f5",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s",
            }}
          >
            Explore Rooms
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
