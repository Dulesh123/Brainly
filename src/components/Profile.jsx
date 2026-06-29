import { useSelector } from "react-redux";

const ACCENT = "#CC5327";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  card: {
    background: "#111",
    border: "0.5px solid #2a2a2a",
    borderRadius: "16px",
    padding: "2rem",
    width: "100%",
    maxWidth: "440px",
  },
  cardTitle: {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#444",
    margin: "0 0 1.75rem",
  },
  avatarRow: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.75rem",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#1a1a1a",
    border: `1.5px solid ${ACCENT}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: 600,
    color: ACCENT,
    flexShrink: 0,
    fontFamily: "sans-serif",
  },
  fullName: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#e0e0e0",
    margin: "0 0 3px",
  },
  emailSub: {
    fontSize: "13px",
    color: "#555",
    margin: 0,
  },
  fieldRow: {
    padding: "13px 0",
    borderTop: "0.5px solid #1e1e1e",
  },
  fieldLabel: {
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#444",
    marginBottom: "5px",
  },
  fieldValue: {
    fontSize: "14px",
    color: "#e0e0e0",
  },
  fieldEmpty: {
    fontSize: "14px",
    color: "#555",
    fontStyle: "italic",
  },
};

export default function Profile() {
  const { f_name, l_name, email } = useSelector(
    (state) => state.app.signupform
  );

  const firstInitial = f_name?.trim()?.[0]?.toUpperCase() || "";
  const lastInitial = l_name?.trim()?.[0]?.toUpperCase() || "";
  const initials = (firstInitial + lastInitial) || "?";

  const fullName = [f_name?.trim(), l_name?.trim()].filter(Boolean).join(" ");

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <p style={styles.cardTitle}>Profile</p>

        <div style={styles.avatarRow}>
          <div style={styles.avatar}>{initials}</div>
          <div>
            <p style={styles.fullName}>{fullName || "—"}</p>
            <p style={styles.emailSub}>{email?.trim() || "No email set"}</p>
          </div>
        </div>

        <div style={styles.fieldRow}>
          <p style={styles.fieldLabel}>First name</p>
          <p style={f_name?.trim() ? styles.fieldValue : styles.fieldEmpty}>
            {f_name?.trim() || "Not set"}
          </p>
        </div>

        <div style={styles.fieldRow}>
          <p style={styles.fieldLabel}>Last name</p>
          <p style={l_name?.trim() ? styles.fieldValue : styles.fieldEmpty}>
            {l_name?.trim() || "Not set"}
          </p>
        </div>

        <div style={{ ...styles.fieldRow, borderBottom: "0.5px solid #1e1e1e" }}>
          <p style={styles.fieldLabel}>Email</p>
          <p style={email?.trim() ? styles.fieldValue : styles.fieldEmpty}>
            {email?.trim() || "Not set"}
          </p>
        </div>

      </div>
    </div>
  );
}