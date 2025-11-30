import { Box, Typography, Divider } from "@mui/material";

const BookingProgress = ({ currentPage }) => {
  const steps = [
    "Property, Guests & Date",
    "Rooms & Packages",
    "Enhancements",
    "Checkout",
  ];

  // Determine the index of the current page
  const activeStep = steps.indexOf(currentPage);

  return (
    <Box
      sx={{
        width: "85%", // match RoomList tabs & cards
        mx: "auto", // center horizontally
        pt: 3,
        pb: 4,
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
                  color: isActive || isCompleted ? "white" : "#555",
                  backgroundColor: isActive
                    ? "#1976d2" // current step = blue
                    : isCompleted
                    ? "#4caf50" // completed steps = green
                    : "#e0e0e0", // next steps = grey
                }}
              >
                {index + 1}
              </Box>

              {/* Label Beside Circle */}
              <Typography
                variant='body2'
                sx={{
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? "#1976d2"
                    : isCompleted
                    ? "#4caf50"
                    : "#666",
                  whiteSpace: "nowrap",
                  fontSize: "0.9rem",
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
