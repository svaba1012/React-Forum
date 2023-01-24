import React, { useState } from "react";
import { voteUp, voteDown, editAnswer } from "../../actions";
import { connect } from "react-redux";
import MarkupBox from "./MarkupBox";
import { Link } from "react-router-dom";
import printDate from "../../utils/printDate";
import AnswerEdit from "./AnswerEdit";
import "./PostBox.css";

function PostBox({ postData, voteUp, id, voteDown, auth, editAnswer }) {
  const [edit, setEdit] = useState(false);

  const renderEditForm = () => {
    if (!edit || id < 0) {
      return;
    }
    return (
      <div className="ui segment">
        <div onClick={() => setEdit(false)} className="edit-answer-x-mark">
          <i className="fa-regular fa-circle-xmark"></i>
        </div>
        <AnswerEdit
          post={postData}
          answerId={id}
          afterSubmit={() => setEdit(false)}
        />
      </div>
    );
  };

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
      if (edit) {
        return;
      }
      return (
        <div>
          <button
            className="ui button primary"
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </button>
          <Link className="ui button red" to={`${link}/delete/${postData.id}`}>
            Delete
          </Link>
        </div>
      );
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

  const renderVoteButton = (voteType, onButtonClick) => {
    // voteType up or down
    let isSigned = auth.isSigned;
    let func = isSigned ? onButtonClick : (id) => {};
    let styleClass = isSigned ? "" : "vote-inactive";
    let title = isSigned ? `Click to vote ${voteType}` : `Sign in to vote`;
    return (
      <div onClick={() => func(id)} className={styleClass} title={title}>
        <i className={`fa-solid fa-caret-${voteType}`}></i>
      </div>
    );
  };

  return (
    <div className="ui segment">
      <div className=" post-box">
        <div className="post-box-info">
          {renderVoteButton("up", voteUp)}
          <div>{postData.voteUps.length - postData.voteDowns.length}</div>
          {renderVoteButton("down", voteDown)}
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
                      <div className="date">{printDate(postData.date)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderEditForm()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { voteUp, voteDown, editAnswer })(
  PostBox
);
