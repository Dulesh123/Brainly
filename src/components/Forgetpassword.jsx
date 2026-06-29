import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ACCENT = "#CC5327";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleClose() {
    navigate("/home");
  }

  async function handleSendLink() {
    if (!email) return;
    setLoading(true);
    try {
      await axios.post("https://brainly-be-r3zm.onrender.com/forgot-password", { email });
      setSent(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; }

        .fp-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 16px;
          animation: fp-fade 0.2s ease;
        }
        @keyframes fp-fade { from { opacity: 0 } to { opacity: 1 } }

        .fp-modal {
          background: #111;
          border: 0.5px solid #2a2a2a;
          border-radius: 16px;
          width: 100%; max-width: 440px;
          max-height: 92vh;
          overflow-y: auto; overflow-x: hidden;
          padding: 2rem;
          position: relative;
          font-family: 'Inter', sans-serif;
          animation: fp-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
          scrollbar-width: none;
        }
        .fp-modal::-webkit-scrollbar { display: none; }

        @keyframes fp-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .fp-close {
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
        .fp-close:hover { border-color: #444; color: #ccc; }

        .fp-label {
          font-size: 11px; font-weight: 500;
          color: #555;
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block; margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }

        .fp-input {
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
        .fp-input::placeholder { color: #444; }
        .fp-input:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(204,83,39,0.12);
        }

        .fp-submit {
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
        .fp-submit:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .fp-submit:active:not(:disabled) { transform: scale(0.98); opacity: 1; }
        .fp-submit:disabled { opacity: 0.5; cursor: not-allowed; }

        .fp-success-box {
          background: rgba(22,163,74,0.08);
          border: 1px solid rgba(22,163,74,0.2);
          border-radius: 12px;
          padding: 14px;
          display: flex; gap: 12px; align-items: flex-start;
          margin-bottom: 20px;
          animation: fp-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
        }

        @keyframes spin { to { transform: rotate(360deg) } }

        @media (max-width: 380px) {
          .fp-modal { padding: 1.5rem 1.25rem; border-radius: 14px; }
        }
      `}</style>

      <div className="fp-overlay" onClick={handleClose}>
        <div className="fp-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close */}
          <button className="fp-close" onClick={handleClose} aria-label="Close">
            <i className="ti ti-x" />
          </button>

          {/* Icon badge */}
          <div style={{
            width: 44, height: 44,
            borderRadius: 12,
            background: "rgba(204,83,39,0.1)",
            border: "1px solid rgba(204,83,39,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: "1rem",
          }}>
            <i className="ti ti-lock-open" style={{ fontSize: 22, color: ACCENT }} />
          </div>

          {/* Header */}
          <div style={{ marginBottom: "1.4rem", paddingRight: 40 }}>
            <p style={{
              fontSize: 11, fontWeight: 500,
              letterSpacing: "0.1em", color: ACCENT,
              textTransform: "uppercase", margin: "0 0 5px",
              fontFamily: "'Inter', sans-serif",
            }}>
              Password recovery
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.2rem, 4vw, 1.45rem)",
              fontWeight: 700, color: "#e0e0e0",
              margin: "0 0 6px", lineHeight: 1.2,
            }}>
              Forgot your password?
            </h2>
            <p style={{
              fontSize: 13, color: "#555",
              margin: 0, lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif",
            }}>
              No worries — enter your email and we'll send you a reset link.
            </p>
          </div>

          {/* Success state */}
          {sent && (
            <div className="fp-success-box">
              <i className="ti ti-circle-check-filled" style={{ fontSize: 20, color: "#4ade80", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#4ade80", fontFamily: "'Inter', sans-serif" }}>
                  Reset link sent!
                </p>
                <p style={{ margin: 0, fontSize: 12, color: "#86efac", fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
                  Check your inbox at <strong style={{ color: "#4ade80" }}>{email}</strong>. The link expires in 5 minutes.
                </p>
              </div>
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: 20 }}>
            <label className="fp-label">Email address</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-mail" aria-hidden="true" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 15, color: "#444", pointerEvents: "none",
              }} />
              <input
                className="fp-input"
                placeholder="ada@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendLink()}
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Submit */}
          <button className="fp-submit" onClick={handleSendLink} disabled={loading || !email}>
            {loading ? (
              <>
                <i className="ti ti-loader-2" style={{ fontSize: 16, animation: "spin 0.8s linear infinite" }} />
                Sending…
              </>
            ) : (
              <>
                <i className="ti ti-send" style={{ fontSize: 15 }} />
                {sent ? "Resend link" : "Send reset link"}
              </>
            )}
          </button>

          {/* Footer */}
          <p style={{
            fontSize: 12, color: "#555",
            textAlign: "center", margin: "14px 0 0",
            lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
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

        </div>
      </div>
    </>
  );
}