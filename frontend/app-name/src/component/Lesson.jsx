import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Lesson.css";
import { useSelector } from "react-redux";


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
     <div className="lessons-wrapper">
      {lessons.length === 0 ? (
        <p>No lessons available</p>
      ) : (
        lessons.map((lesson, index) => (
          <div className="lesson-card" key={lesson.id || index}>
            <div className="lesson-image">
              <img src={lesson.image} alt={lesson.title} />
            </div>

            <div className="lesson-content">
              <h3>{lesson.title}</h3>
              <p>⏱ Duration: {lesson.duration}</p>

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
    </div>
  );
};

export default Lesson;
