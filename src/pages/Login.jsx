import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { db } = useData();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = (e) => {
    e.preventDefault();
    const found = db.users.find(u => u.email === email && u.password === password);
    if (!found) return alert("Invalid credentials (seed users: alex@example.com / 1234 or maya@example.com / 1234)");
    login({ id: found.id, username: found.username, avatar: found.avatar });
    navigate("/");
  };

  return (
    <div className="auth-center">
      <h2>Welcome back</h2>
      <form onSubmit={doLogin}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Login</button>
      </form>
      <p style={{ marginTop: 12 }}>Don't have an account? <Link to="/signup" className="link">Sign up</Link></p>
      <p style={{ marginTop: 12, color: "var(--muted)" }}>Try seed accounts: alex@example.com / 1234 OR maya@example.com / 1234</p>
    </div>
  );
}
