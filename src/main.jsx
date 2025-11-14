import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";   // ⭐ IMPORT AUTH PROVIDER

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>                                       {/* ⭐ WRAP APP HERE */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
