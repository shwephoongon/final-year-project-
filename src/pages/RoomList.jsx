import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  Grid,
  Collapse,
  Tabs,
  Tab,
  Fade,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KingBedIcon from "@mui/icons-material/KingBed";
import BookingProgress from "../components/BookingProgress";
import RoomSelector from "../components/RoomSelector";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import RoomFilterBar from "../components/RoomFilterBar";
import RoomCard from "../components/RoomCard";

const roomData = {
  Deluxe: [
    {
      title: "Deluxe Queen Room",
      size: "350 sq ft / 32 sqm",
      description:
        "Two Chamber Design with King Bed featuring a Sleeping Lounge & Dressing Room separated by privacy doors. Showcasing hardwood floors, iconic make-up vanity & walk-in shower with rainfall shower head.",
      price: 120,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
    {
      title: "Deluxe King Room",
      size: "370 sq ft / 34 sqm",
      description:
        "Spacious king bed room with city views, premium bedding, and ensuite bathroom.",
      price: 140,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
  ],
  Suite: [
    {
      title: "Junior Suite",
      size: "500 sq ft / 46 sqm",
      description:
        "Large suite with separate living area, luxurious king bed, and ensuite bathroom.",
      price: 220,
      amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
    },
  ],
  Standard: [
    {
      title: "Standard Queen Room",
      size: "280 sq ft / 26 sqm",
      description: "Comfortable room with queen bed and basic amenities.",
      price: 90,
      amenities: ["Wi-Fi", "Breakfast"],
    },
  ],
};

const RoomList = () => {
  const [selectedBed, setSelectedBed] = useState("Queen");
  const [showOffers, setShowOffers] = useState(false);
  const [activeTab, setActiveTab] = useState("Deluxe");
  const [filters, setFilters] = useState({
    bedType: [],
    viewType: [],
    accessibility: [],
  });
  // New state for filters
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numRooms, setNumRooms] = useState(1);
  const [numGuests, setNumGuests] = useState(1);

  // inside your component
  const [dateRange, setDateRange] = useState([null, null]);
  const [rooms, setRooms] = useState([{ guests: 1 }]);

  // Function to add a new room
  const handleAddRoom = () => {
    setRooms([...rooms, { guests: 1 }]);
  };

  // Function to update guests for a specific room
  const handleRoomChange = (index, guests) => {
    const updated = [...rooms];
    updated[index].guests = guests;
    setRooms(updated);
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Blue Bar with Filters */}
      <Box
        sx={{
          color: "white",
          py: 2,
          px: { xs: 2, md: 6 },
          // backgroundColor: "#f0f8ff",
          backgroundColor: "#e8f0fd",
          border: "1px solid #989ca4", // light grey border
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          //justifyContent='space-between'
          alignItems='center'
        >
          <CustomDateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <RoomSelector />
        </Stack>
      </Box>
      <BookingProgress />
      {/* Tabs */}
      <Box
        // sx={{
        //   display: "flex",
        //   justifyContent: "flex-start",
        //   mt: 3,
        //   width: "85%", // match the card stack width
        //   mx: "auto", // keep it centered horizontally in the viewport
        // }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          width: "85%", // match the card stack width
          mx: "auto",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor='primary'
          indicatorColor='primary'
        >
          {Object.keys(roomData).map((category) => (
            <Tab key={category} label={category} value={category} />
          ))}
        </Tabs>
        {/* Filter component */}
        <RoomFilterBar filters={filters} setFilters={setFilters} />
      </Box>
      {/* Room Cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: 4,
        }}
      >
        <Stack spacing={3} sx={{ width: "85%" }}>
          {roomData[activeTab].map((room, idx) => (
            <RoomCard room={room} idx={idx} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default RoomList;
