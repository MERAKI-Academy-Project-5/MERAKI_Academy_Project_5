import React from "react";
import "./Unauthorized.css";
import FuzzyText from "./react bits/FuzzyText/FuzzyText";

const Notcompleted = () => {
  return (
    <div className="unauth-full">
      <div className="unauth-content">
        <div className="unauth-emoji">🚫</div>
        <div>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.6}
            enableHover={true}
          >
            Course Not 
          </FuzzyText>
        </div>

        <FuzzyText baseIntensity={0.2} hoverIntensity={0.6} enableHover={true}>
          Completed
        </FuzzyText>

        <p className="unauth-text">
  You have not completed all lessons of this course yet. Please
              finish all lessons to access the certificate.        </p>
      </div>
    </div>
  );
};

export default Notcompleted;
