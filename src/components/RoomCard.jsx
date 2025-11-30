import React, { useState } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Chip,
  Grid,
  Collapse,
  Button,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KingBedIcon from "@mui/icons-material/KingBed";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function RoomCard({
  room,
  onRoomSelect,
  currentRoomIndex,
  totalRooms,
  onRemoveRoom,
  isSelected = false,
  selectedRoomIndex = -1,
}) {
  const [selectedBed, setSelectedBed] = useState("Queen");
  const [showOffers, setShowOffers] = useState(false);
  const [slide, setSlide] = useState(0);
  const [openFullscreen, setOpenFullscreen] = useState(false);

  // Handle booking
  // const handleBookRoom = (offerType, price) => {
  //   if (onRoomSelect) {
  //     onRoomSelect({
  //       ...room,
  //       selectedBed,
  //       price,
  //     }, offerType);

  //     // Scroll to top smoothly
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };
  const handleBookRoom = (offerType, price) => {
    onRoomSelect({ ...room, selectedBed, price }, offerType);
    setCurrentRoomStep((prev) => Math.min(prev + 1, totalRooms - 1));
  };
  const images = room.images || [
    "/slide1.jfif",
    "/slide2.jfif",
    "/slide3.jfif",
  ];

  const handleNext = () => setSlide((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setSlide((prev) => (prev - 1 + images.length) % images.length);
  const handleOpenFullscreen = () => setOpenFullscreen(true);
  const handleCloseFullscreen = () => setOpenFullscreen(false);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        borderRadius: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: isSelected ? "2px solid #4caf50" : "1px solid #e0e0e0",
        boxShadow: isSelected ? "0 4px 20px rgba(76, 175, 80, 0.2)" : "none",
      }}
    >
      {/* Remove Button - Only show if room is selected */}
      {isSelected && (
        <Button
          variant='contained'
          startIcon={<RemoveCircleOutlineIcon fontSize='small' />}
          onClick={() => onRemoveRoom && onRemoveRoom(selectedRoomIndex)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            bgcolor: "rgba(97, 97, 97, 0.9)",
            color: "white",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.8rem",
            px: 1.5,
            py: 0.75,
            minWidth: "auto",
            "&:hover": {
              bgcolor: "rgba(66, 66, 66, 0.95)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            borderRadius: 1.5,
          }}
        >
          Remove
        </Button>
      )}

      {/* Top Section: Image and Content Side by Side */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {/* Left: Image Slider */}
        <Box sx={{ position: "relative", width: 500, height: 400 }}>
          <Box
            component='img'
            src={images[slide]}
            alt={room.title}
            sx={{
              width: 500,
              height: 400,
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={handleOpenFullscreen}
          />
          <Button
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              minWidth: 40,
              height: 40,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              borderRadius: "50%",
              zIndex: 1,
            }}
          >
            {"<"}
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 10,
              transform: "translateY(-50%)",
              minWidth: 40,
              height: 40,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              borderRadius: "50%",
              zIndex: 1,
            }}
          >
            {">"}
          </Button>
          <IconButton
            onClick={handleOpenFullscreen}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              bgcolor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
            }}
          >
            <FullscreenIcon />
          </IconButton>
        </Box>

        {/* Right: Text Content */}
        <Box sx={{ flex: 1, p: 4, display: "flex", flexDirection: "column" }}>
          {/* Header Section */}
          <Typography
            variant='h5'
            sx={{ fontWeight: 700, mb: 0.5, color: "#1a1a1a" }}
          >
            {room.roomtypename}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            {room.size_sqft} sqft
          </Typography> */}

          {/* Bed type selector */}
          <Stack direction='row' spacing={1.5} mb={3}>
            {["Queen", "King", "Twin"].map((bed) => (
              <Chip
                key={bed}
                label={bed}
                icon={<KingBedIcon />}
                clickable
                sx={{
                  height: 36,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor: selectedBed === bed ? "#1976d2" : "#f5f5f5",
                  color: selectedBed === bed ? "white" : "#616161",
                  border:
                    selectedBed === bed
                      ? "2px solid #1976d2"
                      : "2px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor:
                      selectedBed === bed ? "#1565c0" : "#eeeeee",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => setSelectedBed(bed)}
              />
            ))}
          </Stack>

          {/* Main Content */}
          <Box display='flex' flexDirection='row' gap={4} flex={1}>
            {/* Left: Description & Amenities */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant='body2'
                sx={{ mb: 3, lineHeight: 1.7, color: "#424242" }}
              >
                {room.description}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant='subtitle2'
                sx={{ mb: 1.5, fontWeight: 600, color: "#616161" }}
              >
                Amenities
              </Typography>
              <Stack spacing={1.5}>
                {/* {amenitiesList.map((amenity) => (
                  <Stack key={amenity.key} direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ color: "#1976d2", display: "flex" }}>{amenity.icon}</Box>
                    <Typography variant="body2" sx={{ fontSize: "0.875rem", color: "#424242" }}>
                      {amenity.label}
                    </Typography>
                  </Stack>
                ))} */}
                <Stack direction='row' spacing={1.5} alignItems='center'>
                  {/* <Box sx={{ color: "#1976d2", display: "flex" }}>{amenity.icon}</Box> */}
                  <Typography
                    variant='body2'
                    sx={{ fontSize: "0.875rem", color: "#424242" }}
                  >
                    {room.amenities}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* Right: Room Info & Pricing */}
            <Box
              sx={{
                width: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderLeft: "1px solid #e0e0e0",
                pl: 3,
              }}
            >
              <Box>
                <Stack spacing={1} mb={3}>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='body2' color='text.secondary'>
                      Size:
                    </Typography>
                    <Typography variant='body2' fontWeight={500}>
                      {room.size_sqft} sqft / {room.size_sqm} sqm
                    </Typography>
                  </Stack>
                  <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography variant='body2' color='text.secondary'>
                      Guests:
                    </Typography>
                    <Typography variant='body2' fontWeight={500}>
                      {room.capacity} guests
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Box>
                <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ display: "block", mb: 0.5 }}
                  >
                    Average Rate
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{ fontWeight: 700, color: "#1976d2" }}
                  >
                    ${room.base_price}
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    per night
                  </Typography>
                </Box>

                <Button
                  variant='contained'
                  fullWidth
                  onClick={() => {
                    const defaultOffer =
                      room.viewoffers && room.viewoffers.length > 0
                        ? room.viewoffers[0]
                        : { ratename: "Base Rate", rateprice: room.base_price };
                    handleBookRoom(defaultOffer, defaultOffer.rateprice);
                  }}
                  sx={{
                    backgroundColor: "#1976d2",
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    borderRadius: 2,
                    mb: 1.5,
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  Book Average Rate
                </Button>

                <Button
                  variant='outlined'
                  fullWidth
                  onClick={() => setShowOffers(!showOffers)}
                  sx={{
                    borderColor: "#4caf50",
                    color: "#4caf50",
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                    fontSize: "1rem",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: "#45a049",
                      bgcolor: "rgba(76, 175, 80, 0.04)",
                    },
                  }}
                >
                  {showOffers ? "Hide Offers" : "View All Offers"}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Bottom Section: Full Width Offers */}
      <Collapse in={showOffers}>
        <Box sx={{ p: 4, borderTop: "2px solid #e0e0e0", bgcolor: "#fafafa" }}>
          <Typography variant='h6' sx={{ mb: 3, fontWeight: 600 }}>
            Available Offers
          </Typography>
          <Stack spacing={2.5}>
            {room.viewoffers.map((rt, index) => (
              <Paper
                variant='outlined'
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: "#1976d2", boxShadow: 2 },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <Box sx={{ flex: 1 }}>
                      <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                        mb={0.5}
                      >
                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                          {rt.ratename}
                        </Typography>
                        <Chip
                          label='Best Value'
                          size='small'
                          sx={{
                            height: 22,
                            fontSize: "0.7rem",
                            backgroundColor: "#ff9800",
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                      </Stack>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 1.5 }}
                      >
                        {rt.description}
                      </Typography>
                      <Stack direction='row' spacing={3}>
                        <Box>
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            display='block'
                          >
                            Cancellation
                          </Typography>
                          <Typography variant='body2' fontWeight={500}>
                            Free until 7 days
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            display='block'
                          >
                            Payment
                          </Typography>
                          <Typography variant='body2' fontWeight={500}>
                            Prepayment required
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            display='block'
                          >
                            Meals
                          </Typography>
                          <Typography variant='body2' fontWeight={500}>
                            All meals included
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    <Box sx={{ textAlign: "right", minWidth: 180 }}>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                      >
                        Total per night
                      </Typography>
                      <Typography
                        variant='h4'
                        sx={{ color: "#1976d2", fontWeight: 700, mb: 1 }}
                      >
                        ${rt.rateprice}
                      </Typography>
                      <Button
                        variant='contained'
                        fullWidth
                        onClick={() => handleBookRoom(rt, rt.rateprice)}
                        sx={{
                          backgroundColor: "#1976d2",
                          textTransform: "none",
                          py: 1.2,
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#1565c0" },
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Collapse>

      {/* Fullscreen Modal */}
      <Modal
        open={openFullscreen}
        onClose={handleCloseFullscreen}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90vw",
            height: "90vh",
            bgcolor: "rgba(0,0,0,0.95)",
            borderRadius: 2,
            outline: "none",
          }}
        >
          <IconButton
            onClick={handleCloseFullscreen}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              zIndex: 2,
            }}
          >
            <CloseIcon fontSize='large' />
          </IconButton>
          <Box
            component='img'
            src={images[slide]}
            alt={room.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
          <Button
            onClick={handlePrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 30,
              transform: "translateY(-50%)",
              minWidth: 60,
              height: 60,
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "2rem",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              borderRadius: "50%",
            }}
          >
            {"<"}
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 30,
              transform: "translateY(-50%)",
              minWidth: 60,
              height: 60,
              bgcolor: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "2rem",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              borderRadius: "50%",
            }}
          >
            {">"}
          </Button>
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "rgba(0,0,0,0.6)",
              color: "#fff",
              px: 3,
              py: 1,
              borderRadius: 2,
            }}
          >
            <Typography variant='body1'>
              {slide + 1} / {images.length}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
}
