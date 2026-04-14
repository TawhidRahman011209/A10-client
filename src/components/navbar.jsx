import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="logo" className="w-9 h-9 rounded-full" />
          <span className="text-xl font-bold text-green-800">EcoTrack</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center font-medium">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/challenges">Challenges</NavLink>
          <NavLink to="/tips">Tips</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/my-activities">My Activities</NavLink>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3 relative">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-1 bg-green-600 text-white rounded">Login</Link>
              <Link to="/register" className="px-4 py-1 bg-green-500 text-white rounded">Register</Link>
            </>
          ) : (
            <>
              <button
                onClick={() => setOpenDropdown(prev => !prev)}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.photoURL || "/src/assets/avatar-placeholder.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.displayName || user.email}</span>
              </button>

              {openDropdown && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-40 p-2 z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-green-100">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ✅ Mobile Right Section */}
        <div className="md:hidden flex items-center gap-3">

          {/* Profile */}
          {user && (
            <Link to="/profile">
              <img
                src={user?.photoURL || "/src/assets/avatar-placeholder.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full border-2 border-white shadow"
              />
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 🔥 Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 🔥 Slide Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-green-700">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>✖</button>
          </div>

          {/* Links */}
          <Link onClick={() => setIsMenuOpen(false)} to="/" className="block py-2">Home</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/challenges" className="block py-2">Challenges</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/tips" className="block py-2">Tips</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/events" className="block py-2">Events</Link>
          <Link onClick={() => setIsMenuOpen(false)} to="/my-activities" className="block py-2">My Activities</Link>

          {/* Auth */}
          <div className="border-t pt-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="block bg-green-600 text-white py-2 rounded text-center"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-green-500 text-white py-2 rounded text-center mt-2"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="w-full bg-red-500 text-white py-2 rounded mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}