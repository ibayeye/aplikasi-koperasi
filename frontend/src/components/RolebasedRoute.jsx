import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RolebasedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // redirect ke dashboard kalau role tidak sesuai
  }

  return children;
}
