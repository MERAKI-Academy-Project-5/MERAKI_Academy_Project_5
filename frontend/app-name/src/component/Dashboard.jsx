import { useDispatch, useSelector } from "react-redux";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCourses } from "../redux/coursesSlice";
import { logout } from "../redux/auth";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  let totalrevenue = 0 ;
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [numStudents, setNumStudents] = useState([]);
  const [instructors , setInstructors] = useState([])
  const getAllcoursesInstructors = ()=>{
     axios
      .get(`http://localhost:5000/courses/allInstructors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        console.log(result);
        setInstructors(result.data.instructors);
      })
      .catch((err) => console.log(err));
  }
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
  // Fetch users
   useEffect(() => {
    getAllcoursesInstructors();
    getAllStudents();
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setStudents(users.filter((u) => Number(u.role) === 2));
    setTeachers(users.filter((u) => Number(u.role) === 3));
  }, [users]);

  // Fetch courses
  useEffect(() => {
    axios
      .get("http://localhost:5000/courses/getAllcourses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => dispatch(setCourses(res.data.allcourses)))
      .catch((err) => console.log(err));
  }, [dispatch]);
console.log(instructors);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2 className="logo">EduAdmin</h2>

        <ul>
          <li className="active" onClick={() => navigate("/dashboard")}>
            Dashboard
          </li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/student")}>Students</li>
          <li onClick={() => navigate("/Instructors")}>Instructors</li>

          {/* Dropdown */}
          <li className="dropdown" onClick={() => setOpenMenu(!openMenu)}>
            Settings
            {openMenu && (
              <ul className="dropdown-menu">
                <li onClick={() => navigate("/content")}>Content</li>
                <li onClick={() => navigate("/about")}>About us</li>
                <li
                  onClick={() => {
                    localStorage.clear();
                    dispatch(logout());
                    navigate("/login");
                  }}
                >
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </aside>

      <main className="main">
        <div className="topbar">
          <h1>Admin Dashboard</h1>
          <div className="profile">Admin</div>
        </div>

        <div className="stats">
          <div className="card">
            <h3 style={{"alignSelf":"center"}}>Total Students</h3>
            <p style={{"alignSelf":"center"}}>{students.length}</p>
          </div>

          <div className="card">
            <h3 style={{"alignSelf":"center"}}>Total Courses</h3>
            <p style={{"alignSelf":"center"}}>{courses.length}</p>
          </div>

          <div className="card">
            <h3 style={{"alignSelf":"center"}}>Instructors</h3>
            <p style={{"alignSelf":"center"}}>{teachers.length}</p>
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
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course , index) => {
                const numStudents1 =
                  numStudents.find((s) => s.title === course.title)
                    ?.totalstudents || 0;
                    const instrucotrFirstName =
  instructors.find((l) => l.title === course.title)?.firstname || "";
                const instrucotrLastName =
  instructors.find((l) => l.title === course.title)?.lastname || "";
   const  revenue =  course.price * numStudents1;;
   totalrevenue = totalrevenue + revenue
                return (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>{instrucotrFirstName} {instrucotrLastName} </td>
                    <td >{numStudents1}</td>
                    <td>{revenue} $</td>
                  </tr>
                );
              })}
            </tbody>
             <div className="totalRevenue">
            <h3>Total Revenue</h3>
            <h3>{totalrevenue} $</h3>
          </div>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
