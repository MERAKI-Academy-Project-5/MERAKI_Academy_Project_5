import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Rigester from "./component/Register";
import Login from "./component/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Unauthorized from "./component/Unauthorized";
import Courses from "./component/Courses";
import CoursesDetails from "./component/CoursesDetails";
import Navbar from "./component/navbar";
import Profile from "./component/Profile";
import Footer from "./component/Footer ";
import Page404 from "./component/Page404";
import Favourite from "./component/Favourite";
import Search from "./component/Search";
import Lesson from "./component/Lesson";
import UpdateCourses from "./component/UpdateCourses";
import Dashboard from "./component/Dashboard";
import Student from "./component/Studant";
import ChatPage from "./Chatpage";
import Content from "./component/Content";
import IsCompleted from "./component/IsCompleted";
import InstructorCourses from "./component/InstructorCourses";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/InstructorCourses/:id/:role1" element={<InstructorCourses />} />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courseDetails" element={<CoursesDetails />} />
        <Route path="/register" element={<Rigester />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Page404 />} />
        <Route path="/content" element={<Content/>} />
        <Route path="/completed" element={<IsCompleted/>} />

        <Route path="/content" element={<Content />} />
        <Route path="/favourite" element={<Favourite />} />{" "}
        <Route path="/search" element={<Search />} />
        <Route path="/updatecourses" element={<UpdateCourses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<Student />} />
        <Route path="/message" element={<ChatPage />} />{" "}
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
