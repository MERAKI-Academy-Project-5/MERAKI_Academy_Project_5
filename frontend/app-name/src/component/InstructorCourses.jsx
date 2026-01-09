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
import { useParams } from 'react-router-dom';

const InstructorCourses = () => {     
    const { id } = useParams();
    const { role1 } = useParams();
    console.log(role1);
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favouriteCourses = useSelector((state) => state.favourite.items);
    const [instructorCourses , setInstructorCourses] = useState([]);
  useEffect(() => {
    if(role1==="Admin"){
         axios
      .get(`http://localhost:5000/courses/getCoursesByInstructorId/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setInstructorCourses(result.data.courses)
      })
      .catch((err) => console.log(err));
    }else if (role1==="Student"){
           axios
      .get(`http://localhost:5000/courses/getCoursesByStudentId/student/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setInstructorCourses(result.data.courses)
      })
      .catch((err) => console.log(err));
    }
   
  }, []);

  console.log(instructorCourses);
  
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
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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
            const isFavourite = favouriteCourses.some((c) => c.id === course.id);
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

                <p>
                  {course.lessons} Lessons • {course.students} Students
                </p>

                <div className="bottom">
                  <span className="price">${course.price}</span>

                  <button onClick={() => handleToggleFavourite(course)}>
  {isFavourite ? (
   <AiFillHeart style={{ color: "red", fontSize: "24px" }} />
  ) : (
       <AiOutlineHeart style={{ color: "black", fontSize: "24px" }} />
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
