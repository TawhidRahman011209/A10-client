
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ErrorBoundary from "./components/error_boundary";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Navbar />
        <ErrorBoundary>
          <main className="min-h-[70vh]">
            <AppRoutes />
          </main>
        </ErrorBoundary>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
