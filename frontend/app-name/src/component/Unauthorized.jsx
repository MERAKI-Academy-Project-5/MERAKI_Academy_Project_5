import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./Unauthorized.css";

const Unauthorized = () => {
  return (
<div>
  <Navbar />

  <div className="unauth-wrapper">
    <img
      src="https://contabo.com/blog/wp-content/uploads/2025/03/blog-head_how2-fix-403-forbidden-error.jpg.webp"
      className="unauth-image"
      alt="403 Unauthorized"
    />
  </div>
</div>
   
  );
};

export default Unauthorized;
