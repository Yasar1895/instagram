import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";

export default function CreatePostModal() {
  const { addPost } = useData();
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [caption, setCaption] = useState("");

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageData(ev.target.result);
    reader.readAsDataURL(f);
  };

  const publish = () => {
    if (!imageData) return alert("Select image");
    addPost({ userId: user.id, image: imageData, caption });
    setShow(false);
    setImageData(null);
    setCaption("");
  };

  return (
    <>
      <button className="btn" onClick={() => setShow(true)}>Create</button>
      {show && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 420, background: "white", borderRadius: 12, padding: 18 }}>
            <h3>Create post</h3>
            <input type="file" accept="image/*" onChange={onFile} />
            {imageData && <img src={imageData} alt="preview" style={{ width: "100%", marginTop: 12, borderRadius: 8 }} />}
            <textarea placeholder="Caption" value={caption} onChange={e => setCaption(e.target.value)} style={{ width: "100%", height: 80, marginTop: 8 }} />
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn" onClick={publish}>Publish</button>
              <button className="btn secondary" onClick={() => setShow(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
