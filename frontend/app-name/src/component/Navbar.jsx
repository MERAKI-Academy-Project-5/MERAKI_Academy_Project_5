import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Container >
      <Row>
        <Col md={3}>Teaching squad</Col>
        <Col md={6}><ul className="nav-links">
        <li onClick={() => {
            navigate("/")
        }}>Home</li>
        <li onClick={() => {
            navigate("/about")
        }}>About us</li>
        <li>Favourite</li>
        <li>Courses</li>
      </ul></Col>
        <Col md={3}><Button>login</Button> <Button>logout</Button></Col>
      </Row>
    </Container>
  );
};

export default Navbar;
