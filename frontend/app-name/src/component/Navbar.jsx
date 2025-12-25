import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li>Home</li>
        <li>About us</li>
        <li>Favourite</li>
        <li>Courses</li>
      </ul>
      <div className="nav-buttons">
        <button>login</button>
        <button>logout</button>
      </div>
      
    </div>
  );
};

export default Navbar;
