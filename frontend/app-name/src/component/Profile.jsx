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
  const [user, setuser] = useState({});
  const decodedToken = jwtDecode(localStorage.getItem("token"));
  localStorage.setItem("userId", decodedToken.userId);
  const id = localStorage.getItem("userId");
  console.log(id);

  const getUserById = (id) => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);

        setuser(result.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserById(id);
  }, [id]);
  
  let role = "";
  if (user.role === 1) {
    role = "admin";
  } else if (user.role === 2) {
    role = "student";
  } else {
    role = "teacher";
  }
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={user.image} alt="Student" />
      </div>

      <div className="profile-content">
        <h2>
          Name: {user.firstname} {user.lastname}
        </h2>
        <p>Email:{user.email}</p>
        <p>Age:{user.age}</p>
        <p>{role}</p>
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
