import React from "react";
import "./Courses.css";
import Navbar from "./navbar";
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import { setCourseId } from "../redux/courseDetailsSlice";
import { FcLike } from "react-icons/fc";
import { addToFavourite} from "../redux/favouriteSlice";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses.courses);
  console.log(courses);
  useEffect(() => {
    courses
  }, [])


  useEffect(() => {
    axios
      .get("http://localhost:5000/courses/getAllcourses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch(setCourses(result.data.allcourses));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div>
      <section className="courses-section">
        <h2>Popular Courses</h2>
        <div className="filters">
          <button className="active">All</button>
          <button>Web Development</button>
          <button>Data Science</button>
          <button>Digital Marketing</button>
          <button>Business</button>
          <button>Management</button>
        </div>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <img
                onClick={() => {
                  dispatch((setCourseId(course.id)))
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
                <span className="price">${course.price}</span> <button onClick={(()=>{
                  dispatch(addToFavourite(course))
                })}><FcLike />
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
export default Courses;
