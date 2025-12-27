import React from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <h1>Welcome back</h1>
      <h1>login</h1>
      <label>
        <span>Email</span>
        <br />
        <input type="email" placeholder="you@example.com" />
      </label>
      <br />
      <label>
        <span>Password</span>
        <br />
        <input type="password" placeholder="password" />
      </label>
      <br />
      <button>login</button>
      <br />
      <p>By continuing, you agree to our Terms and Privacy Policy.</p>
      <br />
      <p>
       Don't have an account?{" "}
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          register
        </button>
      </p>
    </div>
  );
};

export default Login;
