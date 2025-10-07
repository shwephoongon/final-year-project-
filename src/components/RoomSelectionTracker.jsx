import React from "react";
import { Box, Paper, Typography, Button, LinearProgress, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function RoomSelectionTracker({ 
  totalRooms, 
  currentRoomIndex, 
  selectedRooms,
  onNavigateToEnhancements
}) {
  const navigate = useNavigate();
  
  // Calculate progress
  const progress = (selectedRooms.length / totalRooms) * 100;
  const allRoomsSelected = selectedRooms.length === totalRooms;

  const handleContinue = () => {
    if (allRoomsSelected) {
      // Navigate to enhancements page
      if (onNavigateToEnhancements) {
        onNavigateToEnhancements();
      } else {
        navigate("/Enhancement");
      }
    }
  };


  // Don't show if no rooms selected
  if (selectedRooms.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
      }}
    >
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 4,
          borderRadius: "16px 16px 0 0",
          bgcolor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            bgcolor: "#1976d2",
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          py: 2.5,
          bgcolor: "white",
        }}
      >
        {/* Left: Room Selection Status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Room Selection Progress
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1976d2" }}>
              {allRoomsSelected ? (
                <>
                  <CheckCircleIcon sx={{ fontSize: 20, mr: 1, verticalAlign: "middle", color: "#4caf50" }} />
                  All Rooms Selected
                </>
              ) : (
                `Select Room ${currentRoomIndex + 1} of ${totalRooms}`
              )}
            </Typography>
          </Box>

          {/* Room Status Chips */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {Array.from({ length: totalRooms }).map((_, index) => (
              <Chip
                key={index}
                label={selectedRooms[index] ? `${selectedRooms[index].roomData.title} - ${selectedRooms[index].offerType}` : `Room ${index + 1}`}
                size="small"
                icon={selectedRooms[index] ? <CheckCircleIcon /> : undefined}
                sx={{
                  fontWeight: 600,
                  bgcolor: selectedRooms[index] ? "#e8f5e9" : "#f5f5f5",
                  color: selectedRooms[index] ? "#4caf50" : "#9e9e9e",
                  border: currentRoomIndex === index && !selectedRooms[index] 
                    ? "2px solid #1976d2" 
                    : "none",
                  maxWidth: 300,
                  "& .MuiChip-icon": {
                    color: "#4caf50",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Right: Action Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!allRoomsSelected && (
            <Typography variant="body2" color="text.secondary">
              {selectedRooms.length} of {totalRooms} rooms selected
            </Typography>
          )}
          <Button
            variant="contained"
            size="large"
            disabled={!allRoomsSelected}
            endIcon={<ArrowForwardIcon />}
            onClick={handleContinue}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: allRoomsSelected ? "#4caf50" : "#e0e0e0",
              color: allRoomsSelected ? "white" : "#9e9e9e",
              boxShadow: allRoomsSelected ? "0 4px 12px rgba(76, 175, 80, 0.3)" : "none",
              "&:hover": {
                bgcolor: allRoomsSelected ? "#45a049" : "#e0e0e0",
                boxShadow: allRoomsSelected ? "0 6px 16px rgba(76, 175, 80, 0.4)" : "none",
              },
              "&:disabled": {
                bgcolor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            {allRoomsSelected ? "Continue to Enhancements" : "Select All Rooms First"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
