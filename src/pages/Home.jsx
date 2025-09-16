import React from "react";
import Stories from "../components/Stories";
import Post from "../components/Post";
import CreatePostModal from "../components/CreatePostModal";
import { useData } from "../contexts/DataContext";

export default function Home() {
  const { db } = useData();
  const posts = (db.posts || []).slice().sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Home</h1>
        <CreatePostModal />
      </div>
      <Stories />
      <div style={{ marginTop: 12 }}>
        {posts.map(p => <Post key={p.id} post={p} />)}
      </div>
    </div>
  );
}
