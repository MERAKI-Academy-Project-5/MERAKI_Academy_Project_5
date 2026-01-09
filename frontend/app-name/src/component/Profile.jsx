import React from "react";
import "./Profile.css";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  let role1;
  const getRoleName = (role) => {
    if (role === 1){
      role1 ="Admin"
        console.log(role1); 
      return "Admin"

    }
    else if (role === 2) {
      role1 ="Student"
      return "Student"
    }
    else if (role === 3) {
      role1 ="Teacher"
      return "Teacher"
    }else
      {   
         return ""
        };
  };
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setUser(result.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={user.image} alt="Student" />
      </div>

      <div className="profile-content">
        <h2>
          {user.firstname} {user.lastname}
        </h2>
        <p>Email: {user.email}</p>
        <p>Role: {getRoleName(user.role)}</p>
        <p>Age: {user.age}</p>
        <div className="profile-stats"></div>
        <button onClick={() => {navigate(`/InstructorCourses/${id}/${role1}`)}} className="profile-btn">
          Explore Courses
        </button>
      </div>
    </div>
  );
};
export default Profile;
