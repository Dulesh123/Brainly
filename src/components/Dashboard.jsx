// // // // import axios from "axios";
// // // // import { useEffect, useState } from "react";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { SetItem } from "../redux/fetures/Slice";

// // // // // ─── YouTube ───────────────────────────────────────────────
// // // // const getYouTubeEmbedUrl = (url = "") => {
// // // //   if (!url) return "";
// // // //   if (url.includes("/embed/")) return url;
// // // //   if (url.includes("youtube.com/watch")) {
// // // //     try {
// // // //       const id = new URL(url).searchParams.get("v");
// // // //       return `https://www.youtube.com/embed/${id}`;
// // // //     } catch { return ""; }
// // // //   }
// // // //   if (url.includes("youtu.be/")) {
// // // //     const id = url.split("youtu.be/")[1]?.split("?")[0];
// // // //     return `https://www.youtube.com/embed/${id}`;
// // // //   }
// // // //   return `https://www.youtube.com/embed/${url}`;
// // // // };

// // // // // ─── Link Type Detector ────────────────────────────────────
// // // // const getLinkType = (url = "") => {
// // // //   if (!url) return "unknown";
// // // //   if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
// // // //   if (url.includes("instagram.com")) return "instagram";
// // // //   if (url.includes("x.com") || url.includes("twitter.com")) return "twitter";
// // // //   return "unknown";
// // // // };

// // // // // ─── Embed Components ──────────────────────────────────────
// // // // const YouTubeEmbed = ({ url, title }) => (
// // // //   <iframe
// // // //     width="100%"
// // // //     height="100%"
// // // //     style={{ display: "block", aspectRatio: "16/9", minHeight: "200px" }}
// // // //     src={getYouTubeEmbedUrl(url)}
// // // //     title={title}
// // // //     frameBorder="0"
// // // //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// // // //     referrerPolicy="strict-origin-when-cross-origin"
// // // //     allowFullScreen
// // // //   />
// // // // );

// // // // const InstagramEmbed = ({ url }) => {
// // // //   useEffect(() => {
// // // //     if (window.instgrm) {
// // // //       window.instgrm.Embeds.process();
// // // //     } else {
// // // //       const script = document.createElement("script");
// // // //       script.src = "https://www.instagram.com/embed.js";
// // // //       script.async = true;
// // // //       document.body.appendChild(script);
// // // //     }
// // // //   }, [url]);

// // // //   const cleanUrl = url.split("?")[0];

// // // //   return (
// // // //     <blockquote
// // // //       className="instagram-media"
// // // //       data-instgrm-permalink={cleanUrl}
// // // //       data-instgrm-version="14"
// // // //       style={{ margin: 0, width: "100%" }}
// // // //     >
// // // //       <a href={cleanUrl} target="_blank" rel="noreferrer">View on Instagram</a>
// // // //     </blockquote>
// // // //   );
// // // // };

// // // // const TwitterEmbed = ({ url }) => {
// // // //   useEffect(() => {
// // // //     if (window.twttr) {
// // // //       window.twttr.widgets.load();
// // // //     } else {
// // // //       const script = document.createElement("script");
// // // //       script.src = "https://platform.twitter.com/widgets.js";
// // // //       script.async = true;
// // // //       document.body.appendChild(script);
// // // //     }
// // // //   }, [url]);

// // // //   const cleanUrl = url.split("?")[0];

// // // //   return (
// // // //     <blockquote className="twitter-tweet" style={{ margin: 0 }}>
// // // //       <a href={cleanUrl} target="_blank" rel="noreferrer">View on X</a>
// // // //     </blockquote>
// // // //   );
// // // // };

// // // // const UnknownEmbed = ({ url }) => (
// // // //   <a
// // // //     href={url}
// // // //     target="_blank"
// // // //     rel="noreferrer"
// // // //     style={{
// // // //       display: "block",
// // // //       padding: "20px 0",
// // // //       color: "#CC5327",
// // // //       wordBreak: "break-all",
// // // //       fontSize: "13px",
// // // //       fontFamily: "monospace",
// // // //     }}
// // // //   >
// // // //     {url}
// // // //   </a>
// // // // );

// // // // // ─── Card ──────────────────────────────────────────────────
// // // // const EmbedCard = ({ url, title }) => {
// // // //   const type = getLinkType(url);

// // // //   const renderEmbed = () => {
// // // //     if (type === "youtube")   return <YouTubeEmbed url={url} title={title} />;
// // // //     if (type === "instagram") return <InstagramEmbed url={url} />;
// // // //     if (type === "twitter")   return <TwitterEmbed url={url} />;
// // // //     return <UnknownEmbed url={url} />;
// // // //   };

// // // //   return (
// // // //     <div style={{ width: "100%", marginBottom: "48px" }}>
// // // //       {/* Embed — no constraints */}
// // // //       <div>{renderEmbed()}</div>

// // // //       {/* Title */}
// // // //       {title && (
// // // //         <p
// // // //           style={{
// // // //             margin: "14px 0 0",
// // // //             fontSize: "15px",
// // // //             fontWeight: 500,
// // // //             color: "#c8c8c8",
// // // //             letterSpacing: "0.01em",
// // // //             lineHeight: 1.4,
// // // //           }}
// // // //         >
// // // //           {title}
// // // //         </p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // // ─── Dashboard ─────────────────────────────────────────────
// // // // export default function Dashboard() {
// // // //   const [data, setData] = useState([]);
// // // //   const user = useSelector((state) => state.app.signupform.f_name);
// // // //   const dispatch=useDispatch();
// // // //   dispatch(SetItem("Dashboard"));

// // // //   useEffect(() => {
// // // //     async function fetchData() {
// // // //       try {
// // // //         const response = await axios.get("http://localhost:3000/getdata", {
// // // //           headers: { authorization: localStorage.getItem("token") },
// // // //         });
// // // //         setData(response.data.data);
// // // //       } catch (error) {
// // // //         console.log(error);
// // // //       }
// // // //     }
// // // //     fetchData();
// // // //   }, []);

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         minHeight: "100vh",
// // // //         background: "#0d0d0d",
// // // //         padding: "60px 48px",
// // // //         maxWidth: "860px",
// // // //         margin: "0 auto",
// // // //         boxSizing: "border-box",
// // // //       }}
// // // //     >
// // // //       {/* Header */}
// // // //       <header style={{ marginBottom: "56px" }}>
// // // //         <p
// // // //           style={{
// // // //             margin: "0 0 6px",
// // // //             fontSize: "11px",
// // // //             fontWeight: 500,
// // // //             letterSpacing: "0.12em",
// // // //             textTransform: "uppercase",
// // // //             color: "#3a3a3a",
// // // //           }}
// // // //         >
// // // //           Welcome back
// // // //         </p>
// // // //         <h1
// // // //           style={{
// // // //             margin: 0,
// // // //             fontSize: "28px",
// // // //             fontWeight: 600,
// // // //             color: "#e2e2e2",
// // // //             letterSpacing: "-0.01em",
// // // //           }}
// // // //         >
// // // //           {user}&apos;s Second Brain
// // // //         </h1>
// // // //       </header>

// // // //       {/* Feed */}
// // // //       <div>
// // // //         {data.map((item, index) => (
// // // //           <EmbedCard key={index} url={item.link} title={item.title} />
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }












// // // import axios from "axios";
// // // import { useEffect, useState } from "react";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { SetItem } from "../redux/fetures/Slice";

// // // // ── Type detector ─────────────────────────────────────────────
// // // function getType(url = "") {
// // //   const u = url.toLowerCase();
// // //   if (u.includes("youtube.com") || u.includes("youtu.be"))           return "youtube";
// // //   if (u.includes("instagram.com"))                                    return "instagram";
// // //   if (u.includes("x.com") || u.includes("twitter.com"))              return "twitter";
// // //   if ((u.includes("cloudinary.com") && (u.includes("/raw/") || u.includes(".pdf"))) || u.endsWith(".pdf"))
// // //                                                                       return "pdf";
// // //   if (u.includes("cloudinary.com") || /\.(jpe?g|png|gif|webp|avif)(\?|$)/.test(u))
// // //                                                                       return "image";
// // //   return "link";
// // // }

// // // function getYouTubeId(url) {
// // //   if (url.includes("/embed/"))         return url.split("/embed/")[1]?.split("?")[0] || "";
// // //   if (url.includes("youtube.com/watch")) { try { return new URL(url).searchParams.get("v") || ""; } catch { return ""; } }
// // //   if (url.includes("youtu.be/"))       return url.split("youtu.be/")[1]?.split("?")[0] || "";
// // //   return "";
// // // }

// // // // ── Thumbnail components ───────────────────────────────────────

// // // function YouTubeThumb({ url, title }) {
// // //   return (
// // //     <iframe
// // //       src={`https://www.youtube.com/embed/${getYouTubeId(url)}?rel=0`}
// // //       title={title}
// // //       loading="lazy"
// // //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// // //       allowFullScreen
// // //       style={{ display: "block", width: "100%", aspectRatio: "16/9", border: "none" }}
// // //     />
// // //   );
// // // }

// // // function ImageThumb({ url, title }) {
// // //   const [dead, setDead] = useState(false);
// // //   if (dead) return null;
// // //   return (
// // //     <img
// // //       src={url} alt={title} loading="lazy"
// // //       onError={() => setDead(true)}
// // //       style={{ display: "block", width: "100%", height: 170, objectFit: "cover" }}
// // //     />
// // //   );
// // // }






// // // function PdfThumb({url}) {
// // //   if (!url || typeof url !== "string") return url;
// // //   if (!url.includes("cloudinary.com")) return url;

// // //   try {
// // //     const u = new URL(url);

// // //     u.pathname = u.pathname
// // //       .replace(/\/(image|video|auto)\/upload\//, "/raw/upload/")
// // //       .replace(/\/upload\/(?!.*\/upload\/)/, "/raw/upload/")
// // //       .replace(/\/fl_attachment\//, "/")
// // //       .replace("/raw/upload/", "/raw/upload/fl_attachment/");

// // //     return u.toString();
// // //   } catch {
// // //     return url;
// // //   }
// // // }

