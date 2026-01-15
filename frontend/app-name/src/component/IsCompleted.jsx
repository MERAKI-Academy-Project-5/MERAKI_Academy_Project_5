import React, { useEffect, useState } from "react";
import "./IsCompleted.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FuzzyText from "./react bits/FuzzyText/FuzzyText";
import Notcompleted from "./Notcompleted";
function IsCompleted() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});

  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userId") || null;
  const { courseId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch((err) => console.log(err));
  }, [userid, token]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/getCourseById/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourse(res.data.course))
      .catch((err) => console.log(err));
  }, [courseId, token]);

  useEffect(() => {
    console.log(userid);

    axios
      .get(
        `http://localhost:5000/lessons/certificate/${courseId}/users/${userid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.log(err));
  }, [courseId, userid, token]);
  console.log(message);

  if (message !== "Course completed certificate available") {
    return (
    <Notcompleted/>
    );
  }

  return (
    <div className="certificate-page">
      <div className="certificate-wrapper">
        <img
          src="/images/p2.png"
          className="certificate-frame"
          alt="Certificate"
        />

        <div className="certificate-content">
          <div className="cert-name">
            {user.firstname} {user.lastname}
          </div>

          <div className="cert-course">{course.title}</div>

          <div className="cert-footer">
            <div className="cert-date">
              Date: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IsCompleted;
