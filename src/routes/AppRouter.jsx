// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layouts/layout";
import HomePage from "../pages/HomePage";
import RoomList from "../pages/RoomList";
import Enhancement from "../pages/Enhancement";
import ConfirmBooking from "../pages/ConfirmBooking";

function AppRouter() {
  return (
    <Router>
      <Layout>
        {" "}
        {/* Wrap once */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/RoomList' element={<RoomList />} />
          <Route path='/Enhancement' element={<Enhancement />} />
          <Route path='/confirmbooking' element={<ConfirmBooking />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
          <Route path='*' element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter;