// // // function InstagramThumb({ url }) {
// // //   useEffect(() => {
// // //     if (window.instgrm) {
// // //       window.instgrm.Embeds.process();
// // //     } else {
// // //       const s = document.createElement("script");
// // //       s.src = "https://www.instagram.com/embed.js";
// // //       s.async = true;
// // //       document.body.appendChild(s);
// // //       s.onload = () => window.instgrm?.Embeds.process();
// // //     }
// // //   }, [url]);

// // //   return (
// // //     <blockquote
// // //       className="instagram-media"
// // //       data-instgrm-permalink={url.split("?")[0]}
// // //       data-instgrm-version="14"
// // //       style={{ margin: 0, width: "100%", minWidth: "100%" }}
// // //     />
// // //   );
// // // }


// // // function LinkThumb({ url }) {
// // //   return (
// // //     <a
// // //       href={url} target="_blank" rel="noreferrer"
// // //       style={{
// // //         display: "flex", alignItems: "center", gap: 12,
// // //         padding: "14px", textDecoration: "none",
// // //         background: "#0c0c0c", minHeight: 72,
// // //       }}
// // //     >
// // //       <div style={{
// // //         width: 34, height: 34, borderRadius: 8, flexShrink: 0,
// // //         display: "flex", alignItems: "center", justifyContent: "center",
// // //         background: "#181818", border: "0.5px solid #2a2a2a",
// // //       }}>
// // //         <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// // //           <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
// // //           <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
// // //         </svg>
// // //       </div>
// // //       <span style={{ flex: 1, fontSize: 10, fontFamily: "monospace", color: "#3a3a3a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
// // //         {url}
// // //       </span>
// // //       <span style={{
// // //         flexShrink: 0, fontSize: 10, fontWeight: 600,
// // //         color: "#555", background: "#181818",
// // //         border: "0.5px solid #2a2a2a",
// // //         borderRadius: 5, padding: "4px 10px",
// // //       }}>
// // //         Open
// // //       </span>
// // //     </a>
// // //   );
// // // }











// // // function TwitterThumb({ url }) {
// // //   useEffect(() => {
// // //     if (window.twttr) {
// // //       window.twttr.widgets.load();
// // //     } else {
// // //       const s = document.createElement("script");
// // //       s.src = "https://platform.twitter.com/widgets.js";
// // //       s.async = true;
// // //       document.body.appendChild(s);
// // //       s.onload = () => window.twttr?.widgets.load();
// // //     }
// // //   }, [url]);

// // //   return (
// // //     <blockquote
// // //       className="twitter-tweet"
// // //       style={{ margin: 0 }}
// // //     >
// // //       <a href={url.split("?")[0]} target="_blank" rel="noreferrer">Loading post…</a>
// // //     </blockquote>
// // //   );
// // // }
// // // // Routes to the right thumbnail
// // // function CardMedia({ url, title }) {
// // //   const t = getType(url);
// // //   const wrapStyle = { lineHeight: 0, background: "#0c0c0c" };
// // //   return (
// // //     <div style={wrapStyle}>
// // //       {t === "youtube"   && <YouTubeThumb   url={url} title={title} />}
// // //       {t === "image"     && <ImageThumb     url={url} title={title} />}
// // //       {t === "pdf"       && <PdfThumb       url={url} />}
// // //       {t === "instagram" && <InstagramThumb url={url} />}
// // //       {t === "twitter"   && <TwitterThumb   url={url} />}
// // //       {t === "link"      && <LinkThumb      url={url} />}
// // //     </div>
// // //   );
// // // }

// // // // ── Card ──────────────────────────────────────────────────────
// // // function Btn({ onClick, danger, children }) {
// // //   const [h, setH] = useState(false);
// // //   return (
// // //     <button
// // //       onClick={onClick}
// // //       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
// // //       style={{
// // //         display: "inline-flex", alignItems: "center", gap: 4,
// // //         fontSize: 10, fontWeight: 500, padding: "4px 9px",
// // //         borderRadius: 5, cursor: "pointer", fontFamily: "inherit",
// // //         border: "0.5px solid", transition: "all .12s",
// // //         background: danger ? (h ? "rgba(140,40,40,.08)" : "transparent") : (h ? "#1a1a1a" : "transparent"),
// // //         borderColor: danger ? (h ? "rgba(140,40,40,.30)" : "rgba(140,40,40,.20)") : (h ? "#2e2e2e" : "#222"),
// // //         color: danger ? (h ? "#cc4444" : "#7a2525") : (h ? "#999" : "#555"),
// // //       }}
// // //     >{children}</button>
// // //   );
// // // }

// // // function Card({ item, onEdit, onDelete }) {
// // //   const [h, setH] = useState(false);
// // //   return (
// // //     <article
// // //       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
// // //       style={{
// // //         background: "#141414", border: `0.5px solid ${h ? "#333" : "#222"}`,
// // //         borderRadius: 12, overflow: "hidden",
// // //         display: "flex", flexDirection: "column",
// // //         transition: "border-color .15s",
// // //       }}
// // //     >
// // //       <CardMedia url={item.link} title={item.title} />
// // //       <div style={{
// // //         padding: "10px 12px", borderTop: "0.5px solid #1a1a1a",
// // //         display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
// // //       }}>
// // //         <span title={item.title} style={{
// // //           flex: 1, fontSize: 12, fontWeight: 500, color: "#aaa",
// // //           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
// // //         }}>
// // //           {item.title || "Untitled"}
// // //         </span>
// // //         <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
// // //           <Btn onClick={() => onEdit(item)}>✏ Edit</Btn>
// // //           <Btn onClick={() => onDelete(item)} danger>✕ Delete</Btn>
// // //         </div>
// // //       </div>
// // //     </article>
// // //   );
// // // }

// // // // ── Modals ────────────────────────────────────────────────────
// // // function Overlay({ onBgClick, children }) {
// // //   return (
// // //     <div
// // //       onClick={onBgClick}
// // //       style={{
// // //         position: "fixed", inset: 0, zIndex: 1000,
// // //         background: "rgba(0,0,0,0.82)",
// // //         display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
// // //       }}
// // //     >
// // //       <div onClick={(e) => e.stopPropagation()} style={{
// // //         background: "#141414", border: "0.5px solid #2a2a2a",
// // //         borderRadius: 12, padding: 24, width: "100%", maxWidth: 420,
// // //       }}>
// // //         {children}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function EditModal({ item, onSave, onClose }) {
// // //   const [title, setTitle] = useState(item.title || "");
// // //   const [link,  setLink]  = useState(item.link  || "");

// // //   const inputStyle = (focused) => ({
// // //     display: "block", width: "100%", background: "#0c0c0c",
// // //     border: `0.5px solid ${focused ? "#CC5327" : "#252525"}`,
// // //     borderRadius: 7, padding: "9px 12px", fontSize: 12, color: "#ddd",
// // //     outline: "none", fontFamily: "inherit", marginBottom: 14,
// // //     boxSizing: "border-box", transition: "border-color .12s",
// // //   });

// // //   const [f1, setF1] = useState(false);
// // //   const [f2, setF2] = useState(false);

// // //   return (
// // //     <Overlay onBgClick={onClose}>
// // //       <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", marginBottom: 18 }}>Edit item</h2>
// // //       <label style={{ display: "block", fontSize: 9, fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "#2e2e2e", marginBottom: 5 }}>Title</label>
// // //       <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a title"
// // //         onFocus={() => setF1(true)} onBlur={() => setF1(false)} style={inputStyle(f1)} />
// // //       <label style={{ display: "block", fontSize: 9, fontWeight: 700, letterSpacing: ".10em", textTransform: "uppercase", color: "#2e2e2e", marginBottom: 5 }}>URL</label>
// // //       <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..."
// // //         onFocus={() => setF2(true)} onBlur={() => setF2(false)} style={inputStyle(f2)} />
// // //       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
// // //         <button onClick={onClose} style={{ background: "transparent", border: "0.5px solid #252525", borderRadius: 6, padding: "7px 14px", fontSize: 11, color: "#555", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
// // //         <button onClick={() => { onSave({ ...item, title: title.trim() || item.title, link: link.trim() || item.link }); }}
// // //           style={{ background: "#CC5327", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 11, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
// // //           Save
// // //         </button>
// // //       </div>
// // //     </Overlay>
// // //   );
// // // }

// // // function DeleteModal({ item, onConfirm, onClose }) {
// // //   return (
// // //     <Overlay onBgClick={onClose}>
// // //       <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", marginBottom: 14 }}>Delete this item?</h2>
// // //       <div style={{ background: "rgba(180,40,40,.08)", border: "0.5px solid rgba(180,40,40,.18)", borderRadius: 7, padding: "10px 12px", marginBottom: 18, fontSize: 11, color: "#b07070", lineHeight: 1.6 }}>
// // //         "{item.title || "Untitled"}" will be permanently removed.
// // //       </div>
// // //       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
// // //         <button onClick={onClose} style={{ background: "transparent", border: "0.5px solid #252525", borderRadius: 6, padding: "7px 14px", fontSize: 11, color: "#555", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
// // //         <button onClick={onConfirm} style={{ background: "#6e1616", border: "none", borderRadius: 6, padding: "7px 16px", fontSize: 11, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
// // //       </div>
// // //     </Overlay>
// // //   );
// // // }

// // // // ── Dashboard ─────────────────────────────────────────────────
// // // export default function Dashboard() {
// // //   const [data,       setData]       = useState([]);
// // //   const [editItem,   setEditItem]   = useState(null);
// // //   const [deleteItem, setDeleteItem] = useState(null);
// // //   const [loading,    setLoading]    = useState(true);
// // //   const [error,      setError]      = useState(null);

// // //   const user     = useSelector((s) => s.app.signupform.f_name);
// // //   const dispatch = useDispatch();
// // //   dispatch(SetItem("Dashboard"));

// // //   useEffect(() => {
// // //     (async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await axios.get("http://localhost:3000/getdata", {
// // //           headers: { authorization: localStorage.getItem("token") },
// // //         });
// // //         setData(res.data.data);
// // //       } catch (err) {
// // //         console.error(err);
// // //         setError("Couldn't load items.");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     })();
// // //   }, []);

