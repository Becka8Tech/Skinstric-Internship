import React from "react-router-dom";
import { Link } from "react-router-dom";

const Nav = () => {
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
        <Link to="/" className="btn_intro">
          [ Intro ]
        </Link>
      </div>
      <div style={{ flex: "end" }}>
        <button className="dark-button">Enter Code</button>
      </div>
    </nav>
  );
};

export default Nav;
