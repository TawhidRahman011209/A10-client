import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>

      {/* 🔥 Custom Toaster */}
      <Toaster position="top-right">
        {(t) => (
          <div
            className={`relative overflow-hidden bg-white text-green-800 px-4 py-3 rounded-lg shadow-md ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            {t.message}

            {/* ⏳ Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-progress" />
          </div>
        )}
      </Toaster>

      <RouterProvider router={router} />
    </AuthProvider>
  );
}