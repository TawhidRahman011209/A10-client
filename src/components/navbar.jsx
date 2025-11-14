import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-extrabold text-green-800">EcoTrack</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>Home</NavLink>
          <NavLink to="/challenges" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>Challenges</NavLink>
          <NavLink to="/my-activities" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>My Activities</NavLink>
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3 relative">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-1 bg-green-600 text-white rounded">Login</Link>
              <Link to="/register" className="px-4 py-1 bg-green-500 text-white rounded">Register</Link>
            </>
          ) : (
            <>
              {/* Avatar + Name */}
              <button 
                onClick={() => setOpenDropdown((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "/src/assets/avatar-placeholder.png"}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full"
                />

                <span className="font-semibold">{user.displayName || user.email}</span>
              </button>

              {/* Dropdown */}
              {openDropdown && (
                <div className="absolute right-0 mt-12 bg-white shadow-lg border rounded-lg w-40 p-2 z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 rounded hover:bg-green-100"
                    onClick={() => setOpenDropdown(false)}
                  >
                    Profile
                  </Link>

                  <button 
                    className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 text-red-600"
                    onClick={onLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/challenges" onClick={() => setIsMenuOpen(false)}>Challenges</Link>
          <Link to="/my-activities" onClick={() => setIsMenuOpen(false)}>My Activities</Link>

          <div className="mt-2">
            {!user ? (
              <>
                <Link to="/login" className="block bg-green-600 text-white py-1 text-center rounded mt-2">Login</Link>
                <Link to="/register" className="block bg-green-500 text-white py-1 text-center rounded mt-2">Register</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="block py-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <button className="block w-full mt-2 bg-red-500 text-white py-1 rounded" onClick={onLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
