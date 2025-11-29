import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import UpgradeDrawer from "../components/UpgradeDrawer";
import BookingDetails from "../components/BookingDetails";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseclient";

const Enhancement = () => {
  const [selected, setSelected] = useState([]);

  const stayDetails = {
    checkIn: "2025-10-01",
    checkOut: "2025-10-05",
    nights: 4,
  };

  const bookedRooms = [
    { name: "Chamber King City View", rate: 150, quantity: 1 },
    { name: "Deluxe Queen Room", rate: 120, quantity: 2 },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (status) => setDrawerOpen(status);
  const navigate = useNavigate();
  const [enhancements, setEnhancements] = useState([]);
     const stored = localStorage.getItem("selectedRooms");
    const searchData = localStorage.getItem("searchdata");

  useEffect(() => {
    fetchEnhancements();
  }, []);

  // useEffect(() => {
  //   const stored = localStorage.getItem("selectedRooms");
  //   const storedsearch = localStorage.getItem("searchdata");
  //   if (stored) {
  //     console.log("Selected rooms:", JSON.parse(stored));
  //     console.log("Search Data", JSON.parse(storedsearch));
  //   } else {
  //     console.log("No selected rooms found.");
  //   }
  // }, []);

  const fetchEnhancements = async () => {
    const { data, error } = await supabase
      .from("enhancements")
      .select("*")
      .order("enhanceid");

    if (error) {
      console.error("Fetch error:", error);
      return;
    }

    setEnhancements(data);
  };

  const totalPrice = bookedRooms.reduce(
    (acc, room) => acc + room.rate * room.quantity * stayDetails.nights,
    0
  );

  const toggleEnhancement = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        py: 5,
        width: "100%",
      }}
    >
      {/* Page Header */}
      <Container maxWidth={false} sx={{ width: "90%", mb: 4 }}>
        <Typography
          variant='h4'
          sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
        >
          Enhance Your Stay
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Add special touches to make your experience unforgettable
        </Typography>
      </Container>

      <Container maxWidth={false} sx={{ width: "90%" }}>
        <Grid container spacing={2}>
          {/* ===== First Column (70%) ===== */}
          <Grid
            item
            container
            direction='column'
            spacing={2}
            sx={{ width: "60%" }}
          >
            {/* Upgrade Room Showcase */}
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "white",
                  p: 3,
                  borderRadius: 3,
                  minHeight: 220,
                  display: "flex",
                  border: "1px solid #e0e0e0",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
                {/* Left: Image */}
                <Box
                  component='img'
                  src='/upgraderoom.webp'
                  alt='Upgrade Room'
                  sx={{
                    width: "45%",
                    borderRadius: 2,
                    objectFit: "cover",
                    border: "1px solid #e0e0e0",
                  }}
                />

                {/* Right: Content */}
                <Box
                  sx={{
                    flex: 1,
                    pl: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant='h5'
                      sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}
                    >
                      Upgrade to Chamber King City View
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ lineHeight: 1.7 }}
                      paragraph
                    >
                      Upgrade your Chamber King to our Chamber King City View
                      for $47 more per night. Enjoy views of the Chicago skyline
                      in this two Chamber Design with King Bed featuring a
                      Sleeping Lounge & Dressing Room separated by privacy
                      doors. Showcasing hardwood floors & iconic make-up vanity.
                    </Typography>
                    <Link
                      href='#'
                      underline='hover'
                      sx={{
                        cursor: "pointer",
                        color: "#1976d2",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                      }}
                    >
                      Read more →
                    </Link>
                  </Box>

                  {/* Price + Button */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant='caption'
                        color='text.secondary'
                        display='block'
                      >
                        Additional cost
                      </Typography>
                      <Typography
                        variant='h6'
                        sx={{ fontWeight: 700, color: "#1976d2" }}
                      >
                        +$47 per night
                      </Typography>
                    </Box>
                    <Button
                      variant='contained'
                      onClick={() => toggleDrawer(true)}
                      sx={{
                        bgcolor: "#1976d2",
                        textTransform: "none",
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      Upgrade Room
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Enhancements Picker (longer section) */}
            <Grid item>
              <Typography
                variant='h5'
                sx={{ fontWeight: 700, color: "#1a1a1a", mb: 3 }}
              >
                Additional Enhancements
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                {enhancements.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 3,
                      border: "1px solid #e0e0e0",
                      p: 3,
                      gap: 3,
                      transition: "all 0.2s",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        borderColor: "#1976d2",
                      },
                    }}
                  >
                    {/* Image */}
                    <Box
                      component='img'
                      src={"/spa.jpg"}
                      alt={item.name}
                      sx={{
                        width: 140,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: "1px solid #e0e0e0",
                      }}
                    />

                    {/* Description */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant='h6'
                        sx={{ fontWeight: 700, color: "#1a1a1a" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ lineHeight: 1.7 }}
                      >
                        {item.description}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          display='block'
                        >
                          Additional cost
                        </Typography>
                        <Typography
                          variant='h6'
                          sx={{ fontWeight: 700, color: "#1976d2" }}
                        >
                          +${item.price} per night
                        </Typography>
                      </Box>
                    </Box>

                    {/* Add Link */}
                    <Link
                      component='button'
                      onClick={() => toggleEnhancement(item.id)}
                      underline='always'
                      sx={{
                        cursor: "pointer",
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        transition: "all 0.2s",
                        ...(selected.includes(item.id)
                          ? {
                              color: "#4caf50",
                              "&:hover": {
                                color: "#45a049",
                              },
                            }
                          : {
                              color: "#1976d2",
                              "&:hover": {
                                color: "#1565c0",
                              },
                            }),
                      }}
                    >
                      {selected.includes(item.id) ? "✓ Added" : "+ Add"}
                    </Link>
                  </Box>
                ))}

                <Button
                  variant='contained'
                  sx={{
                    alignSelf: "flex-end",
                    mt: 3,
                    bgcolor: "#4caf50",
                    textTransform: "none",
                    px: 5,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                    "&:hover": {
                      bgcolor: "#45a049",
                      boxShadow: "0 6px 16px rgba(76, 175, 80, 0.4)",
                    },
                  }}
                  onClick={() => navigate("/confirmbooking")}
                >
                  Continue to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={3.5}
            container
            direction='column'
            spacing={2}
            sx={{ width: "35%" }}
          >
            <Grid item sx={{ flex: 8 }}>
              <BookingDetails
                stayDetails={searchData}
                bookedRooms={stored}
                totalPrice={totalPrice}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <UpgradeDrawer open={drawerOpen} onClose={() => toggleDrawer(false)} />
    </Box>
  );
};

export default Enhancement;
