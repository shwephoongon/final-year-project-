import { useState } from "react";
import { Box, Button, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function SimpleDateRangePicker() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  const formatDate = (date) => format(date, "EEE, MMM. dd");

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<CalendarMonthIcon />}
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          textTransform: "none",
          justifyContent: "flex-start",
          width: 280,
          fontWeight:'600',
          px: 2,
          py: 1,
          cursor: "pointer",
          border: '1px solid #989ca4',
           color: "#286fd2ff",
          backgroundColor: "white",
          "&:hover": { backgroundColor: "#f0f0f0" },
        }}
      >
        {`${formatDate(range[0].startDate)} to ${formatDate(range[0].endDate)}`}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
      >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
          minDate={new Date()}
          months={2}
          direction='horizontal'
          rangeColors={["#1976d2"]}
          showPreview={true}
          showDateDisplay={false}
        />
      </Popover>
    </Box>
  );
}
