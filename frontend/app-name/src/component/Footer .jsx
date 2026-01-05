import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";

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
            <li><a href="/"><IoIosHome /> Home </a></li>
            <li><a href="/courses"><FaBook /> Courses</a></li>
            <li><a href="/about"> <CgFileDocument /> Contact us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow us :</h3>
          <p><FaFacebook />{" "}
            Facebook </p>
          <p> <FaInstagram />{" "}
            Instagram</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
