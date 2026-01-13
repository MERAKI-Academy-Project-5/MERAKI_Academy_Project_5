import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lesson.css";
import { useSelector } from "react-redux";
import MagicBento from "./MagicBento/MagicBento";


const Lesson = () => {
  const [lessons, setLessons] = useState([]);
  const courseId = useSelector((state) => state.courseDetails.courseId);

  useEffect(() => {
    if (!courseId) return; 

    axios
      .get(`http://localhost:5000/lessons/getlessonbyCourseId/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setLessons(res.data.lessons || []))
      .catch((err) => console.log(err));
  }, [courseId]);
  return (
  
     <MagicBento
  enableSpotlight
  enableBorderGlow
  enableTilt
  enableMagnetism
  clickEffect
  spotlightRadius={300}
  particleCount={10}
  glowColor="132, 0, 255"
>
  {lessons.length === 0 ? (
    <p style={{ color: "#fff" }}>No lessons available</p>
  ) : (
    lessons.map((lesson, index) => (
      <div
        key={lesson.id || index}
        className="lesson-card magic-bento-card magic-bento-card--border-glow"
      >
        <div className="lesson-image">
       <img
  src={lesson.image.startsWith("http") ? lesson.image : `http://localhost:5000/uploads/${lesson.image}`}
  alt={lesson.title}
/>
        </div>

        
        <div className="lesson-content">
          <h3>{lesson.title}</h3>

          <p className="lesson-duration">
            ⏱ Duration: {lesson.duration}
          </p>

          <button
            className="watch-btn"
            onClick={() => window.open(lesson.video, "_blank")}
          >
            ▶ Watch Video
          </button>
        </div>
      </div>
    ))
  )}
</MagicBento>

    
  );
};

export default Lesson;
