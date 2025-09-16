import React from "react";
import { Link } from "react-router-dom";
import { FiSend, FiHeart, FiPlusSquare } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Instagram logo style */}
      <Link to="/" className="navbar-logo">
        Instagram
      </Link>

      <div style={{ display: "flex", gap: "16px", fontSize: "22px" }}>
        <Link to="/create">
          <FiPlusSquare />
        </Link>
        <Link to="/messages">
          <FiSend />
        </Link>
        <Link to="/notifications">
          <FiHeart />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;