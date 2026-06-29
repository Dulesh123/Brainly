
// import { useState } from "react";
// import axios from "axios";
// import { GoogleLogin } from "@react-oauth/google";
// import { useDispatch, useSelector } from "react-redux";
// import { Setsignupform } from "../redux/fetures/Slice";
// import { useNavigate } from "react-router-dom";


// export default function Signup() {
// const signupForm = useSelector(
//   (state) => state.app.signupform
// );
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     f_name: "",
//     l_name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   function handleClose() {
//     navigate("/home");
//   }

//   async function SendSignUpData() {
//     try {
     
//       const response = await axios.post("http://localhost:3000/signup", formData);
//       if (response.status === 201) {
//         alert("Account created successfully!");
//         navigate("/dashboard");
//           dispatch(Setsignupform(formData));
//       }
//     } catch (error) {
//       if (error.response?.status === 409) {
//         alert("An account with this email already exists. Please sign in.");
//         navigate("/signin");
//       } else {
//         alert("Something went wrong. Please try again.");
//       }
//     }
//   }

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   }

//   function getStrength(val) {
//     let score = 0;
//     if (val.length >= 8) score++;
//     if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
//     if (/[^A-Za-z0-9]/.test(val)) score++;
//     return score;
//   }

//   const score = formData.password ? getStrength(formData.password) : 0;
//   const strengthColors = ["#E24B4A", "#EF9F27", "#1D9E75"];
//   const strengthLabels = ["Weak", "Fair", "Strong"];
//   const barColor = formData.password
//     ? strengthColors[score - 1] || strengthColors[0]
//     : "#e5e7eb";

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//         @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

//         *, *::before, *::after { box-sizing: border-box; }

//         .su-overlay {
//           position: fixed; inset: 0;
//           background: rgba(0,0,0,0.5);
//           backdrop-filter: blur(6px);
//           -webkit-backdrop-filter: blur(6px);
//           display: flex; align-items: center; justify-content: center;
//           z-index: 9999; padding: 16px;
//           animation: su-fade 0.2s ease;
//         }
//         @keyframes su-fade { from { opacity: 0 } to { opacity: 1 } }

//         .su-modal {
//           background: #f3f4f6;
//           border: 1px solid #e5e7eb;
//           border-radius: 20px;
//           width: 100%; max-width: 440px;
//           max-height: 92vh;
//           overflow-y: auto; overflow-x: hidden;
//           padding: 2rem 1.75rem;
//           position: relative;
//           box-shadow: 0 24px 64px rgba(0,0,0,0.14);
//           font-family: 'Inter', sans-serif;
//           animation: su-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
//           scrollbar-width: none;
//         }
//         .su-modal::-webkit-scrollbar { display: none; }

//         @keyframes su-rise {
//           from { opacity: 0; transform: translateY(20px) scale(0.97) }
//           to   { opacity: 1; transform: translateY(0)    scale(1)    }
//         }

//         .su-close {
//           position: absolute; top: 14px; right: 14px;
//           width: 30px; height: 30px;
//           border-radius: 8px;
//           border: 1px solid #e5e7eb;
//           background: white;
//           color: #9ca3af;
//           font-size: 15px;
//           display: flex; align-items: center; justify-content: center;
//           cursor: pointer;
//           transition: background 0.2s, color 0.2s, border-color 0.2s;
//         }
//         .su-close:hover { background: #f9fafb; border-color: #d1d5db; color: #374151; }

//         .su-label {
//           font-size: 11px; font-weight: 600;
//           color: #6b7280;
//           letter-spacing: 0.07em; text-transform: uppercase;
//           display: block; margin-bottom: 5px;
//           font-family: 'Inter', sans-serif;
//         }

//         .su-input {
//           width: 100%;
//           padding: 10px 12px;
//           font-size: 14px;
//           font-family: 'Inter', sans-serif;
//           border: 1px solid #e5e7eb;
//           border-radius: 9px;
//           background: white;
//           color: #111827;
//           outline: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .su-input::placeholder { color: #9ca3af; }
//         .su-input:focus { border-color: #CC5327; box-shadow: 0 0 0 3px rgba(204,83,39,0.1); }

//         .su-submit {
//           width: 100%; padding: 12px;
//           background: #CC5327;
//           color: white;
//           border: none; border-radius: 10px;
//           font-family: 'Inter', sans-serif;
//           font-size: 14px; font-weight: 600;
//           cursor: pointer; letter-spacing: 0.02em;
//           transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
//           box-shadow: 0 4px 14px rgba(204,83,39,0.3);
//         }
//         .su-submit:hover { background: #b84820; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(204,83,39,0.4); }
//         .su-submit:active { transform: translateY(0); }

