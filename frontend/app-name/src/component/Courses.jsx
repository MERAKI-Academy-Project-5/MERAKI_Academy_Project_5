import React, { useEffect, useState } from "react";
import "./Courses.css";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../redux/coursesSlice";
import { setCourseId } from "../redux/courseDetailsSlice";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addToFavourite, removeFromFavourite } from "../redux/favouriteSlice";
import MagicBento from "./react bits/MagicBento/MagicBento";
import GradientText from "./react bits/GradientText/GradientText";
const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const favouriteCourses = useSelector((state) => state.favourite.items);
    const [students , setStudents] = useState([])
    const [numLessons , setNumLessons] = useState([])

    const getNumLessons = ()=>{
      axios.get(`http://localhost:5000/lessons/getLessonsforallcourses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
        setNumLessons(result.data.lessons)
      })
      .catch((err) => console.log(err));
    }
    const getAllStudents =()=>{
       axios
      .get(`http://localhost:5000/courses/getStudents`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setStudents(result.data.students)
      })
      .catch((err) => console.log(err));
    }
      useEffect(()=>{
         getNumLessons()
      },[])
     useEffect(()=>{
         getAllStudents()
      },[])
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
         <GradientText
            colors={["#40ffaa", "#a03ba0", "#40ffaa", "#a03ba0", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            Popular Courses
          </GradientText>

        <div className="filters">
          <button className="active">All</button>
          <button>Web Development</button>
          <button>Data Science</button>
          <button>Digital Marketing</button>
          <button>Business</button>
          <button>Management</button>
          <button>Databases (SQL / NoSQL)</button>
          <button>Science</button>
          <button>Civil Engineering</button>
          <button>Electrical Engineering</button>
          <button>Mechanical Engineering</button>
          <button>Software Engineering</button>
          <button>Frontend Development</button>
        </div>

       <MagicBento
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
  clickEffect={true}
>
  {courses.map((course) => {
   const numStudents =
  students.find((s) => s.title === course.title)?.totalstudents || 0;
const numLessons1 =
  numLessons.find((l) => l.title === course.title)?.totallessons || 0;
    const isFavourite = favouriteCourses.some(
      (c) => c.id === course.id
    );

    return (
      <div
        className="course-card magic-bento-card"
        key={course.id}
        style={{
          backgroundColor: "#060010",
          "--glow-color": "132, 0, 255",
        }}
      >
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
          {numLessons1} Lessons • {numStudents} Students
        </p>

        <div className="bottom">
          <span className="price">${course.price}</span>

          <button onClick={() => handleToggleFavourite(course)}>
            {isFavourite ? (
              <AiFillHeart style={{ color: "red", fontSize: "24px" }} />
            ) : (
              <AiOutlineHeart style={{ fontSize: "24px" }} />
            )}
          </button>
          
        </div>
      </div>
    );
  })}
</MagicBento>

        
      </section>
    </div>
  );
};

export default Courses;
