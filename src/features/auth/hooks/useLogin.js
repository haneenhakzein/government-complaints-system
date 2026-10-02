import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveSession } from "@/common/auth/session";
import { getApiErrorMessage } from "@/common/utils/apiErrorMessage";
import { loginRequest } from "../services/authService";
import { AUTH_ROUTES } from "../constants/authRoutes";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const login = async (identifier, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const session = await loginRequest({ identifier, password });

      saveSession({
        token: session.token,
        user: session.user,
      });

      setSuccess(session.message);
      navigate(AUTH_ROUTES.complaints);
      return session;
    } catch (err) {
      setError(getApiErrorMessage(err, "حدث خطأ أثناء تسجيل الدخول"));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
}
