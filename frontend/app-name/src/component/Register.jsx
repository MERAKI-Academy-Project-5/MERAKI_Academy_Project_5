import React, { useState } from "react";
import "./register.css";
import Navbar from "./navbar";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setimage] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        age,
        email,
        password,
        image,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Registration failed");
      });
  };

  return (
    <div>
      <div className="register">
        <div className="register-logo">
          <DotLottieReact src="Login.lottie" loop autoplay />
        </div>
        <div className="register-container">
          <div className="register-card">
            <h2>Join the community</h2>
            <h1>Create an account</h1>

            <form>
              <div className="form-row">
  <input
    type="text"
    placeholder="First name"
    onChange={(e) => setfirstName(e.target.value)}
  />

  <input
    type="text"
    placeholder="Last name"
    onChange={(e) => setlastName(e.target.value)}
  />
</div>
             

              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

             <div className="form-row">
  <input
    type="number"
    placeholder="Age"
    onChange={(e) => setAge(e.target.value)}
  />

  <label className="image-upload">
    Upload Image
    <input
      type="file"
      onChange={(e) => setImage(e.target.files[0])}
      hidden
    />
  </label>
</div>
            </form>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>

            <p>By continuing, you agree to our Terms and Privacy Policy.</p>
            <p>
              already have an account?
              <a
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </a>
            </p>

            {message && <p className="muted small">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
