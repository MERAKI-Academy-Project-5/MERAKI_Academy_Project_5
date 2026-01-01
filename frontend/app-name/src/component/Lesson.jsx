import "./Lesson.css";
import React from "react";

 const Lesson = ({ title, duration, status })=> {
  console.log(duration);
  console.log(title);
  console.log(status);
 
  return (
    <div className="lesson-item">
      <div className="lesson-left">
        <span className="lesson-dot"></span>
        <div>
          <h4>{title}</h4>
          <p>{duration}</p>
        </div>
      </div>

      <span className={`lesson-status ${status}`}>
        {status}
      </span>
    </div>
  );
}
export default Lesson