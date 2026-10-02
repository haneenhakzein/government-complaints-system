import { Navigate } from "react-router-dom";
import { getSession } from "@/common/auth/session";
import { AUTH_ROUTES } from "@/features/auth";

export default function GuestRoute({ children }) {
  const { token } = getSession();

  if (token) {
    return <Navigate to={AUTH_ROUTES.complaints} replace />;
  }

  return children;
}
