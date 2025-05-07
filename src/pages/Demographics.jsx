import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";

const Demographics = () => {
  return (
    <>
      <section>
        <p className="ai-analysis">A. I. Analysis</p>
        <p className="demographics-title">Demographics</p>
        <div className="demo_nav">
          <img src={icon} alt="" />
          <img src={icon} className="rotated-image" alt="" />
        </div>
        <p className="predicted-info">Predicted Race & Age</p>
        <button className="race-button">
          <p className="race-label">East Asian</p>
          <p className="race-subtext">Race</p>
        </button>
        <button className="age-button">
          <p className="age-range">20-29</p>
          <p className="age-label">Age</p>
        </button>
        <button className="sex-button">
          <p className="gender">Female</p>
          <p className="sex-label">Sex</p>
        </button>
        <div>
          <div className="Group_39781">
            <p className="race-label2">East Asian</p>
          </div>
          <div className="Ellipse_172"></div>
          <div className="Ellipse_173"></div>
          <div className="Group_percent">
            <p className="percent_value">96</p>
            <p className="percent_symbol">%</p>
          </div>
          <div className="Group_2786"></div>
          <p className="race-label-small">race</p>
          <p className="ai-confidence-label">a. i. confidence</p>
          <div className="Rectangle_Highlight"></div>

          <div className="highlighted_race">East Asian</div>
          <div className="text_percent">96 %</div>
          <Link to="/DemoStart" className="back-button">
            <img src={icon} alt="" />
            <div className="discover">Back</div>
          </Link>
          <p className="ai-correction-note">
            If A.I. estimate is wrong, select the correct one.
          </p>
          <button className="reset-button">Reset</button>
          <button className="confirm-button">Confirm</button>
        </div>
      </section>
    </>
  );
};

export default Demographics;
