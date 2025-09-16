import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

export default function Post({ post }) {
  const { db, toggleLike, addComment, deletePost } = useData();
  const { user } = useAuth();
  const owner = db.users.find(u => u.id === post.userId) || {};
  const [comment, setComment] = useState("");

  const submitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(post.id, user.id, comment.trim());
    setComment("");
  };

  return (
    <div className="post-card container">
      <div className="post-header">
        <div className="left">
          <img src={owner.avatar} alt={owner.username} className="avatar-sm" />
          <div>
            <div style={{ fontWeight: 700 }}>{owner.username}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(post.createdAt).toLocaleString()}</div>
          </div>
        </div>
        {post.userId === user.id ? (
          <button className="btn secondary" onClick={() => deletePost(post.id)}>Delete</button>
        ) : null}
      </div>

      <Link to={`/post/${post.id}`}>
        <img src={post.image} alt={post.caption} className="post-image" />
      </Link>

      <div className="post-actions">
        <button onClick={() => toggleLike(post.id, user.id)} style={{ fontSize: 22 }}>
          {post.likes.includes(user.id) ? "❤️" : "🤍"}
        </button>
        <div style={{ fontWeight: 600 }}>{post.likes.length} likes</div>
      </div>

      <div className="post-body container">
        <div style={{ marginBottom: 8 }}><strong>{owner.username}</strong> {post.caption}</div>

        <div style={{ color: "var(--muted)", marginBottom: 8 }}>
          {post.comments.map(c => {
            const cu = db.users.find(u => u.id === c.userId) || {};
            return <div key={c.id}><strong>{cu.username}</strong> {c.text}</div>;
          })}
        </div>

        <form onSubmit={submitComment} className="comment-form">
          <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." />
          <button className="btn" type="submit">Post</button>
        </form>
      </div>
    </div>
  );
}
