import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>

      <header className="p-4 bg-green-600 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">🌱 EcoTrack</h1>
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/my-activities">My Activities</Link>
          <Link to="/challenges/add">Add Challenge</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="p-4 text-center bg-gray-100 mt-8">
        © {new Date().getFullYear()} EcoTrack — Sustainability Matters 🌎
      </footer>

    </div>
  );
}

export default App;