//         .su-name-row { display: flex; gap: 10px; margin-bottom: 14px; }

//         @media (max-width: 380px) {
//           .su-name-row { flex-direction: column; gap: 14px; }
//           .su-modal { padding: 1.5rem 1.25rem; border-radius: 16px; }
//         }
//       `}</style>

//       <div className="su-overlay" onClick={handleClose}>
//         <div className="su-modal" onClick={(e) => e.stopPropagation()}>

//           {/* Close */}
//           <button className="su-close" onClick={handleClose} aria-label="Close">
//             <i className="ti ti-x" />
//           </button>

//           {/* Header */}
//           <div style={{ marginBottom: "1.4rem", paddingRight: 40 }}>
//             <p style={{
//               fontSize: 11, fontWeight: 600, letterSpacing: "0.12em",
//               color: "#CC5327", textTransform: "uppercase",
//               margin: "0 0 5px", fontFamily: "'Inter', sans-serif",
//             }}>
//               Get started — it's free
//             </p>
//             <h2 style={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
//               fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.2,
//             }}>
//               Create your account
//             </h2>
//           </div>

//           {/* Google */}
//           <div style={{ marginBottom: 18 }}>
//             <GoogleLogin
//               onSuccess={async (response) => {
//                 try {
//                   const res = await axios.post(
//                     "http://localhost:3000/google-signup",
//                     {},
//                     { headers: { token: response.credential } }
//                   );
//                   if (res.status === 201) {
//                     // New user — go to dashboard
//                     navigate("/dashboard");
//                   }
//                 } catch (error) {
//                   if (error.response?.status === 409) {
//                     // Already has an account — send to signin
//                     alert(error.response.data.message);
//                     navigate("/signin");
//                   } else {
//                     alert("Something went wrong. Please try again.");
//                   }
//                 }
//               }}
//               onError={() => alert("Google login failed. Please try again.")}
//             />
//           </div>

//           {/* Divider */}
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
//             <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
//             <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
//               or sign up with email
//             </span>
//             <div style={{ flex: 1, height: "0.5px", background: "#e5e7eb" }} />
//           </div>

//           {/* Name Row */}
//           <div className="su-name-row">
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <label className="su-label">First name</label>
//               <input className="su-input" name="f_name" onChange={handleChange} placeholder="Ada" />
//             </div>
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <label className="su-label">Last name</label>
//               <input className="su-input" name="l_name" onChange={handleChange} placeholder="Lovelace" />
//             </div>
//           </div>

//           {/* Email */}
//           <div style={{ marginBottom: 14 }}>
//             <label className="su-label">Email</label>
//             <div style={{ position: "relative" }}>
//               <i className="ti ti-mail" aria-hidden="true" style={{
//                 position: "absolute", left: 11, top: "50%",
//                 transform: "translateY(-50%)", fontSize: 15,
//                 color: "#9ca3af", pointerEvents: "none",
//               }} />
//               <input
//                 className="su-input" placeholder="ada@example.com"
//                 onChange={handleChange} name="email" type="email"
//                 style={{ paddingLeft: 34 }}
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div style={{ marginBottom: 8 }}>
//             <label className="su-label">Password</label>
//             <div style={{ position: "relative" }}>
//               <i className="ti ti-lock" aria-hidden="true" style={{
//                 position: "absolute", left: 11, top: "50%",
//                 transform: "translateY(-50%)", fontSize: 15,
//                 color: "#9ca3af", pointerEvents: "none",
//               }} />
//               <input
//                 className="su-input"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="8+ characters"
//                 value={formData.password}
//                 name="password"
//                 onChange={handleChange}
//                 style={{ paddingLeft: 34, paddingRight: 38 }}
//               />
//               <button
//                 onClick={() => setShowPassword((v) => !v)}
//                 aria-label="Toggle password visibility"
//                 style={{
//                   position: "absolute", right: 10, top: "50%",
//                   transform: "translateY(-50%)", background: "none",
//                   border: "none", cursor: "pointer", padding: 2,
//                   color: "#9ca3af", display: "flex", alignItems: "center",
//                 }}
//               >
//                 <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 15 }} />
//               </button>
//             </div>
//           </div>

