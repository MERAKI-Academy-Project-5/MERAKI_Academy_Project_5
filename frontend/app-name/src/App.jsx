import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./component/home";
import About from "./component/About";

import Rigester from "./component/Register";
import Login from "./component/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import Unauthorized from "./component/Unauthorized";
import Courses from "./component/Courses";
import CoursesDetails from "./component/CoursesDetails";
import Navbar from "./component/navbar";

import Footer from "./component/Footer ";
import Page404 from "./component/Page404";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courseDetails" element={<CoursesDetails />} />
        <Route path="/register" element={<Rigester />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Page404/>}/>
      </Routes>
      <Footer/>
    </div>
  );
};
export default App;
