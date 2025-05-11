import React, { useEffect, useState } from "react";
import { useResult } from "../context/ResultContext";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import diamond from "../assets/diamond.jpg";
import hdiamond from "../assets/highlight_diamond.jpg";

const Demographics = () => {
  const { resultData } = useResult();

  const [showAgeDetails, setShowAgeDetails] = useState(false);
  const [showRaceDetails, setShowRaceDetails] = useState(true);
  const [showGenderDetails, setShowGenderDetails] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [actualRace, setActualRace] = useState(null);
  const [actualAge, setActualAge] = useState(null);
  const [actualGender, setActualGender] = useState(null);

  const resetState = () => {
    setActualRace(null);
    setActualAge(null);
    setActualGender(null);
    setShowRaceDetails(true);
    setShowAgeDetails(false);
    setShowGenderDetails(false);
    setHasInteracted(false);
  };

  useEffect(() => {
    resetState();
  }, []);

  const handleNextSection = () => {
    if (showRaceDetails) {
      setShowRaceDetails(false);
      setShowAgeDetails(true);
    } else if (showAgeDetails) {
      setShowAgeDetails(false);
      setShowGenderDetails(true);
    } else {
      setShowRaceDetails(true);
      setShowGenderDetails(false);
    }
  };

  const handlePrevSection = () => {
    if (showGenderDetails) {
      setShowGenderDetails(false);
      setShowAgeDetails(true);
    } else if (showAgeDetails) {
      setShowAgeDetails(false);
      setShowRaceDetails(true);
    } else {
      setShowRaceDetails(false);
      setShowGenderDetails(true);
    }
  };

  const getTopPrediction = (categoryObj) => {
    if (!categoryObj) return { label: "Unknown", confidence: 0 };
    const entries = Object.entries(categoryObj);
    const [label, confidence] = entries.reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );
    return {
      label: capitalize(label),
      confidence: Math.round(confidence * 100),
    };
  };

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const topRace = getTopPrediction(resultData?.data?.race);
  const topAge = getTopPrediction(resultData?.data?.age);
  const topSex = getTopPrediction(resultData?.data?.gender);

  return (
    <section className="demo-container">
      <p className="ai-analysis">A. I. Analysis</p>
      <p className="demographics-title">Demographics</p>

      {hasInteracted && (
        <div className="demo_nav">
          <img
            src={icon}
            alt="Previous"
            onClick={handlePrevSection}
            style={{ cursor: "pointer" }}
          />
          <img
            src={icon}
            className="rotated-image"
            alt="Next"
            onClick={handleNextSection}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      <p className="predicted-info">Predicted Race & Age</p>

      <button
        className="race-button"
        onClick={() => {
          setShowRaceDetails(true);
          setShowAgeDetails(false);
          setShowGenderDetails(false);
          setHasInteracted(true);
        }}
      >
        <p className="race-label">{actualRace || topRace.label}</p>
        <p className="race-subtext">Race</p>
      </button>

      <button
        className="age-button"
        onClick={() => {
          setShowRaceDetails(false);
          setShowAgeDetails(true);
          setShowGenderDetails(false);
          setHasInteracted(true);
        }}
      >
        <p className="age-range">{actualAge || topAge.label}</p>
        <p className="age-label">Age</p>
      </button>

      <button
        className="sex-button"
        onClick={() => {
          setShowRaceDetails(false);
          setShowAgeDetails(false);
          setShowGenderDetails(true);
          setHasInteracted(true);
        }}
      >
        <p className="gender">{actualGender || topSex.label}</p>
        <p className="sex-label">Sex</p>
      </button>

      {/* RACE SECTION */}
      {showRaceDetails && (
        <>
          <div className="Group_39781">
            <p className="race-label2">{actualRace || topRace.label}</p>
          </div>
          <svg className="progress-ring" width="384" height="384">
            <circle className="ring-bg" r="190" cx="192" cy="192" fill="transparent" stroke="#c1c2c3" strokeWidth="3" />
            <circle
              className="ring-fill"
              r="190"
              cx="192"
              cy="192"
              fill="transparent"
              stroke="#1a1b1c"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${2 * Math.PI * 190}`,
                strokeDashoffset: `${2 * Math.PI * 190 * ((100 - topRace.confidence) / 100)}`,
              }}
            />
          </svg>

          <div className="Group_percent">
            <p className="percent_value">{actualRace ? "--" : topRace.confidence}</p>
            <p className="percent_symbol">%</p>
          </div>
          <p className="race-label-small">race</p>
          <p className="ai-confidence-label">a. i. confidence</p>
          <div className="Rectangle_Highlight"></div>
          <img src={hdiamond} className="highlight_diamond" alt="" />
          <div className="highlighted_race">{actualRace || topRace.label}</div>
          <div className="text_percent">{actualRace ? "--" : topRace.confidence} %</div>

          {resultData?.data?.race &&
            Object.entries(resultData.data.race)
              .filter(([label]) => capitalize(label) !== topRace.label)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([label, confidence], index) => (
                <div key={label}>
                  <img src={diamond} className={`diamond${index + 1}`} alt="" />
                  <div
                    className={`regular_race${index + 1}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActualRace(capitalize(label))}
                  >
                    {capitalize(label)}
                  </div>
                  <div className={`text_percent${index + 1}`}>
                    {Math.round(confidence * 100)} %
                  </div>
                </div>
              ))}
        </>
      )}

      {/* AGE SECTION */}
      {showAgeDetails && (
        <>
          <div className="Group_39781">
            <p className="race-label2">{actualAge || `${topAge.label} y.o.`}</p>
          </div>
          <svg className="progress-ring" width="384" height="384">
            <circle className="ring-bg" r="190" cx="192" cy="192" fill="transparent" stroke="#c1c2c3" strokeWidth="3" />
            <circle
              className="ring-fill"
              r="190"
              cx="192"
              cy="192"
              fill="transparent"
              stroke="#1a1b1c"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${2 * Math.PI * 190}`,
                strokeDashoffset: `${2 * Math.PI * 190 * ((100 - topAge.confidence) / 100)}`,
              }}
            />
          </svg>

          <div className="Group_percent">
            <p className="percent_value">{actualAge ? "--" : topAge.confidence}</p>
            <p className="percent_symbol">%</p>
          </div>
          <p className="race-label-small">age</p>
          <p className="ai-confidence-label">a. i. confidence</p>
          <div className="Rectangle_Highlight"></div>
          <img src={hdiamond} className="highlight_diamond" alt="" />
          <div className="highlighted_race">{actualAge || topAge.label}</div>
          <div className="text_percent">{actualAge ? "--" : topAge.confidence} %</div>

          {resultData?.data?.age &&
            Object.entries(resultData.data.age)
              .filter(([label]) => capitalize(label) !== topAge.label)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 9)
              .map(([label, confidence], index) => (
                <div key={label}>
                  <img src={diamond} className={`diamond${index + 1}`} alt="" />
                  <div
                    className={`regular_race${index + 1}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActualAge(capitalize(label))}
                  >
                    {capitalize(label)}
                  </div>
                  <div className={`text_percent${index + 1}`}>
                    {Math.round(confidence * 100)} %
                  </div>
                </div>
              ))}
        </>
      )}

      {/* GENDER SECTION */}
      {showGenderDetails && (
        <>
          <div className="Group_39781">
            <p className="race-label2">{actualGender || topSex.label}</p>
          </div>
          <svg className="progress-ring" width="384" height="384">
            <circle className="ring-bg" r="190" cx="192" cy="192" fill="transparent" stroke="#c1c2c3" strokeWidth="3" />
            <circle
              className="ring-fill"
              r="190"
              cx="192"
              cy="192"
              fill="transparent"
              stroke="#1a1b1c"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${2 * Math.PI * 190}`,
                strokeDashoffset: `${2 * Math.PI * 190 * ((100 - topSex.confidence) / 100)}`,
              }}
            />
          </svg>

          <div className="Group_percent">
            <p className="percent_value">{actualGender ? "--" : topSex.confidence}</p>
            <p className="percent_symbol">%</p>
          </div>
          <p className="race-label-small">gender</p>
          <p className="ai-confidence-label">a. i. confidence</p>
          <div className="Rectangle_Highlight"></div>
          <img src={hdiamond} className="highlight_diamond" alt="" />
          <div className="highlighted_race">{actualGender || topSex.label}</div>
          <div className="text_percent">{actualGender ? "--" : topSex.confidence} %</div>

          {resultData?.data?.gender &&
            Object.entries(resultData.data.gender)
              .filter(([label]) => capitalize(label) !== topSex.label)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([label, confidence], index) => (
                <div key={label}>
                  <img src={diamond} className={`diamond${index + 1}`} alt="" />
                  <div
                    className={`regular_race${index + 1}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActualGender(capitalize(label))}
                  >
                    {capitalize(label)}
                  </div>
                  <div className={`text_percent${index + 1}`}>
                    {Math.round(confidence * 100)} %
                  </div>
                </div>
              ))}
        </>
      )}

      {/* Footer Section */}
      <Link to="/Scan" className="back-button">
        <img src={icon} alt="" />
        <div className="discover">Back</div>
      </Link>

      <p className="ai-correction-note">
        If A.I. estimate is wrong, select the correct one.
      </p>

      <button className="reset-button" onClick={resetState}>
        Reset
      </button>

      <button
        className="confirm-button"
        onClick={() => {
          const finalRace = actualRace || topRace.label;
          const finalAge = actualAge || topAge.label;
          const finalGender = actualGender || topSex.label;
          console.log("Confirmed Demographics:", {
            race: finalRace,
            age: finalAge,
            gender: finalGender,
          });
          alert(`Confirmed: ${finalRace}, ${finalAge}, ${finalGender}`);
        }}
      >
        Confirm
      </button>
    </section>
  );
};

export default Demographics;