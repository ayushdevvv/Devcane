import { createBrowserRouter, Navigate } from "react-router-dom";

import Chat from "./features/assistant/pages/Chat";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/dashboard/pages/Home";
import Dashboard from "./features/dashboard/pages/Dashboard";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import GuestRoute from "./features/auth/components/GuestRoute";
import Settings from "./features/dashboard/pages/Settings";
import About from "./features/dashboard/pages/About";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import ResetPassword from "./features/auth/pages/ResetPassword";
import ResumeUpload from "./features/resumeAnalysis/pages/ResumeUpload";
import ResumeAnalysis from "./features/resumeAnalysis/pages/ResumeAnalysis";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <GuestRoute><Register /></GuestRoute> },
  { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "/login", element: <GuestRoute><Login /></GuestRoute> },
  { path: "/about", element: <About /> },
  { path: "/settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: "/chat", element: <ProtectedRoute><Chat /></ProtectedRoute> },
  { path: "/forgot-password", element: (  <GuestRoute><ForgotPassword /></GuestRoute>  ),},
  { path: "/reset-password/:token",  element: ( <GuestRoute><ResetPassword /></GuestRoute> ), },
  { path:"/resume-analysis",element:<ProtectedRoute><ResumeUpload/></ProtectedRoute>},
  {path:"/resume-analysis/:id",element:<ProtectedRoute><ResumeAnalysis/></ProtectedRoute>},
  { path: "*", element: <Navigate to="/" replace /> }, 
]);