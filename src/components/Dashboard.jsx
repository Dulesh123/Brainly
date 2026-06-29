import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetItem } from "../redux/fetures/Slice";

const T = {
  bg:           "#000000",
  surface:      "#080808",
  surfaceHi:    "#0f0f0f",
  surface2:     "#141414",
  border:       "#1c1c1c",
  borderHi:     "#2a2a2a",
  borderFocus:  "#4f7ef8",
  accent:       "#4f7ef8",
  accentDim:    "rgba(79,126,248,0.08)",
  accentGlow:   "rgba(79,126,248,0.15)",
  textHi:       "#f2efe9",
  textMid:      "#6b6b6b",
  textDim:      "#333",
  danger:       "#e5453a",
  dangerDim:    "rgba(229,69,58,0.08)",
  dangerBorder: "rgba(229,69,58,0.22)",
  orange:       "#f97316",
  orangeDim:    "rgba(249,115,22,0.10)",
  orangeBorder: "rgba(249,115,22,0.25)",
  font:         "'Inter','SF Pro Display',-apple-system,BlinkMacSystemFont,sans-serif",
  display:      "'Cal Sans','Bricolage Grotesque','Plus Jakarta Sans',Inter,sans-serif",
  mono:         "'JetBrains Mono','Fira Code','SF Mono',monospace",
};

function getType(url = "") {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("instagram.com"))                          return "instagram";
  if (u.includes("x.com") || u.includes("twitter.com"))    return "twitter";
  if (u.endsWith(".pdf"))                                   return "pdf";
  if (u.includes("cloudinary.com")) {
    if (u.includes("/raw/"))                                return "pdf";
    if (!u.includes("/image/") && !u.includes("/video/"))  return "pdf";
    return "image";
  }
  if (/\.(jpe?g|png|gif|webp|avif)(\?|$)/.test(u))        return "image";
  return "link";
}

function getYouTubeId(url) {
  if (url.includes("/embed/"))           return url.split("/embed/")[1]?.split("?")[0] || "";
  if (url.includes("youtube.com/watch")) { try { return new URL(url).searchParams.get("v") || ""; } catch { return ""; } }
  if (url.includes("youtu.be/"))         return url.split("youtu.be/")[1]?.split("?")[0] || "";
  return "";
}

const MEDIA_H = 180;

