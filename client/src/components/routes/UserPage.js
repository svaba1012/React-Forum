import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TabView from "../reusables/TabView";
import { editUser, getUser } from "../../actions";
import { printPeriod, printDate } from "../../utils/date";
import "./UserPage.css";
import UserForm from "../reusables/UserForm";

function UserPage(props) {
  let { id } = useParams();
  let { auth, user } = props;
  useEffect(() => {
    props.getUser(id);
  }, []);

  if (!user.picture) {
    return;
  }

  const renderPost = (post, id) => {
    const LEN = 30;
    let dot3 = post.title.length > LEN ? "..." : "";
    let title = post.title.substring(0, LEN) + dot3;
    return (
      <div className="item" key={post.id}>
        <div className="post-flex">
          <div className="post-votes" title="Votes">
            {post.voteUps.length - post.voteDowns.length}
          </div>
          <div className="post-title">
            <Link to={`/questions/${id}`} title={post.title}>
              {title}
            </Link>
          </div>
          <div className="post-date">{printDate(post.date)}</div>
        </div>
      </div>
    );
  };

  let isValidUser = auth.isSigned && auth.data.sub === user.sub;

  let tabs = isValidUser
    ? ["Profile", "Activity", "Settings"]
    : ["Profile", "Activity"];

  return (
    <div>
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img src={user.picture} alt="User pic" />
          </div>
          <div className="content">
            <h1>{user.name}</h1>
            <div className="meta">
              <div className="ui list ">
                <div className="item">
                  <h4>
                    <i className="fa-solid fa-cake-candles list-icon"></i>
                    <span> </span>
                    Member for {printPeriod(user.creationDate)}
                  </h4>
                </div>
                <div className="item">
                  <h4>
                    <i className="fa-solid fa-clock list-icon"></i>
                    <span> </span>
                    Last seen {printDate(user.creationDate)}
                  </h4>
                </div>
                {user.location ? (
                  <div className="item">
                    <h4>
                      <i className="fa-solid fa-location-dot list-icon"></i>
                      <span> </span>
                      {user.location}
                    </h4>
                  </div>
                ) : (
                  ""
                )}

                {user.github ? (
                  <div className="item">
                    <h4>
                      <a href={user.github}>
                        <i className="fa-brands fa-github list-icon"></i>
                      </a>
                      <span> </span>
                    </h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="description">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <TabView tabs={tabs}>
        <div className="tab">
          <div className="profile-stats">
            <h3>Stats</h3>
            <div className="ui segment">
              <h4>Answers: {user.answers.length}</h4>
              <h4>Questions: {user.questions.length}</h4>
            </div>
          </div>
          {user.about ? (
            <div className="profile-about">
              <h3>About</h3>
              <div className="ui segment">
                <div className="about">{user.about}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="tab">
          <div className="activity">
            <h3>Questions</h3>
            <div className="ui segment">
              {user.questions.length === 0 ? (
                <div className="no-post">You have no questions asked.</div>
              ) : (
                <div className="ui items">
                  {user.questions.map((question) =>
                    renderPost(question, question.id)
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="activity">
            <h3>Answers</h3>
            <div className="ui segment">
              {user.answers.length === 0 ? (
                <div className="no-post">
                  You have not answerd any questions.
                </div>
              ) : (
                <div className="ui items">
                  {user.answers.map((answer) =>
                    renderPost(answer, answer.questionId)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {isValidUser ? (
          <div>
            <h3>Settings</h3>
            <div className="ui segment">
              <div className="settings-input">
                <h4>Github account</h4>
                <UserForm
                  name={"github"}
                  label={<i className="fa-brands fa-github"></i>}
                  placeholder={"Add github account link"}
                  submitText="Add github"
                  onSubmit={(value) =>
                    props.editUser(user.sub, "github", value)
                  }
                  initialValues={{ github: user.github }}
                  inputType="input"
                />
              </div>
              <div className="settings-input">
                <h4>Location</h4>
                <UserForm
                  name={"location"}
                  label={<i className="fa-solid fa-location-dot"></i>}
                  placeholder={"Add location"}
                  submitText="Add location"
                  onSubmit={(value) =>
                    props.editUser(user.sub, "location", value)
                  }
                  initialValues={{ location: user.location }}
                  inputType="input"
                />
              </div>
              <div className="settings-input">
                <UserForm
                  name={"about"}
                  label={"About"}
                  placeholder={"Add about me section..."}
                  submitText="Add about me"
                  onSubmit={(value) => props.editUser(user.sub, "about", value)}
                  initialValues={{ about: user.about }}
                  inputType="textarea"
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </TabView>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, { getUser, editUser })(UserPage);
