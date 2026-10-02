import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "@/common/auth/session";
import { AUTH_ROUTES } from "@/features/auth";

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const { token, user } = getSession();

  if (!token) {
    return <Navigate to={AUTH_ROUTES.login} state={{ from: location }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to={AUTH_ROUTES.complaints} replace />;
  }

  return children;
}
