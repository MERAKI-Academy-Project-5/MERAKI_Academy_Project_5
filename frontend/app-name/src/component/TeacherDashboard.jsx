import React from "react";
import "./TeacherDashboard.css";
import { FaBook, FaUsers, FaDollarSign, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import "./Courses.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MagicBento from "./react bits/MagicBento/MagicBento";

const TeacherDashboard = () => {
  const userid = localStorage.getItem("userId") || null;
  console.log(userid);
  const id = userid;
    let totalrevenue = 0 ;
    const role1 = "Teacher"
    
      const navigate = useNavigate();
    
  const [numStudents, setNumStudents] = useState([]);
  const [instructorCourses, setInstructorCourses] = useState([]);
  const [ instructorStudents , setInstructorStudents] = useState(0)
  const getStudentsByInstructorId = ()=>{
     axios
      .get(
        `http://localhost:5000/courses/getStudentsByInstructorId/instructor/students/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.students);
        setInstructorStudents(result.data.students[0].totalstudents);
      })
      .catch((err) => console.log(err));
  }
  const getCoursesByInstructorId = () => {
    axios
      .get(
        `http://localhost:5000/courses/getCoursesByInstructorId/instructor/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setInstructorCourses(result.data.courses);
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
        setNumStudents(result.data.students);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCoursesByInstructorId();
    getAllStudents();
    getStudentsByInstructorId();
  }, []);
  return (
    <div className="teacher-dashboard1">
      <aside className="sidebar1">
        <h2 className="logo1">EduTeacher</h2>
        <ul>
          <li className="active1">Dashboard</li>
          <li onClick={()=>{navigate(`/InstructorCourses/${id}/${role1}`)}}>My Courses</li>
          <li onClick={()=>{navigate(`/StudentsByInstructor/${userid}`)}}>Students</li>
          <li>Earnings</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main-content1">
        <header className="dashboard-header1">
          <h1>Teacher Dashboard</h1>
          <button onClick={()=>{navigate("/createcourse")}} className="add-course-btn1">
            <FaPlus /> New Course
          </button>
        </header>

        <section className="stats1">
          <div className="stat-card1">
            <FaBook className="stat-icon1" />
            <div className="text">
              <h3>Courses : </h3>
              <h3>{instructorCourses.length}</h3>
            </div>
          </div>

          <div className="stat-card1">
            <FaUsers className="stat-icon1" />
            <div className="text">
                <h3 >Students : </h3>
              <h3>{instructorStudents}</h3>
            </div>
          </div>
        </section>

        <section className="courses-section1">
          <h2>My Courses</h2>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Category</th>
                <th>Students</th>
                <th>Price</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {instructorCourses.map((course, index) => {
                const numStudents1 =
                  numStudents.find((s) => s.title === course.title)
                    ?.totalstudents || 0;
                    const  revenue =  course.price * numStudents1;;
                     totalrevenue = totalrevenue + revenue
                return (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>{numStudents1}</td>
                    <td>{course.price}</td>
                    <td>{revenue}</td>
                  </tr>
                );
              })}
            </tbody>
                <div className="totalRevenue">
            <h3>Total Revenue</h3>
            <h3>{totalrevenue} $</h3>
          </div>
          </table>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
