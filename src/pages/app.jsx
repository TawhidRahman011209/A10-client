import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import AddChallenge from "./pages/AddChallenge";
import MyActivities from "./pages/MyActivities";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App(){
  return (
    <ErrorBoundary>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/challenges" element={<Challenges/>} />
          <Route path="/challenges/:id" element={<ChallengeDetail/>} />
          <Route path="/challenges/add" element={<AddChallenge/>} />
          <Route path="/my-activities" element={<MyActivities/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </MainLayout>
      <ToastContainer position="top-right" />
    </ErrorBoundary>
  )
}
