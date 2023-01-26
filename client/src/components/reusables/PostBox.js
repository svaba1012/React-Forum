import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MarkupBox from "./MarkupBox";
import AnswerEdit from "./AnswerEdit";
import { voteUp, voteDown } from "../../actions";
import { printDate } from "../../utils/date";
import "./PostBox.css";

function PostBox({
  postData,
  voteUp,
  id,
  voteDown,
  auth,
  user,
  onDelete,
  deleteAnswer,
  deleteQuestion,
  deleteAnswersOfQuestion,
}) {
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  const renderEditForm = () => {
    // edit form for answer post
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
    const onEdit =
      id < 0
        ? () => navigate(`/questions/edit/${postData.id}`)
        : () => setEdit(true);
    return (
      <div>
        <button className="ui button primary" onClick={onEdit}>
          Edit
        </button>
        <button className="ui button red" onClick={onDelete}>
          Delete
        </button>
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

  if (!user[postData.userId]) {
    return;
  }

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
                    <img src={user[postData.userId].picture} alt="User pic" />
                  </div>
                  <div className="content">
                    <div className="summary">
                      Posted by{" "}
                      <Link to={`/users/${postData.userId}`}>
                        {user[postData.userId].name}
                      </Link>
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
  return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, {
  voteUp,
  voteDown,
})(PostBox);
