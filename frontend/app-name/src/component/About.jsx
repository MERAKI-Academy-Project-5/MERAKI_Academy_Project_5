// import React from "react";
// import Navbar from "./navbar";

// const About = () => {
//   return (
//     <div className="container mt-5">
//         <Navbar />
//       <div>
//         <h1>About Us</h1>

//         <p>
//           We are an important resource for helping students from first grade
//           through high school by providing simplified, clear, and
//           age-appropriate educational content.
//         </p>
//       </div>

//       <div>
//         <h2>Our message :</h2>
//         <p>
//           Providing accessible and easy-to-understand education helps students
//           build confidence and achieve better academic results.
//         </p>
//       </div>

//       <div>
//         <h2>Our vision :</h2>
//         <p>
//           To be a trusted educational platform that accompanies the student
//           throughout their academic journeyFrom beginning to success.
//         </p>
//       </div>

//       <div>
//         <h2>What services do we provide :</h2>
//         <ul>
//           <li>Simplified lessons for all subjects</li>
//           <li>Clear explanation in the video</li>
//           <li>Suitable content for every stage</li>
//           <li>Easy to use interface</li>
//         </ul>
//       </div>

//       <div>
//         <h2>Email :</h2>
//         <ul>
//           <strong>
//             <li>khaledalsous.ahmed@gmail.com</li>
//             <li>ammaar.qawasmeh@gmail.com</li>
//             <li>alzawawe.ali@gmail.com</li>
//           </strong>
//         </ul>
//       </div>

//       <div>
//         <h2>Phone :</h2>
//         <ul>
//           <strong>
//             <li>Ammar : 0780988747</li>
//             <li>Ahmad : 0781234567</li>
//             <li>Ali : 0790123456</li>
//           </strong>
//         </ul>
//       </div>

//       <div>
//         <h2>Geographical location :</h2>
//         <p>
//           <strong>jordan - amman</strong>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from "react";
import Navbar from "./navbar";
import "./About.css";

const About = () => {
  
  return (
    <>
      <div className="about-page py-5">
        <div className="container">
          <div className="about-header text-center mb-5">
            <h1>About Us</h1>
            <p>
              Helping students from first grade to high school with simple,
              clear, and effective educational content.
            </p>
          </div>

          <div className="about-section mb-4">
            <h3>📩 Our Message</h3>
            <p>
              Providing accessible and easy-to-understand education helps
              students build confidence and achieve better academic results.
            </p>
          </div>

          <div className="about-section mb-4">
            <h3>🎯 Our Vision</h3>
            <p>
              To be a trusted educational platform that accompanies students
              throughout their academic journey from beginning to success.
            </p>
          </div>

          <div className="about-section mb-4">
            <h3>🛠 Our Services</h3>
            <ul>
              <li>📘 Simplified lessons for all subjects</li>
              <li>🎥 Clear explanation in videos</li>
              <li>🎓 Suitable content for every stage</li>
              <li>🧭 Easy to use interface</li>
            </ul>
          </div>

          <div className="about-section">
            <h3>📞 Contact Information</h3>

            <p className="mb-1 fw-bold">📧 Emails</p>
            <ul>
              <li>📨 khaledalsous.ahmed@gmail.com</li>
              <li>📨 ammaar.qawasmeh@gmail.com</li>
              <li>📨 alzawawe.ali@gmail.com</li>
            </ul>

            <p className="mb-1 fw-bold">📱 Phones </p>
            <ul>
              <li>👤 Ammar : 0780988747</li>
              <li>👤 Ahmad : 0781234567</li>
              <li>👤 Ali : 0790123456</li>
            </ul>

            <p className="fw-bold">
              📍 Location: <span>Jordan - Amman</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
