import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import Spinner from "./Spinner";

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
