// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <span role="img" aria-label="doc">📄</span>
      <span className="navbar-title">Plagiarism Checker</span>
    </div>
    <ul className="navbar-links">
      <li>
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li>
        <Link to="/about" className="nav-link">About</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
