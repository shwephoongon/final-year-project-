// src/components/Layout.jsx
import React from "react";
import NavigationBar from "../components/NavigationBar";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar on top */}
      <NavigationBar />

      {/* Page content */}
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
