import React, { useState } from "react";
import { FiHeart, FiMessageCircle, FiSend, FiBookmark } from "react-icons/fi";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);

  const postStyle = {
    border: "1px solid #dbdbdb",
    borderRadius: "6px",
    marginBottom: "20px",
    background: "#fff",
  };

  const postHeader = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px",
    fontWeight: "bold",
  };

  const avatarStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  };

  const postImage = {
    width: "100%",
    maxHeight: "500px",
    objectFit: "cover",
  };

  const actions = {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 10px",
  };

  const leftActions = {
    display: "flex",
    gap: "14px",
  };

  const likedStyle = {
    color: "red",
  };

  const textStyle = {
    padding: "0 12px",
    margin: "4px 0",
    fontSize: "14px",
  };

  return (
    <div style={postStyle}>
      {/* Header */}
      <div style={postHeader}>
        <img src={post.userImg} alt={post.username} style={avatarStyle} />
        <span>{post.username}</span>
      </div>

      {/* Image */}
      <img src={post.image} alt="post" style={postImage} />

      {/* Actions */}
      <div style={actions}>
        <div style={leftActions}>
          <FiHeart
            size={24}
            style={liked ? likedStyle : {}}
            onClick={() => setLiked(!liked)}
          />
          <FiMessageCircle size={24} />
          <FiSend size={24} />
        </div>
        <FiBookmark size={24} />
      </div>

      {/* Likes, caption, comments */}
      <p style={textStyle}>{liked ? post.likes + 1 : post.likes} likes</p>
      <p style={textStyle}>
        <b>{post.username}</b> {post.caption}
      </p>
      <p style={textStyle}>View all {post.comments} comments</p>
    </div>
  );
};

export default Post;