import React from "react";
import "./PostBox.css";

function PostBox({ postData }) {
  return (
    <div className="ui segment post-box">
      <div className="post-box-info">
        <div>
          <i class="fa-solid fa-caret-up"></i>
        </div>
        <div>{postData.voteUps.length - postData.voteDowns.length}</div>
        <div>
          <i class="fa-solid fa-caret-down"></i>
        </div>
      </div>
      <div className="post-box-content">
        <div className=" content-body ">{postData.description}</div>
        <div className="content-footer">
          <div className="ui feed">
            <div className="event">
              <div className="label">
                <img src="/images/avatar/small/jenny.jpg" alt="User pic" />
              </div>
              <div className="content">
                <div className="summary">
                  Posted by <a>Jenny Hess</a>
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

export default PostBox;
