import React from "react";
import { Link } from "react-router-dom";
import GoogleSignIn from "./GoogleSignIn";

function Header() {
  return (
    <div className="ui menu">
      <Link to={"/questions/new"} className="item">
        Post a question
      </Link>
      <Link to="/" className="item">
        Questions
      </Link>
      <div className="right menu">
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Header;
