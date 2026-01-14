import { useState } from "react";
import "./CreateCourse.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCourse } from "../redux/coursesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const instructorId = localStorage.getItem("userId") || null;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [startCourse, setStartDate] = useState("");
  const [endCourse, setEndDate] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const clearForm = () => {
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setImageFile(null);
    setImageLink("");
    toast.info("Form cleared");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !category ||
      !price ||
      !description ||
      !startCourse ||
      !endCourse ||
      (!imageFile && !imageLink)
    ) {
      toast.error("Please fill all fields and provide an image.");
      return;
    }

    if (new Date(endCourse) <= new Date(startCourse)) {
      toast.error("End date must be after start date!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("startCourse", startCourse);
      formData.append("endCourse", endCourse);
      formData.append("instructorId", instructorId);

      if (imageFile) formData.append("image", imageFile);
      if (imageLink) formData.append("imageLink", imageLink);

      const res = await axios.post(
        "http://localhost:5000/courses/createNewCourse",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(addCourse(res.data.course));
      toast.success("Course created successfully!");
      clearForm();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create course. Try again.");
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create New Course</h2>

      <form className="lesson-form1" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="UI/UX">UI / UX</option>
          <option value="Science">Science</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Backend Development">Backend Development</option>
          <option value="Full-Stack Development">Full-Stack Development</option>
          <option value="Data Structures & Algorithms">
            Data Structures & Algorithms
          </option>
          <option value="Databases (SQL / NoSQL)">Databases (SQL / NoSQL)</option>
        </select>

        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        <input
          type="date"
          value={startCourse}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <input
          type="date"
          value={endCourse}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        {/* Image Upload */}
        <div className="upload-container">
          <label className="file-label">
            Upload Image File:
            <input
              type="file"
              accept="image/*"
              className="file-input"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setImageLink("");
              }}
            />
            {imageFile && <span>{imageFile.name}</span>}
          </label>

          <input
            type="text"
            placeholder="Or paste Image URL"
            value={imageLink}
            onChange={(e) => {
              setImageLink(e.target.value);
              setImageFile(null);
            }}
          />

          {/* Preview */}
          {(imageFile || imageLink) && (
            <div className="preview-container">
              <p>Image Preview:</p>
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : imageLink}
                alt="Preview"
                className="image-preview"
              />
            </div>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">Create Course</button>
          <button type="button" className="submit-btn outline" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateCourse;
