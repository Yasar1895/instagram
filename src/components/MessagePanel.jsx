import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

export default function MessagePanel() {
  const { user } = useAuth();
  const { db, sendMessage } = useData();
  const others = db.users.filter(u => u.id !== user.id);
  const [selected, setSelected] = useState(others[0]?.id || null);
  const thread = db.messages.find(m => m.members.includes(user.id) && m.members.includes(selected));
  const [text, setText] = useState("");

  const doSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage([user.id, selected], user.id, text.trim());
    setText("");
  };

  return (
    <div className="messages-layout container">
      <aside className="msg-list">
        {others.map(o => (
          <div key={o.id} onClick={() => setSelected(o.id)} style={{ display: "flex", gap: 8, cursor: "pointer", padding: 8 }}>
            <img src={o.avatar} alt={o.username} className="avatar-sm" />
            <div>
              <div style={{ fontWeight: 700 }}>{o.username}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{/* last message preview could go here */}</div>
            </div>
          </div>
        ))}
      </aside>

      <div className="msg-thread">
        <div style={{ minHeight: 300 }}>
          {(db.messages.find(m => m.members.includes(user.id) && m.members.includes(selected))?.threads || []).map(t => {
            const sender = db.users.find(u => u.id === t.sender) || {};
            return (
              <div key={t.id} className={`msg-bubble ${t.sender === user.id ? "me" : ""}`}>
                <strong>{sender.username}</strong>: {t.text}
              </div>
            );
          })}
        </div>

        <form onSubmit={doSend} style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <input value={text} onChange={e => setText(e.target.value)} placeholder="Message..." style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
          <button className="btn" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
