import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  input: {
    width: "100%",
    background: "#0d0d0d",
    color: "#e0e0e0",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    outline: "none",
    marginBottom: "1rem",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "0.5rem",
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

export default function Linkdata() {
  const navigate = useNavigate();
const dataType = useSelector(
  (state) => state.app.dataType.type
);
if(dataType){
  console.log(dataType)
}else{
  console.log("no data")
}
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const token=localStorage.getItem("token");
  

  const handleSubmit = async () => {
  if (!title.trim() || !link.trim()) {
    alert("Please fill all fields");
    return;
  }
  

  try {
    const response = await axios.post(
      "https://brainly-be-r3zm.onrender.com/add-link",
      {
        link,
        title,
        datatype: dataType,
      },
      {
        headers:{
            authorization:token

        }
      }
      
    );

    if (response.status === 200 || response.status === 201) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to add link"
    );
  }
};


  return (
    <div style={styles.overlay} onClick={() => navigate(-1)}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <button
          style={styles.closeBtn}
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          ✕
        </button>

        <p style={styles.cardTitle}>Add Link</p>

        <p style={styles.fieldLabel}>Title</p>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <p style={styles.fieldLabel}>Link</p>
        <input
          type="url"
          placeholder="https://example.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          Save Link →
        </button>
      </div>
    </div>
  );
}