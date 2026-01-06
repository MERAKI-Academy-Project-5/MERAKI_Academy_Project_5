import { useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
   const courses = useSelector((state) => state.courses.courses);
 console.log(courses);
 
 
  const navigate = useNavigate();
    useEffect(() => {
    axios
      .get("http://localhost:5000/users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setUsers(result.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
   useEffect(() => {
      const filteredStudents = users.filter((user) => Number(user.role) === 2);
      setStudents(filteredStudents);
    }, [users]);
     useEffect(() => {
      const filteredTeacher = users.filter((user) => Number(user.role) === 3);
      setTeachers(filteredTeacher);
    }, [users]);
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">EduAdmin</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li
            onClick={() => {
              navigate("/courses");
            }}
          >
            Courses
          </li>
          <li
            onClick={() => {
              navigate("/student");
            }}
          >
            Students
          </li>
          <li>Instructors</li>
          <li>Settings</li>
        </ul>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1>Admin Dashboard</h1>
          <div className="profile">Admin</div>
        </div>

        <div className="stats">
          <div className="card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>
          <div className="card">
            <h3>Total Courses</h3>
            <p>{courses.length}</p>
          </div>
          <div className="card">
            <h3>Instructors</h3>
            <p>{teachers.length}</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$12,400</p>
          </div>
        </div>

        <div className="table-container">
          <h2>Latest Courses</h2>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Instructor</th>
                <th>Students</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>React Basics</td>
                <td>John Doe</td>
                <td>320</td>
                <td className="active-status">Active</td>
              </tr>
              <tr>
                <td>Node.js</td>
                <td>Sarah Lee</td>
                <td>210</td>
                <td className="pending-status">Pending</td>
              </tr>
              <tr>
                <td>UI/UX Design</td>
                <td>Ali Ahmad</td>
                <td>180</td>
                <td className="active-status">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
