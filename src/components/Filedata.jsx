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
  },
};

export default function Filedata() {
  const navigate = useNavigate();
  

  const dataType = useSelector(
    (state) => state.app.dataType.type
  );

  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    if (!title.trim() || !file) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("datatype", dataType);
      console.log(dataType,title);

      // "file" must match upload.single("file")
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/add-file",
        formData,
        {
          headers: {
            authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to upload file"
      );
    }
  };

  return (
    <div style={styles.overlay} onClick={() => navigate(-1)}>
      <div
        style={styles.card}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          style={styles.closeBtn}
          onClick={() => navigate(-1)}
        >
          ✕
        </button>

        <p style={styles.cardTitle}>Upload File</p>

        <p style={styles.fieldLabel}>Title</p>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <p style={styles.fieldLabel}>Choose File</p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.input}
        />

        {file && (
          <p
            style={{
              color: "#999",
              fontSize: "12px",
              marginTop: "-8px",
              marginBottom: "12px",
            }}
          >
            Selected: {file.name}
          </p>
        )}

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          Upload File →
        </button>
      </div>
    </div>
  );
}