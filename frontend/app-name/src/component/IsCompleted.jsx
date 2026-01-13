import React, { useEffect, useState } from "react";
import "./IsCompleted.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FcDisclaimer } from "react-icons/fc";

function IsCompleted() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});

  const token = localStorage.getItem("token");
  const userid = useSelector((state) => state.auth.userid);
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
    axios
      .get(
        `http://localhost:5000/lessons/certificate/${courseId}/users/${userid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.log(err));
  }, [courseId, userid, token]);

  if (!message) return null;

  if (message !== "Course completed certificate available") {
    return (
      <div className="unauth-wrapper">
        <div className="unauth-card">
          <div className="browser-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="unauth-content">
            <div className="unauth-emoji"><FcDisclaimer />
</div>

            <h2 className="unauth-title">Course Not Completed</h2>

            <p className="unauth-text">
               You have not completed all lessons of this course yet.
               Please finish all lessons to access the certificate.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page">
      <div className="certificate-wrapper">

        <img
          src="/images/p2.png"
          alt="Certificate Frame"
          className="certificate-frame"
        />

        <div className="certificate-content">

          

          <div className="cert-name">
            {user.firstname} {user.lastname}
          </div>

       

          <div className="cert-course">
            {course.title}
          </div>

          <div className="cert-date">
            {new Date().toLocaleDateString()}
          </div>

        </div>
      </div>
    </div>
  );
}

export default IsCompleted;
