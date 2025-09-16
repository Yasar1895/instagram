import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";

export default function ProfileHeader({ profile }) {
  const { user } = useAuth();
  const { db, toggleFollow, updateProfile } = useData();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarData, setAvatarData] = useState(null);

  const isMe = user.id === profile.id;
  const following = (db.follows[user.id] || []).includes(profile.id);

  const save = () => {
    updateProfile(profile.id, { bio, avatar: avatarData || profile.avatar });
    setEditing(false);
  };

  return (
    <div className="profile-header container">
      <img src={profile.avatar} alt={profile.username} className="avatar-lg" />
      <div>
        <h2>{profile.username}</h2>
        <p style={{ color: "var(--muted)" }}>{profile.bio}</p>
        {isMe ? (
          <button className="btn" onClick={() => setEditing(true)}>Edit profile</button>
        ) : (
          <button className="btn" onClick={() => toggleFollow(user.id, profile.id)}>{following ? "Unfollow" : "Follow"}</button>
        )}

        {editing && (
          <div style={{ marginTop: 12 }}>
            <input value={bio} onChange={e => setBio(e.target.value)} />
            <input type="file" accept="image/*" onChange={e => {
              const f = e.target.files[0];
              if (!f) return;
              const r = new FileReader();
              r.onload = ev => setAvatarData(ev.target.result);
              r.readAsDataURL(f);
            }} />
            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={save}>Save</button>
              <button className="btn secondary" onClick={() => setEditing(false)} style={{ marginLeft: 8 }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
