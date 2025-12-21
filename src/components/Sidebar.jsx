import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-name">
        Viktorya Hunanyan
      </div>

      <nav className="sidebar-nav">
        <Link to="/">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/drawings">Drawings</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* This container stays at the bottom */}
      <div className="sidebar-footer">
        <img src="/website-icon.png" alt="footer-icon" className="sidebar-image" />
      </div>
    </aside>
  );
}