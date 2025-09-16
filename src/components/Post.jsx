import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

export default function Post({ username, avatar, image, likes, caption }) {
  return (
    <div className="post">
      <div className="post-header">
        <img src={avatar} alt={username} className="avatar" />
        <span>{username}</span>
      </div>
      <img src={image} alt="Post" className="post-image" />
      <div className="post-actions">
        <FaHeart /> <FaRegComment /> <FaShare />
      </div>
      <p className="likes">{likes} likes</p>
      <p className="caption"><b>{username}</b> {caption}</p>
    </div>
  );
}