// // //   const handleEditSave = async (updated) => {
// // //     try {
// // //       await axios.put(`http://localhost:3000/update/${updated._id}`,
// // //         { title: updated.title, link: updated.link },
// // //         { headers: { authorization: localStorage.getItem("token") } }
// // //       );
// // //       setData((p) => p.map((d) => (d._id === updated._id ? updated : d)));
// // //     } catch (e) { console.error(e); }
// // //     finally { setEditItem(null); }
// // //   };

// // //   const handleDeleteConfirm = async () => {
// // //     if (!deleteItem) return;
// // //     try {
// // //       await axios.delete(`http://localhost:3000/delete/${deleteItem._id}`,
// // //         { headers: { authorization: localStorage.getItem("token") } }
// // //       );
// // //       setData((p) => p.filter((d) => d._id !== deleteItem._id));
// // //     } catch (e) { console.error(e); }
// // //     finally { setDeleteItem(null); }
// // //   };

// // //   return (
// // //     <div style={{
// // //       minHeight: "100vh",
// // //       background: "#0c0c0c",
// // //       fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
// // //     }}>
// // //       {/* Grid — full width, 3 columns, straight to cards */}
// // //       <div style={{
// // //         display: "grid",
// // //         gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
// // //         gap: 16,
// // //         padding: 24,
// // //       }}>
// // //         {loading && (
// // //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#333", padding: "60px 0", textAlign: "center" }}>
// // //             Loading…
// // //           </p>
// // //         )}

// // //         {error && !loading && (
// // //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#7a2828", padding: "60px 0", textAlign: "center" }}>
// // //             {error}
// // //           </p>
// // //         )}

// // //         {!loading && !error && data.length === 0 && (
// // //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#333", padding: "60px 0", textAlign: "center" }}>
// // //             Nothing saved yet.
// // //           </p>
// // //         )}

// // //         {!loading && !error && data.map((item) => (
// // //           <Card
// // //             key={item._id}
// // //             item={item}
// // //             onEdit={setEditItem}
// // //             onDelete={setDeleteItem}
// // //           />
// // //         ))}
// // //       </div>

// // //       {editItem   && <EditModal   item={editItem}   onSave={handleEditSave}     onClose={() => setEditItem(null)}   />}
// // //       {deleteItem && <DeleteModal item={deleteItem} onConfirm={handleDeleteConfirm} onClose={() => setDeleteItem(null)} />}
// // //     </div>
// // //   );
// // // }
















// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { SetItem } from "../redux/fetures/Slice";

// // // ── Type detector ─────────────────────────────────────────────
// // // Your backend uploads PDFs as resource_type:"raw" — Cloudinary raw URLs
// // // don't have /image/ or /video/ in the path, so we check for that too.
// // function getType(url = "") {
// //   const u = url.toLowerCase();
// //   if (u.includes("youtube.com") || u.includes("youtu.be"))           return "youtube";
// //   if (u.includes("instagram.com"))                                    return "instagram";
// //   if (u.includes("x.com") || u.includes("twitter.com"))              return "twitter";

// //   // PDF: ends in .pdf OR is a Cloudinary raw upload (no /image/ or /video/ segment)
// //   if (u.endsWith(".pdf"))                                             return "pdf";
// //   if (u.includes("cloudinary.com")) {
// //     if (u.includes("/raw/"))                                          return "pdf";
// //     // raw uploads sometimes have no resource-type segment at all
// //     if (!u.includes("/image/") && !u.includes("/video/"))            return "pdf";
// //     return "image";
// //   }
// //   if (/\.(jpe?g|png|gif|webp|avif)(\?|$)/.test(u))                  return "image";
// //   return "link";
// // }

// // function getYouTubeId(url) {
// //   if (url.includes("/embed/"))           return url.split("/embed/")[1]?.split("?")[0] || "";
// //   if (url.includes("youtube.com/watch")) { try { return new URL(url).searchParams.get("v") || ""; } catch { return ""; } }
// //   if (url.includes("youtu.be/"))         return url.split("youtu.be/")[1]?.split("?")[0] || "";
// //   return "";
// // }

// // // ── Shared card-media height ──────────────────────────────────
// // // All media slots are exactly this tall so every card lines up in the grid.
// // const MEDIA_H = 200;

// // // ── Media components ──────────────────────────────────────────

// // function YouTubeThumb({ url, title }) {
// //   return (
// //     <iframe
// //       src={`https://www.youtube.com/embed/${getYouTubeId(url)}?rel=0`}
// //       title={title}
// //       loading="lazy"
// //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// //       allowFullScreen
// //       style={{ display: "block", width: "100%", height: MEDIA_H, border: "none" }}
// //     />
// //   );
// // }

// // function ImageThumb({ url, title }) {
// //   const [dead, setDead] = useState(false);
// //   if (dead) return (
// //     <div style={placeholderStyle}>
// //       <IconImage />
// //       <span style={placeholderLabel}>Image unavailable</span>
// //     </div>
// //   );
// //   return (
// //     <img
// //       src={url} alt={title} loading="lazy"
// //       onError={() => setDead(true)}
// //       style={{ display: "block", width: "100%", height: MEDIA_H, objectFit: "cover" }}
// //     />
// //   );
// // }

// // // FIX: was returning a string, not JSX. Now renders a proper PDF preview tile
// // // with a clickable "Open PDF" button that opens the Cloudinary URL in a new tab.
// // function PdfThumb({ url, title }) {
// //   console.log(url);
// //   // Normalise Cloudinary raw URL so it forces a download/open rather than
// //   // triggering Cloudinary's HTML preview wrapper.
// //   const openUrl = (() => {
// //     if (!url || !url.includes("cloudinary.com")) return url;
// //     try {
// //       const u = new URL(url);
// //       // Ensure the path uses /raw/upload/ (backend uses resource_type:"raw")
// //       u.pathname = u.pathname
      
// //       return u.toString();
// //     } catch {
// //       return url;
// //     }
// //   })();

// //   return (
// //     <div style={{ ...placeholderStyle, cursor: "pointer", gap: 10 }}
// //       onClick={() => window.open(openUrl, "_blank", "noreferrer")}
// //     >
// //       {/* PDF icon */}
  
// //     <iframe
// //       src={url}
// //       title={title}
// //       style={{
// //         width: "100%",
// //         height: 200,
// //         border: 0
// //       }}
// //     />
  

// //       <span style={{
// //         marginTop: 4, fontSize: 10, fontWeight: 600, color: "#CC5327",
// //         border: "0.5px solid rgba(204,83,39,0.35)", borderRadius: 5,
// //         padding: "4px 12px", letterSpacing: ".04em",
// //       }}>
// //         Open PDF ↗
// //       </span>
// //     </div>
// //   );
// // }

// // function InstagramThumb({ url }) {
// //   useEffect(() => {
// //     if (window.instgrm) window.instgrm.Embeds.process();
// //     else {
// //       const s = document.createElement("script");
// //       s.src = "https://www.instagram.com/embed.js";
// //       s.async = true;
// //       document.body.appendChild(s);
// //       s.onload = () => window.instgrm?.Embeds.process();
// //     }
// //   }, [url]);

// //   return (
// //     <div style={{ height: MEDIA_H, overflowY: "auto", background: "#0c0c0c" }}>
// //       <blockquote
// //         className="instagram-media"
// //         data-instgrm-permalink={url.split("?")[0]}
// //         data-instgrm-version="14"
// //         style={{ margin: 0, width: "100%" }}
// //       />
// //     </div>
// //   );
// // }

// // function TwitterThumb({ url }) {
// //   useEffect(() => {
// //     if (window.twttr) window.twttr.widgets.load();
// //     else {
// //       const s = document.createElement("script");
// //       s.src = "https://platform.twitter.com/widgets.js";
// //       s.async = true;
// //       document.body.appendChild(s);
// //       s.onload = () => window.twttr?.widgets.load();
// //     }
// //   }, [url]);

// //   return (
// //     <div style={{ height: MEDIA_H, overflowY: "auto", background: "#0c0c0c", padding: "8px 0" }}>
// //       <blockquote className="twitter-tweet" style={{ margin: "0 auto" }}>
// //         <a href={url.split("?")[0]} target="_blank" rel="noreferrer">Loading post…</a>
// //       </blockquote>
// //     </div>
// //   );
// // }

// // function LinkThumb({ url }) {
// //   return (
// //     <a
// //       href={url} target="_blank" rel="noreferrer"
// //       style={{
// //         display: "flex", flexDirection: "column", alignItems: "center",
// //         justifyContent: "center", gap: 10,
// //         height: MEDIA_H, textDecoration: "none", background: "#0c0c0c",
// //         transition: "background .15s",
// //       }}
// //       onMouseEnter={(e) => e.currentTarget.style.background = "#111"}
// //       onMouseLeave={(e) => e.currentTarget.style.background = "#0c0c0c"}
// //     >
// //       <div style={{
// //         width: 40, height: 40, borderRadius: 10, flexShrink: 0,
// //         display: "flex", alignItems: "center", justifyContent: "center",
// //         background: "#141414", border: "0.5px solid #2a2a2a",
// //       }}>
// //         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444"
// //           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// //           <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
// //           <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
// //         </svg>
// //       </div>
// //       <span style={{
// //         fontSize: 10, fontFamily: "monospace", color: "#3a3a3a",
// //         maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
// //       }}>
// //         {url}
// //       </span>
// //       <span style={{
// //         fontSize: 10, fontWeight: 600, color: "#555",
// //         background: "#141414", border: "0.5px solid #2a2a2a",
// //         borderRadius: 5, padding: "4px 12px",
// //       }}>
// //         Open ↗
// //       </span>
// //     </a>
// //   );
// // }

// // // Shared placeholder style for PDF / dead image
// // const placeholderStyle = {
// //   display: "flex", flexDirection: "column", alignItems: "center",
// //   justifyContent: "center", height: MEDIA_H, background: "#0c0c0c",
// //   gap: 6,
// // };
// // const placeholderLabel = { fontSize: 11, color: "#444" };

