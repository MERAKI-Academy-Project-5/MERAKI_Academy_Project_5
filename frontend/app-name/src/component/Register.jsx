import React from "react";
import "./register.css";
import Navbar from "./navbar";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Register = () => {
    const navigate = useNavigate();
  return (<div>
  <Navbar/>
  <div className="register">
    <div className="register-logo">
       <DotLottieReact
      src="Login.lottie"
      loop
      autoplay
    />
    </div>
      <div className="register-container">
        <div className="register-card">
          <h2>Join the community</h2>
          <h1>Create an account</h1>

          <form>
            <label>First Name</label>
            <input type="text" placeholder="First name" />

            <label>Last Name</label>
            <input type="text" placeholder="Last name" />

            <label>Age</label>
            <input type="number" placeholder="Age" />

            <label>Email</label>
            <input type="email" placeholder="Email" />

            <label>Password</label>
            <input type="password" placeholder="Password" />

            <label>Image</label>
            <input type="file" />

            <button type="submit">Register</button>
          </form>

          <p>
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
          <p>Don't have an account?<button onClick={()=>{
            navigate("/login");
          }}>login</button></p>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default Register;