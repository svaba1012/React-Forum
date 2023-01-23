import React from "react";
import { voteUp, voteDown } from "../../actions";
import { connect } from "react-redux";
import "./PostBox.css";
import MarkupBox from "./MarkupBox";
import { Link } from "react-router-dom";

function PostBox({ postData, voteUp, id, voteDown, auth }) {
  const renderButtons = () => {
    if (!auth.isSigned) {
      return;
    }
    if (auth.data.sub !== postData.userId) {
      return;
    }
    let link = "/questions";
    if (id >= 0) {
      link = "/answers";
    }

    return (
      <div>
        <Link className="ui button primary" to={`${link}/edit/${postData.id}`}>
          Edit
        </Link>
        <Link className="ui button red" to={`${link}/delete/${postData.id}`}>
          Delete
        </Link>
      </div>
    );
  };

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
        <div className=" content-body ">
          <MarkupBox markup={postData.description} />
        </div>
        <div className="content-footer">
          {renderButtons()}
          <div className="posted-by">
            <div className="ui feed">
              <div className="event">
                <div className="label">
                  <img src={postData.user.picture} alt="User pic" />
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { voteUp, voteDown })(PostBox);
