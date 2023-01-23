import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

function Header() {
  return (
    <div className="ui menu">
      <Link to={"/questions/new"} className="item">
        Post a question
      </Link>
      {/* <a className="item">Reviews</a>
      <a className="item">Upcoming Events</a> */}
      <div className="right menu">
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon"></i>
          </div>
        </div>
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Header;
