import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// const onSuccess = (res) => {
//   console.log("success:", res);
// };

const onFailure = (err) => {
  console.log("failed:", err);
};

const clientId =
  "1061070027840-g2tpfg7jts6lopqnnq09qdoerl3g6nho.apps.googleusercontent.com";

function GoogleAuth(props) {
  React.useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
        plugin_name: "Streamy",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const render = () => {
    if (!props.isSigned) {
      return (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in"
          onSuccess={props.signIn}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      );
    } else {
      return (
        <GoogleLogout
          clientId={clientId}
          buttonText="Log out"
          onLogoutSuccess={props.signOut}
        />
      );
    }
  };

  return render();
}

const mapStateToProps = (state) => {
  return { isSigned: state.auth.isSigned };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
