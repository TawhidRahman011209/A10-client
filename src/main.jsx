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
      
      <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </React.StrictMode>
);
