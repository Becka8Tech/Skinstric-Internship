import React, { useRef } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import camera from "../assets/camera.jpg";
import gallery from "../assets/gallery-icon.jpg";
import stylus from "../assets/stylus.jpg";

const Scan = () => {
  const fileInputRef = useRef(null);

  const handleGalleryClick = () => {
    fileInputRef.current.click(); // triggers file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Optional: Upload it, preview it, or pass it to another component
    }
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
          <Link to="/Camera" className="camera-icon">
            <img src={camera} alt="Camera Icon" />
          </Link>
        </div>

        {/* Gallery Option */}
        <div className="gallery">
          <div className="Rectangle_2774"></div>
          <div className="Rectangle_2773"></div>
          <div className="Rectangle_2772"></div>

          {/* Trigger file input on click */}
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
    </section>
  );
};

export default Scan;
