import { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem("Token");
  if (token) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoute;
