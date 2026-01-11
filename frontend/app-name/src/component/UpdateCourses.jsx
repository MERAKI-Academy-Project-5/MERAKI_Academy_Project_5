import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateCourses.css";
import { useSelector } from "react-redux";

const UpdateCourses = () => {

   const id = localStorage.getItem("userId") || null;;
 
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/getCourseById/${id}`)
      .then((res) => {
        const c = res.data.course;
        setTitle(c.title || "");
        setDescription(c.description || "");
        setImage(c.image || "");
        setPrice(c.price || "");
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    
    e.preventDefault();

    axios
      .put(
        `http://localhost:5000/courses/update/${id}`,
        { title, description, image, price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        navigate("/courses"); 
      })
      .catch((err) => console.log(err));
  };
return (
  <div className="update-course-page">
    <div className="update-course-card">
      <h2>Update Course</h2>

      <input
        type="text"
        placeholder="Course Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <textarea
        placeholder="Description"
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
    </div>
  </div>
);

};

export default UpdateCourses;
