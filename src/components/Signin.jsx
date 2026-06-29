import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Setsignupform } from "../redux/fetures/Slice";

const ACCENT = "#CC5327";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ✅ FIX: Added missing handleChange function
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleClose() {
    navigate("/home");
  }

  async function SendSignInData() {
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://brainly-be-r3zm.onrender.com/signin",
        formData
      );

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);

        const userdata = response.data?.user || {};

        dispatch(
          Setsignupform({
            f_name: userdata.f_name || "",
            l_name: userdata.l_name || "",
            email: userdata.email || "",
            password: "",
          })
        );

        console.log("User saved in Redux:", userdata);
      }

      navigate("/home");
    } catch (e) {
      const msg = e?.response?.data?.message;
      setError(msg || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(googleResponse) {
    setError("");
    setGoogleLoading(true);

    try {
      const res = await axios.post(
        "https://brainly-be-r3zm.onrender.com/google-signin",
        {},
        {
          headers: {
            token: googleResponse.credential,
          },
        }
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);

        const userdata = res.data?.user || {};

        dispatch(
          Setsignupform({
            f_name: userdata.f_name || "",
            l_name: userdata.l_name || "",
            email: userdata.email || "",
            password: "",
          })
        );

        console.log("Google User saved in Redux:", userdata);
      }

      navigate("/home");
    } catch (e) {
      const msg = e?.response?.data?.message;
      setError(msg || "Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; }

        .si-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 16px;
          animation: si-fade 0.2s ease;
        }
        @keyframes si-fade { from { opacity: 0 } to { opacity: 1 } }

        .si-modal {
          background: #111;
          border: 0.5px solid #2a2a2a;
          border-radius: 16px;
          width: 100%; max-width: 440px;
          max-height: 92vh;
          overflow-y: auto; overflow-x: hidden;
          padding: 2rem;
          position: relative;
          font-family: 'Inter', sans-serif;
          animation: si-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
          scrollbar-width: none;
        }
        .si-modal::-webkit-scrollbar { display: none; }

        @keyframes si-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .si-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 0.5px solid #2a2a2a;
          background: transparent;
          color: #888;
          font-size: 15px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .si-close:hover { border-color: #444; color: #ccc; }

        .si-label {
          font-size: 11px; font-weight: 500;
          color: #555;
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block; margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }

        .si-input {
          width: 100%;
          padding: 11px 13px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          background: #0d0d0d;
          color: #e0e0e0;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .si-input::placeholder { color: #444; }
        .si-input:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(204,83,39,0.12);
        }

        .si-submit {
          width: 100%; padding: 12px;
          background: ${ACCENT};
          color: #fff;
          border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.15s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .si-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .si-submit:active:not(:disabled) { transform: scale(0.98); opacity: 1; }
        .si-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .si-error {
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.25);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12px; color: #f87171;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 14px;
        }

        @keyframes spin { to { transform: rotate(360deg) } }

        @media (max-width: 380px) {
          .si-modal { padding: 1.5rem 1.25rem; border-radius: 14px; }
        }
      `}</style>

      <div className="si-overlay" onClick={handleClose}>
        <div className="si-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close */}
          <button className="si-close" onClick={handleClose} aria-label="Close">
            <i className="ti ti-x" />
          </button>

          {/* Header */}
          <div style={{ marginBottom: "1.4rem", paddingRight: 40 }}>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
              color: ACCENT, textTransform: "uppercase",
              margin: "0 0 5px", fontFamily: "'Inter', sans-serif",
            }}>
              Welcome back
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.2rem, 4vw, 1.45rem)",
              fontWeight: 700, color: "#e0e0e0", margin: 0, lineHeight: 1.2,
            }}>
              Sign in to your account
            </h2>
          </div>

          {/* Error banner */}
          {error && (
            <div className="si-error">
              <i className="ti ti-alert-circle" style={{ fontSize: 15, flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Google */}
          <div style={{ marginBottom: 16, opacity: googleLoading ? 0.5 : 1, pointerEvents: googleLoading ? "none" : "auto" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google sign-in failed. Please try again.")}
            />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, height: "0.5px", background: "#2a2a2a" }} />
            <span style={{ fontSize: 12, color: "#555", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
              or sign in with email
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "#2a2a2a" }} />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label className="si-label">Email</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-mail" aria-hidden="true" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 15,
                color: "#444", pointerEvents: "none",
              }} />
              <input
                className="si-input"
                placeholder="ada@example.com"
                onChange={handleChange}
                name="email"
                type="email"
                value={formData.email}
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label className="si-label" style={{ margin: 0 }}>Password</label>
              <span
                style={{
                  fontSize: 12, color: ACCENT, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  textDecoration: "underline", textUnderlineOffset: 2,
                }}
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <i className="ti ti-lock" aria-hidden="true" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 15,
                color: "#444", pointerEvents: "none",
              }} />
              <input
                className="si-input"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && SendSignInData()}
                style={{ paddingLeft: 36, paddingRight: 38 }}
              />
              <button
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
                style={{
                  position: "absolute", right: 10, top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", padding: 2,
                  color: "#444", display: "flex", alignItems: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
              >
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 15 }} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button className="si-submit" onClick={SendSignInData} disabled={loading}>
            {loading ? (
              <>
                <i className="ti ti-loader-2" style={{ fontSize: 16, animation: "spin 0.8s linear infinite" }} />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Footer */}
          <p style={{
            fontSize: 12, color: "#555", textAlign: "center",
            margin: "14px 0 0", lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
          }}>
            Don't have an account?{" "}
            <span
              style={{
                color: ACCENT, fontWeight: 600, cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: 2,
              }}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
          <p style={{
            fontSize: 11, color: "#444", textAlign: "center",
            margin: "7px 0 0", lineHeight: 1.5, fontFamily: "'Inter', sans-serif",
          }}>
            By signing in you agree to our{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#555" }}>Terms</span>
            {" "}and{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#555" }}>Privacy Policy</span>
          </p>

        </div>
      </div>
    </>
  );
}
