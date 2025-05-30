import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";

const Home = () => {
  return (
    <>
      <section id="home">
        <div className="triangle-wrapper">
          <svg
            className="triangle-overlays"
            viewBox="0 0 602 602"
            width="602"
            height="602"
            preserveAspectRatio="none"
          >
            <line
              x1="602"
              y1="0"
              x2="0"
              y2="301"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <line
              x1="0"
              y1="301"
              x2="602"
              y2="602"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
          </svg>

          <Link to="/Intro" className="btn_1920">
            <img src={icon} alt="" />
            <div className="discover">Discover A.I.</div>
          </Link>
        </div>
        <div className="company-title">Sophisticated skincare</div>
        <div className="triangle-wrapper">
          <svg
            className="triangle-overlay"
            viewBox="0 0 602 602"
            width="602"
            height="602"
            preserveAspectRatio="none"
          >
            <line
              x1="602"
              y1="0"
              x2="0"
              y2="301"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <line
              x1="0"
              y1="301"
              x2="602"
              y2="602"
              stroke="black"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
          </svg>

          <Link to="/Intro" className="btn_1920">
            <div className="discover">Take Test</div>
            <img src={icon} className="rotated-image" alt="" />
          </Link>
        </div>
        <div className="caption_1920">
          <p>
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