function YouTubeThumb({ url, title }) {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}?rel=0&modestbranding=1`}
      title={title} loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ display: "block", width: "100%", height: MEDIA_H, border: "none" }}
    />
  );
}

function ImageThumb({ url, title }) {
  const [dead, setDead] = useState(false);
  if (dead) return <MediaPlaceholder icon={<ImgIcon />} label="Image unavailable" />;
  return (
    <img src={url} alt={title} loading="lazy" onError={() => setDead(true)}
      style={{ display: "block", width: "100%", height: MEDIA_H, objectFit: "cover" }} />
  );
}

function PdfThumb({ url, title }) {
  return (
    <div style={{ position: "relative", width: "100%", height: MEDIA_H, background: "#050505" }}>
      <iframe src={url} title={title}
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
      <div onClick={() => window.open(url, "_blank", "noreferrer")} style={{
        position: "absolute", inset: 0, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        flexDirection: "column", padding: "0 0 16px",
        background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 55%)",
      }}>
        <span style={{
          fontSize: 9, fontWeight: 700, fontFamily: T.mono, letterSpacing: ".10em",
          color: T.danger, border: `0.5px solid ${T.dangerBorder}`,
          borderRadius: 6, padding: "4px 14px", background: T.dangerDim,
        }}>OPEN PDF ↗</span>
      </div>
    </div>
  );
}

function InstagramThumb({ url }) {
  useEffect(() => {
    if (window.instgrm) window.instgrm.Embeds.process();
    else {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js"; s.async = true;
      document.body.appendChild(s);
      s.onload = () => window.instgrm?.Embeds.process();
    }
  }, [url]);
  return (
    <div style={{ height: MEDIA_H, overflowY: "auto", background: T.surface }}>
      <blockquote className="instagram-media" data-instgrm-permalink={url.split("?")[0]}
        data-instgrm-version="14" style={{ margin: 0, width: "100%" }} />
    </div>
  );
}

function TwitterThumb({ url }) {
  useEffect(() => {
    if (window.twttr) window.twttr.widgets.load();
    else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js"; s.async = true;
      document.body.appendChild(s);
      s.onload = () => window.twttr?.widgets.load();
    }
  }, [url]);
  return (
    <div style={{ height: MEDIA_H, overflowY: "auto", background: T.surface, padding: "8px 0" }}>
      <blockquote className="twitter-tweet" style={{ margin: "0 auto" }}>
        <a href={url.split("?")[0]} target="_blank" rel="noreferrer">Loading post…</a>
      </blockquote>
    </div>
  );
}

function LinkThumb({ url }) {
  const [h, setH] = useState(false);
  let host = "";
  try { host = new URL(url).hostname.replace("www.", ""); } catch {}
  return (
    <a href={url} target="_blank" rel="noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 10, height: MEDIA_H,
        textDecoration: "none", background: h ? "#0c0c0c" : T.surface,
        transition: "background .15s",
      }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 13,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: T.surfaceHi, border: `0.5px solid ${T.border}`,
      }}><LinkIcon /></div>
      {host && <span style={{ fontSize: 11, fontFamily: T.mono, color: T.textMid, letterSpacing: ".02em" }}>{host}</span>}
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: ".10em", fontFamily: T.mono,
        color: T.textMid, border: `0.5px solid ${T.border}`,
        borderRadius: 5, padding: "3px 11px", background: T.surfaceHi,
      }}>OPEN ↗</span>
    </a>
  );
}

function MediaPlaceholder({ icon, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 8, height: MEDIA_H, background: T.surface,
    }}>
      {icon}
      <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.font }}>{label}</span>
    </div>
  );
}

function CardMedia({ url, title }) {
  const t = getType(url);
  return (
    <div style={{ lineHeight: 0, flexShrink: 0 }}>
      {t === "youtube"   && <YouTubeThumb   url={url} title={title} />}
      {t === "image"     && <ImageThumb     url={url} title={title} />}
      {t === "pdf"       && <PdfThumb       url={url} title={title} />}
      {t === "instagram" && <InstagramThumb url={url} />}
      {t === "twitter"   && <TwitterThumb   url={url} />}
      {t === "link"      && <LinkThumb      url={url} />}
    </div>
  );
}

const BADGE = {
  youtube:   { label: "YouTube",   color: "#f04040", icon: "▶" },
  image:     { label: "Image",     color: "#5b9fe8", icon: "◻" },
  pdf:       { label: "PDF",       color: "#e5453a", icon: "⬜" },
  instagram: { label: "Instagram", color: "#c13584", icon: "◈" },
  twitter:   { label: "𝕏 Post",   color: "#4a9fd8", icon: "𝕏" },
  link:      { label: "Link",      color: "#555",    icon: "↗" },
};

function TypeBadge({ url }) {
  const t = getType(url);
  const b = BADGE[t] || BADGE.link;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, fontFamily: T.mono, letterSpacing: ".06em",
      padding: "2px 8px", borderRadius: 5, flexShrink: 0,
      color: b.color, background: `${b.color}10`, border: `0.5px solid ${b.color}25`,
    }}>{b.label}</span>
  );
}

const FILTERS = [
  { key: "all",       label: "All",         icon: "✦" },
  { key: "youtube",   label: "YouTube",     icon: "▶" },
  { key: "image",     label: "Images",      icon: "⬡" },
  { key: "pdf",       label: "PDFs",        icon: "⬜" },
  { key: "instagram", label: "Instagram",   icon: "◈" },
  { key: "twitter",   label: "X / Twitter", icon: "𝕏" },
  { key: "link",      label: "Links",       icon: "↗" },
];

// ── Toolbar ───────────────────────────────────────────────────
function Toolbar({ search, onSearch, filter, onFilter, view, onView }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ background: T.bg, borderBottom: `0.5px solid ${T.border}` }}>

      {/* Row 1 — search + view toggles */}
      <div className="db-toolbar-row">
        <div
          className="db-search-bar"
          style={{
            flex: 1, display: "flex", alignItems: "center", gap: 9,
            background: "#161616",
            border: `1px solid ${focused ? T.borderFocus : "#252525"}`,
            borderRadius: 10, padding: "0 14px", height: 42,
            transition: "border-color .2s, box-shadow .2s",
            boxShadow: focused ? `0 0 0 3px ${T.accentGlow}` : "none",
          }}
        >
          <SearchIcon color={focused ? T.accent : "#484848"} />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search your collection…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 13.5, color: T.textHi, fontFamily: T.font,
              caretColor: T.accent, letterSpacing: ".01em",
            }}
          />
          {search && (
            <button onClick={() => onSearch("")} style={{
              background: "#222", border: "none", cursor: "pointer",
              color: "#666", fontSize: 14, lineHeight: 1, padding: "2px 6px",
              borderRadius: 4, display: "flex", alignItems: "center",
              transition: "background .15s",
            }}>×</button>
          )}
        </div>

        {/* View toggle */}
        <div style={{
          display: "flex", gap: 3, flexShrink: 0,
          background: "#0e0e0e", border: `0.5px solid ${T.border}`,
          borderRadius: 10, padding: 3,
        }}>
          {[["grid", <GridIcon />, "Grid"], ["list", <ListIcon />, "List"]].map(([v, icon, label]) => (
            <button key={v} onClick={() => onView(v)} title={label} style={{
              width: 36, height: 36, borderRadius: 7, cursor: "pointer",
              background: view === v ? "#1e1e1e" : "transparent",
              border: `0.5px solid ${view === v ? "#2e2e2e" : "transparent"}`,
              color: view === v ? T.textHi : T.textMid,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .15s",
            }}>{icon}</button>
          ))}
        </div>
      </div>

      {/* Row 2 — filter chips */}
      <div className="db-filter-row">
        {FILTERS.map(({ key, label, icon }) => {
          const active = filter === key;
          return (
            <button key={key} onClick={() => onFilter(key)} className="db-filter-chip" style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11.5, fontWeight: active ? 600 : 500, fontFamily: T.font,
              padding: "6px 14px", borderRadius: 8, cursor: "pointer",
              border: `0.5px solid ${active ? T.borderFocus : T.border}`,
              background: active ? T.accentDim : "transparent",
              color: active ? T.accent : T.textMid,
              transition: "all .18s", whiteSpace: "nowrap", flexShrink: 0,
              letterSpacing: ".01em",
              boxShadow: active ? `0 0 0 1px ${T.accentGlow}` : "none",
            }}>
              <span style={{ fontSize: 9, opacity: active ? 1 : 0.5 }}>{icon}</span>
              {label}
              {active && (
                <span style={{
                  fontSize: 9, fontFamily: T.mono, fontWeight: 700,
                  color: T.accent, background: T.accentDim,
                  borderRadius: 3, padding: "1px 5px", letterSpacing: ".04em",
                }}>✓</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────
function Card({ item, onEdit, onDelete, listView }) {
  const [h, setH] = useState(false);
  let host = "";
  try { host = new URL(item.link).hostname.replace("www.", ""); } catch {}

  return (
    <article
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: T.surface,
        border: `0.5px solid ${h ? "#252525" : T.border}`,
        borderRadius: 14, overflow: "hidden",
        display: "flex", flexDirection: listView ? "row" : "column",
        transition: "border-color .2s, transform .18s, box-shadow .2s",
        transform: h ? "translateY(-3px)" : "translateY(0)",
        boxShadow: h
          ? "0 16px 48px rgba(0,0,0,0.7), 0 0 0 0.5px #252525"
          : "0 1px 6px rgba(0,0,0,0.45)",
      }}
    >
      <div style={listView ? { width: 150, flexShrink: 0 } : {}}>
        <CardMedia url={item.link} title={item.title} />
      </div>

      <div style={{
        padding: "14px 16px 16px",
        borderTop: listView ? "none" : `0.5px solid ${T.border}`,
        borderLeft: listView ? `0.5px solid ${T.border}` : "none",
        display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <TypeBadge url={item.link} />
          <span title={item.title} style={{
            flex: 1, fontSize: 13, fontWeight: 500, color: T.textHi,
            lineHeight: 1.5, fontFamily: T.font, letterSpacing: ".005em",
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden", minWidth: 0,
          }}>
            {item.title || "Untitled"}
          </span>
        </div>

        {host && (
          <span style={{
            fontSize: 10.5, fontFamily: T.mono, color: T.textDim,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            letterSpacing: ".02em",
          }}>{host}</span>
        )}

        <div style={{ display: "flex", gap: 6, marginTop: "auto" }}>
          <ActionBtn onClick={() => onEdit(item)}   icon={<EditIcon />}  label="Edit"   />
          <ActionBtn onClick={() => onDelete(item)} icon={<TrashIcon />} label="Delete" danger />
        </div>
      </div>
    </article>
  );
}

function ActionBtn({ onClick, icon, label, danger }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11, fontWeight: 500, fontFamily: T.font,
        padding: "5px 12px", borderRadius: 7, cursor: "pointer",
        border: "0.5px solid", transition: "all .15s", outline: "none",
        background: danger ? (h ? T.dangerDim : "transparent") : (h ? T.surfaceHi : "transparent"),
        borderColor: danger ? (h ? T.dangerBorder : "rgba(229,69,58,0.14)") : (h ? "#2a2a2a" : T.border),
        color: danger ? (h ? T.danger : "#5a2020") : (h ? "#888" : T.textMid),
        letterSpacing: ".01em",
      }}>
      {icon}{label}
    </button>
  );
}

// ── Modals ────────────────────────────────────────────────────
function Overlay({ onBgClick, children }) {
  return (
    <div onClick={onBgClick} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.94)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#0c0c0c", border: `0.5px solid #222`,
        borderRadius: 20, padding: 32, width: "100%", maxWidth: 420,
        boxShadow: "0 40px 100px rgba(0,0,0,0.85)",
      }}>
        {children}
      </div>
    </div>
  );
}

