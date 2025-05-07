import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";

const DemoStart = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const rectangleClass = (base) =>
    loading ? `${base} spinning` : base;

  return (
    <section>
      {loading ? (
        <div className="diamond_container">
          <div className={rectangleClass("Rectangle_2746")}></div>
          <div className={rectangleClass("Rectangle_2745")}></div>
          <div className={rectangleClass("Rectangle_2744")}></div>
          <div className="loading-message">Preparing Your Analysis...</div>
        </div>
      ) : (
        <>
          <div>
            <p className="ai-analysis">A. I. Analysis</p>
            <p className="ai-analysis2">
              A. I. has estimated the following.
              <br />
              Fix estimated information if needed.
            </p>
          </div>
          <div className="diamond_container">
            <div className="Rectangle_2746"></div>
            <div className="Rectangle_2745"></div>
            <div className="Rectangle_2744"></div>
            <div className="group_diamond">
              <Link to="/Demographics" className="Rectangle_2876 top">
                <p className="rectangle_label">Demographics</p>
              </Link>
              <Link to="/Demographics" className="Rectangle_2876 bottom">
                <p className="rectangle_label">Weather</p>
              </Link>
              <Link to="/Demographics" className="Rectangle_2876 left">
                <p className="rectangle_label">
                  Skin Type <br />
                  Details
                </p>
              </Link>
              <Link to="/Demographics" className="Rectangle_2876 right">
                <p className="rectangle_label">Cosmetic Concerns</p>
              </Link>
            </div>
          </div>
          <Link to="/Scan" className="back-button">
            <img src={icon} alt="" />
            <div className="discover">Back</div>
          </Link>
          <Link to="/Demographics" className="proceed-button">
            <div className="discover">Get Summary</div>
            <img src={icon} className="rotated-image" alt="" />
          </Link>
        </>
      )}
    </section>
  );
};

export default DemoStart;