// // function IconImage() {
// //   return (
// //     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#333"
// //       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// //       <rect x="3" y="3" width="18" height="18" rx="2"/>
// //       <circle cx="8.5" cy="8.5" r="1.5"/>
// //       <path d="M21 15l-5-5L5 21"/>
// //     </svg>
// //   );
// // }

// // // Routes to the right media component
// // function CardMedia({ url, title }) {
// //   const t = getType(url);
// //   return (
// //     <div style={{ lineHeight: 0, background: "#0c0c0c", flexShrink: 0 }}>
// //       {t === "youtube"   && <YouTubeThumb   url={url} title={title} />}
// //       {t === "image"     && <ImageThumb     url={url} title={title} />}
// //       {t === "pdf"       && <PdfThumb       url={url} title={title} />}
// //       {t === "instagram" && <InstagramThumb url={url} />}
// //       {t === "twitter"   && <TwitterThumb   url={url} />}
// //       {t === "link"      && <LinkThumb      url={url} />}
// //     </div>
// //   );
// // }

// // // ── Icon buttons ──────────────────────────────────────────────
// // function EditIcon() {
// //   return (
// //     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
// //       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// //       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
// //       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
// //     </svg>
// //   );
// // }
// // function TrashIcon() {
// //   return (
// //     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
// //       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
// //       <polyline points="3 6 5 6 21 6"/>
// //       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
// //       <path d="M10 11v6M14 11v6"/>
// //       <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
// //     </svg>
// //   );
// // }

// // function Btn({ onClick, danger, children, title: tooltip }) {
// //   const [h, setH] = useState(false);
// //   return (
// //     <button
// //       onClick={onClick}
// //       title={tooltip}
// //       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
// //       style={{
// //         display: "inline-flex", alignItems: "center", justifyContent: "center",
// //         gap: 5, fontSize: 11, fontWeight: 500, padding: "5px 10px",
// //         borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
// //         border: "0.5px solid", transition: "all .12s",
// //         background: danger
// //           ? (h ? "rgba(140,40,40,.14)" : "rgba(140,40,40,.05)")
// //           : (h ? "#1e1e1e" : "#161616"),
// //         borderColor: danger
// //           ? (h ? "rgba(180,50,50,.45)" : "rgba(140,40,40,.25)")
// //           : (h ? "#303030" : "#252525"),
// //         color: danger
// //           ? (h ? "#e05555" : "#a03333")
// //           : (h ? "#bbb" : "#777"),
// //       }}
// //     >
// //       {children}
// //     </button>
// //   );
// // }

// // // ── Card ──────────────────────────────────────────────────────
// // function TypeBadge({ url }) {
// //   const t = getType(url);
// //   const labels = { youtube: "YT", image: "IMG", pdf: "PDF", instagram: "IG", twitter: "𝕏", link: "URL" };
// //   const colors = {
// //     youtube:   { bg: "rgba(255,0,0,.08)",   border: "rgba(255,0,0,.2)",   text: "#c00" },
// //     image:     { bg: "rgba(80,130,200,.08)",  border: "rgba(80,130,200,.2)",  text: "#5588cc" },
// //     pdf:       { bg: "rgba(204,83,39,.08)", border: "rgba(204,83,39,.25)", text: "#CC5327" },
// //     instagram: { bg: "rgba(193,53,132,.08)", border: "rgba(193,53,132,.2)", text: "#c13584" },
// //     twitter:   { bg: "rgba(29,161,242,.08)", border: "rgba(29,161,242,.2)", text: "#1da1f2" },
// //     link:      { bg: "rgba(80,80,80,.08)",  border: "rgba(80,80,80,.2)",  text: "#666" },
// //   };
// //   const c = colors[t];
// //   return (
// //     <span style={{
// //       fontSize: 9, fontWeight: 700, letterSpacing: ".06em",
// //       padding: "2px 6px", borderRadius: 4,
// //       background: c.bg, border: `0.5px solid ${c.border}`, color: c.text,
// //       flexShrink: 0,
// //     }}>
// //       {labels[t]}
// //     </span>
// //   );
// // }

// // function Card({ item, onEdit, onDelete }) {
// //   const [h, setH] = useState(false);
// //   return (
// //     <article
// //       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
// //       style={{
// //         background: "#141414",
// //         border: `0.5px solid ${h ? "#333" : "#222"}`,
// //         borderRadius: 12, overflow: "hidden",
// //         display: "flex", flexDirection: "column",
// //         transition: "border-color .15s, box-shadow .15s",
// //         boxShadow: h ? "0 4px 24px rgba(0,0,0,.45)" : "0 1px 6px rgba(0,0,0,.25)",
// //       }}
// //     >
// //       <CardMedia url={item.link} title={item.title} />

// //       {/* Footer */}
// //       <div style={{
// //         padding: "10px 12px",
// //         borderTop: "0.5px solid #1e1e1e",
// //         display: "flex", flexDirection: "column", gap: 8,
// //         background: "#141414",
// //       }}>
// //         {/* Title row */}
// //         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
// //           <TypeBadge url={item.link} />
// //           <span title={item.title} style={{
// //             flex: 1, fontSize: 12, fontWeight: 500, color: "#ccc",
// //             whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
// //           }}>
// //             {item.title || "Untitled"}
// //           </span>
// //         </div>

// //         {/* Action row */}
// //         <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
// //           <Btn onClick={() => onEdit(item)} title="Edit title or URL">
// //             <EditIcon /> Edit
// //           </Btn>
// //           <Btn onClick={() => onDelete(item)} danger title="Delete permanently">
// //             <TrashIcon /> Delete
// //           </Btn>
// //         </div>
// //       </div>
// //     </article>
// //   );
// // }

// // // ── Modals ────────────────────────────────────────────────────
// // function Overlay({ onBgClick, children }) {
// //   return (
// //     <div
// //       onClick={onBgClick}
// //       style={{
// //         position: "fixed", inset: 0, zIndex: 1000,
// //         background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)",
// //         display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
// //       }}
// //     >
// //       <div onClick={(e) => e.stopPropagation()} style={{
// //         background: "#141414", border: "0.5px solid #2a2a2a",
// //         borderRadius: 14, padding: 24, width: "100%", maxWidth: 420,
// //         boxShadow: "0 20px 60px rgba(0,0,0,.7)",
// //       }}>
// //         {children}
// //       </div>
// //     </div>
// //   );
// // }

// // const labelStyle = {
// //   display: "block", fontSize: 9, fontWeight: 700,
// //   letterSpacing: ".10em", textTransform: "uppercase",
// //   color: "#444", marginBottom: 5,
// // };

// // function EditModal({ item, onSave, onClose }) {
// //   const [title, setTitle] = useState(item.title || "");
// //   const [link,  setLink]  = useState(item.link  || "");
// //   const [f1, setF1] = useState(false);
// //   const [f2, setF2] = useState(false);

// //   const inputStyle = (focused) => ({
// //     display: "block", width: "100%", background: "#0c0c0c",
// //     border: `0.5px solid ${focused ? "#CC5327" : "#252525"}`,
// //     borderRadius: 7, padding: "9px 12px", fontSize: 12, color: "#ddd",
// //     outline: "none", fontFamily: "inherit", marginBottom: 14,
// //     boxSizing: "border-box", transition: "border-color .12s",
// //   });

// //   return (
// //     <Overlay onBgClick={onClose}>
// //       <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", marginBottom: 18 }}>Edit item</h2>
// //       <label style={labelStyle}>Title</label>
// //       <input value={title} onChange={(e) => setTitle(e.target.value)}
// //         placeholder="Enter a title"
// //         onFocus={() => setF1(true)} onBlur={() => setF1(false)}
// //         style={inputStyle(f1)} />
// //       <label style={labelStyle}>URL</label>
// //       <input value={link} onChange={(e) => setLink(e.target.value)}
// //         placeholder="https://..."
// //         onFocus={() => setF2(true)} onBlur={() => setF2(false)}
// //         style={inputStyle(f2)} />
// //       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 4 }}>
// //         <button onClick={onClose} style={{
// //           background: "transparent", border: "0.5px solid #252525",
// //           borderRadius: 6, padding: "7px 14px", fontSize: 11, color: "#555",
// //           cursor: "pointer", fontFamily: "inherit",
// //         }}>Cancel</button>
// //         <button onClick={() => onSave({ ...item, title: title.trim() || item.title, link: link.trim() || item.link })}
// //           style={{
// //             background: "#CC5327", border: "none", borderRadius: 6,
// //             padding: "7px 18px", fontSize: 11, fontWeight: 600,
// //             color: "#fff", cursor: "pointer", fontFamily: "inherit",
// //           }}>Save</button>
// //       </div>
// //     </Overlay>
// //   );
// // }

// // function DeleteModal({ item, onConfirm, onClose }) {
// //   return (
// //     <Overlay onBgClick={onClose}>
// //       <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e0e0e0", marginBottom: 14 }}>Delete this item?</h2>
// //       <div style={{
// //         background: "rgba(180,40,40,.06)", border: "0.5px solid rgba(180,40,40,.18)",
// //         borderRadius: 7, padding: "10px 12px", marginBottom: 18,
// //         fontSize: 11, color: "#b07070", lineHeight: 1.6,
// //       }}>
// //         <strong style={{ color: "#c88" }}>"{item.title || "Untitled"}"</strong> will be permanently removed.
// //       </div>
// //       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
// //         <button onClick={onClose} style={{
// //           background: "transparent", border: "0.5px solid #252525",
// //           borderRadius: 6, padding: "7px 14px", fontSize: 11, color: "#555",
// //           cursor: "pointer", fontFamily: "inherit",
// //         }}>Cancel</button>
// //         <button onClick={onConfirm} style={{
// //           background: "#7a1a1a", border: "0.5px solid #9a2a2a",
// //           borderRadius: 6, padding: "7px 18px", fontSize: 11,
// //           fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit",
// //         }}>Delete</button>
// //       </div>
// //     </Overlay>
// //   );
// // }

// // // ── Dashboard ─────────────────────────────────────────────────
// // export default function Dashboard() {
// //   const [data,       setData]       = useState([]);
// //   const [editItem,   setEditItem]   = useState(null);
// //   const [deleteItem, setDeleteItem] = useState(null);
// //   const [loading,    setLoading]    = useState(true);
// //   const [error,      setError]      = useState(null);

