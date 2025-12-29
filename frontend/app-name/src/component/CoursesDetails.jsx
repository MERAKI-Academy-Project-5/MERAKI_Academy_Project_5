import "./CoursesDetails.css";

const CourseDetails = () => {
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
          Lesson One Name <br></br>
          Lesson Two Name<br></br>
          Lesson Three Name<br></br>
          Lesson Four Name<br></br>
          Lesson Five Name<br></br>
          Lesson Six Name<br></br>
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
