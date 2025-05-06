import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import camera from "../assets/camera.jpg";
import gallery from "../assets/gallery-icon.jpg";
import stylus from "../assets/stylus.jpg";

const Scan = () => {
  return (
    <>
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
              <p className="stylus">Allow A.I. to Scan Your Face </p>
              <img src={stylus} className="stylus1" alt="" />
            </div>
            <Link to="/" className="camera-icon">
              <img src={camera} alt="" />
            </Link>
          </div>
          <div className="gallery">
            <div className="Rectangle_2774"></div>
            <div className="Rectangle_2773"></div>
            <div className="Rectangle_2772"></div>
            <Link to="/" className="gallery-icon">
              <img src={gallery} alt="" />
            </Link>
            <div className="title2">
              <img src={stylus} className="stylus2" alt="" style={{ transform: "rotate(180deg)" }} />
            </div>
              <p className="stylus_title">Allow A.I. access to Gallery</p>
          </div>
        </div>
        <Link to="/Intro" className="back-button">
          <img src={icon} alt="" />
          <div className="discover">Back</div>
        </Link>
      </section>
    </>
  );
};

export default Scan;
