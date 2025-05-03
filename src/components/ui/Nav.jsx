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
        <Link to="/Intro" className="btn_intro">
          [ Intro ]
        </Link>
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
