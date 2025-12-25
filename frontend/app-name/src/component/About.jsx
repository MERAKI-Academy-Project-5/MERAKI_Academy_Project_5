import React from "react";
import Navbar from "./navbar";

const About = () => {
  return (
    <div>
        <Navbar />
      <div>
        <h1>About Us</h1>

        <p>
          We are an important resource for helping students from first grade
          through high school by providing simplified, clear, and
          age-appropriate educational content.
        </p>
      </div>

      <div>
        <h2>Our message :</h2>
        <p>
          Providing accessible and easy-to-understand education helps students
          build confidence and achieve better academic results.
        </p>
      </div>

      <div>
        <h2>Our vision :</h2>
        <p>
          To be a trusted educational platform that accompanies the student
          throughout their academic journeyFrom beginning to success.
        </p>
      </div>

      <div>
        <h2>What services do we provide :</h2>
        <ul>
          <li>Simplified lessons for all subjects</li>
          <li>Clear explanation in the video</li>
          <li>Suitable content for every stage</li>
          <li>Easy to use interface</li>
        </ul>
      </div>

      <div>
        <h2>Email :</h2>
        <ul>
          <strong>
            <li>khaledalsous.ahmed@gmail.com</li>
            <li>ammaar.qawasmeh@gmail.com</li>
            <li>alzawawe.ali@gmail.com</li>
          </strong>
        </ul>
      </div>

      <div>
        <h2>Phone :</h2>
        <ul>
          <strong>
            <li>Ammar : 0780988747</li>
            <li>Ahmad : 0781234567</li>
            <li>Ali : 0790123456</li>
          </strong>
        </ul>
      </div>

      <div>
        <h2>Geographical location :</h2>
        <p>
          <strong>jordan - amman</strong>
        </p>
      </div>
    </div>
  );
};

export default About;
