import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { supabase } from "../../supabaseclient";
import RoomTypeDropdown from "../../components/RoomTypeDropdown";
import roomTypeMapping from "../../roomtypemapping";

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);

  const [open, setOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomTypeId, setRoomTypeId] = useState("");
  const [formData, setFormData] = useState({
    roomcode: "",
    qty: "",
    amenities: "",
    image: "",
    roomtypeid: 0,
    amenities: "",
  });
  const [deleteRoom, setDeleteRoom] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleFormChange = (roomType) => {
    if (!roomType) return;
    setFormData((prev) => ({
      ...prev,
      roomtypeid: roomType.roomtypeid,
      amenities: roomType.amenities,
    }));
  };

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("room")
      .select(
        `
        roomid,
        roomcode,
        status,
        roomtypeid,
        roomtype:roomtypeid (
          roomtypename,
          amenities
        )
      `
      )
      .order("roomid", { ascending: true });
    console.log(data);
    if (error) {
      console.error("Error fetching rooms:", error.message);
    } else {
      // Map to flatten roomtype info
      const mappedRooms = data.map((r) => ({
        id: r.roomid,
        roomcode: r.roomcode,
        roomtypeid: r.roomtypeid,
        amenities: r.roomtype?.amenities || "",
        status: r.status,
      }));
      setRooms(mappedRooms);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);
  console.log(rooms);

  const handleOpen = (room = null) => {
    setEditingRoom(room);
    setFormData(room || { name: "", qty: "", amenities: "", image: "" });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const imageURL = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, image: imageURL }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!formData.roomcode || !formData.roomtypeid) {
      alert("Room code and room type required");
      return;
    }

    if (editingRoom) {
      // UPDATE
      const { error } = await supabase
        .from("room")
        .update({
          roomcode: formData.roomcode,
          roomtypeid: formData.roomtypeid,
        })
        .eq("roomid", editingRoom.id);

      if (error) {
        console.error("Update error:", error.message);
        return;
      }
    } else {
      // INSERT
      const { data, error } = await supabase.from("room").insert([
        {
          roomcode: formData.roomcode,
          roomtypeid: formData.roomtypeid,
        },
      ]);

      if (error) {
        console.error("Insert error:", error.message);
        return;
      }
    }

    setOpen(false);
    fetchRooms();
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("room").delete().eq("roomid", id);

    if (error) {
      console.error("Delete error:", error.message);
      return;
    }

    fetchRooms();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant='h5' fontWeight={700}>
          Rooms
        </Typography>
        <Button
          variant='contained'
          sx={{ backgroundColor: "#1976d2" }}
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Room
        </Button>
      </Box>

      <Grid container spacing={3} alignItems='stretch'>
        {rooms.map((room) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={room.id}
            sx={{ display: "flex" }}
          >
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component='img'
                height='160'
                image={
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                }
                alt={room.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' fontWeight={600}>
                  {room.roomcode}
                </Typography>
                <Typography variant='body2' fontWeight={400}>
                  {roomTypeMapping[room.roomtypeid]?.roomtypename}
                </Typography>
              </CardContent>
              <Box sx={{ mt: 1, p: 1 }}>
                <IconButton color='primary' onClick={() => handleOpen(room)}>
                  <Edit />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={() => {
                    setDeleteRoom(room);
                    setOpenDeleteDialog(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>{editingRoom ? "Edit Room" : "Add Room"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin='dense'
            label='Room Code'
            name='roomcode'
            value={formData.roomcode}
            onChange={handleChange}
          />
          <RoomTypeDropdown
            value={formData.roomtypeid}
            onChange={handleFormChange}
          />
          <Box mt={2}>
            <Typography variant='subtitle2' color='text.secondary' gutterBottom>
              Amenities
            </Typography>
            <Typography
              variant='body1'
              sx={{
                p: 1,
                border: "1px solid #ccc",
                borderRadius: 1,
                backgroundColor: "#f9f9f9",
                minHeight: "40px",
              }}
            >
              {formData.amenities || "Select a room type to see amenities"}
            </Typography>
          </Box>
          {/* <Box mt={2}>
            <Typography variant='body2' mb={1}>
              Upload Image
            </Typography>
            <input type='file' name='image' onChange={handleChange} />
            {formData.image && (
              <Box mt={2}>
                <img
                  src={formData.image}
                  alt='preview'
                  width='100%'
                  style={{ borderRadius: 8 }}
                />
              </Box>
            )}
          </Box> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant='contained'
            sx={{ backgroundColor: "#1976d2" }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Do you really want to delete room "{deleteRoom?.roomcode}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            color='error'
            variant='contained'
            onClick={() => {
              handleDelete(deleteRoom.id);
              setOpenDeleteDialog(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminRooms;