// //   const user     = useSelector((s) => s.app.signupform.f_name);
// //   const dispatch = useDispatch();
// //   dispatch(SetItem("Dashboard"));

// //   useEffect(() => {
// //     (async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.get("http://localhost:3000/getdata", {
// //           headers: { authorization: localStorage.getItem("token") },
// //         });
// //         setData(res.data.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError("Couldn't load items.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     })();
// //   }, []);

// //   const handleEditSave = async (updated) => {
// //     try {
// //       await axios.put(
// //         `http://localhost:3000/update/${updated._id}`,
// //         { title: updated.title, link: updated.link },
// //         { headers: { authorization: localStorage.getItem("token") } }
// //       );
// //       setData((p) => p.map((d) => (d._id === updated._id ? updated : d)));
// //     } catch (e) { console.error(e); }
// //     finally { setEditItem(null); }
// //   };

// //   const handleDeleteConfirm = async () => {
// //     if (!deleteItem) return;
// //     try {
// //       await axios.delete(
// //         `http://localhost:3000/delete/${deleteItem._id}`,
// //         { headers: { authorization: localStorage.getItem("token") } }
// //       );
// //       setData((p) => p.filter((d) => d._id !== deleteItem._id));
// //     } catch (e) { console.error(e); }
// //     finally { setDeleteItem(null); }
// //   };

// //   return (
// //     <div style={{
// //       minHeight: "100vh",
// //       background: "#0c0c0c",
// //       fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
// //     }}>
// //       <div style={{
// //         display: "grid",
// //         gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
// //         gap: 16,
// //         padding: 24,
// //       }}>
// //         {loading && (
// //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#333", padding: "80px 0", textAlign: "center" }}>
// //             Loading…
// //           </p>
// //         )}
// //         {error && !loading && (
// //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#7a2828", padding: "80px 0", textAlign: "center" }}>
// //             {error}
// //           </p>
// //         )}
// //         {!loading && !error && data.length === 0 && (
// //           <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#333", padding: "80px 0", textAlign: "center" }}>
// //             Nothing saved yet.
// //           </p>
// //         )}
// //         {!loading && !error && data.map((item) => (
// //           <Card key={item._id} item={item} onEdit={setEditItem} onDelete={setDeleteItem} />
// //         ))}
// //       </div>

// //       {editItem   && <EditModal   item={editItem}   onSave={handleEditSave}        onClose={() => setEditItem(null)}   />}
// //       {deleteItem && <DeleteModal item={deleteItem} onConfirm={handleDeleteConfirm} onClose={() => setDeleteItem(null)} />}
// //     </div>
// //   );
// // }






























// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { SetItem } from "../redux/fetures/Slice";

// // ── Tokens ────────────────────────────────────────────────────
// const T = {
//   bg:        "#080808",
//   surface:   "#101010",
//   surfaceHi: "#141414",
//   border:    "#1c1c1c",
//   borderHi:  "#2e2e2e",
//   accent:    "#E8572A",
//   accentDim: "rgba(232,87,42,0.12)",
//   textHi:    "#f0ede8",
//   textMid:   "#888",
//   textDim:   "#3a3a3a",
//   danger:    "#c0392b",
//   dangerDim: "rgba(192,57,43,0.10)",
//   font:      "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
//   mono:      "'SF Mono', 'Fira Mono', 'Consolas', monospace",
// };

// // ── Type detector ─────────────────────────────────────────────
// function getType(url = "") {
//   const u = url.toLowerCase();
//   if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
//   if (u.includes("instagram.com"))                          return "instagram";
//   if (u.includes("x.com") || u.includes("twitter.com"))    return "twitter";
//   if (u.endsWith(".pdf"))                                   return "pdf";
//   if (u.includes("cloudinary.com")) {
//     if (u.includes("/raw/"))                                return "pdf";
//     if (!u.includes("/image/") && !u.includes("/video/"))  return "pdf";
//     return "image";
//   }
//   if (/\.(jpe?g|png|gif|webp|avif)(\?|$)/.test(u))        return "image";
//   return "link";
// }

// function getYouTubeId(url) {
//   if (url.includes("/embed/"))           return url.split("/embed/")[1]?.split("?")[0] || "";
//   if (url.includes("youtube.com/watch")) { try { return new URL(url).searchParams.get("v") || ""; } catch { return ""; } }
//   if (url.includes("youtu.be/"))         return url.split("youtu.be/")[1]?.split("?")[0] || "";
//   return "";
// }

// const MEDIA_H = 196;

// // ── Media components ──────────────────────────────────────────
// function YouTubeThumb({ url, title }) {
//   return (
//     <iframe
//       src={`https://www.youtube.com/embed/${getYouTubeId(url)}?rel=0&modestbranding=1`}
//       title={title} loading="lazy"
//       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       allowFullScreen
//       style={{ display: "block", width: "100%", height: MEDIA_H, border: "none" }}
//     />
//   );
// }

// function ImageThumb({ url, title }) {
//   const [dead, setDead] = useState(false);
//   if (dead) return <MediaPlaceholder icon={<ImgIcon />} label="Image unavailable" />;
//   return (
//     <img src={url} alt={title} loading="lazy" onError={() => setDead(true)}
//       style={{ display: "block", width: "100%", height: MEDIA_H, objectFit: "cover" }} />
//   );
// }

// function PdfThumb({ url, title }) {
//   return (
//     <div style={{ position: "relative", width: "100%", height: MEDIA_H, background: "#0a0a0a" }}>
//       <iframe src={url} title={title}
//         style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
//       <div
//         onClick={() => window.open(url, "_blank", "noreferrer")}
//         style={{
//           position: "absolute", inset: 0, cursor: "pointer",
//           display: "flex", flexDirection: "column",
//           alignItems: "center", justifyContent: "flex-end",
//           padding: "0 0 14px",
//           background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)",
//         }}
//       >
//         <span style={{
//           fontSize: 10, fontWeight: 600, fontFamily: T.mono, letterSpacing: ".08em",
//           color: T.accent, border: `0.5px solid ${T.accent}44`,
//           borderRadius: 5, padding: "4px 12px", background: T.accentDim,
//         }}>
//           OPEN PDF ↗
//         </span>
//       </div>
//     </div>
//   );
// }

// function InstagramThumb({ url }) {
//   useEffect(() => {
//     if (window.instgrm) window.instgrm.Embeds.process();
//     else {
//       const s = document.createElement("script");
//       s.src = "https://www.instagram.com/embed.js";
//       s.async = true;
//       document.body.appendChild(s);
//       s.onload = () => window.instgrm?.Embeds.process();
//     }
//   }, [url]);
//   return (
//     <div style={{ height: MEDIA_H, overflowY: "auto", background: T.surface }}>
//       <blockquote className="instagram-media"
//         data-instgrm-permalink={url.split("?")[0]}
//         data-instgrm-version="14"
//         style={{ margin: 0, width: "100%" }} />
//     </div>
//   );
// }

// function TwitterThumb({ url }) {
//   useEffect(() => {
//     if (window.twttr) window.twttr.widgets.load();
//     else {
//       const s = document.createElement("script");
//       s.src = "https://platform.twitter.com/widgets.js";
//       s.async = true;
//       document.body.appendChild(s);
//       s.onload = () => window.twttr?.widgets.load();
//     }
//   }, [url]);
//   return (
//     <div style={{ height: MEDIA_H, overflowY: "auto", background: T.surface, padding: "8px 0" }}>
//       <blockquote className="twitter-tweet" style={{ margin: "0 auto" }}>
//         <a href={url.split("?")[0]} target="_blank" rel="noreferrer">Loading post…</a>
//       </blockquote>
//     </div>
//   );
// }

// function LinkThumb({ url }) {
//   const [h, setH] = useState(false);
//   let host = "";
//   try { host = new URL(url).hostname.replace("www.", ""); } catch {}
//   return (
//     <a href={url} target="_blank" rel="noreferrer"
//       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//       style={{
//         display: "flex", flexDirection: "column", alignItems: "center",
//         justifyContent: "center", gap: 12, height: MEDIA_H,
//         textDecoration: "none",
//         background: h ? "#0e0e0e" : T.surface,
//         transition: "background .15s",
//       }}
//     >
//       <div style={{
//         width: 44, height: 44, borderRadius: 11,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         background: T.surfaceHi, border: `0.5px solid ${T.border}`,
//       }}>
//         <LinkIcon />
//       </div>
//       {host && (
//         <span style={{ fontSize: 11, fontFamily: T.mono, color: T.textDim, letterSpacing: ".02em" }}>
//           {host}
//         </span>
//       )}
//       <span style={{
//         fontSize: 9, fontWeight: 700, letterSpacing: ".10em",
//         color: T.textMid, border: `0.5px solid ${T.border}`,
//         borderRadius: 4, padding: "3px 10px", background: T.surfaceHi,
//       }}>
//         OPEN ↗
//       </span>
//     </a>
//   );
// }

// function MediaPlaceholder({ icon, label }) {
//   return (
//     <div style={{
//       display: "flex", flexDirection: "column", alignItems: "center",
//       justifyContent: "center", gap: 8, height: MEDIA_H,
//       background: T.surface,
//     }}>
//       {icon}
//       <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.font }}>{label}</span>
//     </div>
//   );
// }

// function CardMedia({ url, title }) {
//   const t = getType(url);
//   return (
//     <div style={{ lineHeight: 0, flexShrink: 0, background: T.surface }}>
//       {t === "youtube"   && <YouTubeThumb   url={url} title={title} />}
//       {t === "image"     && <ImageThumb     url={url} title={title} />}
//       {t === "pdf"       && <PdfThumb       url={url} title={title} />}
//       {t === "instagram" && <InstagramThumb url={url} />}
//       {t === "twitter"   && <TwitterThumb   url={url} />}
//       {t === "link"      && <LinkThumb      url={url} />}
//     </div>
//   );
// }