const overlineStyle = (color) => ({
  fontSize: 9, fontWeight: 700, letterSpacing: ".16em",
  textTransform: "uppercase", color: color || T.textDim,
  marginBottom: 6, fontFamily: T.mono,
});

function Field({ label, value, onChange, placeholder, focused, onFocus, onBlur }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 9, fontWeight: 700,
        letterSpacing: ".14em", textTransform: "uppercase",
        fontFamily: T.mono, marginBottom: 7,
        color: focused ? T.accent : T.textDim, transition: "color .15s",
      }}>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder}
        onFocus={onFocus} onBlur={onBlur}
        style={{
          display: "block", width: "100%", background: "#080808",
          border: `0.5px solid ${focused ? T.borderFocus : "#1e1e1e"}`,
          borderRadius: 10, padding: "11px 14px",
          fontSize: 13, color: T.textHi, fontFamily: T.font,
          outline: "none", boxSizing: "border-box",
          transition: "border-color .15s, box-shadow .15s", caretColor: T.accent,
          boxShadow: focused ? `0 0 0 3px ${T.accentGlow}` : "none",
        }}
      />
    </div>
  );
}

function ModalBtn({ onClick, variant, children }) {
  const [h, setH] = useState(false);
  const s = {
    save:   { bg: h ? "#3060d0" : T.accent, border: "none", color: "#fff" },
    cancel: { bg: "transparent", border: `0.5px solid #222`, color: "#555" },
    delete: { bg: h ? "#801010" : "#660e0e", border: `0.5px solid ${T.dangerBorder}`, color: "#fff" },
  }[variant] || { bg: "transparent", border: `0.5px solid #222`, color: "#555" };
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: s.bg, border: s.border, color: s.color,
        borderRadius: 10, padding: "9px 22px",
        fontSize: 12, fontWeight: 600, fontFamily: T.font,
        cursor: "pointer", transition: "background .15s", letterSpacing: ".02em",
      }}>
      {children}
    </button>
  );
}

