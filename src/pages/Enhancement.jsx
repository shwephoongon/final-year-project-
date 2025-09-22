import React, { useState } from "react";
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

const enhancementsList = [
  {
    id: 1,
    name: "Spa Access",
    description:
      "Relax and rejuvenate with full access to our spa facilities including sauna, massage, and hot tub.",
    price: 50,
    image: "/spa.jpg",
  },
  {
    id: 2,
    name: "Breakfast Buffet",
    description:
      "Enjoy a gourmet breakfast buffet with fresh pastries, eggs, coffee, and seasonal fruits.",
    price: 20,
    image: "/spa.jpg",
  },
  {
    id: 3,
    name: "Airport Pickup",
    description:
      "Private car service from the airport to the hotel in comfort and style.",
    price: 35,
    image: "/spa.jpg",
  },
];

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
        backgroundColor: "#e6f0ff",
        minHeight: "100vh",
        py: 4,
        width: "100%",
      }}
    >
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
                  p: 2,
                  borderRadius: 2,
                  minHeight: 220,
                  display: "flex",
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
                    <Typography variant='h6' fontWeight='bold' gutterBottom>
                      Would you like to upgrade to a room Chamber King City
                      View?
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
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
                      underline='always'
                      sx={{ cursor: "pointer" }}
                    >
                      Read more
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
                    <Typography variant='subtitle1' fontWeight='bold'>
                      +$47 per night
                    </Typography>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => toggleDrawer(true)}
                    >
                      Upgrade
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Enhancements Picker (longer section) */}
            <Grid item>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {enhancementsList.map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: 2,
                      boxShadow: 1,
                      p: 2,
                      gap: 2,
                    }}
                  >
                    {/* Image */}
                    <Box
                      component='img'
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 1,
                      }}
                    />

                    {/* Description */}
                    <Box
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <Typography variant='subtitle1' fontWeight='bold'>
                        {item.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 1 }}
                      >
                        {item.description}
                      </Typography>
                      <Typography variant='subtitle2' fontWeight='bold'>
                        +${item.price} per night
                      </Typography>
                    </Box>

                    {/* Checkbox */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected.includes(item.id)}
                          onChange={() => toggleEnhancement(item.id)}
                        />
                      }
                      label='Add'
                    />
                  </Box>
                ))}

                <Button
                  variant='contained'
                  color='primary'
                  sx={{ alignSelf: "flex-end", mt: 2 }}
                  onClick={() =>
                    console.log("Selected enhancements:", selected)
                  }
                >
                  Confirm Enhancements
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* ===== Second Column (30%) ===== */}
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
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Voucher Image */}
                <Box
                  component='img'
                  src='/voucher.webp'
                  alt='Voucher'
                  sx={{ width: "100%", height: 250, objectFit: "cover" }}
                />

                {/* Stay Details */}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant='subtitle1'
                    fontWeight='bold'
                    gutterBottom
                  >
                    Stay Details
                  </Typography>
                  <Typography variant='body2'>
                    Check-in: {stayDetails.checkIn}
                  </Typography>
                  <Typography variant='body2'>
                    Check-out: {stayDetails.checkOut}
                  </Typography>
                  <Typography variant='body2'>
                    Nights: {stayDetails.nights}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Rooms List */}
                  <Typography
                    variant='subtitle1'
                    fontWeight='bold'
                    gutterBottom
                  >
                    Rooms Booked
                  </Typography>
                  <List dense>
                    {bookedRooms.map((room, index) => (
                      <ListItem key={index} disableGutters>
                        <ListItemText
                          primary={`${room.name} x${room.quantity}`}
                          secondary={`$${room.rate} per night`}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Total */}
                  <Typography variant='h6' fontWeight='bold'>
                    Total: ${totalPrice}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <UpgradeDrawer open={drawerOpen} onClose={() => toggleDrawer(false)} />
    </Box>
  );
};

export default Enhancement;
