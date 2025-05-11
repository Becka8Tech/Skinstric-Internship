import React, { useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";

const Intro = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (step === 1) {
        if (!/^[A-Za-z\s]+$/.test(name.trim())) {
          alert("Please enter a valid name (letters and spaces only).");
          return;
        }
        localStorage.setItem("name", name.trim());
        setStep(2);
      } else if (step === 2) {
        if (!/^[A-Za-z\s]+$/.test(location.trim())) {
          alert("Please enter a valid location (letters and spaces only).");
          return;
        }
        localStorage.setItem("location", location.trim());

        const data = {
          name: name.trim(),
          location: location.trim(),
        };

        try {
          const response = await fetch(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to submit data");
          }

          const successLog = {
            SUCCESS: `Added ${data.name} from ${data.location}`,
          };

          console.log(JSON.stringify(successLog));
          setSuccessMessage(successLog.SUCCESS);
          setStep(3);
        } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong. Try again.");
        }
      }
    }
  };

  return (
    <>
      <section>
        <div className="subhead_1920">To start analysis</div>

        <div className="rombuses">
          <div className="Rectangle_2780"></div>
          <div className="Rectangle_2779"></div>
          <div className="Rectangle_2778"></div>

          {!successMessage && <div className="captions_1920">click to type</div>}

          <div className="Intro_name">
            <input
              type="text"
              placeholder={
                step === 1
                  ? "Introduce Yourself"
                  : step === 2
                  ? "Where are you from?"
                  : "Please Proceed"
              }
              value={step === 1 ? name : step === 2 ? location : ""}
              onChange={(e) =>
                step === 1
                  ? setName(e.target.value)
                  : step === 2
                  ? setLocation(e.target.value)
                  : null
              }
              onKeyDown={handleKeyDown}
              disabled={step === 3}
            />
            {step === 3 && successMessage && (
              <div
                style={{
                  marginTop: "12px",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "14px",
                  textTransform: "uppercase",
                }}
              >
                {successMessage}
              </div>
            )}
          </div>
        </div>

        <Link to="/" className="back-button">
          <img src={icon} alt="" />
          <div className="discover">Back</div>
        </Link>

        {successMessage && (
          <Link to="/Scan" className="proceed-button">
            <div className="discover">Proceed</div>
            <img src={icon} className="rotated-image" alt="" />
          </Link>
        )}
      </section>
    </>
  );
};

export default Intro;