import React, { useState } from "react";
import "./CreateCourse.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/coursesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateCourse = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const instructorId = localStorage.getItem("userId") || null;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [startCourse, setStartDate] = useState("");
  const [endCourse, setEndDate] = useState("");
  const handleClear = () => {
  setTitle("");
  setCategory("");
  setPrice("");
  setImage("");
  setDescription("");
  setStartDate("");
  setEndDate("");
  toast.info("Form cleared");
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(endCourse) <= new Date(startCourse)) {
      toast.error("End date must be after start date!");
      return;
    }

    axios
      .post(
        "http://localhost:5000/courses/createNewCourse",
        {
          title,
          description,
          image,
          instructorId,
          category,
          startCourse,
          endCourse,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        dispatch(addCourse(result.data.course));
        toast.success("Course created successfully!");
        setTitle("");
        setCategory("");
        setPrice("");
        setImage("");
        setDescription("");
        setStartDate("");
        setEndDate("");
      })
      .catch((err) => {
        toast.error("Failed to create course. Try again.");
        console.log(err);
      });
  };
  console.log(courses);

  return (
    <div className="create-course-container">
      <h2>Create New Course</h2>
      <form className="create-course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter course title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="UI/UX">UI / UX</option>
            <option value="Science">Science</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">
              {" "}
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              {" "}
              Mechanical Engineering
            </option>
            <option value="Software Engineering">Software Engineering </option>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Full-Stack Development">
              Full-Stack Development
            </option>
            <option value="Data Structures & Algorithms">
              Data Structures & Algorithms
            </option>
            <option value="Databases (SQL / NoSQL)">
              Databases (SQL / NoSQL)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Course description"
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startCourse"
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="endCourse"
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Create Course
          </button>
          <button 
            type="button" 
            className="submit-btn"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default CreateCourse;
