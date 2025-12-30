import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import("./login.css");
import { useDispatch, useSelector } from "react-redux";
import { login, logout, setUserId } from "../redux/auth";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogin = () => {
    const body = { email, password };
    axios
      .post("http://localhost:5000/users/login", body)
      .then((res) => {
        dispatch(login(res.data.token));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="hero-login">
      <div className="login">
        <div>
          <DotLottieReact src="/file.lottie" loop autoplay />
        </div>
        <div className="login-container">
          <div className="login-box">
            <h1>Welcome back</h1>
            <h1>login</h1>
            <label>
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="you@example.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <br />
            <label>
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <br />
            <button onClick={handleLogin}>login</button>
            <br />
            <p className="terms">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
            <br />
            <p className="register-link">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