function EditModal({ item, onSave, onClose }) {
  const [title, setTitle] = useState(item.title || "");
  const [link,  setLink]  = useState(item.link  || "");
  const [f1, setF1] = useState(false);
  const [f2, setF2] = useState(false);
  return (
    <Overlay onBgClick={onClose}>
      <p style={overlineStyle()}>Edit item</p>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: T.textHi, margin: "0 0 26px", fontFamily: T.display, lineHeight: 1.4 }}>
        {item.title || "Untitled"}
      </h2>
      <Field label="Title" value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Give this a title…" focused={f1} onFocus={() => setF1(true)} onBlur={() => setF1(false)} />
      <Field label="URL" value={link} onChange={(e) => setLink(e.target.value)}
        placeholder="https://…" focused={f2} onFocus={() => setF2(true)} onBlur={() => setF2(false)} />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
        <ModalBtn onClick={onClose} variant="cancel">Cancel</ModalBtn>
        <ModalBtn onClick={() => onSave({ ...item, title: title.trim() || item.title, link: link.trim() || item.link })} variant="save">
          Save changes
        </ModalBtn>
      </div>
    </Overlay>
  );
}

function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <Overlay onBgClick={onClose}>
      <p style={overlineStyle(T.danger)}>Confirm delete</p>
      <h2 style={{ fontSize: 17, fontWeight: 600, color: T.textHi, margin: "0 0 18px", fontFamily: T.display }}>
        Remove this item?
      </h2>
      <div style={{
        background: T.dangerDim, border: `0.5px solid ${T.dangerBorder}`,
        borderRadius: 10, padding: "14px 16px", marginBottom: 26,
        fontSize: 12.5, color: "#a06060", lineHeight: 1.65, fontFamily: T.font,
      }}>
        <strong style={{ color: "#c07070" }}>"{item.title || "Untitled"}"</strong> will be permanently removed from your collection. This can't be undone.
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <ModalBtn onClick={onClose}   variant="cancel">Cancel</ModalBtn>
        <ModalBtn onClick={onConfirm} variant="delete">Delete</ModalBtn>
      </div>
    </Overlay>
  );
}

