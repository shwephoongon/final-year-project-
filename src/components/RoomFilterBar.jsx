import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  Stack,
  Checkbox,
  FormControlLabel,
  Badge,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

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

  const filtersApplied =
    filters.bedType.length > 0 ||
    filters.viewType.length > 0 ||
    filters.accessibility.length > 0;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Badge color="secondary" variant="dot" invisible={!filtersApplied}>
        <Button
          onClick={toggleDrawer(true)}
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ textTransform: "none" }}
        >
          Filter
        </Button>
      </Badge>

      {filtersApplied && (
        <Button onClick={handleReset} sx={{ ml: 1, textTransform: "none" }}>
          Reset
        </Button>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>Bed Type</Typography>
              <Stack>
                {bedOptions.map((bed) => (
                  <FormControlLabel
                    key={bed}
                    control={
                      <Checkbox
                        checked={filters.bedType.includes(bed)}
                        onChange={() => handleFilterChange("bedType", bed)}
                      />
                    }
                    label={bed}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600 }}>View Type</Typography>
              <Stack>
                {viewOptions.map((view) => (
                  <FormControlLabel
                    key={view}
                    control={
                      <Checkbox
                        checked={filters.viewType.includes(view)}
                        onChange={() => handleFilterChange("viewType", view)}
                      />
                    }
                    label={view}
                  />
                ))}
              </Stack>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 600 }}>Accessibility</Typography>
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
            </Box>

            <Button variant="contained" onClick={toggleDrawer(false)}>
              Apply Filters
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
