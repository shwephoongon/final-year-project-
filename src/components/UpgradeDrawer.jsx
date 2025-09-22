import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Drawer,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

 const UpgradeDrawer = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 500, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Image Section */}
        <Box sx={{ position: "relative", width: "100%", height: 250 }}>
          <Box
            component="img"
            src="/upgraderoom.webp"
            alt="Upgrade Room"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Chip
            label="+$47 per night"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "teal",
              color: "white",
              fontWeight: "bold",
            }}
          />
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              color: "white",
              textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
            }}
          >
            UPGRADE YOUR ROOM
          </Typography>
        </Box>

        {/* Comparison Section */}
        <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Current Room
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                <li>Chamber King</li>
                <li>City View</li>
                <li>King Bed</li>
                <li>Standard Bathroom</li>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: -8,
                    left: 0,
                    bgcolor: "teal",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    fontWeight: "bold",
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  Upgrade Your Room
                </Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                  Upgrade Room
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  <li>Chamber King City View</li>
                  <li>King Bed + Dressing Room</li>
                  <li>Sleeping Lounge</li>
                  <li>Hardwood Floors & Vanity</li>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: 2,
            boxShadow: 3,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" sx={{ bgcolor: "white" }} onClick={onClose}>
            Continue
          </Button>
          <Button variant="contained" sx={{ bgcolor: "teal" }}>
            Upgrade
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default UpgradeDrawer;