// ── Header ────────────────────────────────────────────────────
function Header({ user, count }) {
  const initials = user
    ? user.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "SB";
  return (
    <header style={{
      padding: "20px 28px",
      borderBottom: `0.5px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 12, background: T.bg,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: T.orangeDim,
          border: `0.5px solid ${T.orangeBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 800, color: T.orange,
          fontFamily: T.display, flexShrink: 0, letterSpacing: ".03em",
        }}>
          {initials}
        </div>

        {/* Brand title */}
        <div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <div
    style={{
      fontSize: "42px",
      fontWeight: 700,
      fontFamily: "'DM Serif Display', serif",
      lineHeight: 1,
      letterSpacing: "-0.03em",
    }}
  >
    <span style={{ color: "#CC5327" }}>{user}</span>{" "}
    <span style={{ color: "#efe4e0" }}>Second</span>{" "}
    <span style={{ color: "#efe4e0" }}>Brain</span>
  </div>

  <p
    style={{
      margin: "8px 0 0",
      fontSize: "12px",
      color: "#666",
      fontFamily: "Inter, sans-serif",
      letterSpacing: "0.04em",
    }}
  >
    {count > 0
      ? `${count} ${count === 1 ? "item" : "items"} saved`
      : "Your personal collection"}
  </p>
</div>
      </div>

      {/* Item count pill */}
      {count > 0 && (
        <div style={{
          fontSize: 11, fontWeight: 600, fontFamily: T.mono,
          color: T.textMid, background: T.surfaceHi,
          border: `0.5px solid ${T.border}`,
          borderRadius: 20, padding: "6px 16px", letterSpacing: ".04em",
        }}>
          {count} {count === 1 ? "item" : "items"}
        </div>
      )}
    </header>
  );
}

// ── Dashboard ─────────────────────────────────────────────────
export default function Dashboard() {
  const [data,       setData]       = useState([]);
  const [editItem,   setEditItem]   = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");
  const [view,       setView]       = useState("grid");

  const user     = useSelector((s) => s.app.signupform.f_name);
  const dispatch = useDispatch();
  dispatch(SetItem("Dashboard"));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://brainly-be-r3zm.onrender.com/getdata", {
          headers: { authorization: localStorage.getItem("token") },
        });
        setData(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Couldn't load your items. Check your connection and try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleEditSave = async (updated) => {
    try {
      await axios.put(
        `https://brainly-be-r3zm.onrender.com/update?id=${updated._id}`,
        { title: updated.title, link: updated.link },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setData((p) => p.map((d) => (d._id === updated._id ? updated : d)));
    } catch (e) { console.error(e); }
    finally { setEditItem(null); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    try {
      await axios.delete(
        `https://brainly-be-r3zm.onrender.com/delete?id=${deleteItem._id}`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setData((p) => p.filter((d) => d._id !== deleteItem._id));
    } catch (e) { console.error(e); }
    finally { setDeleteItem(null); }
  };

  const visible = data.filter((item) => {
    const typeMatch   = filter === "all" || getType(item.link) === filter;
    const searchMatch = !search || (item.title || "").toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .db-toolbar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-bottom: 0.5px solid #1c1c1c;
        }
        .db-filter-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 28px 12px;
          overflow-x: auto;
        }
        .db-filter-row::-webkit-scrollbar { height: 0; }
        .db-filter-chip:hover {
          border-color: #2a2a2a !important;
          color: #888 !important;
          background: #0e0e0e !important;
        }

        .db-grid {
          display: grid;
          gap: 14px;
          padding: 22px 28px 80px;
        }
        @media (min-width: 1100px) {
          .db-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 640px) and (max-width: 1099px) {
          .db-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 639px) {
          .db-grid        { grid-template-columns: 1fr; padding: 14px 14px 80px; }
          .db-toolbar-row { padding: 10px 14px; }
          .db-filter-row  { padding: 8px 14px 10px; }
        }
        .db-grid.list-view { grid-template-columns: 1fr !important; }

        .db-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 100px 0; gap: 12px;
        }
      `}</style>

      <Header user={user} count={data.length} />

      <Toolbar
        search={search}  onSearch={setSearch}
        filter={filter}  onFilter={setFilter}
        view={view}      onView={setView}
      />

      <main className={`db-grid${view === "list" ? " list-view" : ""}`}>
        {loading && (
          <div className="db-empty">
            <span style={{ fontSize: 20, color: T.border, fontFamily: T.mono }}>···</span>
            <p style={{ margin: 0, fontSize: 13, color: T.textDim, fontFamily: T.font }}>
              Loading your collection…
            </p>
          </div>
        )}
        {error && !loading && (
          <div className="db-empty">
            <p style={{ margin: 0, fontSize: 13, color: "#a06060", fontFamily: T.font }}>{error}</p>
          </div>
        )}
        {!loading && !error && visible.length === 0 && (
          <div className="db-empty">
            <span style={{ fontSize: 32, color: T.border }}>∅</span>
            <p style={{ margin: 0, fontSize: 13, color: T.textDim, fontFamily: T.font }}>
              {data.length === 0
                ? "Nothing saved yet — add something to start."
                : "No items match that filter."}
            </p>
          </div>
        )}
        {!loading && !error && visible.map((item) => (
          <Card key={item._id} item={item}
            onEdit={setEditItem} onDelete={setDeleteItem}
            listView={view === "list"} />
        ))}
      </main>

      {editItem   && <EditModal   item={editItem}   onSave={handleEditSave}         onClose={() => setEditItem(null)}   />}
      {deleteItem && <DeleteModal item={deleteItem} onConfirm={handleDeleteConfirm} onClose={() => setDeleteItem(null)} />}
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────
function EditIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#383838"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}
function ImgIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#282828"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  );
}
function SearchIcon({ color = "#484848" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, transition: "stroke .2s" }}>
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}
function ListIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6"  x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6"  x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );
}
