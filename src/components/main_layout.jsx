import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(
        u
          ? {
              uid: u.uid,
              email: u.email,
              displayName: u.displayName,
              photoURL: u.photoURL,
            }
          : null
      );
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div
      className="flex flex-col min-h-screen text-green-900"
      style={{
        background:
          "linear-gradient(180deg, #d9f99d 0%, #bbf7d0 50%, #a7f3d0 100%)",
      }}
    >
      
      <div className="sticky top-0 z-50 shadow-md">
        <Navbar user={user} onLogout={handleLogout} />
      </div>

      
      <main className="flex-grow px-4 md:px-8 py-6">
        <Outlet />
      </main>

      
      <Footer />
    </div>
  );
}
