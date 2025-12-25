import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Drawings from "./components/Drawings";
import About from "./components/About"; 
import Projects from "./components/Projects"; 
import Contact from "./components/Contact"; 
import Home from "./components/Home";

import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/projects" element={<Projects />} /> 
            <Route path="/drawings" element={<Drawings />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}