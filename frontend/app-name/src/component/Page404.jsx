import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./Unauthorized.css";

const Unauthorized = () => {
  return (
    <>
      <div className="unauth-wrapper">
        <div className="unauth-card">
          <div className="browser-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="unauth-content">
            <div className="unauth-emoji">🚫</div>

            <h1 className="unauth-code">404</h1>
            <h2 className="unauth-title">Page Not Found</h2>

            <p className="unauth-text">
               The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
