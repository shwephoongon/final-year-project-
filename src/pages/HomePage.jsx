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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { addDays, isAfter, format } from "date-fns";

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
    <Box sx={{ width: "100%", height: "100vh", overflow: "hidden" }}>
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

      {/* ✅ Background Image below filter */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src='/homepic.webp'
          alt='Hotel background'
          style={{
            width: "90%",
            // height: "80%",
            objectFit: "cover",
            // borderRadius: "12px",
            height: "calc(100% - 56px)", // ✅ take remaining height (filter bar height approx 56px)
          }}
        />
      </Box>
    </Box>
  );
}

export default HomePage;
