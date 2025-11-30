import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BookingDetails = () => {
  const bookedRooms = JSON.parse(localStorage.getItem("selectedRooms")) || [];
  let searchData = JSON.parse(localStorage.getItem("searchdata")) || [];

  // Total rate for all rooms
  const totalRate = bookedRooms.reduce(
    (sum, room) => sum + (room.offerType?.rateprice || 0) * room.quantity,
    0
  );

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
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}
        >
          Stay Details
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>
              Check-in:
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              {searchData?.fromDate}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>
              Check-out:
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              {searchData?.toDate}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant='body2' color='text.secondary'>
              Nights:
            </Typography>
            <Typography variant='body2' fontWeight={600}>
              {searchData?.nights}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Rooms List */}
        <Typography
          variant='h6'
          sx={{ fontWeight: 700, color: "#1a1a1a", mb: 2 }}
        >
          Rooms Booked
        </Typography>

        <List dense sx={{ mb: 1 }}>
          {bookedRooms?.map((room, index) => {
            const roomTotal = (room.offerType?.rateprice || 0) * room.quantity;
            return (
              <ListItem key={index} disableGutters sx={{ py: 1 }}>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant='body2' fontWeight={600}>
                        {room.roomData.roomtypename} ({room.offerType.ratename}) ×{" "}
                        {room.quantity}
                      </Typography>
                      <Typography variant='body2' fontWeight={600}>
                        ${roomTotal}
                      </Typography>
                    </Box>
                  }
                  secondary={null}
                />
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box
          sx={{
            bgcolor: "#f5f5f5",
            p: 2,
            borderRadius: 2,
            border: "1px solid #e0e0e0",
          }}
        >
          <Typography
            variant='caption'
            color='text.secondary'
            display='block'
            sx={{ mb: 0.5 }}
          >
            Total Amount
          </Typography>
          <Typography variant='h5' sx={{ fontWeight: 700, color: "#1976d2" }}>
            ${totalRate * searchData.nights}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingDetails;