//           {/* Strength Meter */}
//           <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
//             {[1, 2, 3].map((n) => (
//               <div key={n} style={{
//                 height: 3, flex: 1, borderRadius: 4,
//                 background: formData.password && score >= n ? barColor : "#e5e7eb",
//                 transition: "background 0.3s",
//               }} />
//             ))}
//             <span style={{
//               fontSize: 11, color: barColor, minWidth: 38,
//               textAlign: "right", fontFamily: "'Inter', sans-serif",
//               transition: "color 0.3s",
//             }}>
//               {formData.password ? strengthLabels[score - 1] || "" : ""}
//             </span>
//           </div>

//           {/* Submit */}
//           <button className="su-submit" onClick={SendSignUpData}>
//             Create account
//           </button>

//           {/* Footer */}
//           <p style={{
//             fontSize: 12, color: "#6b7280", textAlign: "center",
//             margin: "14px 0 0", lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
//           }}>
//             Already have an account?{" "}
//             <span
//               style={{
//                 color: "#CC5327", fontWeight: 600, cursor: "pointer",
//                 textDecoration: "underline", textUnderlineOffset: 2,
//               }}
//               onClick={() => navigate("/signin")}
//             >
//               Sign in
//             </span>
//           </p>
//           <p style={{
//             fontSize: 11, color: "#9ca3af", textAlign: "center",
//             margin: "7px 0 0", lineHeight: 1.5, fontFamily: "'Inter', sans-serif",
//           }}>
//             By signing up you agree to our{" "}
//             <span style={{ textDecoration: "underline", cursor: "pointer", color: "#6b7280" }}>Terms</span>
//             {" "}and{" "}
//             <span style={{ textDecoration: "underline", cursor: "pointer", color: "#6b7280" }}>Privacy Policy</span>
//           </p>

//         </div>
//       </div>
//     </>
//   );
// }




















import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { Setsignupform } from "../redux/fetures/Slice";
import { useNavigate } from "react-router-dom";

const ACCENT = "#CC5327";

