import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/main_layout.jsx";
import Home from "../pages/home.jsx";
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import NotFound from "../pages/not_found.jsx";
import MyActivitiesPage from "../pages/my_activities.jsx";
import AddChallenge from "../pages/add_challenge.jsx";
import ChallengeDetails from "../pages/challenges_details.jsx";
import ProtectedRoute from "../components/protected_route.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
     
      { index: true, element: <Home /> },
      { path: "challenges/:id", element: <ChallengeDetails /> },

      
      {
        path: "challenges/add",
        element: (
          <ProtectedRoute>
            <AddChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-activities",
        element: (
          <ProtectedRoute>
            <MyActivitiesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

export default router;
