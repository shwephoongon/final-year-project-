import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  Person,
  Phone,
  Email,
  Star,
  Hotel,
  AccessTime,
  Cancel,
  CheckCircle,
  Pending,
} from '@mui/icons-material';

const ViewMyBooking = () => {
  // Mock user data
  const user = {
    name: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    totalBookings: 12,
    avatar: '/api/placeholder/80/80',
  };

  // Mock booking data
  const [bookings] = useState([
    {
      id: 'BK001',
      hotelName: 'Easy Hotel Yangon',
      roomType: 'Deluxe Suite',
      checkIn: '2024-10-15',
      checkOut: '2024-10-18',
      guests: 2,
      nights: 3,
      totalAmount: 450,
      status: 'confirmed',
      bookingDate: '2024-09-20',
      location: 'Yangon, Myanmar',
    },
    {
      id: 'BK002',
      hotelName: 'Easy Hotel Mandalay',
      roomType: 'Standard Room',
      checkIn: '2024-11-05',
      checkOut: '2024-11-07',
      guests: 1,
      nights: 2,
      totalAmount: 200,
      status: 'pending',
      bookingDate: '2024-10-01',
      location: 'Mandalay, Myanmar',
    },
    {
      id: 'BK003',
      hotelName: 'Easy Hotel Bagan',
      roomType: 'Premium Suite',
      checkIn: '2024-08-10',
      checkOut: '2024-08-13',
      guests: 2,
      nights: 3,
      totalAmount: 600,
      status: 'completed',
      bookingDate: '2024-07-15',
      location: 'Bagan, Myanmar',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: '#4caf50', bg: '#e8f5e8' };
      case 'pending':
        return { color: '#ff9800', bg: '#fff3e0' };
      case 'completed':
        return { color: '#2196f3', bg: '#e3f2fd' };
      case 'cancelled':
        return { color: '#f44336', bg: '#ffebee' };
      default:
        return { color: '#757575', bg: '#f5f5f5' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'pending':
        return <Pending sx={{ fontSize: 16 }} />;
      case 'completed':
        return <Star sx={{ fontSize: 16 }} />;
      case 'cancelled':
        return <Cancel sx={{ fontSize: 16 }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', display: 'flex', justifyContent: 'center', py: 3, px: { xs: 2, md: 6 } }}>
        <Grid container spacing={4}>
          {/* Left Column - Profile */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Profile Card */}
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                  mb: 3,
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar
                    src={user.avatar}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      border: '3px solid #f0f0f0',
                    }}
                  >
                    <Person sx={{ fontSize: 50 }} />
                  </Avatar>
                  
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                    {user.name}
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                      <Email sx={{ fontSize: 16, color: '#616161' }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 16, color: '#616161' }} />
                      <Typography variant="body2" color="text.secondary">
                        {user.phone}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                      {user.totalBookings}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Total Bookings
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card
                sx={{
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: 500,
                        borderColor: '#e0e0e0',
                        color: '#424242',
                        '&:hover': {
                          borderColor: '#1976d2',
                          bgcolor: 'rgba(25, 118, 210, 0.04)',
                        },
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: 500,
                        borderColor: '#e0e0e0',
                        color: '#424242',
                        '&:hover': {
                          borderColor: '#1976d2',
                          bgcolor: 'rgba(25, 118, 210, 0.04)',
                        },
                      }}
                    >
                      Book New Room
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          {/* Right Column - Bookings */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
              My Bookings
            </Typography>

            {/* Bookings List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {bookings.map((booking) => {
                const statusStyle = getStatusColor(booking.status);
                return (
                  <Card
                    key={booking.id}
                    sx={{
                      borderRadius: 3,
                      border: '1px solid #e0e0e0',
                      boxShadow: 'none',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
                            {booking.hotelName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: '#616161' }} />
                            <Typography variant="body2" color="text.secondary">
                              {booking.location}
                            </Typography>
                          </Box>
                        </Box>
                        <Chip
                          icon={getStatusIcon(booking.status)}
                          label={booking.status.toUpperCase()}
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 28,
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <Hotel sx={{ fontSize: 18, color: '#616161' }} />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Room Type
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {booking.roomType}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person sx={{ fontSize: 18, color: '#616161' }} />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Guests
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <CalendarToday sx={{ fontSize: 18, color: '#616161' }} />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Check-in
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {new Date(booking.checkIn).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTime sx={{ fontSize: 18, color: '#616161' }} />
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Check-out
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {new Date(booking.checkOut).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={5}>
                          <Box
                            sx={{
                              p: 2,
                              bgcolor: '#f8f8f8',
                              borderRadius: 2,
                              textAlign: 'center',
                              border: '1px solid #f0f0f0',
                            }}
                          >
                            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                              Total Amount
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                              ${booking.totalAmount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {booking.id}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            {/* Empty State */}
            {bookings.length === 0 && (
              <Card
                sx={{
                  textAlign: 'center',
                  py: 8,
                  borderRadius: 3,
                  border: '1px solid #e0e0e0',
                  boxShadow: 'none',
                }}
              >
                <CardContent>
                  <Hotel sx={{ fontSize: 80, color: '#bdbdbd', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
                    No Bookings Yet
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Start planning your next getaway with Easy Hotel
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      textTransform: 'none',
                      px: 4,
                      borderRadius: 2,
                      bgcolor: '#1976d2',
                      '&:hover': {
                        bgcolor: '#1565c0',
                      },
                    }}
                  >
                    Browse Hotels
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
    </Box>
  );
};

export default ViewMyBooking;