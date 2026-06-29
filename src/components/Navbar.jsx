import BrainLogo from "../assets/Brainlogo";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetItem } from "../redux/fetures/Slice";

export default function Navbar() {
  const navItems = ["Home", "Dashboard", "Profile"];
  const [hovered, setHovered] = useState(null);
 
  const [signInHover, setSignInHover] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useSelector((state) => state.app.item.type);
  const dispatch=useDispatch();
  const token=localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .sb-nav {
          height: 76px;
          padding: 0 48px;
          font-family: 'Inter', sans-serif;
        }
        .sb-center {
          display: flex;
        }
        .sb-hamburger {
          display: none;
        }
        .sb-logo-name {
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: white;
          white-space: nowrap;
          user-select: none;
        }

        .sb-mobile-panel {
          display: none;
          flex-direction: column;
          gap: 8px;
          padding: 16px 24px 24px;
          background: rgba(10,10,10,0.98);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
          font-family: 'Inter', sans-serif;
          position: fixed;
          top: 76px;
          left: 0;
          right: 0;
          z-index: 999;
        }
        .sb-mobile-panel.open {
          display: flex;
        }
        .sb-mobile-navlink {
          border: none;
          outline: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          padding: 13px 18px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-align: left;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .sb-mobile-navlink:focus-visible {
          outline: 2px solid #CC5327;
          outline-offset: 2px;
        }
        .sb-mobile-signin {
          margin-top: 6px;
          padding: 13px 18px;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
          cursor: pointer;
          border: 1px solid #CC5327;
          background-color: #CC5327;
          color: white;
          text-align: center;
          transition: opacity 0.2s ease;
        }
        .sb-mobile-signin:hover { opacity: 0.88; }

        @media (max-width: 860px) {
          .sb-nav { padding: 0 24px; }
          .sb-center { display: none; }
          .sb-hamburger { display: flex !important; }
          .sb-mobile-panel { top: 76px; }
        }

        @media (max-width: 480px) {
          .sb-nav { height: 64px; padding: 0 16px; }
          .sb-logo-name { font-size: 20px; }
          .sb-signin { display: none; }
          .sb-mobile-panel { top: 64px; }
        }

        .sb-navlink {
          border: none;
          outline: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.02em;
          transition: color 0.25s ease, background-color 0.25s ease, transform 0.15s ease;
        }
        .sb-navlink:focus-visible,
        .sb-signin:focus-visible,
        .sb-hamburger:focus-visible {
          outline: 2px solid #CC5327;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .sb-navlink, .sb-signin, .sb-hamburger span {
            transition: none !important;
          }
        }
        #signIn {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: -0.02em;
          font-family: 'Inter', sans-serif;
          padding: 11px 28px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background-color: transparent;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transform: translateY(0);
          box-shadow: none;
          transition: all 0.25s ease;
        }
        #signIn:hover {
          border: 1px solid #CC5327;
          background-color: #CC5327;
          transform: translateY(-2px);
          box-shadow: 0px 8px 24px rgba(204, 83, 39, 0.35);
        }
          #nav{
          margin-right:70px
          }
      `}</style>

      {/* ── Navbar — position:fixed so it never moves ── */}
      <nav
        className="sb-nav"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(12px)",
          backgroundColor: "black",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          flexShrink: 0,
        }}
      >
        {/* ── Logo ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <div style={{ display: "flex", alignItems: "center", width: 38, height: 38 }}>
            <BrainLogo width={38} height={38} />
          </div>
          <span className="sb-logo-name">
            Brain<span style={{ color: "#CC5327" }}>Vault</span>
          </span>
        </div>

        {/* ── Center Nav (desktop) ── */}
        <div
          className="sb-center"
          id="nav"
          style={{
            gap: "4px",
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: "999px",
            padding: "5px",
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        >
         {navItems.map((item) => {
  const isActive = active === item;
  const isHovered = hovered === item;
  return (
    <button
      key={item}
      className="sb-navlink"
      onMouseEnter={() => setHovered(item)}
      onMouseLeave={() => setHovered(null)}
      onClick={() => {
        dispatch(SetItem(item));         // ← sets active in Redux
        navigate(`/${item.toLowerCase()}`);
      }}
      style={{
        padding: "10px 26px",
        borderRadius: "999px",
        color: isActive ? "#0A0A0A" : isHovered ? "white" : "#888",
        backgroundColor: isActive
          ? "#fff"
          : isHovered
          ? "rgba(255,255,255,0.07)"
          : "transparent",
        transform: isHovered && !isActive ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {item}
    </button>
            );
          })}
        </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        {active === "Dashboard" ? (
  <button
    id="signIn"
    className="sb-signin"
    onMouseEnter={() => setSignInHover(true)}
    onMouseLeave={() => setSignInHover(false)}
    onClick={() => navigate("/typeselect")}
  >
    Add Content
  </button>
) : token ? (
  <button
    id="signIn"
    className="sb-signin"
    onMouseEnter={() => setSignInHover(true)}
    onMouseLeave={() => setSignInHover(false)}
    onClick={() => {
      localStorage.removeItem("token");
      navigate("/signin");
    }}
  >
    Sign Out
  </button>
) : (
  <button
    id="signIn"
    className="sb-signin"
    onMouseEnter={() => setSignInHover(true)}
    onMouseLeave={() => setSignInHover(false)}
    onClick={() => navigate("/signin")}
  >
    Sign In
  </button>
)}
          {/* Hamburger */}
          <button
            className="sb-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "40px",
              height: "40px",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.03)",
              cursor: "pointer",
            }}
          >
            <span style={{
              width: "17px", height: "1.5px", backgroundColor: "white",
              transition: "transform 0.25s ease",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }} />
            <span style={{
              width: "17px", height: "1.5px", backgroundColor: "white",
              transition: "opacity 0.2s ease",
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              width: "17px", height: "1.5px", backgroundColor: "white",
              transition: "transform 0.25s ease",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown ── */}
      <div className={`sb-mobile-panel${menuOpen ? " open" : ""}`}>
        {navItems.map((item) => {
          const isActive = active === item;
          return (
            <button
              key={item}
              className="sb-mobile-navlink"
              onClick={() => {
                setActive(item);
                navigate(`/${item.toLowerCase()}`);
                setMenuOpen(false);
              }}
              style={{
                color: isActive ? "#CC5327" : "rgba(255,255,255,0.85)",
                backgroundColor: isActive ? "rgba(204,83,39,0.12)" : "transparent",
              }}
            >
              {item}
            </button>
          );
        })}
        <button className="sb-mobile-signin" onClick={() => setMenuOpen(false)}>
          Sign In
        </button>
      </div>
    </>
  );
}