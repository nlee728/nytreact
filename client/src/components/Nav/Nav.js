import React from "react";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <h1 className="navbar-brand">
    <i className="fa fa-newspaper-o"></i>NYT Scrubber
    </h1>
    <ul className="nav nav-tabs">
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Home")}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Saved")}
        className={
          props.currentPage === "Saved" ? "nav-link active" : "nav-link"
        }
      >
        Saved
      </a>
    </li>
   </ul>
  </nav>
);

export default Nav;
