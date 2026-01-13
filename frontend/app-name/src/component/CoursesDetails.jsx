import "./CoursesDetails.css";
import Lesson from "./Lesson";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Profile from "./Profile";
import { setUserId } from "../redux/auth";

import {
  selectRole,
  selectIsAdmin,
  selectIsTeacher,
  selectIsStudent,
} from "../redux/selectors";
const CourseDetails = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userId") || null;
  const role = useSelector(selectRole);
  const isAdmin = useSelector(selectIsAdmin);
  const isTeacher = useSelector(selectIsTeacher);
  const isStudent = useSelector(selectIsStudent);
  const courseId = useSelector((state) => state.courseDetails.courseId);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);



  const [allCompleted, setAllCompleted] = useState(false); 
  const [open, setOpen] = useState(false);
  const [isPaid , setPaid] = useState(false);
  const isPaidFun = ()=>{
    const course = courseId;
    const student = userid;
    axios.get( `http://localhost:5000/courses/course/student/${course}/${student}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((result)=>{
          console.log(result.data.studentCourse.length);
          console.log(result.data.studentCourse.length === 1 );
          
          if(result.data.studentCourse.length === 1 ){
            setPaid(true)
          }
        }).catch((err)=>{console.log(err);
        })

    }
  const getCourseById = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/courses/getCourseById/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCourse(res.data.course);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserById = async (instructorId) => {
    if (!instructorId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/users/${instructorId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const getLessonsByCourseId = async (courseId) => {
    if (!courseId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/lessons/getlessonbyCourseId/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLessons(res.data.lessons);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCourseById = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/courses/deleteCoursesById/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/Courses");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (courseId) getCourseById();
  }, [courseId]);
useEffect(() => {
isPaidFun()
  }, []);
  useEffect(() => {
    if (course && userid) {
      getUserById(course.instructorid);
      getLessonsByCourseId(course.id);

      axios
        .get(`http://localhost:5000/lessons/isCompleted/${course.id}/${userid}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setAllCompleted(res.data.allCompleted))
        .catch((err) => console.error(err));
    }
  }, [course, userid]);


  let diffDays = 0;
  if (course?.startcourse && course?.endcourse) {
    const start = new Date(course.startcourse);
    const end = new Date(course.endcourse);
    diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  }

  const addCourseToStudent = () => {
    const student = userid;
    const course = courseId;
    axios
      .post(
        `http://localhost:5000/courses/addCourseToStudent`,
        { student, course },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => { })
      .catch((err) => {
        console.log(err);
      });
  };
  const addLessonsToCourse = () => {
    const coursesid = courseId
    axios.post(
      "http://localhost:5000/lessons/addLessonsToCourse",
      { userid, coursesid },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((res) => { })
      .catch((err) => {
        console.log(err);
      });
  };

  
  if (!course) return <p>Loading course...</p>;

  return (
    <div className="course-page">
      <div className="course-top">
        <div className="course-main">
          <div className="course-media">
            <img src={course.image} alt="course" />
          </div>

          <div className="course-info">
            <h2>{course.title}</h2>
            <p>{course.description}</p>

            <div className="course-meta">
              <span>⏱ {diffDays} days</span>
              <span>⭐ {course.rate}</span>
              <span>$ {course.price}</span>
            </div>

            {isStudent && !isPaid && <button onClick={()=>{navigate(`/newcard/${course.price}`)}} className="start-btn">Start Course</button>}

            {(isAdmin || course?.instructorid==userid) && (
              <div className="admin-actions">
                  <button className="update-btn" onClick={()=>{navigate(`/AddLessons/${courseId}`)}}>
                  Add Lessons
                </button>
                <button
                  className="update-btn"
                  onClick={() => navigate("/UpdateCourses")}
                >
                  Update
                </button>

                <button className="delete-btn" onClick={deleteCourseById}>
                  Delete
                </button>
               
              </div>
            )}
          
          </div>
        </div>

        {user && (
          <div className="instructor-card">
            <img src={user.image} alt="Instructor" />
            <h4>
              {user.firstName} {user.lastName}
            </h4>
            <span>Course Instructor</span>
            <div>
              <button
                className="update-btn profile-btn"
                onClick={() => navigate(`/profile/${user.id}`)}
              >
                Profile
              </button>
            </div>
          </div>

        )}
      </div>

      <div className="course-content">
        <div className="lessons">
          <h3>Course Outline</h3>

          <div className="lesson-list">
            <Lesson />
          </div>


          {allCompleted && isStudent && (
            <div className="completed-btn-wrapper">
              <button
                className="completed-btn"
                onClick={() => navigate(`/completed/${courseId}`)}
              >
                Finish Course
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default CourseDetails;
