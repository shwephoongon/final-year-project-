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
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Voucher Image */}
      <Box
        component='img'
        src='/voucher.webp'
        alt='Voucher'
        sx={{ 
          width: "100%", 
          height: 250, 
          objectFit: "cover",
          borderBottom: "1px solid #e0e0e0",
        }}
      />

      {/* Stay Details */}
      <Box sx={{ p: 3 }}>
        <Typography variant='h6' sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}>
          Stay Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>Check-in:</Typography>
            <Typography variant='body2' fontWeight={600}>{stayDetails.checkIn}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>Check-out:</Typography>
            <Typography variant='body2' fontWeight={600}>{stayDetails.checkOut}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>Nights:</Typography>
            <Typography variant='body2' fontWeight={600}>{stayDetails.nights}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Rooms List */}
        <Typography variant='h6' sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}>
          Rooms Booked
        </Typography>
        <List dense sx={{ mb: 1 }}>
          {bookedRooms.map((room, index) => (
            <ListItem key={index} disableGutters sx={{ py: 1 }}>
              <ListItemText
                primary={
                  <Typography variant='body2' fontWeight={600}>
                    {room.name} x{room.quantity}
                  </Typography>
                }
                secondary={
                  <Typography variant='caption' color='text.secondary'>
                    ${room.rate} per night
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box sx={{ 
          bgcolor: "#f5f5f5", 
          p: 2, 
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}>
          <Typography variant='caption' color='text.secondary' display='block' sx={{ mb: 0.5 }}>
            Total Amount
          </Typography>
          <Typography variant='h5' sx={{ fontWeight: 700, color: "#1976d2" }}>
            ${totalPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;
