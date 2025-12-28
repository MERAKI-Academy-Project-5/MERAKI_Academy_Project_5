import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Container className="all" fluid>
      <Row className="navbar">
        <Col md={3}>Teaching squad</Col>
        <Col md={6}>
        <ul className="nav-links">
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
        </ul></Col>
        <Col md={3} ><Button className="btn-btn" onClick={() => {
            navigate("/login")
        }}>login</Button> <Button className="btn-btn1" onClick={() => {
            navigate("/register")
        }}>Register</Button></Col>
      </Row>
    </Container>
  );
};

export default Navbar;
