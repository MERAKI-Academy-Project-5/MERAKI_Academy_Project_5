import React from "react";
import "./Unauthorized.css";
import FuzzyText from "./react bits/FuzzyText/FuzzyText";

const Nofav = () => {
  return (
    <div className="unauth-full">
      <div className="unauth-content">
      
        <div>
          
        </div>

        <FuzzyText baseIntensity={0.2} hoverIntensity={0.6} enableHover={true}>
          No favourite
        </FuzzyText>

        <FuzzyText baseIntensity={0.2} hoverIntensity={0.6} enableHover={true}>
          courses yet{" "}
        </FuzzyText>
      </div>
    </div>
  );
};

export default Nofav;
