import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" className="btn_skinstric">
          Skinstric
        </Link>
      {location.pathname === "/" && (
        <Link to="/Intro" className="btn_intro">
          [ Intro ]
        </Link>
      )}
      {location.pathname === "/Intro" && (
        <Link to="/Intro" className="btn_intro">
          [ Intro ]
        </Link>
      )}
      {location.pathname === "/Scan" && (
        <Link to="/Intro" className="btn_intro">
          [ Intro ]
        </Link>
      )}
      {location.pathname === "/DemoStart" && (
        <Link to="/Demographics" className="btn_intro">
          [ Analysis ]
        </Link>
      )}
      {location.pathname === "/Demographics" && (
        <Link to="/Demographics" className="btn_intro">
          [ Analysis ]
        </Link>
      )}
    
      </div>
      {location.pathname === "/" && (
        <div style={{ flex: "end" }}>
          <button className="dark-button">Enter Code</button>
        </div>
      )}
    </nav>
  );
};

export default Nav;
