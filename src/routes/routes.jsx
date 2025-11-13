
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home";
import Challenges from "../pages/challenges_list";
import ChallengeDetails from "../pages/challenges_details";
import AddChallenge from "../pages/add_challenge";
import JoinChallenge from "../pages/join_challenge";
import MyActivities from "../pages/my_activities";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forget_password"; 
import NotFound from "../pages/not_found";
import ProtectedRoute from "../components/protected_route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/challenges", element: <Challenges /> },
      { path: "/challenges/:id", element: <ChallengeDetails /> },
      {
        path: "/challenges/add",
        element: (
          <ProtectedRoute>
            <AddChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: "/challenges/join/:id",
        element: (
          <ProtectedRoute>
            <JoinChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-activities",
        element: (
          <ProtectedRoute>
            <MyActivities />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> }, 
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
