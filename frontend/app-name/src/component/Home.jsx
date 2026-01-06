import React from "react";
import "./Home.css";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import axios from "axios";
import { useEffect } from "react";
import { setCourseId } from "../redux/courseDetailsSlice";
import { useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAllCourses = () => {
    axios
      .get(`http://localhost:5000/courses/getAllcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result.data.allcourses);
        dispatch(setCourses(result.data.allcourses));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const courses = useSelector((state) => state.courses.courses);
  console.log(courses);
  const latestCourses = [];
  courses.forEach((course, index) => {
    if (courses.length - index <= 3) {
      latestCourses.push(course);
    }
  });
  console.log(latestCourses);
  useEffect(() => {
    getAllCourses();
  }, []);
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Smarter tools for modern eductaion</h1>
          <button>Explore Feature</button>
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
        <div className="courses-grid">
          {latestCourses.map((course, index) => (
            <div
              style={{ width: "350px", backgroundColor: "#8E7CC3" }}
              className="course-card"
              key={index}
            >
              <img
                onClick={() => {
                  dispatch(setCourseId(setCourseId(course.id)));
                  navigate("/courseDetails");
                }}
                src={course.image}
                alt={course.title}
              />
              <h3>{course.title}</h3>
              <p>
                {course.lessons} Lessons • {course.students} Students
              </p>
              <div className="bottom">
                <span className="price">${course.price}</span>
                <button ><FcLike />
                                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="load-more">Load More</button>
      </section>
    </div>
  );
};
export default Home;