export default function Signup() {
  const signupForm = useSelector((state) => state.app.signupform);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleClose() {
    navigate("/home");
  }

  async function SendSignUpData() {
    try {
      const response = await axios.post("http://localhost:3000/signup", formData);
      if (response.status === 201) {
        alert("Account created successfully!");
        navigate("/dashboard");
        dispatch(Setsignupform(formData));
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("An account with this email already exists. Please sign in.");
        navigate("/signin");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function getStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  }

  const score = formData.password ? getStrength(formData.password) : 0;
  const strengthColors = ["#E24B4A", "#EF9F27", ACCENT];
  const strengthLabels = ["Weak", "Fair", "Strong"];
  const barColor = formData.password
    ? strengthColors[score - 1] || strengthColors[0]
    : "#2a2a2a";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css');

        *, *::before, *::after { box-sizing: border-box; }

        .su-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 16px;
          animation: su-fade 0.2s ease;
        }
        @keyframes su-fade { from { opacity: 0 } to { opacity: 1 } }

        .su-modal {
          background: #111;
          border: 0.5px solid #2a2a2a;
          border-radius: 16px;
          width: 100%; max-width: 440px;
          max-height: 92vh;
          overflow-y: auto; overflow-x: hidden;
          padding: 2rem;
          position: relative;
          font-family: 'Inter', sans-serif;
          animation: su-rise 0.3s cubic-bezier(0.34,1.36,0.64,1);
          scrollbar-width: none;
        }
        .su-modal::-webkit-scrollbar { display: none; }

        @keyframes su-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }

        .su-close {
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
        .su-close:hover { border-color: #444; color: #ccc; }

        .su-label {
          font-size: 11px; font-weight: 500;
          color: #555;
          letter-spacing: 0.08em; text-transform: uppercase;
          display: block; margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
        }

        .su-input {
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
        .su-input::placeholder { color: #444; }
        .su-input:focus {
          border-color: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(204,83,39,0.12);
        }

        .su-google-btn {
          width: 100%;
          padding: 11px 16px;
          border: 1px solid #2a2a2a;
          border-radius: 10px;
          background: #0d0d0d;
          color: #e0e0e0;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: border-color 0.2s, background 0.2s;
          margin-bottom: 18px;
        }
        .su-google-btn:hover { border-color: #444; background: #161616; }

        .su-submit {
          width: 100%; padding: 12px;
          background: ${ACCENT};
          color: #fff;
          border: none; border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px; font-weight: 600;
          cursor: pointer; letter-spacing: 0.03em;
          transition: opacity 0.2s, transform 0.15s;
        }
        .su-submit:hover { opacity: 0.88; transform: translateY(-1px); }
        .su-submit:active { transform: scale(0.98); opacity: 1; }

        .su-name-row { display: flex; gap: 10px; margin-bottom: 14px; }

        @media (max-width: 380px) {
          .su-name-row { flex-direction: column; gap: 14px; }
          .su-modal { padding: 1.5rem 1.25rem; border-radius: 14px; }
        }
      `}</style>

      <div className="su-overlay" onClick={handleClose}>
        <div className="su-modal" onClick={(e) => e.stopPropagation()}>

          {/* Close */}
          <button className="su-close" onClick={handleClose} aria-label="Close">
            <i className="ti ti-x" />
          </button>

          {/* Header */}
          <div style={{ marginBottom: "1.4rem", paddingRight: 40 }}>
            <p style={{
              fontSize: 11, fontWeight: 500, letterSpacing: "0.1em",
              color: ACCENT, textTransform: "uppercase",
              margin: "0 0 5px", fontFamily: "'Inter', sans-serif",
            }}>
              Get started — it's free
            </p>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(1.2rem, 4vw, 1.45rem)",
              fontWeight: 700, color: "#e0e0e0", margin: 0, lineHeight: 1.2,
            }}>
              Create your account
            </h2>
          </div>

          {/* Google */}
          <div style={{ marginBottom: 0 }}>
            <GoogleLogin
              onSuccess={async (response) => {
                try {
                  const res = await axios.post(
                    "http://localhost:3000/google-signup",
                    {},
                    { headers: { token: response.credential } }
                  );
                  if (res.status === 201) {
                    navigate("/dashboard");
                  }
                } catch (error) {
                  if (error.response?.status === 409) {
                    alert(error.response.data.message);
                    navigate("/signin");
                  } else {
                    alert("Something went wrong. Please try again.");
                  }
                }
              }}
              onError={() => alert("Google login failed. Please try again.")}
            />
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
            <div style={{ flex: 1, height: "0.5px", background: "#2a2a2a" }} />
            <span style={{ fontSize: 12, color: "#555", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>
              or sign up with email
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "#2a2a2a" }} />
          </div>

          {/* Name Row */}
          <div className="su-name-row">
            <div style={{ flex: 1, minWidth: 0 }}>
              <label className="su-label">First name</label>
              <input className="su-input" name="f_name" onChange={handleChange} placeholder="Ada" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <label className="su-label">Last name</label>
              <input className="su-input" name="l_name" onChange={handleChange} placeholder="Lovelace" />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <label className="su-label">Email</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-mail" aria-hidden="true" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 15,
                color: "#444", pointerEvents: "none",
              }} />
              <input
                className="su-input"
                placeholder="ada@example.com"
                onChange={handleChange}
                name="email"
                type="email"
                style={{ paddingLeft: 36 }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 8 }}>
            <label className="su-label">Password</label>
            <div style={{ position: "relative" }}>
              <i className="ti ti-lock" aria-hidden="true" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 15,
                color: "#444", pointerEvents: "none",
              }} />
              <input
                className="su-input"
                type={showPassword ? "text" : "password"}
                placeholder="8+ characters"
                value={formData.password}
                name="password"
                onChange={handleChange}
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

          {/* Strength Meter */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={{
                height: 3, flex: 1, borderRadius: 4,
                background: formData.password && score >= n ? barColor : "#2a2a2a",
                transition: "background 0.3s",
              }} />
            ))}
            <span style={{
              fontSize: 11, color: barColor, minWidth: 38,
              textAlign: "right", fontFamily: "'Inter', sans-serif",
              transition: "color 0.3s",
            }}>
              {formData.password ? strengthLabels[score - 1] || "" : ""}
            </span>
          </div>

          {/* Submit */}
          <button className="su-submit" onClick={SendSignUpData}>
            Create account
          </button>

          {/* Footer */}
          <p style={{
            fontSize: 12, color: "#555", textAlign: "center",
            margin: "14px 0 0", lineHeight: 1.6, fontFamily: "'Inter', sans-serif",
          }}>
            Already have an account?{" "}
            <span
              style={{
                color: ACCENT, fontWeight: 600, cursor: "pointer",
                textDecoration: "underline", textUnderlineOffset: 2,
              }}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
          <p style={{
            fontSize: 11, color: "#444", textAlign: "center",
            margin: "7px 0 0", lineHeight: 1.5, fontFamily: "'Inter', sans-serif",
          }}>
            By signing up you agree to our{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#555" }}>Terms</span>
            {" "}and{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", color: "#555" }}>Privacy Policy</span>
          </p>

        </div>
      </div>
    </>
  );
}