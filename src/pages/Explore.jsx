import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import ExploreGrid from "../components/ExploreGrid";

export default function Explore() {
  const { db } = useData();
  const [q, setQ] = useState("");
  const posts = db.posts.filter(p => {
    const owner = db.users.find(u => u.id === p.userId);
    return p.caption.toLowerCase().includes(q.toLowerCase()) || (owner?.username || "").toLowerCase().includes(q.toLowerCase());
  });

  return (
    <div className="container">
      <h1>Explore</h1>
      <input placeholder="Search posts or users..." value={q} onChange={e => setQ(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee", marginBottom: 12 }} />
      <ExploreGrid posts={posts} />
    </div>
  );
}
