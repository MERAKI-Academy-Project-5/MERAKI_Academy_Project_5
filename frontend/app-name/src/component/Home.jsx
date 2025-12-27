import React from "react";
import "./Home.css";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
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
    </div>
  );
};
export default Home;
