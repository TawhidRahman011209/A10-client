
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";  
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ? { uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL } : null);
      setLoadingAuth(false);
    });
    return unsub;
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
