import { createBrowserRouter, Navigate } from "react-router-dom";

import Chat from "./features/AI/pages/Chat";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/pages/Home";
import Dashboard from "./features/auth/pages/Dashboard";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import GuestRoute from "./features/auth/components/GuestRoute";
import Settings from "./features/auth/pages/Settings";
import About from "./features/auth/pages/About";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <GuestRoute><Register /></GuestRoute> },
  { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "/login", element: <GuestRoute><Login /></GuestRoute> },
  { path: "/about", element: <About /> },
  { path: "/settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: "/chat", element: <ProtectedRoute><Chat /></ProtectedRoute> },
  { path: "*", element: <Navigate to="/" replace /> }, 
  { path: "/forgot-password", element: (  <GuestRoute><ForgotPassword /></GuestRoute>  ),},
  { path: "/reset-password/:token",  element: ( <GuestRoute><ResetPassword /></GuestRoute> ), },
]);