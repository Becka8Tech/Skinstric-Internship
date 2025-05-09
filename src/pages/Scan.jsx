import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useResult } from "../context/ResultContext";
import icon from "../assets/buttin-icon-shrunk.jpg";
import camera from "../assets/camera.jpg";
import gallery from "../assets/gallery-icon.jpg";
import stylus from "../assets/stylus.jpg";

const Scan = () => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setResultData, setCapturedImage } = useResult();

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
      const payload = { image: base64Image };

      try {
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API Error ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        setResultData(result);
        setCapturedImage(reader.result);
        navigate("/DemoStart");
      } catch (err) {
        console.error("Image upload or API error:", err);
        setError("Failed to analyze image. Please try again.");
      }
    };

    reader.onerror = () => {
      console.error("Failed to read file.");
      setError("Failed to read the selected file.");
    };

    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    setShowPopup(true);
  };

  const handleAllow = () => {
    setShowPopup(false);
    navigate("/Camera");
  };

  const handleDeny = () => {
    setShowPopup(false);
  };

  return (
    <section>
      <div className="subhead_1920">To start analysis</div>

      <div
        className="scaners"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "space-between",
        }}
      >
        {/* Camera Option */}
        <div className="camera">
          <div className="Rectangle_2777"></div>
          <div className="Rectangle_2776"></div>
          <div className="Rectangle_2775"></div>
          <div className="title">
            <p className="stylus">Allow A.I. to Scan Your Face</p>
            <img src={stylus} className="stylus1" alt="" />
          </div>
          <div
            className="camera-icon"
            onClick={handleCameraClick}
            style={{ cursor: "pointer" }}
          >
            <img src={camera} alt="Camera Icon" />
          </div>
        </div>

        {/* Gallery Option */}
        <div className="gallery">
          <div className="Rectangle_2774"></div>
          <div className="Rectangle_2773"></div>
          <div className="Rectangle_2772"></div>

          <div
            className="gallery-icon"
            onClick={handleGalleryClick}
            style={{ cursor: "pointer" }}
          >
            <img src={gallery} alt="Gallery Icon" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className="title2">
            <img
              src={stylus}
              className="stylus2"
              alt=""
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
          <p className="stylus_title">Allow A.I. access to Gallery</p>
        </div>
      </div>

      {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}

      <Link to="/Intro" className="back-button">
        <img src={icon} alt="Back Icon" />
        <div className="discover">Back</div>
      </Link>

      {/* Camera permission popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>Allow A.I. to access your camera</p>
            <div className="popup-buttons">
              <button onClick={handleDeny}>Deny</button>
              <button onClick={handleAllow}>Allow</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Scan;
