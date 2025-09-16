import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">InstaClone</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to={`/profile/${user?.id}`}>Profile</Link>
        <Link to="/messages">Messages</Link>
        <button onClick={onLogout} className="btn secondary" style={{ marginLeft: 12 }}>Logout</button>
      </div>
      <img src={user?.avatar || "/images/placeholder.png"} alt="me" className="nav-avatar" />
    </nav>
  );
}
