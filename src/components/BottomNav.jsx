import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch, AiFillMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/"><AiFillHome size={24} /></Link>
      <Link to="/explore"><AiOutlineSearch size={24} /></Link>
      <Link to="/messages"><AiFillMessage size={24} /></Link>
      <Link to="/profile"><FaUserCircle size={24} /></Link>
    </nav>
  );
}