import React, { useEffect, useState } from "react";
import "./Courses.css";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import { setCourseId } from "../redux/courseDetailsSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToFavourite, removeFromFavourite } from "../redux/favouriteSlice";
import { useParams } from "react-router-dom";

const InstructorCourses = () => {
  const { id } = useParams();
  const { role1 } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favouriteCourses = useSelector((state) => state.favourite.items);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [numLessons, setNumLessons] = useState([]);
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
    if (role1 === "Teacher") {
      axios
        .get(`http://localhost:5000/courses/getCoursesByInstructorId/instructor/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((result) => {
          setInstructorCourses(result.data.courses);
        })
        .catch((err) => console.log(err));
    } else if (role1 === "Student") {
      axios
        .get(
          `http://localhost:5000/courses/getCoursesByStudentId/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((result) => {
          setInstructorCourses(result.data.courses);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  useEffect(() => {
    getNumLessons();
  }, []);
  useEffect(() => {
    getAllStudents();
  }, []);
  const handleToggleFavourite = (course) => {
    const exists = favouriteCourses.find((c) => c.id === course.id);

    if (exists) {
      axios
        .delete(`http://localhost:5000/favourite/${course.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(() => dispatch(removeFromFavourite(course.id)))
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:5000/favourite",
          { courseId: course.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => dispatch(addToFavourite(course)))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <Navbar />
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
          {instructorCourses.map((course) => {
            const numStudents =
              students.find((s) => s.title === course.title)?.totalstudents ||
              0;
            const numLessons1 =
              numLessons.find((l) => l.title === course.title)?.totallessons ||
              0;
            const isFavourite = favouriteCourses.some(
              (c) => c.id === course.id
            );
            return (
              <div className="course-card" key={course.id}>
                <img
                  src={course.image}
                  alt={course.title}
                  onClick={() => {
                    dispatch(setCourseId(course.id));
                    navigate("/courseDetails");
                  }}
                />

                <h3>{course.title}</h3>

                <p>{numLessons1}Lessons • {numStudents} Students</p>

                <div className="bottom">
                  <span className="price">${course.price}</span>

                  <button onClick={() => handleToggleFavourite(course)}>
                    {isFavourite ? (
                      <AiFillHeart style={{ color: "red", fontSize: "24px" }} />
                    ) : (
                      <AiOutlineHeart
                        style={{ color: "black", fontSize: "24px" }}
                      />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <button className="load-more">Load More</button>
      </section>
    </div>
  );
};

export default InstructorCourses;
