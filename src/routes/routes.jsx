import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main_layout.jsx";

import Home from "../pages/home.jsx";
import ChallengesList from "../pages/challenges_list.jsx";
import ChallengeDetails from "../pages/challenges_details.jsx";
import AddChallenge from "../pages/add_challenge.jsx";
import JoinChallenge from "../pages/join_challenge.jsx";
import MyActivitiesPage from "../pages/my_activities.jsx";
// import ActivityDetails from "../pages/activity_details.jsx";

import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import ForgotPassword from "../pages/forget_password.jsx";
import NotFound from "../pages/not_found.jsx";
import ProtectedRoute from "../components/protected_route.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "challenges", element: <ChallengesList /> },
      { path: "challenges/:id", element: <ChallengeDetails /> },
      {
        path: "challenges/add",
        element: (
          <ProtectedRoute>
            <AddChallenge />
          </ProtectedRoute>
        )
      },
      {
        path: "challenges/join/:id",
        element: (
          <ProtectedRoute>
            <JoinChallenge />
          </ProtectedRoute>
        )
      },
      // {
      //   path: "my-activities",
      //   element: (
      //     <ProtectedRoute>
      //       <MyActivitiesPage />
      //     </ProtectedRoute>
      //   )
      // },
      {
        path: "my-activities/:id",
        element: (
          <ProtectedRoute>
            {/* <ActivityDetails /> */}
          </ProtectedRoute>
        )
      }
    ]
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "*", element: <NotFound /> }
]);

export default router;
