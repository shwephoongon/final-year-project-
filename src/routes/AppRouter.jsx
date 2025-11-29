import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layouts/layout";
import HomePage from "../pages/HomePage";
import RoomList from "../pages/RoomList";
import Enhancement from "../pages/Enhancement";
import ConfirmBooking from "../pages/ConfirmBooking";
import ViewMyBooking from "../pages/ViewMyBooking";

import AdminLayout from "../Layouts/AdminLayout";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminRooms from "../pages/admin/AdminRooms";
import AdminEnhancement from "../pages/admin/AdminEnhancement";
import AdminBookings from "../pages/admin/AdminBookings";

import AdminProtectedRoute from "./AdminProtectedRoute";

function AppRouter() {
  return (
    <Router>
      {/* Public routes */}
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/RoomList" element={<Layout><RoomList /></Layout>} />
        <Route path="/Enhancement" element={<Layout><Enhancement /></Layout>} />
        <Route path="/confirmbooking" element={<Layout><ConfirmBooking /></Layout>} />
        <Route path="/viewmybooking" element={<Layout><ViewMyBooking /></Layout>} />
      </Routes>

      {/* Admin routes */}
      <Routes>
        {/* Login must be above wildcard */}
        <Route path="/admin/login" element={<AdminLayout><AdminLogin /></AdminLayout>} />

        {/* Protected admin routes */}
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="rooms" element={<AdminRooms />} />
                  <Route path="enhancements" element={<AdminEnhancement />} />
                  <Route path="bookings" element={<AdminBookings />} />
                </Routes>
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
