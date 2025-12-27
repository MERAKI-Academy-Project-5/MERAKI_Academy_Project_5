import React from "react";
import axios from "axios";
import Navbar from "./navbar";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h5>Join the community</h5>
      <h2>Create an account</h2>
      <div className="from-grid">
        <label>
          <span>firstName</span><br />
          <input type="text" placeholder="firstName" />
        </label>
        <br />
       <label>
        <span>lastName</span><br />
         <input type="text" placeholder="lastName" />
       </label>
        <br />
       <label>
        <span>age</span><br />
         <input type="text" placeholder="age" />
       </label>
        <br />
        <label>
          <span>Email</span><br />
          <input type="email" placeholder="you@example.com" />
        </label>
        <br />
        <label>
          <span>Password</span><br />
          <input type="password" placeholder="password" />
        </label>
        <br />
      <label>
        <span>Image</span><br />
          <input type="url" placeholder="image" />
      </label>
        <br />
      </div>

      <button className="primert-btn">Register</button>
      <br />
      <p>By continuing, you agree to our Terms and Privacy Policy.</p>
      <br />
      <p>
        Already have an account?{" "}
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          login
        </button>
      </p>
    </div>
  );
};

export default Register;
