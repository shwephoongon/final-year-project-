import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  MeetingRoom as RoomsIcon,
  Star as EnhancementsIcon,
  BookOnline as BookingsIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon
} from "@mui/icons-material";
import { supabase } from "../supabaseclient";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin/login";

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // clear session
    navigate("/admin/login"); // redirect to login
  };

  const navigationItems = [
    // { text: "Dashboard", icon: <DashboardIcon />, id: "admin/dashboard" },
    { text: "Bookings", icon: <BookingsIcon />, id: "admin/bookings" },
    { text: "Rooms", icon: <RoomsIcon />, id: "admin/rooms" },
    // {
    //   text: "Enhancements",
    //   icon: <EnhancementsIcon />,
    //   id: "admin/enhancements",
    // },
    { text: "Logout", icon: <LogoutIcon />, action: handleLogout }, // new logout item
  ];


  const drawer = (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            color: "#1976d2",
            textAlign: "center",
            width: "100%",
          }}
        >
          Admin Panel
        </Typography>
      </Toolbar>

      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {item.action ? (
              <ListItemButton
                onClick={item.action}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                to={`/${item.id}`}
                selected={location.pathname === `/${item.id}`}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "#e3f2fd" },
                  "&.Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": { backgroundColor: "#1565c0" },
                    "& .MuiListItemIcon-root": { color: "white" },
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {!isLoginPage && isMobile && (
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isLoginPage && (
        <Box
          component='nav'
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {/* Mobile drawer */}
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f8f9fa",
              },
            }}
          >
            {drawer}
          </Drawer>

          {/* Desktop drawer */}
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor: "#f8f9fa",
                borderRight: "1px solid #e0e0e0",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: isLoginPage ? "100%" : `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, md: 0 },
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
