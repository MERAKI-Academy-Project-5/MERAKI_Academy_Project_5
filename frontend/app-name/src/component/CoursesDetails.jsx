import "./CoursesDetails.css";
import Lesson from "./Lesson";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CourseDetails = () => {
  const [role, setrole] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState(null);
  const navigate = useNavigate();
  const id = useSelector((state) => state.courseDetails.courseId.payload);
  const getCourseById = () => {
    axios
      .get(`http://localhost:5000/courses/getCourseById/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => setCourse(result.data.course))
      .catch((err) => console.log(err));
  };
  const getUserById = (instructorId) => {
    if (!instructorId) return;
    axios
      .get(`http://localhost:5000/users/${instructorId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUser(res.data.user);
        setrole(res.data.user.role);
        setisAdmin(res.data.user.role === 1);
      })
      .catch((err) => console.log(err));
  };
  const getLessonsByCourseId = (courseId) => {
    if (!courseId) return;
    axios
      .get(`http://localhost:5000/lessons/getlessonbyCourseId/${courseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((result) => {
        console.log(result.data.lessons);
        setLessons(result.data.lessons);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCourseById();
  }, [id]);
  useEffect(() => {
    if (course) {
      getUserById(course.instructorid);
    }
  }, [course]);
  useEffect(() => {
    if (course) {
      getLessonsByCourseId(course.id);
    }
  }, [course]);
  let diffDays = 0;
  if (course && course.startcourse && course.endcourse) {
    const start = new Date(course.startcourse);
    const end = new Date(course.endcourse);
    diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }
  console.log(role);

  if (!course) return <p>Loading course...</p>;
  return (
    <div className="course-page">
      <div className="coursedetails-card">
        <img src={course.image} alt="course" className="course-image" />
        <div className="course-info">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          <div className="course-meta">
            <span>⏱ {diffDays} days</span>
            <span>⭐ {course.rate}</span>
            <span>$ {course.price}</span>
          </div>
          <button className="start-btn">Start Course</button>
        </div>
        {isAdmin ? (
          <div>
            <button
              className="update-btn"
              onClick={() => navigate("/UpdateCourses")}
            >
              Update Course
            </button>

            <button className="delete-btn" onClick={() => {}}>
              Delete Course
            </button>
          </div>
        ) : null}
      </div>
      <div className="course-content">
        <div className="lessons">
          <h3>Course Outline</h3>
          <div className="lesson-list">
            {lessons && lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  status={lesson.isCompleted}
                />
              ))
            ) : (
              <p>No lessons found</p>
            )}
          </div>
        </div>
        {user && (
          <div className="instructor">
            <img src={user.image} alt="instructor" />
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <p>Instructor</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
