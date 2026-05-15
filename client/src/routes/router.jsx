import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import PlatformLayout from "../layouts/PlatformLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import AddProject from "../pages/AddProject";
import AddBlog from "../pages/AddBlog";
import Blogs from "../pages/Blogs";
import Explore from "../pages/Explore";
import Landing from "../pages/Landing";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import ProjectDetails from "../pages/ProjectDetails";

const router = createBrowserRouter([
  /* ---------------- LANDING ---------------- */
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },

  /* ---------------- PLATFORM ---------------- */
  {
    element: (
      <ProtectedRoute>
        <PlatformLayout />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/explore",
        element: <Explore />,
      },

      {
        path: "/blogs",
        element: <Blogs />,
      },

      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/profile/edit",
        element: <EditProfile />,
      },

      {
        path: "/projects/add",
        element: <AddProject />,
      },

      {
        path: "/blogs/add",
        element: <AddBlog />,
        
      },
      {
  path: "/projects/:id",
  element: <ProjectDetails />,
},
    ],
  },

  /* ---------------- AUTH ---------------- */
  {
    element: <AuthLayout />,

    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },

      {
        path: "/register",
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;