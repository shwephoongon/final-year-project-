import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BookingDetails = ({stayDetails, bookedRooms, totalPrice}) => {
  return (
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
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
          Stay Details
        </Typography>
        <Typography variant='body2'>Check-in: {stayDetails.checkIn}</Typography>
        <Typography variant='body2'>
          Check-out: {stayDetails.checkOut}
        </Typography>
        <Typography variant='body2'>Nights: {stayDetails.nights}</Typography>

        <Divider sx={{ my: 1.5 }} />

        {/* Rooms List */}
        <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
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
  );
};

export default BookingDetails;
