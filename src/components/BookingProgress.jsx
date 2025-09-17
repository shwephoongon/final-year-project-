import { Stepper, Step, StepLabel, Box } from "@mui/material";

const BookingProgress = () => {
  const steps = [
    "Property, Guests & Date",
    "Rooms & Packages",
    "Enhancements",
    "Checkout",
  ];

  const activeStep = 1; // Rooms & Packages

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        pt: 3,
        pb: 2,
        backgroundColor: "#f0f8ff",
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        sx={{
          width: "60%",
          justifyContent: "space-between", // keeps steps evenly spaced but closer
          "& .MuiStepLabel-root .MuiStepIcon-root": {
            width: 20,
            height: 20,
            fontSize: "0.8rem",
          },
          "& .MuiStepLabel-root .MuiStepLabel-label": {
            fontSize: "0.7rem",
            color: "#a0a0a0",
            fontWeight: 400,
          },
          "& .MuiStepLabel-root.Mui-active .MuiStepLabel-label": {
            color: "#1976d2",
            fontWeight: 500,
          },
          "& .MuiStepLabel-root.Mui-active .MuiStepIcon-root": {
            color: "#1976d2",
          },
          "& .MuiStepLabel-root .Mui-completed .MuiStepIcon-root": {
            color: "#c0c0c0",
          },
          "& .MuiStepConnector-root .MuiStepConnector-line": {
            borderColor: "#e0e0e0",
            borderTopWidth: 2,
          },
          "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
            borderColor: "#1976d2",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default BookingProgress;
