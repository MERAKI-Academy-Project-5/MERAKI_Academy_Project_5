import "./Profile.css";

const Profile=()=> {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img
          src="https://via.placeholder.com/300x380"
          alt="Student"
        />
      </div>

      <div className="profile-content">
        <h2>Smarter tools for modern education</h2>
        <p>
          Empower your learning journey with flexible courses, expert
          instructors, and innovative tools designed for your success.
        </p>

        <div className="profile-stats">
          <div>
            <h3>1500+</h3>
            <span>Students</span>
          </div>
          <div>
            <h3>120+</h3>
            <span>Courses</span>
          </div>
          <div>
            <h3>98%</h3>
            <span>Satisfaction</span>
          </div>
        </div>

        <button className="profile-btn">Explore Courses</button>
      </div>
    </div>
  );
}
export default Profile