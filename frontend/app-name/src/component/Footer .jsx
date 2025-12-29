import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About us :</h3>
          <p>This website aims to provide useful and simple educational content for everyone.</p>
        </div>

        <div className="footer-section">
          <h3>Quick links </h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">Contact us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow us :</h3>
          <p>📘Facebook | 📸 Instagram</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
