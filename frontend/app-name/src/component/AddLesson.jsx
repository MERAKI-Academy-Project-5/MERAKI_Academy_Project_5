import { useState } from "react";
import "./AddLesson.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddLesson = () => {
  const { course } = useParams();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !duration || (!videoFile && !videoLink) || (!imageFile && !imageLink)) {
      toast.error("Please fill all fields and provide video and image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("course", course);

    if (videoFile) formData.append("video", videoFile);
    if (videoLink) formData.append("videoLink", videoLink);

    if (imageFile) formData.append("image", imageFile);
    if (imageLink) formData.append("imageLink", imageLink);

    axios
      .post("http://localhost:5000/lessons/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Lesson created successfully!");
        clearForm();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create lesson. Try again.");
      });
  };

  const clearForm = () => {
    setTitle("");
    setDuration("");
    setVideoFile(null);
    setVideoLink("");
    setImageFile(null);
    setImageLink("");
  };

  return (
    <div className="lesson-card1">
      <h2 className="lesson-title1">Add New Lesson</h2>

      <form onSubmit={handleSubmit} className="lesson-form1">
        <input
          type="text"
          placeholder="Lesson Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Duration (e.g. 2 hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <div className="upload-container">
          {/* Video Upload */}
          <label className="file-label">
            Upload Video File:
            <input
              type="file"
              accept="video/*"
              className="file-input"
              onChange={(e) => {
                setVideoFile(e.target.files[0]);
                setVideoLink("");
              }}
            />
            {videoFile && <span className="file-name">{videoFile.name}</span>}
          </label>

          <input
            type="text"
            placeholder="Or paste YouTube link"
            value={videoLink}
            onChange={(e) => {
              setVideoLink(e.target.value);
              setVideoFile(null);
            }}
            className="youtube-input"
          />

          {/* Video Preview */}
          {videoFile && (
            <video controls className="video-preview">
              <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
            </video>
          )}

          {/* Image Upload */}
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
            {imageFile && <span className="file-name">{imageFile.name}</span>}
          </label>

          <input
            type="text"
            placeholder="Or paste Image URL"
            value={imageLink}
            onChange={(e) => {
              setImageLink(e.target.value);
              setImageFile(null);
            }}
            className="youtube-input"
          />

          {/* Image Preview */}
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

        <div className="lesson-actions1">
          <button type="submit" className="btn1 primary1">Add Lesson</button>
          <button type="button" className="btn1 outline1" onClick={clearForm}>Clear</button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddLesson;
