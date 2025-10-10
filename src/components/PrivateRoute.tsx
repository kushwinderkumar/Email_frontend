import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("Token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
