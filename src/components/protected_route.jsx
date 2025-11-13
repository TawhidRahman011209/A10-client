import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const Spinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
