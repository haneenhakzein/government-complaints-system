import { useNavigate } from "react-router-dom";
import { clearSession } from "@/common/auth/session";
import { AUTH_ROUTES } from "../constants/authRoutes";

export default function useLogout() {
  const navigate = useNavigate();

  const logout = () => {
    clearSession();
    navigate(AUTH_ROUTES.login, { replace: true });
  };

  return { logout };
}
