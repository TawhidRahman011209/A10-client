
import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
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
      if (u) {
       
        setUser({
          uid: u.uid,
          email: u.email,
          displayName: u.displayName ?? "",
          photoURL: u.photoURL ?? "",
        });
      } else {
        setUser(null);
      }

      setLoadingAuth(false);
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Logged out successfully");
      setUser(null);   
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout,
      loadingAuth,
    }),
    [user, loadingAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
