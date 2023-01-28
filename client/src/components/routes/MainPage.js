import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "../../actions";
import "./MainPage.css";

function MainPage(props) {
  useEffect(() => {
    props.getQuestions();
  }, []);

  if (!props.questions.map) {
    return;
  }

  return (
    <div className="ui segment">
      <h1>Questions</h1>
      {props.questions.map((question) => {
        return (
          <div className="ui segment">
            <div className="ui items">
              <div className="item">
                <div className="ui image">
                  <div className="item-side">
                    <div>
                      {question.voteUps.length - question.voteDowns.length}{" "}
                      votes
                    </div>
                    <div>{question.answerNum} answers</div>
                  </div>
                </div>
                <div className="middle aligned content">
                  <Link to={`/questions/${question.id}`} className="header">
                    {question.title}
                  </Link>
                </div>
                <div className="posted-by">
                  <div className="ui feed">
                    <div className="event">
                      <div className="label">
                        <img src={question.user.picture} alt="User pic" />
                      </div>
                      <div className="content">
                        <div className="summary">
                          <Link to={`/users/${question.userId}`}>
                            {question.user.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { questions: state.question };
};

export default connect(mapStateToProps, { getQuestions })(MainPage);
