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
          403
        </FuzzyText>
</div>
        
<FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover={true}
        >
          Unauthorized
        </FuzzyText>
        

        <p className="unauth-text">
          You don’t have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
