import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiSearch, FiPlayCircle, FiUser } from "react-icons/fi";

const BottomNav = () => {
  const location = useLocation();

  const activeStyle = {
    color: "#000",
    fontWeight: "bold",
  };

  return (
    <div className="bottom-nav">
      <Link to="/" style={location.pathname === "/" ? activeStyle : {}}>
        <FiHome size={24} />
      </Link>
      <Link
        to="/explore"
        style={location.pathname === "/explore" ? activeStyle : {}}
      >
        <FiSearch size={24} />
      </Link>
      <Link
        to="/reels"
        style={location.pathname === "/reels" ? activeStyle : {}}
      >
        <FiPlayCircle size={24} />
      </Link>
      <Link
        to="/profile"
        style={location.pathname === "/profile" ? activeStyle : {}}
      >
        <FiUser size={24} />
      </Link>
    </div>
  );
};

export default BottomNav;