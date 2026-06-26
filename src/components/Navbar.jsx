import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">🎟️</span>
        WishCard
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Create
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => (isActive ? "active" : "")}>
          Gallery
        </NavLink>
      </div>
    </nav>
  );
}
