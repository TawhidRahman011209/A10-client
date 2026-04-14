import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./index.css";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>

      <RouterProvider router={router} />

      {/* 🔥 CUSTOM TOAST */}
      <Toaster position="top-right">
        {(t) => (
          <div
            className={`relative overflow-hidden rounded-xl border shadow-lg px-4 py-3 bg-white ${
              t.visible ? "animate-enter" : "animate-leave"
            }`}
          >
            {/* Message */}
            <div className="flex items-center gap-2 font-medium text-green-700">
              {t.type === "success" && "✅"}
              {t.type === "error" && "❌"}
              {t.message}
            </div>

            {/* Progress bar (2s) */}
            <div className="absolute bottom-0 left-0 h-1 bg-green-500 animate-progress" />
          </div>
        )}
      </Toaster>

    </AuthProvider>
  </React.StrictMode>
);