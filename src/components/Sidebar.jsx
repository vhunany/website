import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* CHANGED: Wrapped name in Link to /home */}
      <Link to="/home" className="sidebar-name">
        Viktorya Hunanyan
      </Link>

      <nav className="sidebar-nav">
        <Link to="/">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/drawings">Drawings</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="sidebar-footer">
        <img src="/website-icon.png" alt="footer-icon" className="sidebar-image" />
      </div>
    </aside>
  );
}