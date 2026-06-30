import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../services/auth.context";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen bg-[#070d1f] flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-[#22c55e] border-t-transparent animate-spin" />
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default GuestRoute;