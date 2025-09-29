import { Box, Typography } from "@mui/material";

const BookingProgress = () => {
  const steps = [
    "Property, Guests & Date",
    "Rooms & Packages",
    "Enhancements",
    "Checkout",
  ];

  const activeStep = 1; // Example: Rooms & Packages

  return (
    <Box
      sx={{
        width: "85%",      // match RoomList tabs & cards
        mx: "auto",        // center horizontally
        pt: 3,
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 3, // space between steps
        }}
      >
        {steps.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.2,
                flexShrink: 0,
              }}
            >
              {/* Circle Number */}
              <Box
                sx={{
                  width: 25,
                  height: 25,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: isActive ? "white"
                    : isCompleted ? "white"
                      : "#555",
                  backgroundColor: isActive
                    ? "#1976d2"
                     : isCompleted
                     ? "#4caf50"
                    : "#e0e0e0",
                  // border: isCompleted ? "2px solid #1976d2" : "2px solid transparent",
                }}
              >
                {index + 1}
              </Box>

              {/* Label Beside Circle */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1976d2" : "#666",
                  whiteSpace: "nowrap",
                  fontSize:'0.9rem'
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BookingProgress;
