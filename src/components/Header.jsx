import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="frontpage">
      <section id="title">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <b className="navbar-brand brandname mainname">
            <i class="fas fa-user-graduate"></i> DDU Placement
          </b>
          <button
            className="navbar-toggler searchbox"
            type="button"
            data-toggle=""
            data-target=""
            aria-controls=""
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <input
              type="text"
              name="search"
              placeholder="Search.."
              className="searchtext"
            ></input>
            <i className="fas fa-search searchbtn"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <form method="GET" action="/">
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Home</b>
                  </button>
                </form>
              </li>

              <li className="nav-item">
                <form method="GET" action="/">
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Blog</b>
                  </button>
                </form>
              </li>

              <li className="nav-item">
                <form method="GET" action="/">
                  <button className="nav-link navname coursebtn btn btn-dark">
                    <b className="mainname">Contact Us</b>
                  </button>
                </form>
              </li>

              <li className="nav-item">
                <form method="GET" action="/login">
                  <button className="btn btn-light ">
                    <Link to="/login">
                      <b className="lbtn">Login</b>
                    </Link>
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
  );
}
export default Header;
