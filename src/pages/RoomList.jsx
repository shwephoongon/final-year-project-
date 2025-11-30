import { useState, useEffect } from "react";
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
import RoomSelectionTracker from "../components/RoomSelectionTracker";
import { supabase } from "../supabaseclient";

// const roomData = {
//   Deluxe: [
//     {
//       title: "Deluxe Queen Room",
//       size: "350 sq ft / 32 sqm",
//       description:
//         "Two Chamber Design with King Bed featuring a Sleeping Lounge & Dressing Room separated by privacy doors. Showcasing hardwood floors, iconic make-up vanity & walk-in shower with rainfall shower head.",
//       price: 120,
//       amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
//     },
//     {
//       title: "Deluxe King Room",
//       size: "370 sq ft / 34 sqm",
//       description:
//         "Spacious king bed room with city views, premium bedding, and ensuite bathroom.",
//       price: 140,
//       amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
//     },
//   ],
//   Suite: [
//     {
//       title: "Junior Suite",
//       size: "500 sq ft / 46 sqm",
//       description:
//         "Large suite with separate living area, luxurious king bed, and ensuite bathroom.",
//       price: 220,
//       amenities: ["Wi-Fi", "Breakfast", "Private Bath"],
//     },
//   ],
//   Standard: [
//     {
//       title: "Standard Queen Room",
//       size: "280 sq ft / 26 sqm",
//       description: "Comfortable room with queen bed and basic amenities.",
//       price: 90,
//       amenities: ["Wi-Fi", "Breakfast"],
//     },
//   ],
// };

const RoomList = () => {
  const [selectedBed, setSelectedBed] = useState("Queen");
  const [roomData, setRoomData] = useState([]);
  const [showOffers, setShowOffers] = useState(false);
  const [activeTab, setActiveTab] = useState("Deluxe");
  const [filters, setFilters] = useState({
    priceRange: [50, 500],
    viewType: [],
    accessibility: false,
  });
  // New state for filters
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numRooms, setNumRooms] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [selectedTab, setSelectedTab] = useState("");
  const [roomRates, setRoomRates] = useState([]);

  // inside your component
  const [dateRange, setDateRange] = useState([null, null]);
  const [rooms, setRooms] = useState([{ guests: 1 }]);

  // Room selection tracking
  const [totalRoomsToSelect, setTotalRoomsToSelect] = useState(1);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

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

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleRoomSelect = (roomData, offerType) => {
    const qty = 1; // You can change this if needed

    const newItem = {
      roomIndex: selectedRooms.length, // not really used anymore but safe to keep
      quantity: qty,
      roomData,
      offerType,
    };

    const updated = [...selectedRooms];

    // find match by roomType + rateId
    const existingIndex = updated.findIndex(
      (item) =>
        item.roomData.roomtypeid === newItem.roomData.roomtypeid &&
        item.offerType.rateid === newItem.offerType.rateid
    );

    if (existingIndex !== -1) {
      // SAME roomType + SAME rate → increment qty
      updated[existingIndex].quantity += qty;
    } else {
      // unique → add new item
      updated.push(newItem);
    }

    // update state
    setSelectedRooms(updated);

    // also update localStorage if you do it here
    localStorage.setItem("selectedRooms", JSON.stringify(updated));
  };

  // Handle room removal
  const handleRemoveRoom = (index) => {
    const updatedSelections = [...selectedRooms];
    updatedSelections[index] = null; // Set to null instead of removing to maintain indices
    setSelectedRooms(updatedSelections);

    // Set current index to the removed room if it was after current
    if (index <= currentRoomIndex) {
      setCurrentRoomIndex(index);
    }
  };
  const roomsForActiveTab = roomData.filter(
    (rt) => rt.roomtypename === selectedTab
  );

  // Navigate to enhancements page
  const handleNavigateToEnhancements = () => {
    // Filter out null values before storing
    const validSelections = selectedRooms.filter((room) => room !== null);
    localStorage.setItem("selectedRooms", JSON.stringify(validSelections));
    // Navigate to enhancements page
    window.location.href = "/Enhancement";
  };

  const getRoomRatesByType = async (roomTypeId) => {
    const { data, error } = await supabase
      .from("roomrates")
      .select("*")
      .eq("roomtypeid", roomTypeId);
    console.log(data);
    if (!error) setRoomRates(data);
  };

  useEffect(() => {
    const fetchRoomTypes = async () => {
      const { data, error } = await supabase
        .from("roomtype")
        .select("*")
        .order("roomtypeid", { ascending: true });
      if (data && data.length > 0) {
        console.log("jjj", data);
        setRoomData(data);
        setSelectedTab(data[0].roomtypename);
        getRoomRatesByType(data[0].roomtypeid);
        // default tab
      }

      if (error) {
        console.error("Error fetching room types:", error.message);
      } else {
        setRoomData(data);
      }
    };

    fetchRoomTypes();
  }, []);
  useEffect(() => {
    if (roomsForActiveTab.length > 0) {
      getRoomRatesByType(roomsForActiveTab[0].roomtypeid);
    }
  }, [selectedTab]);
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

          <RoomSelector onRoomCountChange={setTotalRoomsToSelect} />
        </Stack>
      </Box>
      <BookingProgress currentPage='Rooms & Packages'/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          width: "85%",
          mx: "auto",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'
        >
          {roomData?.map((rt) => (
            <Tab
              key={rt.roomtypeid}
              label={rt.roomtypename}
              value={rt.roomtypename}
            />
          ))}
        </Tabs>

        <RoomFilterBar filters={filters} setFilters={setFilters} />
      </Box>
      {/* Room Cards */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          py: 4,
          pb: selectedRooms.length > 0 ? 12 : 4, // Add padding if tracker is visible
        }}
      >
        <Stack spacing={3} sx={{ width: "85%" }}>
          {roomsForActiveTab.map((rt, idx) => (
            <RoomCard
              key={idx}
              room={{
                roomtypeid: rt.roomtypeid,
                roomtypename: rt.roomtypename,
                capacity: rt.capacity,
                size_sqm: rt.size_sqm,
                size_sqft: rt.size_sqft,
                amenities: rt.amenities,
                base_price: rt.base_price,
                viewoffers: roomRates,
              }}
              idx={idx}
              onRoomSelect={handleRoomSelect}
              onRemoveRoom={handleRemoveRoom}
              currentRoomIndex={currentRoomIndex}
              totalRooms={totalRoomsToSelect}
              isSelected={false}
            />
          ))}
        </Stack>
      </Box>

      {/* Room Selection Tracker */}
      <RoomSelectionTracker
        totalRooms={totalRoomsToSelect}
        currentRoomIndex={currentRoomIndex}
        selectedRooms={selectedRooms}
        onNavigateToEnhancements={handleNavigateToEnhancements}
      />
    </Box>
  );
};

export default RoomList;
