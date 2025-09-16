import React, { useState } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiBookmark } from "react-icons/fi";
import "./Post.css";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="post">
      {/* Post header */}
      <div className="post-header">
        <img src={post.userImg} alt={post.username} className="post-avatar" />
        <span>{post.username}</span>
      </div>

      {/* Post image */}
      <img src={post.image} alt="post" className="post-image" />

      {/* Post actions */}
      <div className="post-actions">
        <div className="left-actions">
          <FiHeart
            size={24}
            className={liked ? "liked" : ""}
            onClick={() => setLiked(!liked)}
          />
          <FiMessageCircle size={24} />
          <FiSend size={24} />
        </div>
        <FiBookmark size={24} />
      </div>

      {/* Likes */}
      <p className="likes">{liked ? post.likes + 1 : post.likes} likes</p>

      {/* Caption */}
      <p className="caption">
        <b>{post.username}</b> {post.caption}
      </p>

      {/* Comments */}
      <p className="comments">View all {post.comments} comments</p>
    </div>
  );
};

export default Post;