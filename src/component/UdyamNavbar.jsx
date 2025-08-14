import React, { useState } from "react";
import "./UdyamNavbar.css";

const UdyamNavbar = () => {
  const NAV_ITEMS = [
    { label: "Home", href: "#" },
    { label: "NIC Code", href: "#" },
    { label: "Useful Document", href: "#" },
    { label: "Print/Verify", href: "#" },
    { label: "Update", href: "#" },
    { label: "Login", href: "#" },
  ];

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-right">
        <img src="/MINISTRY_NAME.webp" alt="Logo" className="logo" />
      </div>

      {/* Desktop / Mobile Links */}
      <div className={`nav-left ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`nav-link ${active === item.label ? "active" : ""}`}
            onClick={() => {
              setActive(item.label);
              setMenuOpen(false); // close menu on click
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Hamburger Button */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default UdyamNavbar;
