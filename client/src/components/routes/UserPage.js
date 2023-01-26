import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import TabView from "../reusables/TabView";
import { getUser } from "../../actions";
import { printPeriod, printDate } from "../../utils/date";
import "./UserPage.css";

function UserPage({ auth, user, getUser }) {
  let { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, []);

  let isValidUser = auth.isSigned && auth.data.sub === user.sub;

  let tabs = isValidUser
    ? ["Profile", "Activity", "Settings"]
    : ["Profile", "Activity"];

  return (
    <div>
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img src={user.picture} />
          </div>
          <div className="content">
            <h1>{user.name}</h1>
            <div className="meta">
              <div className="ui list">
                <div className="item">
                  <h4>
                    <i className="fa-solid fa-cake-candles"></i>
                    <span> </span>
                    Member for {printPeriod(user.creationDate)}
                  </h4>
                </div>
              </div>
              <div className="item">
                <h4>
                  <i className="fa-solid fa-clock"></i>
                  <span> </span>
                  Last seen {printDate(user.creationDate)}
                </h4>
              </div>
              {user.github ? (
                <div className="item">
                  <h4>
                    <a href={user.github}>
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <span> </span>
                  </h4>
                </div>
              ) : (
                ""
              )}

              {user.location ? (
                <div className="item">
                  <h4>
                    <i className="fa-solid fa-location-dot"></i>
                    <span> </span>
                    {user.location}
                  </h4>
                </div>
              ) : (
                ""
              )}
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
              <h4>Answers: {user.answerCount}</h4>
              <h4>Questions: {user.questionCount}</h4>
            </div>
          </div>
          {user.about ? (
            <div className="profile-about">
              <h3>About</h3>
              <div className="ui segment"></div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="tab">
          <div className="activity">
            <h3>Questions</h3>
            <div className="ui segment"></div>
          </div>

          <div className="activity">
            <h3>Answers</h3>
            <div className="ui segment"></div>
          </div>
        </div>
        {isValidUser ? <div>Settings</div> : ""}
      </TabView>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, { getUser })(UserPage);
