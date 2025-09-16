import React from "react";
import { Link } from "react-router-dom";

export default function ExploreGrid({ posts }) {
  return (
    <div className="explore-grid container">
      {posts.map(p => (
        <Link key={p.id} to={`/post/${p.id}`}>
          <img src={p.image} alt={p.caption} />
        </Link>
      ))}
    </div>
  );
}
