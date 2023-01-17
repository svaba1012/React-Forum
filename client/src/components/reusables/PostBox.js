import React from "react";
import { voteUp, voteDown } from "../../actions";
import { connect } from "react-redux";
import "./PostBox.css";

function PostBox({ postData, voteUp, id, voteDown }) {
  return (
    <div className="ui segment post-box">
      <div className="post-box-info">
        <div onClick={() => voteUp(id)}>
          <i className="fa-solid fa-caret-up"></i>
        </div>
        <div>{postData.voteUps.length - postData.voteDowns.length}</div>
        <div onClick={() => voteDown(id)}>
          <i className="fa-solid fa-caret-down"></i>
        </div>
      </div>
      <div className="post-box-content">
        <div className=" content-body ">{postData.description}</div>
        <div className="content-footer">
          <div className="ui feed">
            <div className="event">
              <div className="label">
                <img src={postData.user.imageUrl} alt="User pic" />
              </div>
              <div className="content">
                <div className="summary">
                  Posted by <a>{postData.user.name}</a>
                  <div className="date">on {new Date().getDate()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { voteUp, voteDown })(PostBox);
