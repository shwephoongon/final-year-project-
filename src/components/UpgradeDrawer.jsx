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
    <Drawer 
      anchor="right" 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px 0 0 16px",
        },
      }}
    >
      <Box sx={{ width: 550, display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box sx={{ 
          bgcolor: "#1976d2", 
          color: "white", 
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Upgrade Your Room
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Enhance your experience with premium features
            </Typography>
          </Box>
          <Chip
            label="+$47/night"
            sx={{
              bgcolor: "white",
              color: "#1976d2",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          />
        </Box>

        {/* Image Section */}
        <Box sx={{ position: "relative", width: "100%", height: 280 }}>
          <Box
            component="img"
            src="/upgraderoom.webp"
            alt="Upgrade Room"
            sx={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              borderBottom: "1px solid #e0e0e0",
            }}
          />
        </Box>

        {/* Comparison Section */}
        <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto", bgcolor: "#fafafa" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box sx={{ 
                bgcolor: "white", 
                p: 2.5, 
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                height: "100%",
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#666", mb: 2 }}>
                  Current Room
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, mt: 0, "& li": { mb: 1, color: "#666" } }}>
                  <li>Chamber King</li>
                  <li>City View</li>
                  <li>King Bed</li>
                  <li>Standard Bathroom</li>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box sx={{ 
                bgcolor: "white", 
                p: 2.5, 
                borderRadius: 2,
                border: "2px solid #1976d2",
                height: "100%",
                position: "relative",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.15)",
              }}>
                <Chip
                  label="Recommended"
                  size="small"
                  sx={{
                    position: "absolute",
                    top: -12,
                    right: 16,
                    bgcolor: "#4caf50",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1976d2", mb: 2 }}>
                  Upgraded Room
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, mt: 0, "& li": { mb: 1, color: "#1a1a1a", fontWeight: 500 } }}>
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
            p: 3,
            borderTop: "2px solid #e0e0e0",
            bgcolor: "white",
            display: "flex",
            gap: 2,
            boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Button 
            variant="outlined" 
            fullWidth
            onClick={onClose}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              borderColor: "#e0e0e0",
              color: "#616161",
              "&:hover": {
                borderColor: "#bdbdbd",
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Maybe Later
          </Button>
          <Button 
            variant="contained" 
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              bgcolor: "#1976d2",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                bgcolor: "#1565c0",
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            Upgrade Now
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
export default UpgradeDrawer;