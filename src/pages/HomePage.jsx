// src/pages/HomePage.jsx
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();

  const onPressBooking = () => {
    navigate("/RoomList");
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src='/hero.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Booking Row */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
          bgcolor: "rgba(0,0,0,0.6)",
          p: 2,
          borderRadius: "12px",
          alignItems: "center",
        }}
      >
        {/* Select Box */}
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel sx={{ color: "white" }}>Destination</InputLabel>
          <Select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label='Destination'
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              "& .MuiSvgIcon-root": { color: "white" },
            }}
          >
            <MenuItem value='yangon'>Yangon</MenuItem>
            <MenuItem value='mandalay'>Mandalay</MenuItem>
            <MenuItem value='bagan'>Bagan</MenuItem>
          </Select>
        </FormControl>

        {/* Date Pickers */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label='From Date'
            value={fromDate}
            minDate={new Date()}
            onChange={(newValue) => setFromDate(newValue)}
            slotProps={{
              textField: {
                sx: {
                  "& .MuiInputBase-input": {
                    color: "white", // ✅ selected/typed date text
                  },
                  "& .MuiInputLabel-root": {
                    color: "white", // ✅ label
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  }, // ✅ border default
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  }, // ✅ border hover
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  }, // ✅ border focus
                  "& .MuiSvgIcon-root": {
                    color: "white", // ✅ calendar icon
                  },
                  "& input::placeholder": {
                    color: "white", // ✅ placeholder text
                    opacity: 0.8,
                  },
                },
              },
            }}
          />

          <DatePicker
            label='To Date'
            value={toDate}
            minDate={fromDate || new Date()}
            onChange={(newValue) => setToDate(newValue)}
            slotProps={{
              textField: {
                sx: {
                  "& .MuiInputBase-input": { color: "white" },
                  "& .MuiInputLabel-root": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white !important",
                  },
                  "& .MuiSvgIcon-root": { color: "white" },
                  "& input::placeholder": {
                    color: "white",
                    opacity: 0.8,
                  },
                },
              },
            }}
          />
        </LocalizationProvider>

        {/* Book Button */}
        <Button
          variant='contained'
          color='primary'
          onClick={onPressBooking}
          sx={{
            borderRadius: "30px",
            px: 3,
            py: 1,
            fontWeight: "bold",
          }}
        >
          Book
        </Button>
      </Box>

      {/* Centered Text */}
      <Box
        sx={{
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
        }}
      >
        <Typography
          variant='h2'
          sx={{
            fontFamily: "'Times New Roman', serif",
            fontWeight: 600,
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Welcome to Global Home
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
