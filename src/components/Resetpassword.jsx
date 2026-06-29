import { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  X,
  Check,
  LogIn,
  LockKeyhole,
  AlertCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

const ACCENT = "#CC5327";

export default function Resetpassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");

  function handleClose() {
    navigate("/home");
  }

  function handleChange(e) {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleReset() {
    const { email, newPassword, confirmPassword } = formData;

    if (!email || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/reset-password", {
        email,
        newPassword,
        token,
      });
      setDone(true);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function getStrength(pw) {
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Weak", color: "#ef4444", width: "25%" };
    if (score === 2) return { label: "Fair", color: "#f59e0b", width: "50%" };
    if (score === 3) return { label: "Good", color: ACCENT, width: "75%" };
    return { label: "Strong", color: "#4ade80", width: "100%" };
  }

  const strength = getStrength(formData.newPassword);

  const iconStyle = {
    position: "absolute", left: 12, top: "50%",
    transform: "translateY(-50%)", pointerEvents: "none",
  };

  const eyeBtnStyle = {
    position: "absolute", right: 10, top: "50%",
    transform: "translateY(-50%)", background: "none",
    border: "none", cursor: "pointer", padding: 2,
    color: "#444", display: "flex", alignItems: "center",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .rp-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 16px;
          animation: rp-fade 0.2s ease;
        }
        @keyframes rp-fade { from { opacity: 0 } to { opacity: 1 } }

        .rp-modal {
          background: #111;
          border: 0.5px solid #2a2a2a;
          border-radius: 16px;
          width: 100%; max-width: 440px;
          max-height: 92vh;
          overflow-y: auto; overflow-x: hidden;
          padding: 2rem;
          position: relative;
          font-family: 'Inter', sans-serif;
          animation: rp-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
          scrollbar-width: none;
        }
        .rp-modal::-webkit-scrollbar { display: none; }

        @keyframes rp-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .rp-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 0.5px solid #2a2a2a;
          background: transparent;
          color: #888;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
        }
        .rp-close:hover { border-color: #444; color: #ccc; }

        .rp-label {
          font-size: 11px; font-weight: 500;
          color: #555;
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block; margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }

        .rp-input {
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
        .rp-input::placeholder { color: #444; }
        .rp-input:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(204,83,39,0.12);
        }
        .rp-input.rp-field-error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }

        .rp-submit {
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
        .rp-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .rp-submit:active:not(:disabled) { transform: scale(0.98); opacity: 1; }
        .rp-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .rp-error-msg {
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.25);
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 12px; color: #f87171;
          font-family: 'Inter', sans-serif;
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px;
          animation: rp-rise 0.2s ease;
        }

        .rp-success-box {
          text-align: center;
          padding: 8px 0 4px;
          animation: rp-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
        }

        @keyframes spin { to { transform: rotate(360deg) } }

        @media (max-width: 380px) {
          .rp-modal { padding: 1.5rem 1.25rem; border-radius: 14px; }
        }
      `}</style>

      <div className="rp-overlay" onClick={handleClose}>
        <div className="rp-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close */}
          <button className="rp-close" onClick={handleClose} aria-label="Close">
            <X size={15} />
          </button>

          {done ? (
            /* ── Success state ── */
            <div className="rp-success-box">
              <div style={{
                width: 60, height: 60, borderRadius: "50%",
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <Check size={32} color="#4ade80" />
              </div>
              <p style={{
                fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
                color: ACCENT, textTransform: "uppercase",
                margin: "0 0 6px", fontFamily: "'Inter', sans-serif",
              }}>
                All done!
              </p>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
                fontWeight: 700, color: "#e0e0e0",
                margin: "0 0 8px", lineHeight: 1.2,
              }}>
                Password reset successfully
              </h2>
              <p style={{
                fontSize: 13, color: "#555",
                margin: "0 0 24px", lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
              }}>
                Your password has been updated. You can now sign in with your new password.
              </p>
              <button className="rp-submit" onClick={() => navigate("/signin")}>
                <LogIn size={15} />
                Go to sign in
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <>
              {/* Icon badge */}
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(204,83,39,0.1)",
                border: "1px solid rgba(204,83,39,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1rem",
              }}>
                <LockKeyhole size={22} color={ACCENT} />
              </div>

              {/* Header */}
              <div style={{ marginBottom: "1.4rem", paddingRight: 40 }}>
                <p style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
                  color: ACCENT, textTransform: "uppercase",
                  margin: "0 0 5px", fontFamily: "'Inter', sans-serif",
                }}>
                  Set new password
                </p>
                <h2 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "clamp(1.2rem, 4vw, 1.45rem)",
                  fontWeight: 700, color: "#e0e0e0",
                  margin: "0 0 6px", lineHeight: 1.2,
                }}>
                  Reset your password
                </h2>
                <p style={{
                  fontSize: 13, color: "#555",
                  margin: 0, lineHeight: 1.5,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Enter your email and choose a new password below.
                </p>
              </div>

              {/* Error banner */}
              {error && (
                <div className="rp-error-msg">
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  {error}
                </div>
              )}

              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <label className="rp-label">Email address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={15} color="#444" style={iconStyle} />
                  <input
                    className={`rp-input${error && !formData.email ? " rp-field-error" : ""}`}
                    placeholder="ada@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ paddingLeft: 36 }}
                  />
                </div>
              </div>

              {/* New password */}
              <div style={{ marginBottom: 6 }}>
                <label className="rp-label">New password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={15} color="#444" style={iconStyle} />
                  <input
                    className="rp-input"
                    type={showNew ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    style={{ paddingLeft: 36, paddingRight: 38 }}
                  />
                  <button
                    onClick={() => setShowNew((v) => !v)}
                    aria-label="Toggle password visibility"
                    style={eyeBtnStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                  >
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Strength bar */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ height: 3, borderRadius: 99, background: "#2a2a2a", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 99,
                    width: strength ? strength.width : "0%",
                    background: strength ? strength.color : "transparent",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }} />
                </div>
                {strength && (
                  <p style={{
                    fontSize: 11, color: strength.color,
                    margin: "4px 0 0", fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {strength.label}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div style={{ marginBottom: 20 }}>
                <label className="rp-label">Confirm new password</label>
                <div style={{ position: "relative" }}>
                  <Lock size={15} color="#444" style={iconStyle} />
                  <input
                    className={`rp-input${formData.confirmPassword && formData.confirmPassword !== formData.newPassword ? " rp-field-error" : ""}`}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat your password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ paddingLeft: 36, paddingRight: 38 }}
                  />
                  <button
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label="Toggle confirm password visibility"
                    style={eyeBtnStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                  >
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.confirmPassword !== formData.newPassword && (
                  <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0", fontFamily: "'Inter', sans-serif" }}>
                    Passwords don't match
                  </p>
                )}
              </div>

              {/* Submit */}
              <button className="rp-submit" onClick={handleReset} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                    Resetting…
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    Reset password
                  </>
                )}
              </button>

              {/* Footer */}
              <p style={{
                fontSize: 12, color: "#555", textAlign: "center",
                margin: "14px 0 0", lineHeight: 1.6,
                fontFamily: "'Inter', sans-serif",
              }}>
                Remember your password?{" "}
                <span
                  style={{
                    color: ACCENT, fontWeight: 600, cursor: "pointer",
                    textDecoration: "underline", textUnderlineOffset: 2,
                  }}
                  onClick={() => navigate("/signin")}
                >
                  Back to sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}