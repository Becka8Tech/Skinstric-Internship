import React from "react";
import { useResult } from "../context/ResultContext";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import diamond from "../assets/diamond.jpg";
import hdiamond from "../assets/highlight_diamond.jpg";

const Demographics = () => {
  const { resultData, capturedImage } = useResult();

  const getTopPrediction = (categoryObj) => {
    if (!categoryObj) return { label: "Unknown", confidence: 0 };
    const entries = Object.entries(categoryObj);
    const [label, confidence] = entries.reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );
    return { label: capitalize(label), confidence: Math.round(confidence * 100) };
  };

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const topRace = getTopPrediction(resultData?.data?.race);
  const topAge = getTopPrediction(resultData?.data?.age);
  const topSex = getTopPrediction(resultData?.data?.gender);

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
          <p className="race-label">{topRace.label}</p>
          <p className="race-subtext">Race</p>
        </button>

        <button className="age-button">
          <p className="age-range">{topAge.label}</p>
          <p className="age-label">Age</p>
        </button>

        <button className="sex-button">
          <p className="gender">{topSex.label}</p>
          <p className="sex-label">Sex</p>
        </button>

        <div>
          <div className="Group_39781">
            <p className="race-label2">{topRace.label}</p>
          </div>

          <div className="Ellipse_172"></div>
          <div className="Ellipse_173"></div>

          <div className="Group_percent">
            <p className="percent_value">{topRace.confidence}</p>
            <p className="percent_symbol">%</p>
          </div>

          <div className="Group_2786"></div>
          <p className="race-label-small">race</p>
          <p className="ai-confidence-label">a. i. confidence</p>

          <div className="Rectangle_Highlight"></div>
          <img src={hdiamond} className="highlight_diamond" alt="" />
          <div className="highlighted_race">{topRace.label}</div>
          <div className="text_percent">{topRace.confidence} %</div>

          {/* ✅ Sorted race predictions, excluding the top one */}
          {resultData?.data?.race &&
            Object.entries(resultData.data.race)
              .filter(([label]) => capitalize(label) !== topRace.label)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([label, confidence], index) => (
                <div key={label}>
                  <img src={diamond} className={`diamond${index + 1}`} alt="" />
                  <div className={`regular_race${index + 1}`}>
                    {capitalize(label)}
                  </div>
                  <div className={`text_percent${index + 1}`}>
                    {Math.round(confidence * 100)} %
                  </div>
                </div>
              ))}

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
