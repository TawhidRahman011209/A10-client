import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-2xl font-extrabold text-green-800">EcoTrack</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <NavLink to="/" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>Home</NavLink>
          <NavLink to="/challenges" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>Challenges</NavLink>
          <NavLink to="/my-activities" className={({isActive}) => isActive ? "font-bold text-green-800" : "hover:text-green-700"}>My Activities</NavLink>
        </nav>

        <div className="hidden md:flex gap-3">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-sm bg-green-600 text-white">Login</Link>
              <Link to="/register" className="btn btn-sm bg-green-500 text-white">Register</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <img src={user.photoURL || "/src/assets/avatar-placeholder.png"} alt="avatar" className="w-9 h-9 rounded-full" />
              <div className="text-sm">
                <div className="font-semibold">{user.displayName || user.email}</div>
                <div className="flex gap-2">
                  <Link to="/profile" className="text-xs hover:underline">Profile</Link>
                  <button onClick={onLogout} className="text-xs hover:underline">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/challenges" onClick={() => setIsMenuOpen(false)}>Challenges</Link>
          <Link to="/my-activities" onClick={() => setIsMenuOpen(false)}>My Activities</Link>
          <div className="mt-2">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-sm w-full mb-2">Login</Link>
                <Link to="/register" className="btn btn-sm btn-primary w-full">Register</Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="block">Profile</Link>
                <button onClick={onLogout} className="btn btn-sm w-full mt-2">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
