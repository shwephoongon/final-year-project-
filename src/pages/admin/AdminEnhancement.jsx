import React, { useEffect, useState } from "react";
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

const AdminEnhancements = () => {
  const [enhancements, setEnhancements] = useState([
    // {
    //   id: 1,
    //   name: "Spa Package",
    //   description: "Relaxing spa treatments with aromatherapy oils.",
    //   image:
    //     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    // },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    //image: "",
    price: 0,
  });
useEffect(() => {
  fetchEnhancements();
}, []);

  const handleOpen = (item = null) => {
    setEditing(item);
    setFormData(item || { name: "", description: "", image: "", price: 0 });
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
  const fetchEnhancements = async () => {
    const { data, error } = await supabase
      .from("enhancements")
      .select("*")
      .order("enhanceid", { ascending: true });

    if (error) {
      console.error("Fetch error:", error.message);
      return;
    }

    // Map database values to your UI structure
    setEnhancements(
      data.map((item) => ({
        id: item.enhanceid,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image, // if you added image column
      }))
    );
  };

  const handleSave = async () => {
    console.log("formdata", formData);
    if (!formData.name || !formData.price) {
      alert("Name and Price are required");
      return;
    }

    // UPDATE
    if (editing) {
      const { error } = await supabase
        .from("enhancements")
        .update({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          image: formData.image,
        })
        .eq("enhanceid", editing.id);

      if (error) {
        console.error("Update error:", error.message);
        return;
      }

      // Update UI state
      setEnhancements((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...e, ...formData } : e))
      );
    }

    // INSERT
    else {
      const { data, error } = await supabase
        .from("enhancements")
        .insert([
          {
            name: formData.name,
            description: formData.description,
            price: formData.price,
          },
        ])
        .select();

      if (error) {
        console.error("Insert error:", error.message);
        return;
      }

      // Add to UI
      if (data) {
        setEnhancements((prev) => [
          ...prev,
          {
            id: data[0].enhanceid,
            ...data[0],
          },
        ]);
      }
    }

    setOpen(false);
  };

  // const handleSave = () => {
  //   if (editing) {
  //     setEnhancements((prev) =>
  //       prev.map((e) => (e.id === editing.id ? { ...e, ...formData } : e))
  //     );
  //   } else {
  //     setEnhancements((prev) => [...prev, { id: Date.now(), ...formData }]);
  //   }
  //   setOpen(false);
  // };

  // const handleDelete = (id) => {
  //   setEnhancements((prev) => prev.filter((e) => e.id !== id));
  // };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant='h5' fontWeight={700}>
          Enhancements
        </Typography>
        <Button
          variant='contained'
          sx={{ backgroundColor: "#1976d2" }}
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add Enhancement
        </Button>
      </Box>

      <Grid container spacing={3}>
        {enhancements.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component='img'
                height='160'
                image={"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"}
                alt={item.name}
              />
              <CardContent>
                <Typography variant='h6' fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {item.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <IconButton color='primary' onClick={() => handleOpen(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color='error'
                    //onClick={() => handleDelete(item.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog Form */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          {editing ? "Edit Enhancement" : "Add Enhancement"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin='dense'
            label='Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin='dense'
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin='dense'
            label='Price'
            name='price'
            value={formData.price}
            onChange={handleChange}
          />
          {/* <Box mt={2}>
            <Typography variant="body2" mb={1}>
              Upload Image
            </Typography>
            <input type="file" name="image" onChange={handleChange} />
            {formData.image && (
              <Box mt={2}>
                <img
                  src={formData.image}
                  alt="preview"
                  width="100%"
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
    </Box>
  );
};

export default AdminEnhancements;
