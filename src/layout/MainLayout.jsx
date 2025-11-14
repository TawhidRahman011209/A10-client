import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- ADD THIS

const MainLayout = () => {
  const { user, logout } = useAuth(); // <-- GET USER + LOGOUT

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-green-300 text-gray-900">
      <Navbar user={user} onLogout={logout} />   {/* <-- PASS TO NAVBAR */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
