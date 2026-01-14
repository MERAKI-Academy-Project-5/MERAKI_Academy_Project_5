import React from "react";
import "./Unauthorized.css";
import FuzzyText from "./react bits/FuzzyText/FuzzyText";
const Unauthorized = () => {
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
          404
        </FuzzyText>
</div>
        
  <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover={true}
        >
          Page Not Found
        </FuzzyText>


        <p className="unauth-text">
            The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
