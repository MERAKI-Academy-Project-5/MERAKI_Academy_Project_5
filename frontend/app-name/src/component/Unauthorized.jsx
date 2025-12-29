import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./Unauthorized.css";

const Unauthorized = () => {
  return (
    <>
      <Navbar />

      <div className="unauth-wrapper">
        <div className="unauth-card">
          <div className="browser-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="unauth-content">
            <div className="unauth-emoji">🚫</div>

            <h1 className="unauth-code">403</h1>
            <h2 className="unauth-title">Unauthorized Response</h2>

            <p className="unauth-text">
              We're sorry, but you don't have access to this page.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;
