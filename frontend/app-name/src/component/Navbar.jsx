import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <ul className="nav-links">
        <li onClick={() => {
            navigate("/")
        }}>Home</li>
        <li onClick={() => {
            navigate("/about")
        }}>About us</li>
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
