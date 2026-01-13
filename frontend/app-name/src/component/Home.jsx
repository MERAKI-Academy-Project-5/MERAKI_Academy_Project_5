import React from "react";
import "./Home.css";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { setCourseId } from "../redux/courseDetailsSlice";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { jwtDecode } from "jwt-decode";
import GradientText from "./react bits/GradientText/GradientText";
import SplashCursor from "./react bits/SplashCursor/SplashCursor";
const Home = () => {

  const decodedToken = localStorage.getItem("token") || ""
  if(decodedToken){
  localStorage.setItem("userId",jwtDecode( decodedToken).userId);
  }
  const [students, setStudents] = useState([]);
  const [numLessons, setNumLessons] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getNumLessons = () => {
    axios
      .get(`http://localhost:5000/lessons/getLessonsforallcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
        setNumLessons(result.data.lessons);
      })
      .catch((err) => console.log(err));
  };
  const getAllStudents = () => {
    axios
      .get(`http://localhost:5000/courses/getStudents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setStudents(result.data.students);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      localStorage.setItem("userId", decoded.userId);
    }
  }, []);

  const getAllCourses = () => {
    axios
      .get(`http://localhost:5000/courses/getAllcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch(setCourses(result.data.allcourses));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const courses = useSelector((state) => state.courses.courses);
  const latestCourses = [];
  courses.forEach((course, index) => {
    if (courses.length - index <= 3) {
      latestCourses.push(course);
    }
  });
  useEffect(() => {
    getNumLessons();
    getAllStudents();
    getAllCourses();
  }, []);
  return (
    <div className="home">
      {<SplashCursor/>}
      <section className="hero">
        <div className="hero-text">
          <GradientText
            colors={["#601b8f", "#a03ba0", "#40ffaa", "#a03ba0", "#b340ff"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
            
          >
            Smarter tools for modern eductaion{" "}
          </GradientText>
        </div>
        <div className="below_hero">
          <section className="cards">
            <div className="card-right">
              <h3>Join Our Community</h3>
              <p>1550+ Students</p>
            </div>
          </section>
          <div className="hero-image">
            <img className="girl-home" src="/images/girl.png" />
          </div>
          <section className="cards">
            <div className="card-left">
              <h3>Flexible Learning Experiences For Modern Education</h3>
              <p>
                Give Your Students And Teachers The Freedom To Learn Anywhere,
                Anytime, With Tools Built For Modern, Flexible Education.{" "}
              </p>
            </div>
          </section>
        </div>
      </section>
      <section
        style={{
          width: "100%",
          marginTop: "-10px",
          backgroundColor: "#4B3F72",
        }}
        className="courses-section"
      >
        <div className="courses-gridHome">
          {latestCourses.map((course, index) => {
            const numStudents =
              students.find((s) => s.title === course.title)?.totalstudents ||
              0;

            const numLessons1 =
              numLessons.find((l) => l.title === course.title)?.totalLessons ||
              0;

            return (
              <div
                style={{ width: "350px", backgroundColor: "#8E7CC3" }}
                className="course-cardHome"
                key={index}
              >
                <img
                  onClick={() => {
                    dispatch(setCourseId(course.id));
                    navigate("/courseDetails");
                  }}
                  src={course.image}
                  alt={course.title}
                />
                <h3>{course.title}</h3>
                <p>
                  {numLessons1} Lessons • {numStudents} Students
                </p>
                <div className="bottom">
                  <span className="price">${course.price}</span>
                  <button>
                    <FcLike />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            navigate("/courses");
          }}
          className="load-more"
        >
          Explore our Courses
        </button>
      </section>
    </div>
  );
};
export default Home;
