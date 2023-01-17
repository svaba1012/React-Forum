import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

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
        <GoogleAuth />
        {/* <a className="ui item">Logout</a> */}
      </div>
    </div>
  );
}

export default Header;
