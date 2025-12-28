import React from "react";
import "./Courses.css";
import Navbar from "./navbar";
const Courses = () => {
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
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq2kXQ160NtpDaqElV1m7BMwaDSwezpFO7mA&s",
    },
    {
      title: "UI/UX Design for Beginners",
      lessons: 6,
      students: 30,
      price: 350,
      image:
        "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    },
    {
      title: "UI/UX Design for Beginners",
      lessons: 6,
      students: 30,
      price: 350,
      image:
        "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    },
    {
      title: "UI/UX Design for Beginners",
      lessons: 6,
      students: 30,
      price: 350,
      image:
        "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    },
    {
      title: "UI/UX Design for Beginners",
      lessons: 6,
      students: 30,
      price: 350,
      image:
        "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    },
    {
      title: "UI/UX Design for Beginners",
      lessons: 6,
      students: 30,
      price: 350,
      image:
        "https://www.uxdesigninstitute.com/blog/wp-content/uploads/2024/11/101_UX_vs_UI_illustration_blog-1.png",
    },
  ];

  return (
    <div>
      <Navbar />
      <section className="courses-section">
        <h2>Popular Courses</h2>
        <div className="filters">
          <button className="active">All</button>
          <button>Web Development</button>
          <button>Data Science</button>
          <button>Digital Marketing</button>
          <button>Business</button>
          <button>Management</button>
        </div>
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <img src={course.image} alt={course.title} />
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

export default Courses;
