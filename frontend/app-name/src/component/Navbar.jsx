import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className="all" >
      <div className="bb">
        <div md={3}>Teaching squad</div>
        <div md={6}>
        <ul className="nav-links">
             <li onClick={() => {
            navigate("/profile")
          }}>Profile</li>
          <li onClick={() => {
            navigate("/")
          }}>Home</li>
          <li onClick={() => {
            navigate("/about")
          }}>About us</li>
          <li>Favourite</li>
          <li onClick={() => {
            navigate("/courses")
          }}>Courses</li>
        </ul></div>
        <div md={3} ><Button className="btn-btn" onClick={() => {
            navigate("/login")
        }}>login</Button> <Button className="btn-btn1" onClick={() => {
            navigate("/register")
        }}>Register</Button></div>
      </div>
    </div>
  );
};

export default Navbar;
