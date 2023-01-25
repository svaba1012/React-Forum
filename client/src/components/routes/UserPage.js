import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import TabView from "../reusables/TabView";
import { getUser } from "../../actions";

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
              <span>Description</span>
            </div>
            <div className="description">
              <p></p>
            </div>
            <div className="extra">Additional Details</div>
          </div>
        </div>
      </div>
      <TabView tabs={tabs}>
        <div>Profile</div>
        <div>Activity</div>
        {isValidUser ? <div>Settings</div> : ""}
      </TabView>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user };
};

export default connect(mapStateToProps, { getUser })(UserPage);
