import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import ProfileHeader from "../components/ProfileHeader";

export default function Profile() {
  const { id } = useParams();
  const { db } = useData();
  const profile = db.users.find(u => u.id === id) || {};
  const posts = db.posts.filter(p => p.userId === id);

  if (!profile.id) return <div className="container">Profile not found</div>;

  return (
    <div className="container">
      <ProfileHeader profile={profile} />
      <div style={{ marginTop: 12 }} className="profile-posts">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {posts.map(p => <img key={p.id} src={p.image} alt={p.caption} style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 8 }} />)}
        </div>
      </div>
    </div>
  );
}
