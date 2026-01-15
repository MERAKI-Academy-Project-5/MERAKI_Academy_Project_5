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
import Navbar from "./component/Navbar";
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
import Instructors from "./component/Instructors";
import TeacherDashboard from "./component/TeacherDashboard";
import StudentsByInstructor from "./component/StudentsBYinstructor";
import CreateCourse from "./component/CreateCourse";
import AddLesson from "./component/AddLesson";
import Payment from "./component/Payment";
import PayPalPayment from "./component/Payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import NewCard from "./component/NewCard";
import CheckoutReview from "./component/CheckoutReview";
import Nofav from "./component/nofav";
import Notcompleted from "./component/Notcompleted";
import SearchCategory from "./component/searchcategory";
const initialOptions = {
  "client-id": "YOUR_SANDBOX_CLIENT_ID", // sandbox key
  currency: "USD",
  intent: "capture",
};

const App = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/InstructorCourses/:id/:role1"
            element={<InstructorCourses />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courseDetails" element={<CoursesDetails />} />
          <Route path="/register" element={<Rigester />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/content" element={<Content />} />
          <Route path="/completed/:courseId" element={<IsCompleted />} />
          <Route path="/content" element={<Content />} />
          <Route path="/favourite" element={<Favourite />} />{" "}
          <Route path="/search" element={<Search />} />
          <Route path="/updatecourses" element={<UpdateCourses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacherDashboard" element={<TeacherDashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/searchcategory/:category" element={<SearchCategory />} />
          <Route
            path="/StudentsByInstructor/:userid"
            element={<StudentsByInstructor />}
          />
          <Route path="/Instructors" element={<Instructors />} />
          <Route path="/message" element={<ChatPage />} />{" "}
          <Route path="/createcourse" element={<CreateCourse />} />{" "}
          <Route path="/AddLessons/:course" element={<AddLesson />} />{" "}
          <Route path="/newcard/:price" element={<NewCard />} />{" "}
          <Route path="/payment/:price" element={<Payment />} />{" "}
          <Route path="/checkout/:price" element={<CheckoutReview />} />{" "}
          <Route path="/Nofav" element={<Nofav/>} />
          <Route path="/Notcompleted" element={<Notcompleted/>} />
        </Routes>
        <Footer />
      </div>
    </PayPalScriptProvider>
  );
};
export default App;
