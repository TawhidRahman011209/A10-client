
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

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
      setInitializing(false);
    });
    return unsub;
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const value = {
    user,
    initializing,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
