import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar bg-gradient-to-r from-green-200 via-green-300 to-green-400 shadow-md px-6 py-3 sticky top-0 z-50">
      
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.png" alt="EcoTrack" className="w-10 h-10 rounded-full shadow-sm" />
          <span className="text-2xl font-extrabold text-green-800">EcoTrack</span>
        </Link>
      </div>

      
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-green-900 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-green-800 font-bold" : "hover:text-green-700"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                isActive ? "text-green-800 font-bold" : "hover:text-green-700"
              }
            >
              Challenges
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/activities"
              className={({ isActive }) =>
                isActive ? "text-green-800 font-bold" : "hover:text-green-700"
              }
            >
              My Activities
            </NavLink>
          </li>
        </ul>
      </div>

      
      <div className="flex gap-2 ml-4">
        <Link to="/login" className="btn btn-sm bg-green-600 hover:bg-green-700 text-white">
          Login
        </Link>
        <Link to="/register" className="btn btn-sm bg-green-500 hover:bg-green-600 text-white">
          Register
        </Link>
      </div>
    </div>
  );
}
