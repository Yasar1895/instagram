import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const { addUser } = useData();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarData, setAvatarData] = useState(null);

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = ev => setAvatarData(ev.target.result);
    r.readAsDataURL(f);
  };

  const doSignup = (e) => {
    e.preventDefault();
    const res = addUser({ username, email, password, avatar: avatarData });
    if (!res.ok) return alert(res.message || "Failed");
    login({ id: res.user.id, username: res.user.username, avatar: res.user.avatar });
    navigate("/");
  };

  return (
    <div className="auth-center">
      <h2>Create account</h2>
      <form onSubmit={doSignup}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="file" accept="image/*" onChange={onFile} />
        {avatarData && <img src={avatarData} alt="avatar" style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", marginTop: 8 }} />}
        <button className="btn" type="submit">Sign up</button>
      </form>
    </div>
  );
}
