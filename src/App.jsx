import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}