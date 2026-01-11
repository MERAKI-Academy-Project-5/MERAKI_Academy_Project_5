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
        <img
  src={user?.image || "data:image/png;base64,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"}
  alt="Student"
/>
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
