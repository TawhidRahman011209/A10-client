import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? { name: u.displayName, email: u.email, photo: u.photoURL } : null);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar bg-gradient-to-r from-green-200 via-green-300 to-green-400 shadow-md px-6 py-3 sticky top-0 z-50">
   
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/logo.png"
            alt="EcoTrack"
            className="w-10 h-10 rounded-full shadow-sm"
          />
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
              to="/my-activities"
              className={({ isActive }) =>
                isActive ? "text-green-800 font-bold" : "hover:text-green-700"
              }
            >
              My Activities
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3 ml-4">
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {user.photo && (
                <img
                  src={user.photo}
                  alt="user"
                  className="w-8 h-8 rounded-full border border-green-700 shadow-sm"
                />
              )}
              <span className="text-green-900 font-medium">
                {user.name || user.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm bg-green-600 hover:bg-green-700 text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
