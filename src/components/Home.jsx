import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetItem } from "../redux/fetures/Slice";

export default function Home() {
    const navigate=useNavigate();
      const dispatch=useDispatch();
  dispatch(SetItem("Home"));
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #08080a;
          color: #E8E4DF;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* KEYFRAMES */
        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(16px); }
          15%  { opacity: 1; transform: translateY(0); }
          80%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }

        @keyframes typing {
          0%   { width: 0; }
          40%  { width: 100%; }
          80%  { width: 100%; }
          100% { width: 0; }
        }

        @keyframes blink {
          0%, 100% { border-color: #CC5327; }
          50%       { border-color: transparent; }
        }

        @keyframes badgePop {
          0%   { opacity: 0; transform: scale(0.7); }
          10%  { opacity: 1; transform: scale(1.08); }
          18%  { transform: scale(1); }
          78%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.7); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,83,39,0); }
          50%       { box-shadow: 0 0 0 4px rgba(204,83,39,0.15); }
        }

        @keyframes countPop {
          0%   { opacity: 0; transform: scale(0.7); }
          12%  { opacity: 1; transform: scale(1.1); }
          20%  { transform: scale(1); }
          78%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* LAYOUT */
        .hero-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          padding: 56px;
          gap: 64px;
          align-items: center;
        }

        /* LEFT */
        .tag {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #CC5327;
          font-weight: 500;
          margin-bottom: 28px;
        }

        h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 4.2rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #E8E4DF;
          margin-bottom: 24px;
          max-width: 540px;
        }
        h1 i { color: #CC5327; font-style: italic; }

        .sub {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #56535a;
          max-width: 360px;
          margin-bottom: 40px;
        }

        .actions { display: flex; align-items:center; gap: 18px; }

        .btn {
          background: #CC5327; color: #fff; border: none;
          padding: 11px 22px; border-radius: 8px;
          font-size: 0.86rem; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; letter-spacing: 0.01em;
          transition: opacity 0.18s, transform 0.18s;
          
        }
        .btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .ghost {
          font-size: 0.83rem; color: #3d3a42; cursor: pointer;
          border: none; background: none;
          font-family: 'DM Sans', sans-serif; transition: color 0.18s;
        }
        .ghost:hover { color: #E8E4DF; }

        .chips { display: flex; gap: 9px; margin-top: 56px; flex-wrap: wrap; }
        .chip {
          font-size: 0.7rem; letter-spacing: 0.06em;
          text-transform: uppercase; color: #2e2c33;
          padding: 5px 13px; border: 1px solid #1c1a22;
          border-radius: 999px; font-weight: 500;
        }

        /* RIGHT */
        .right { display: flex; flex-direction: column; gap: 12px; }

        .vault-label {
          font-size: 0.65rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: #2e2c33;
          font-weight: 500; margin-bottom: 6px;
        }

        /* Total loop duration = 5s. Each card delay staggers within that. */

        .search-row {
          display: flex; align-items: center; gap: 10px;
          background: #111013; border: 1px solid #1e1c24;
          border-radius: 10px; padding: 10px 14px; margin-bottom: 4px;
          opacity: 0;
          animation: fadeUp 5s ease infinite;
          animation-delay: 0s;
        }
        .search-row i { color: #3a3840; font-size: 15px; }

        .search-text {
          font-size: 0.82rem; color: #56535a;
          flex: 1; display: flex; align-items: center; gap: 4px;
        }

        .typed-query {
          display: inline-block;
          overflow: hidden; white-space: nowrap;
          color: #E8E4DF;
          border-right: 2px solid #CC5327;
          width: 0;
          animation:
            typing 5s steps(12, end) infinite,
            blink  0.65s step-end infinite;
        }

        .search-count {
          font-size: 0.7rem; color: #CC5327; font-weight: 500;
          background: #1f0e07; border-radius: 999px;
          padding: 2px 9px; border: 1px solid #3a1a0c;
          opacity: 0;
          animation: countPop 5s ease infinite;
          animation-delay: 0.8s;
        }

        /* Cards stagger in, each 5s loop offset by delay */
        .file-card {
          background: #111013; border: 1px solid #1e1c24;
          border-radius: 12px; padding: 14px 18px;
          display: flex; align-items: center; gap: 14px;
          transition: border-color 0.2s;
          cursor: default;
          opacity: 0;
          animation: fadeUp 5s ease infinite;
        }
        .file-card:hover { border-color: #2e2b38; }

        .file-card.active {
          border-color: transparent;
          animation: fadeUp 5s ease infinite, pulse 1.2s ease infinite;
          animation-delay: 1.0s, 1.0s;
        }

        .file-card:nth-child(3) { animation-delay: 1.0s; }
        .file-card:nth-child(4) { animation-delay: 1.4s; }
        .file-card:nth-child(5) { animation-delay: 1.8s; }
        .file-card:nth-child(6) { animation-delay: 2.2s; }

        .icon-wrap {
          width: 36px; height: 36px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 16px;
        }
        .icon-pdf  { background: #1f0e07; color: #CC5327; }
        .icon-img  { background: #0c1220; color: #4a8fe8; }
        .icon-link { background: #0a1a12; color: #27a06e; }
        .icon-doc  { background: #15101f; color: #9b7ee6; }

        .file-info { flex: 1; min-width: 0; }
        .file-name {
          font-size: 0.84rem; font-weight: 500; color: #c4c0bc;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 3px;
        }
        .file-meta { font-size: 0.72rem; color: #3a3840; }

        .file-badge {
          font-size: 0.64rem; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 3px 9px;
          border-radius: 999px; font-weight: 500; flex-shrink: 0;
          opacity: 0;
          animation: badgePop 5s ease infinite;
        }

        .file-card:nth-child(3) .file-badge { animation-delay: 1.15s; }
        .file-card:nth-child(4) .file-badge { animation-delay: 1.55s; }
        .file-card:nth-child(5) .file-badge { animation-delay: 1.95s; }
        .file-card:nth-child(6) .file-badge { animation-delay: 2.35s; }

        .badge-pdf  { background: #1f0e07; color: #CC5327; border: 1px solid #3a1a0c; }
        .badge-img  { background: #0c1220; color: #4a8fe8; border: 1px solid #0e2040; }
        .badge-link { background: #0a1a12; color: #27a06e; border: 1px solid #0d2e1e; }
        .badge-doc  { background: #15101f; color: #9b7ee6; border: 1px solid #271848; }

        @media (max-width: 700px) {
          .hero-wrap { grid-template-columns: 1fr; padding: 36px 28px; min-height: auto; gap: 48px; }
        }
      `}</style>

      <div className="hero-wrap">

        {/* LEFT */}
        <div className="left">
          <p className="tag">Personal Data vault</p>
          <h1>
            Save it once.<br />
            Find it <i>always.</i>
          </h1>
          <p className="sub">
            One quiet place for your PDFs, images, and links —
            searchable in an instant.
          </p>
          <div className="actions">
            <button className="btn" onClick={()=>{
navigate("/signin");
            }}>Get started</button>
            
          </div>
          <div className="chips">
            <span className="chip">PDF storage</span>
            <span className="chip">Image vault</span>
            <span className="chip">Smart links</span>
            <span className="chip">Instant search</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <p className="vault-label">Your vault · 142 items</p>

          <div className="search-row">
            <i className="ti ti-search" aria-hidden="true"></i>
            <span className="search-text">
              Searching&nbsp;
              <span className="typed-query">"Q3 report"</span>
            </span>
            <span className="search-count">4 found</span>
          </div>

          <div className="file-card active">
            <div className="icon-wrap icon-pdf">
              <i className="ti ti-file-text" aria-hidden="true"></i>
            </div>
            <div className="file-info">
              <p className="file-name">Q3-2024-report-final.pdf</p>
              <p className="file-meta">Saved 2 days ago · 1.4 MB</p>
            </div>
            <span className="file-badge badge-pdf">PDF</span>
          </div>

          <div className="file-card">
            <div className="icon-wrap icon-img">
              <i className="ti ti-photo" aria-hidden="true"></i>
            </div>
            <div className="file-info">
              <p className="file-name">dashboard-screenshot.png</p>
              <p className="file-meta">Saved 5 days ago · 820 KB</p>
            </div>
            <span className="file-badge badge-img">Image</span>
          </div>

          <div className="file-card">
            <div className="icon-wrap icon-link">
              <i className="ti ti-link" aria-hidden="true"></i>
            </div>
            <div className="file-info">
              <p className="file-name">notion.so/team/q3-review</p>
              <p className="file-meta">Saved 1 week ago · Link</p>
            </div>
            <span className="file-badge badge-link">Link</span>
          </div>

          <div className="file-card">
            <div className="icon-wrap icon-doc">
              <i className="ti ti-file-description" aria-hidden="true"></i>
            </div>
            <div className="file-info">
              <p className="file-name">Q3 investor notes.docx</p>
              <p className="file-meta">Saved 2 weeks ago · 340 KB</p>
            </div>
            <span className="file-badge badge-doc">Doc</span>
          </div>
        </div>

      </div>
    </>
  );
}