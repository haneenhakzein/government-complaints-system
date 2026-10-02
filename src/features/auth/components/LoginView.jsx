import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import useLogin from "../hooks/useLogin";
import "./LoginView.css";

export default function LoginView() {
  const { login, loading, error, success } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch {
      // الرسالة تظهر من الهوك
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />
        <h2 className="login-title">نظام الشكاوى الحكومية</h2>
        <p className="login-subtitle">تسجيل الدخول للوحة التحكم</p>

        {success && <p className="success-text">{success}</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="input-group">
          <label>البريد الإلكتروني</label>
          <div className="input-field">
            <input
              type="email"
              placeholder="admin@gov.sy"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="input-icon" />
          </div>
        </div>

        <div className="input-group">
          <label>كلمة المرور</label>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="input-icon" />
            {showPassword ? (
              <FaEyeSlash className="password-eye" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="password-eye" onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>

        <button className="login-btn" onClick={handleLogin} disabled={loading}>
          {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </div>
    </div>
  );
}
