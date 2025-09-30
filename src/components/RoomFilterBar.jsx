import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Stack,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Chip,
  IconButton,
  Badge,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BedIcon from "@mui/icons-material/Bed";
import LandscapeIcon from "@mui/icons-material/Landscape";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const bedOptions = ["Queen", "King", "Twin"];
const viewOptions = ["City", "Sea", "Garden"];
const accessibilityOptions = ["Wheelchair", "Visual", "Hearing"];

export default function RoomFilterBar({ filters, setFilters }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleReset = () => {
    setFilters({ bedType: [], viewType: [], accessibility: [] });
  };

  const totalFilters = filters.bedType.length + filters.viewType.length + filters.accessibility.length;
  const filtersApplied = totalFilters > 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Badge badgeContent={totalFilters} color="primary" invisible={!filtersApplied}>
        <Button
          onClick={toggleDrawer(true)}
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 600,
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              borderColor: "#1565c0",
              bgcolor: "rgba(25, 118, 210, 0.04)",
            },
          }}
        >
          Filters
        </Button>
      </Badge>

      {filtersApplied && (
        <Chip
          label={`${totalFilters} active`}
          onDelete={handleReset}
          size="small"
          sx={{
            fontWeight: 500,
            bgcolor: "#e3f2fd",
            color: "#1976d2",
            "& .MuiChip-deleteIcon": {
              color: "#1976d2",
              "&:hover": {
                color: "#1565c0",
              },
            },
          }}
        />
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 380,
            borderRadius: "16px 0 0 16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2.5,
            bgcolor: "#1976d2",
            color: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Filters
            </Typography>
            {filtersApplied && (
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {totalFilters} filter{totalFilters > 1 ? "s" : ""} applied
              </Typography>
            )}
          </Box>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3, bgcolor: "#fafafa", flexGrow: 1, overflowY: "auto" }}>
          <Stack spacing={3}>
            {/* Bed Type */}
            <Box
              sx={{
                bgcolor: "white",
                p: 2.5,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  color: "#1a1a1a",
                  fontSize: "1rem",
                }}
              >
                <BedIcon fontSize="small" sx={{ mr: 1, color: "#1976d2" }} />
                Bed Type
              </Typography>
              <Stack spacing={0.5}>
                {bedOptions.map((bed) => (
                  <FormControlLabel
                    key={bed}
                    control={
                      <Checkbox
                        checked={filters.bedType.includes(bed)}
                        onChange={() => handleFilterChange("bedType", bed)}
                        sx={{
                          color: "#bdbdbd",
                          "&.Mui-checked": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: filters.bedType.includes(bed) ? 600 : 400,
                          color: filters.bedType.includes(bed) ? "#1976d2" : "#424242",
                        }}
                      >
                        {bed}
                      </Typography>
                    }
                    sx={{
                      ml: 0,
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* View Type */}
            <Box
              sx={{
                bgcolor: "white",
                p: 2.5,
                borderRadius: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  color: "#1a1a1a",
                  fontSize: "1rem",
                }}
              >
                <LandscapeIcon fontSize="small" sx={{ mr: 1, color: "#1976d2" }} />
                View Type
              </Typography>
              <Stack spacing={0.5}>
                {viewOptions.map((view) => (
                  <FormControlLabel
                    key={view}
                    control={
                      <Checkbox
                        checked={filters.viewType.includes(view)}
                        onChange={() => handleFilterChange("viewType", view)}
                        sx={{
                          color: "#bdbdbd",
                          "&.Mui-checked": {
                            color: "#1976d2",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: filters.viewType.includes(view) ? 600 : 400,
                          color: filters.viewType.includes(view) ? "#1976d2" : "#424242",
                        }}
                      >
                        {view}
                      </Typography>
                    }
                    sx={{
                      ml: 0,
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "#f5f5f5",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Accessibility */}
            {/* <Box>
              <Typography
                sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}
              >
                <AccessibleIcon
                  fontSize="small"
                  sx={{ mr: 1, color: "text.secondary" }}
                />
                Accessibility
              </Typography>
              <Stack>
                {accessibilityOptions.map((acc) => (
                  <FormControlLabel
                    key={acc}
                    control={
                      <Checkbox
                        checked={filters.accessibility.includes(acc)}
                        onChange={() => handleFilterChange("accessibility", acc)}
                      />
                    }
                    label={acc}
                  />
                ))}
              </Stack>
            </Box> */}
          </Stack>
        </Box>

        {/* Sticky Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 3,
            borderTop: "2px solid #e0e0e0",
            bgcolor: "white",
            boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Button
            onClick={handleReset}
            variant="outlined"
            fullWidth
            disabled={!filtersApplied}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              borderColor: "#e0e0e0",
              color: "#616161",
              "&:hover": {
                borderColor: "#bdbdbd",
                bgcolor: "#f5f5f5",
              },
              "&:disabled": {
                borderColor: "#e0e0e0",
                color: "#bdbdbd",
              },
            }}
          >
            Reset All
          </Button>
          <Button
            variant="contained"
            onClick={toggleDrawer(false)}
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: 2,
              py: 1.2,
              fontWeight: 600,
              bgcolor: "#1976d2",
              boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                bgcolor: "#1565c0",
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
