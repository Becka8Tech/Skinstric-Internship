import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import camera from "../assets/camera.jpg";
import gallery from "../assets/gallery-icon.jpg";
import stylus from "../assets/stylus.jpg";

const Scan = () => {
  const fileInputRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
    }
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
        <div className="camera">
          <div className="Rectangle_2777"></div>
          <div className="Rectangle_2776"></div>
          <div className="Rectangle_2775"></div>
          <div className="title">
            <p className="stylus">Allow A.I. to Scan Your Face</p>
            <img src={stylus} className="stylus1" alt="" />
          </div>
          <div className="camera-icon" onClick={handleCameraClick} style={{ cursor: "pointer" }}>
            <img src={camera} alt="Camera Icon" />
          </div>
        </div>

        <div className="gallery">
          <div className="Rectangle_2774"></div>
          <div className="Rectangle_2773"></div>
          <div className="Rectangle_2772"></div>

          <div className="gallery-icon" onClick={handleGalleryClick} style={{ cursor: "pointer" }}>
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
            <img src={stylus} className="stylus2" alt="" style={{ transform: "rotate(180deg)" }} />
          </div>
          <p className="stylus_title">Allow A.I. access to Gallery</p>
        </div>
      </div>

      <Link to="/Intro" className="back-button">
        <img src={icon} alt="Back Icon" />
        <div className="discover">Back</div>
      </Link>

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
