import "./CoursesDetails.css";
import { useDispatch, useSelector } from "react-redux";
import Lesson from "./Lesson";
import { useNavigate } from "react-router-dom";

const CourseDetails = () => {
    const navigate = useNavigate();
   const lessons = [
    { id: 1, title: "Introduction to Course", duration: "5 min", status: "completed" },
    { id: 2, title: "HTML Basics", duration: "15 min", status: "completed" },
    { id: 3, title: "CSS Fundamentals", duration: "20 min", status: "inprogress" },
    { id: 4, title: "JavaScript Basics", duration: "25 min", status: "locked" },
  ];
  /*const dispatch = useDispatch();
  const getCourseById = () => {
    const id = localStorage.getItem("token.");
    axios
      .get(`http://localhost:5000/courses/getCourseById/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        dispatch(setCourses(result.rows));
      })
      .catch((err) => {
        console.log(err);
      });
  };
*/
console.log("LESSONS ARRAY:", lessons);

  return (
    <div className="course-page">
      <div className="coursedetails-card">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          alt="course"
          className="course-image"
        />
        <div className="course-info">
          <h2>HEADLINE FOR THE COURSE</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
            facere odio, non illo atque quasi accusamus eligendi explicabo esse
            temporibus tenetur nam dolor, nostrum commodi, rerum ad! Veritatis,
            eveniet voluptates.wewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
          </p>
          <div className="course-meta">
            <span>⏱ 10h</span>
            <span>⭐ 4.5</span>
            <span>👥 120 students</span>
          </div>
          <button className="start-btn">Start Course</button>
        </div>
      </div>
      <div className="course-content">
        <div className="lessons">
          <h3>Course Outline</h3>
 <div className="lesson-list">
  {lessons.map((lesson) => (
    <div
      key={lesson.id}
      className="lesson-wrapper"
      onClick={() => navigate("/lesson")}
    >
      <Lesson
        title={lesson?.title || ""}
        duration={lesson?.duration || ""}
        status={lesson?.status || ""}
      />
    </div>
  ))}
</div>
        </div>
        <div className="instructor">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="instructor"
          />
          <h4>Ali alzawawi</h4>
          <p>civil engineer.</p>
          <div className="social">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
