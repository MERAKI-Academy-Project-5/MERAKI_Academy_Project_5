import { useSelector } from "react-redux";
import Courses from "./Courses";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Student from "./Studant";

const AdminDashboard = () => {
  const courses = useSelector((state) => state.courses.courses);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="main">
        {/* Navbar */}
        <div className="topbar">
          <h1>Admin Dashboard</h1>
          <div className="profile">Admin</div>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="card">
            <h3>Total Students</h3>
            <p>1,540</p>
          </div>
          <div className="card">
            <h3>Total Courses</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Instructors</h3>
            <p>35</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$12,400</p>
          </div>
        </div>

        {/* Table */}
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
