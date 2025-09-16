import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import Post from "../components/Post";

export default function PostPage() {
  const { id } = useParams();
  const { db } = useData();
  const post = db.posts.find(p => p.id === id);
  if (!post) return <div className="container">Post not found</div>;
  return <div className="container"><Post post={post} /></div>;
}
