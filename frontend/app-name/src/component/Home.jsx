import React from "react";
import "./Home.css";
import Navbar from "./navbar";
import "./Courses.css";

const Home = () => {
  const courses = [
  {
    title: "Graphic Design Essentials",
    lessons: 8,
    students: 50,
    price: 250,
    image: "https://ifda.in/img/graphic-mobile-banner.jpg",
  },
  {
    title: "Python for Data Science",
    lessons: 10,
    students: 60,
    price: 150,
    image: "https://img-c.udemycdn.com/course/750x422/2314160_8d61_6.jpg",
  },
  {
    title: "Full-Stack Web Development",
    lessons: 12,
    students: 80,
    price: 299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2kXQ160NtpDaqElV1m7BMwaDSwezpFO7mA&s",
  }]
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>Smarter tools for modern eductaion</h1>
          <button>Explore Feature</button>
        </div>
        <div className="below_hero">
          <section className="cards">
            <div className="card-right">
              <h3>Join Our Community</h3>
              <p>1550+ Students</p>
            </div>
          </section>
          <div className="hero-image">
            <img className="girl-home" src="/images/girl.png" />
          </div>
          <section className="cards">
            <div className="card-left">
              <h3>Flexible Learning Experiences For Modern Education</h3>
              <p>
                Give Your Students And Teachers The Freedom To Learn Anywhere,
                Anytime, With Tools Built For Modern, Flexible Education.{" "}
              </p>
            </div>
          </section>
        </div>
      </section>
     <section style={{"width":"1300px","borderRadius":"20px", "marginLeft":"-30px" , "marginTop":"-10px" , 
     "backgroundColor": "#4B3F72"}} className="courses-section">
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div style={{"width":"350px" , "backgroundColor":"#8E7CC3"}} className="course-card" key={index}>
            <img  src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>
              {course.lessons} Lessons • {course.students} Students
            </p>
            <div className="bottom">
              <span className="price">${course.price}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more">Load More</button>
    </section>
    </div>
  );
};
export default Home;