// // ── Badge ─────────────────────────────────────────────────────
// const BADGE = {
//   youtube:   { label: "YouTube",   color: "#FF4444" },
//   image:     { label: "Image",     color: "#5B9FE8" },
//   pdf:       { label: "PDF",       color: T.accent  },
//   instagram: { label: "Instagram", color: "#C13584" },
//   twitter:   { label: "𝕏 Post",   color: "#4A9FD8" },
//   link:      { label: "Link",      color: T.textMid },
// };

// function TypeBadge({ url }) {
//   const t = getType(url);
//   const b = BADGE[t] || BADGE.link;
//   return (
//     <span style={{
//       fontSize: 9, fontWeight: 700, fontFamily: T.mono, letterSpacing: ".08em",
//       padding: "2px 7px", borderRadius: 4, flexShrink: 0,
//       color: b.color,
//       background: `${b.color}14`,
//       border: `0.5px solid ${b.color}30`,
//     }}>
//       {b.label}
//     </span>
//   );
// }

// // ── Card ──────────────────────────────────────────────────────
// function Card({ item, onEdit, onDelete }) {
//   const [h, setH] = useState(false);
//   return (
//     <article
//       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//       style={{
//         background: T.surface,
//         border: `0.5px solid ${h ? T.borderHi : T.border}`,
//         borderRadius: 14, overflow: "hidden",
//         display: "flex", flexDirection: "column",
//         transition: "border-color .2s, transform .2s, box-shadow .2s",
//         transform: h ? "translateY(-2px)" : "translateY(0)",
//         boxShadow: h
//           ? "0 8px 32px rgba(0,0,0,0.55)"
//           : "0 1px 4px rgba(0,0,0,0.3)",
//       }}
//     >
//       <CardMedia url={item.link} title={item.title} />

//       <div style={{
//         padding: "12px 14px 14px",
//         borderTop: `0.5px solid ${T.border}`,
//         display: "flex", flexDirection: "column", gap: 10,
//         flex: 1,
//       }}>
//         {/* Badge + title */}
//         <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
//           <TypeBadge url={item.link} />
//           <span title={item.title} style={{
//             flex: 1, fontSize: 12.5, fontWeight: 500,
//             color: T.textHi, lineHeight: 1.45,
//             display: "-webkit-box", WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical", overflow: "hidden",
//             fontFamily: T.font,
//           }}>
//             {item.title || "Untitled"}
//           </span>
//         </div>

//         {/* Actions */}
//         <div style={{ display: "flex", gap: 6 }}>
//           <ActionBtn onClick={() => onEdit(item)} icon={<EditIcon />} label="Edit" />
//           <ActionBtn onClick={() => onDelete(item)} icon={<TrashIcon />} label="Delete" danger />
//         </div>
//       </div>
//     </article>
//   );
// }

// function ActionBtn({ onClick, icon, label, danger }) {
//   const [h, setH] = useState(false);
//   return (
//     <button
//       onClick={onClick}
//       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//       style={{
//         display: "inline-flex", alignItems: "center", gap: 5,
//         fontSize: 11, fontWeight: 500, fontFamily: T.font,
//         padding: "6px 12px", borderRadius: 7, cursor: "pointer",
//         border: "0.5px solid", transition: "all .15s",
//         outline: "none",
//         background: danger
//           ? (h ? T.dangerDim : "transparent")
//           : (h ? T.surfaceHi : "transparent"),
//         borderColor: danger
//           ? (h ? `${T.danger}55` : `${T.danger}28`)
//           : (h ? T.borderHi : T.border),
//         color: danger
//           ? (h ? T.danger : "#7a3a3a")
//           : (h ? T.textMid : T.textDim),
//       }}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// }

// // ── Modals ────────────────────────────────────────────────────
// function Overlay({ onBgClick, children }) {
//   return (
//     <div onClick={onBgClick} style={{
//       position: "fixed", inset: 0, zIndex: 1000,
//       background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)",
//       display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
//     }}>
//       <div onClick={(e) => e.stopPropagation()} style={{
//         background: T.surface, border: `0.5px solid ${T.borderHi}`,
//         borderRadius: 16, padding: 28, width: "100%", maxWidth: 420,
//         boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
//       }}>
//         {children}
//       </div>
//     </div>
//   );
// }

// function Field({ label, value, onChange, placeholder, focused, onFocus, onBlur }) {
//   return (
//     <div style={{ marginBottom: 16 }}>
//       <label style={{
//         display: "block", fontSize: 9, fontWeight: 700,
//         letterSpacing: ".12em", textTransform: "uppercase",
//         color: focused ? T.accent : T.textDim,
//         marginBottom: 6, transition: "color .15s", fontFamily: T.mono,
//       }}>
//         {label}
//       </label>
//       <input
//         value={value} onChange={onChange} placeholder={placeholder}
//         onFocus={onFocus} onBlur={onBlur}
//         style={{
//           display: "block", width: "100%", background: T.bg,
//           border: `0.5px solid ${focused ? T.accent : T.border}`,
//           borderRadius: 8, padding: "10px 13px",
//           fontSize: 12.5, color: T.textHi, fontFamily: T.font,
//           outline: "none", boxSizing: "border-box",
//           transition: "border-color .15s",
//           caretColor: T.accent,
//         }}
//       />
//     </div>
//   );
// }

// function ModalBtn({ onClick, variant, children }) {
//   const [h, setH] = useState(false);
//   const styles = {
//     save:   { bg: h ? "#d94f24" : T.accent,   border: "none",          color: "#fff"    },
//     cancel: { bg: "transparent",               border: `0.5px solid ${T.border}`, color: T.textMid },
//     delete: { bg: h ? "#8a1a1a" : "#6e1616",   border: `0.5px solid #9a2a2a`, color: "#fff" },
//   };
//   const s = styles[variant] || styles.cancel;
//   return (
//     <button onClick={onClick}
//       onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
//       style={{
//         background: s.bg, border: s.border, color: s.color,
//         borderRadius: 8, padding: "8px 20px",
//         fontSize: 12, fontWeight: 600, fontFamily: T.font,
//         cursor: "pointer", transition: "background .15s",
//       }}>
//       {children}
//     </button>
//   );
// }

// function EditModal({ item, onSave, onClose }) {
//   const [title, setTitle] = useState(item.title || "");
//   const [link,  setLink]  = useState(item.link  || "");
//   const [f1, setF1] = useState(false);
//   const [f2, setF2] = useState(false);
//   return (
//     <Overlay onBgClick={onClose}>
//       <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: T.textDim, margin: "0 0 4px", fontFamily: T.mono }}>Edit item</p>
//       <h2 style={{ fontSize: 18, fontWeight: 600, color: T.textHi, margin: "0 0 22px", fontFamily: T.font }}>
//         {item.title || "Untitled"}
//       </h2>
//       <Field label="Title" value={title} onChange={(e) => setTitle(e.target.value)}
//         placeholder="Give this a title…"
//         focused={f1} onFocus={() => setF1(true)} onBlur={() => setF1(false)} />
//       <Field label="URL" value={link} onChange={(e) => setLink(e.target.value)}
//         placeholder="https://…"
//         focused={f2} onFocus={() => setF2(true)} onBlur={() => setF2(false)} />
//       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
//         <ModalBtn onClick={onClose} variant="cancel">Cancel</ModalBtn>
//         <ModalBtn onClick={() => onSave({ ...item, title: title.trim() || item.title, link: link.trim() || item.link })} variant="save">Save changes</ModalBtn>
//       </div>
//     </Overlay>
//   );
// }

// function DeleteModal({ item, onConfirm, onClose }) {
//   return (
//     <Overlay onBgClick={onClose}>
//       <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#7a3333", margin: "0 0 4px", fontFamily: T.mono }}>Confirm delete</p>
//       <h2 style={{ fontSize: 18, fontWeight: 600, color: T.textHi, margin: "0 0 18px", fontFamily: T.font }}>
//         Remove this item?
//       </h2>
//       <div style={{
//         background: "rgba(192,57,43,0.06)", border: "0.5px solid rgba(192,57,43,0.2)",
//         borderRadius: 8, padding: "12px 14px", marginBottom: 22,
//         fontSize: 12.5, color: "#b07070", lineHeight: 1.6, fontFamily: T.font,
//       }}>
//         <strong style={{ color: "#d08080" }}>"{item.title || "Untitled"}"</strong> will be permanently removed from your brain. This can't be undone.
//       </div>
//       <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
//         <ModalBtn onClick={onClose} variant="cancel">Cancel</ModalBtn>
//         <ModalBtn onClick={onConfirm} variant="delete">Delete</ModalBtn>
//       </div>
//     </Overlay>
//   );
// }

// // ── Header ────────────────────────────────────────────────────
// function Header({ user, count }) {
//   const initials = user
//     ? user.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
//     : "SB";

//   return (
//     <header style={{
//       padding: "40px 40px 32px",
//       borderBottom: `0.5px solid ${T.border}`,
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//     }}>
//       {/* Left: identity */}
//       <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//         <div style={{
//           width: 44, height: 44, borderRadius: 12,
//           background: T.accentDim, border: `0.5px solid ${T.accent}33`,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 15, fontWeight: 700, color: T.accent,
//           fontFamily: T.font, flexShrink: 0,
//           letterSpacing: ".02em",
//         }}>
//           {initials}
//         </div>
//         <div>
//           <p style={{
//             margin: 0, fontSize: 10, fontWeight: 600, letterSpacing: ".14em",
//             textTransform: "uppercase", color: T.textDim,
//             fontFamily: T.mono,
//           }}>
//             Second Brain
//           </p>
//           <h1 style={{
//             margin: "2px 0 0", fontSize: 22, fontWeight: 600,
//             color: T.textHi, letterSpacing: "-.02em", fontFamily: T.font,
//           }}>
//             {user ? `${user}'s collection` : "Your collection"}
//           </h1>
//         </div>
//       </div>

//       {/* Right: count pill */}
//       {count > 0 && (
//         <span style={{
//           fontSize: 11, fontWeight: 600, fontFamily: T.mono,
//           color: T.textDim, background: T.surfaceHi,
//           border: `0.5px solid ${T.border}`,
//           borderRadius: 20, padding: "5px 14px",
//           letterSpacing: ".04em",
//         }}>
//           {count} {count === 1 ? "item" : "items"}
//         </span>
//       )}
//     </header>
//   );
// }

