import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  const profileImage =
    user.photoURL && user.photoURL !== ""
      ? user.photoURL
      : "/src/assets/avatar-placeholder.png";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-300 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg text-center border border-green-100">
        
        <h2 className="text-3xl font-bold text-green-700 mb-6">My Profile</h2>

        
        <img
  src={profileImage}
  alt="Profile"
  referrerPolicy="no-referrer"
  className="w-28 h-28 rounded-full mx-auto border-4 border-green-400 shadow-md object-cover"
/>


        <div className="mt-6 text-lg">
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p className="mt-2"><strong>Email:</strong> {user.email}</p>
        </div>

      </div>
    </div>
  );
}
