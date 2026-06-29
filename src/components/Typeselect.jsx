import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetDataType } from "../redux/fetures/Slice";

const ACCENT = "#CC5327";

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    zIndex: 1000,
  },
  card: {
    background: "#111",
    border: "0.5px solid #2a2a2a",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "440px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "transparent",
    border: "0.5px solid #2a2a2a",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#888",
    fontSize: "16px",
    lineHeight: 1,
  },
  cardTitle: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#444",
    marginBottom: "1.5rem",
    paddingRight: "2rem",
  },
  fieldLabel: {
    fontSize: "11px",
    fontWeight: 500,
    color: "#555",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  selectWrapper: {
    position: "relative",
  },
  select: {
    width: "100%",
    appearance: "none",
    background: "#0d0d0d",
    color: "#e0e0e0",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "12px 44px 12px 14px",
    fontSize: "14px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    outline: "none",
  },
  chevron: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#444",
    fontSize: "16px",
  },
  button: {
    marginTop: "1.5rem",
    width: "100%",
    padding: "12px",
    background: ACCENT,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.03em",
  },
};

export default function TypeSelect() {
  const [selectedType, setSelectedType] = useState("image");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => navigate(-1);  // ✅ goes to previous page

  const handleContinue = () => {
    dispatch(SetDataType(selectedType));
    if(selectedType==="link"){
      navigate(`/typeselect/add-${selectedType}`);

    }else{
      navigate(`/typeselect/add-file`);
    }
    
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>

        <button
          style={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        <p style={styles.cardTitle}>Upload type</p>
        <p style={styles.fieldLabel}>Select type</p>

        <div style={styles.selectWrapper}>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={styles.select}
          >
            <option value="image">Image</option>
            <option value="link">Link</option>
            <option value="pdf">PDF</option>
          </select>
          <span style={styles.chevron}>▾</span>
        </div>

        <button
          onClick={handleContinue}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          style={styles.button}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}