// // ── Empty / Loading states ────────────────────────────────────
// function StateMessage({ children }) {
//   return (
//     <div style={{ gridColumn: "1/-1", padding: "80px 0", textAlign: "center" }}>
//       <p style={{ margin: 0, fontSize: 13, color: T.textDim, fontFamily: T.font }}>
//         {children}
//       </p>
//     </div>
//   );
// }

// // ── Dashboard ─────────────────────────────────────────────────
// export default function Dashboard() {
//   const [data,       setData]       = useState([]);
//   const [editItem,   setEditItem]   = useState(null);
//   const [deleteItem, setDeleteItem] = useState(null);
//   const [loading,    setLoading]    = useState(true);
//   const [error,      setError]      = useState(null);

//   const user     = useSelector((s) => s.app.signupform.f_name);
//   const dispatch = useDispatch();
//   dispatch(SetItem("Dashboard"));

//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("http://localhost:3000/getdata", {
//           headers: { authorization: localStorage.getItem("token") },
//         });
//         setData(res.data.data);
//       } catch (err) {
//         console.error(err);
//         setError("Couldn't load your items. Check your connection and try again.");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const handleEditSave = async (updated) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/update/${updated._id}`,
//         { title: updated.title, link: updated.link },
//         { headers: { authorization: localStorage.getItem("token") } }
//       );
//       setData((p) => p.map((d) => (d._id === updated._id ? updated : d)));
//     } catch (e) { console.error(e); }
//     finally { setEditItem(null); }
//   };

//   const handleDeleteConfirm = async () => {
//     if (!deleteItem) return;
//     try {
//       await axios.delete(
//         `http://localhost:3000/delete/${deleteItem._id}`,
//         { headers: { authorization: localStorage.getItem("token") } }
//       );
//       setData((p) => p.filter((d) => d._id !== deleteItem._id));
//     } catch (e) { console.error(e); }
//     finally { setDeleteItem(null); }
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font }}>
//       <Header user={user} count={data.length} />

//       <main style={{
//         display: "grid",
//         gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
//         gap: 20,
//         padding: "32px 40px 60px",
//       }}>
//         {loading && <StateMessage>Loading your collection…</StateMessage>}

//         {error && !loading && (
//           <div style={{ gridColumn: "1/-1", padding: "60px 0", textAlign: "center" }}>
//             <p style={{ margin: "0 0 4px", fontSize: 13, color: "#c07070", fontFamily: T.font }}>{error}</p>
//           </div>
//         )}

//         {!loading && !error && data.length === 0 && (
//           <div style={{ gridColumn: "1/-1", padding: "80px 0", textAlign: "center" }}>
//             <p style={{ margin: "0 0 6px", fontSize: 20, color: T.borderHi }}>∅</p>
//             <p style={{ margin: 0, fontSize: 13, color: T.textDim }}>Nothing saved yet — add something to start.</p>
//           </div>
//         )}

//         {!loading && !error && data.map((item) => (
//           <Card key={item._id} item={item} onEdit={setEditItem} onDelete={setDeleteItem} />
//         ))}
//       </main>

//       {editItem   && <EditModal   item={editItem}   onSave={handleEditSave}         onClose={() => setEditItem(null)}   />}
//       {deleteItem && <DeleteModal item={deleteItem} onConfirm={handleDeleteConfirm} onClose={() => setDeleteItem(null)} />}
//     </div>
//   );
// }

// // ── Icons ─────────────────────────────────────────────────────
// function EditIcon() {
//   return (
//     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
//       <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
//     </svg>
//   );
// }
// function TrashIcon() {
//   return (
//     <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//       strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="3 6 5 6 21 6"/>
//       <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
//       <path d="M10 11v6M14 11v6"/>
//       <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
//     </svg>
//   );
// }
// function LinkIcon() {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444"
//       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
//       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
//     </svg>
//   );
// }
// function ImgIcon() {
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333"
//       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//       <rect x="3" y="3" width="18" height="18" rx="2"/>
//       <circle cx="8.5" cy="8.5" r="1.5"/>
//       <path d="M21 15l-5-5L5 21"/>
//     </svg>
//   );
// }



import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetItem, Setcarddata } from "../redux/fetures/Slice";

// ── Tokens ────────────────────────────────────────────────────
const T = {
  bg:         "#080808",
  surface:    "#101010",
  surfaceHi:  "#141414",
  surface2:   "#1a1a1a",
  border:     "#1e1e1e",
  borderHi:   "#2e2e2e",
  borderFocus:"#3a6fd8",
  accent:     "#3a6fd8",
  accentDim:  "rgba(58,111,216,0.10)",
  textHi:     "#f0ede8",
  textMid:    "#888",
  textDim:    "#444",
  danger:     "#c0392b",
  dangerDim:  "rgba(192,57,43,0.10)",
  dangerBorder:"rgba(192,57,43,0.30)",
  font:       "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
  mono:       "'SF Mono', 'Fira Mono', 'Consolas', monospace",
};

// ── Type detector ─────────────────────────────────────────────
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

// ── Media components ──────────────────────────────────────────
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
    <img
      src={url} alt={title} loading="lazy"
      onError={() => setDead(true)}
      style={{ display: "block", width: "100%", height: MEDIA_H, objectFit: "cover" }}
    />
  );
}

function PdfThumb({ url, title }) {
  return (
    <div style={{ position: "relative", width: "100%", height: MEDIA_H, background: "#0a0a0a" }}>
      <iframe src={url} title={title}
        style={{ width: "100%", height: "100%", border: "none", display: "block" }} />
      <div
        onClick={() => window.open(url, "_blank", "noreferrer")}
        style={{
          position: "absolute", inset: 0, cursor: "pointer",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end",
          padding: "0 0 14px",
          background: "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 60%)",
        }}
      >
        <span style={{
          fontSize: 10, fontWeight: 600, fontFamily: T.mono, letterSpacing: ".08em",
          color: T.danger,
          border: `0.5px solid ${T.dangerBorder}`,
          borderRadius: 5, padding: "4px 12px", background: T.dangerDim,
        }}>
          OPEN PDF ↗
        </span>
      </div>
    </div>
  );
}

function InstagramThumb({ url }) {
  useEffect(() => {
    if (window.instgrm) window.instgrm.Embeds.process();
    else {
      const s = document.createElement("script");
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
      s.onload = () => window.instgrm?.Embeds.process();
    }
  }, [url]);
  return (
    <div style={{ height: MEDIA_H, overflowY: "auto", background: T.surface }}>
      <blockquote className="instagram-media"
        data-instgrm-permalink={url.split("?")[0]}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%" }} />
    </div>
  );
}

function TwitterThumb({ url }) {
  useEffect(() => {
    if (window.twttr) window.twttr.widgets.load();
    else {
      const s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
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
        textDecoration: "none",
        background: h ? "#0e0e0e" : T.surface,
        transition: "background .15s",
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: T.surfaceHi, border: `0.5px solid ${T.border}`,
      }}>
        <LinkIcon />
      </div>
      {host && (
        <span style={{ fontSize: 11, fontFamily: T.mono, color: T.textDim }}>
          {host}
        </span>
      )}
      <span style={{
        fontSize: 9, fontWeight: 700, letterSpacing: ".10em",
        color: T.textMid, border: `0.5px solid ${T.border}`,
        borderRadius: 4, padding: "3px 10px", background: T.surfaceHi,
      }}>
        OPEN ↗
      </span>
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
    <div style={{ lineHeight: 0, flexShrink: 0, background: T.surface }}>
      {t === "youtube"   && <YouTubeThumb   url={url} title={title} />}
      {t === "image"     && <ImageThumb     url={url} title={title} />}
      {t === "pdf"       && <PdfThumb       url={url} title={title} />}
      {t === "instagram" && <InstagramThumb url={url} />}
      {t === "twitter"   && <TwitterThumb   url={url} />}
      {t === "link"      && <LinkThumb      url={url} />}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────
const BADGE = {
  youtube:   { label: "YouTube",   color: "#FF4444" },
  image:     { label: "Image",     color: "#5B9FE8" },
  pdf:       { label: "PDF",       color: "#c0392b" },
  instagram: { label: "Instagram", color: "#C13584" },
  twitter:   { label: "𝕏 Post",   color: "#4A9FD8" },
  link:      { label: "Link",      color: "#666"    },
};

function TypeBadge({ url }) {
  const t = getType(url);
  const b = BADGE[t] || BADGE.link;
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, fontFamily: T.mono, letterSpacing: ".08em",
      padding: "2px 7px", borderRadius: 4, flexShrink: 0,
      color: b.color,
      background: `${b.color}14`,
      border: `0.5px solid ${b.color}30`,
    }}>
      {b.label}
    </span>
  );
}

// ── Search + Filter bar ───────────────────────────────────────
const FILTERS = [
  { key: "all",       label: "All"      },
  { key: "youtube",   label: "YouTube"  },
  { key: "image",     label: "Images"   },
  { key: "pdf",       label: "PDFs"     },
  { key: "instagram", label: "Instagram"},
  { key: "twitter",   label: "X / Twitter"},
  { key: "link",      label: "Links"    },
];

