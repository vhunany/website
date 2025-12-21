import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Drawings from "./components/Drawings";
import About from "./components/About"; 
import Projects from "./components/Projects"; 
import Contact from "./components/Contact"; // 1. ADD THIS LINE
import "./App.css";

// 2. DELETE the line: const Contact = () => ... (Remove it completely)

export default function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} /> 
            <Route path="/drawings" element={<Drawings />} />
            <Route path="/contact" element={<Contact />} /> {/* This now uses the file */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}