import { useEffect, useState } from "react";
import { supabase } from "../supabaseclient";
import { TextField, MenuItem } from "@mui/material";

export default function RoomTypeDropdown({
  value,
  onChange,
  name = "roomtypeid",
}) {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("roomtype")
        .select("*")
        .order("roomtypeid", { ascending: true });

      if (error) {
        console.error("Error fetching room types:", error.message);
      } else {
        setRoomTypes(data);
      }
      setLoading(false);
    };

    fetchRoomTypes();
  }, []);

  return (
    <TextField
      select
      fullWidth
      margin='dense'
      label='Room Type'
      name={name}
      value={value}
      //onChange={onChange}
      onChange={(e) => {
        const selectedRoomType = roomTypes.find(
          (rt) => rt.roomtypeid === e.target.value
        );
        onChange(selectedRoomType);
      }}
      disabled={loading}
    >
      <MenuItem value=''>
        <em>Select Room Type</em>
      </MenuItem>
      {roomTypes.map((rt) => (
        <MenuItem
          key={rt.roomtypeid}
          value={rt.roomtypeid}
          //   onClick={() =>
          //     onChange({
          //       roomtypeid: rt.roomtypeid,
          //       amenities: rt.amenities,
          //       roomtypename: rt.roomtypename,
          //     })
          //   }
        >
          {rt.roomtypename}
        </MenuItem>
      ))}
    </TextField>
  );
}