function Toolbar({ search, onSearch, filter, onFilter, view, onView }) {
  return (
    <div style={{ borderBottom: `0.5px solid ${T.border}`, background: T.surfaceHi }}>
      {/* Search + view toggle row */}
      <div style={{
        padding: "12px 28px", display: "flex", alignItems: "center", gap: 10,
        borderBottom: `0.5px solid ${T.border}`,
      }}>
        {/* Search */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 8,
          background: T.surface, border: `0.5px solid ${T.border}`,
          borderRadius: 8, padding: "0 12px", height: 36,
        }}>
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search your collection…"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 13, color: T.textHi, fontFamily: T.font,
              caretColor: T.accent,
            }}
          />
          {search && (
            <button onClick={() => onSearch("")} style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: T.textDim, fontSize: 16, lineHeight: 1, padding: 0,
            }}>×</button>
          )}
        </div>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 4 }}>
          {[["grid", "⊞"], ["list", "☰"]].map(([v, icon]) => (
            <button key={v} onClick={() => onView(v)} style={{
              width: 36, height: 36, borderRadius: 8, cursor: "pointer",
              background: view === v ? T.surface2 : "transparent",
              border: `0.5px solid ${view === v ? T.borderHi : T.border}`,
              color: view === v ? T.textMid : T.textDim,
              fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .15s",
            }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips row */}
      <div style={{ display: "flex", gap: 6, padding: "10px 28px", overflowX: "auto" }}>
        {FILTERS.map(({ key, label }) => (
          <button key={key} onClick={() => onFilter(key)} style={{
            fontSize: 11, fontWeight: 500, fontFamily: T.font,
            padding: "4px 12px", borderRadius: 20, cursor: "pointer",
            border: `0.5px solid ${filter === key ? T.borderFocus : T.border}`,
            background: filter === key ? T.accentDim : "transparent",
            color: filter === key ? T.accent : T.textDim,
            transition: "all .15s", whiteSpace: "nowrap",
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Card ──────────────────────────────────────────────────────
function Card({ item, onEdit, onDelete, listView }) {
  const [h, setH] = useState(false);
  return (
    <article
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: T.surface,
        border: `0.5px solid ${h ? T.borderHi : T.border}`,
        borderRadius: 12, overflow: "hidden",
        display: "flex", flexDirection: listView ? "row" : "column",
        transition: "border-color .2s, transform .2s, box-shadow .2s",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        boxShadow: h ? "0 8px 32px rgba(0,0,0,0.55)" : "0 1px 4px rgba(0,0,0,0.3)",
      }}
    >
      <div style={listView ? { width: 140, flexShrink: 0 } : {}}>
        <CardMedia url={item.link} title={item.title} />
      </div>

      <div style={{
        padding: "12px 14px 14px",
        borderTop: listView ? "none" : `0.5px solid ${T.border}`,
        borderLeft: listView ? `0.5px solid ${T.border}` : "none",
        display: "flex", flexDirection: "column", gap: 10, flex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <TypeBadge url={item.link} />
          <span title={item.title} style={{
            flex: 1, fontSize: 12.5, fontWeight: 500, color: T.textHi,
            lineHeight: 1.45,
            display: "-webkit-box", WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical", overflow: "hidden",
            fontFamily: T.font,
          }}>
            {item.title || "Untitled"}
          </span>
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <ActionBtn onClick={() => onEdit(item)} icon={<EditIcon />} label="Edit" />
          <ActionBtn onClick={() => onDelete(item)} icon={<TrashIcon />} label="Delete" danger />
        </div>
      </div>
    </article>
  );
}

function ActionBtn({ onClick, icon, label, danger }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: 11, fontWeight: 500, fontFamily: T.font,
        padding: "5px 11px", borderRadius: 7, cursor: "pointer",
        border: "0.5px solid", transition: "all .15s", outline: "none",
        background: danger
          ? (h ? T.dangerDim : "transparent")
          : (h ? T.surfaceHi : "transparent"),
        borderColor: danger
          ? (h ? T.dangerBorder : "rgba(192,57,43,0.18)")
          : (h ? T.borderHi : T.border),
        color: danger
          ? (h ? T.danger : "#7a3a3a")
          : (h ? T.textMid : T.textDim),
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Modals ────────────────────────────────────────────────────
function Overlay({ onBgClick, children }) {
  return (
    <div onClick={onBgClick} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: T.surfaceHi, border: `0.5px solid ${T.borderHi}`,
        borderRadius: 16, padding: 28, width: "100%", maxWidth: 420,
        boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
      }}>
        {children}
      </div>
    </div>
  );
}

const overlineStyle = (color) => ({
  fontSize: 9, fontWeight: 700, letterSpacing: ".12em",
  textTransform: "uppercase", color: color || T.textDim,
  marginBottom: 4, fontFamily: T.mono,
});

function Field({ label, value, onChange, placeholder, focused, onFocus, onBlur }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 9, fontWeight: 700,
        letterSpacing: ".12em", textTransform: "uppercase",
        fontFamily: T.mono, marginBottom: 6,
        color: focused ? T.accent : T.textDim, transition: "color .15s",
      }}>
        {label}
      </label>
      <input
        value={value} onChange={onChange} placeholder={placeholder}
        onFocus={onFocus} onBlur={onBlur}
        style={{
          display: "block", width: "100%", background: T.bg,
          border: `0.5px solid ${focused ? T.borderFocus : T.border}`,
          borderRadius: 8, padding: "10px 13px",
          fontSize: 12.5, color: T.textHi, fontFamily: T.font,
          outline: "none", boxSizing: "border-box",
          transition: "border-color .15s", caretColor: T.accent,
        }}
      />
    </div>
  );
}

function ModalBtn({ onClick, variant, children }) {
  const [h, setH] = useState(false);
  const styles = {
    save:   { bg: h ? "#2a5fc4" : T.accent,  border: "none",                           color: "#fff" },
    cancel: { bg: "transparent",              border: `0.5px solid ${T.border}`,        color: T.textMid },
    delete: { bg: h ? "#8a1a1a" : "#6e1616", border: `0.5px solid ${T.dangerBorder}`,  color: "#fff" },
  };
  const s = styles[variant] || styles.cancel;
  return (
    <button onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        background: s.bg, border: s.border, color: s.color,
        borderRadius: 8, padding: "8px 20px",
        fontSize: 12, fontWeight: 600, fontFamily: T.font,
        cursor: "pointer", transition: "background .15s",
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
      <h2 style={{ fontSize: 18, fontWeight: 600, color: T.textHi, margin: "0 0 22px", fontFamily: T.font }}>
        {item.title || "Untitled"}
      </h2>
      <Field label="Title" value={title} onChange={(e) => setTitle(e.target.value)}
        placeholder="Give this a title…"
        focused={f1} onFocus={() => setF1(true)} onBlur={() => setF1(false)} />
      <Field label="URL" value={link} onChange={(e) => setLink(e.target.value)}
        placeholder="https://…"
        focused={f2} onFocus={() => setF2(true)} onBlur={() => setF2(false)} />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
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
      <h2 style={{ fontSize: 18, fontWeight: 600, color: T.textHi, margin: "0 0 18px", fontFamily: T.font }}>
        Remove this item?
      </h2>
      <div style={{
        background: T.dangerDim, border: `0.5px solid ${T.dangerBorder}`,
        borderRadius: 8, padding: "12px 14px", marginBottom: 22,
        fontSize: 12.5, color: "#b07070", lineHeight: 1.6, fontFamily: T.font,
      }}>
        <strong style={{ color: "#d08080" }}>"{item.title || "Untitled"}"</strong> will be permanently removed from your collection. This can't be undone.
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <ModalBtn onClick={onClose} variant="cancel">Cancel</ModalBtn>
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
      padding: "28px 28px 24px",
      borderBottom: `0.5px solid ${T.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          background: T.accentDim, border: `0.5px solid ${T.borderFocus}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 600, color: T.accent,
          fontFamily: T.font, flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <p style={{
            margin: 0, fontSize: 10, fontWeight: 600, letterSpacing: ".14em",
            textTransform: "uppercase", color: T.textDim, fontFamily: T.mono,
          }}>
            Second Brain
          </p>
          <h1 style={{
            margin: "2px 0 0", fontSize: 20, fontWeight: 600,
            color: T.textHi, letterSpacing: "-.02em", fontFamily: T.font,
          }}>
            {user ? `${user}'s collection` : "Your collection"}
          </h1>
        </div>
      </div>
      {count > 0 && (
        <span style={{
          fontSize: 11, fontWeight: 600, fontFamily: T.mono,
          color: T.textDim, background: T.surfaceHi,
          border: `0.5px solid ${T.border}`,
          borderRadius: 20, padding: "5px 14px", letterSpacing: ".04em",
        }}>
          {count} {count === 1 ? "item" : "items"}
        </span>
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
  const [view,       setView]       = useState("grid"); // "grid" | "list"

  const user     = useSelector((s) => s.app.signupform.f_name);
  const dispatch = useDispatch();
  dispatch(SetItem("Dashboard"));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/getdata", {
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
        `http://localhost:3000/update?id=${updated._id}`,
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
        `http://localhost:3000/delete?id=${deleteItem._id}`,
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setData((p) => p.filter((d) => d._id !== deleteItem._id));
    } catch (e) { console.error(e); }
    finally { setDeleteItem(null); }
  };

  // Filter + search
  const visible = data.filter((item) => {
    const typeMatch = filter === "all" || getType(item.link) === filter;
    const searchMatch = !search || (item.title || "").toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: T.font }}>
      <Header user={user} count={data.length} />

      <Toolbar
        search={search}   onSearch={setSearch}
        filter={filter}   onFilter={setFilter}
        view={view}       onView={setView}
      />

      <main style={{
        display: "grid",
        gridTemplateColumns: view === "list"
          ? "1fr"
          : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 16,
        padding: "24px 28px 60px",
      }}>
        {loading && (
          <p style={{ gridColumn: "1/-1", fontSize: 13, color: T.textDim, padding: "80px 0", textAlign: "center" }}>
            Loading your collection…
          </p>
        )}

        {error && !loading && (
          <p style={{ gridColumn: "1/-1", fontSize: 13, color: "#c07070", padding: "80px 0", textAlign: "center" }}>
            {error}
          </p>
        )}

        {!loading && !error && visible.length === 0 && (
          <div style={{ gridColumn: "1/-1", padding: "80px 0", textAlign: "center" }}>
            <p style={{ margin: "0 0 6px", fontSize: 24, color: T.border }}>∅</p>
            <p style={{ margin: 0, fontSize: 13, color: T.textDim }}>
              {data.length === 0 ? "Nothing saved yet — add something to start." : "No items match that filter."}
            </p>
          </div>
        )}

        {!loading && !error && visible.map((item) => (
          <Card
            key={item._id}
            item={item}
            onEdit={setEditItem}
            onDelete={setDeleteItem}
            listView={view === "list"}
          />
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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  );
}
function ImgIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#444"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}


