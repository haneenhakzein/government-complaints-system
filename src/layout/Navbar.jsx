import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-text">
        <h1 className="navbar-title">إدارة الشكاوى</h1>
        <p className="navbar-subtitle">
          عرض وإدارة جميع الشكاوى الواردة من المواطنين
        </p>
      </div>
    </div>
  );
};

export default Navbar;
