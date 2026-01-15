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
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const favouriteCourses = useSelector((state) => state.favourite.items);
  const [students, setStudents] = useState([]);
  const [numLessons, setNumLessons] = useState([]);

  // Fetch number of lessons for all courses
  const getNumLessons = () => {
    axios
      .get(`http://localhost:5000/lessons/getLessonsforallcourses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => setNumLessons(result.data.lessons))
      .catch((err) => console.log(err));
  };

  // Fetch number of students for all courses
  const getAllStudents = () => {
    axios
      .get(`http://localhost:5000/courses/getStudents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => setStudents(result.data.students))
      .catch((err) => console.log(err));
  };

  // Fetch all courses
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/courses/getAllcourses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        dispatch(setCourses(result.data.allcourses));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    getNumLessons();
    getAllStudents();
  }, []);

  // Handle favourite toggle
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

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading-spinner">Loading courses...</div>
      </div>
    );
  }

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
          <button onClick={() => navigate(`/searchcategory/Web Development`)}>
            Web Development
          </button>
          <button onClick={() => navigate(`/searchcategory/Data Science`)}>
            Data Science
          </button>
          <button
            onClick={() => {
              setCategory("Digital Marketing");
              navigate(`/searchcategory/Digital Marketing`);
            }}
          >
            Digital Marketing
          </button>
          <button
            onClick={() => {
              setCategory("Business");
              navigate(`/searchcategory/Business`);
            }}
          >
            Business
          </button>
          <button
            onClick={() => {
              setCategory("Management");
              navigate(`/searchcategory/Management`);
            }}
          >
            Management
          </button>
          <button
            onClick={() => {
              setCategory("Software Engineering");
              navigate(`/searchcategory/Software Engineering`);
            }}
          >
            Software Engineering
          </button>
          <button
            onClick={() => {
              setCategory("Frontend Development");
              navigate(`/searchcategory/Frontend Development`);
            }}
          >
            Frontend Development
          </button>
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
            const isFavourite = favouriteCourses.some((c) => c.id === course.id);

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
                  loading="lazy" // <-- lazy loading
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
