import React from "react";
import "./Profile.css";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import { jwtDecode } from "jwt-decode";
const Profile = () => {
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  localStorage.setItem("userId", decodedToken.userId);
  const id = localStorage.getItem("userId");
  const getUserById = () => {
    const id = localStorage.getItem("token.");
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch(setCourses(result.rows));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src="https://via.placeholder.com/300x380" alt="Student" />
      </div>

      <div className="profile-content">
        <h2>Smarter tools for modern education</h2>
        <p>
          Empower your learning journey with flexible courses, expert
          instructors, and innovative tools designed for your success.
        </p>

        <div className="profile-stats">
          <div>
            <h3>1500+</h3>
            <span>Students</span>
          </div>
          <div>
            <h3>120+</h3>
            <span>Courses</span>
          </div>
          <div>
            <h3>98%</h3>
            <span>Satisfaction</span>
          </div>
        </div>

        <button className="profile-btn">Explore Courses</button>
      </div>
    </div>
  );
};
export default Profile;
