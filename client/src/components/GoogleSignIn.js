import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
import google from "../apis/google";

function GoogleSignIn(props) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let res = await google.get("/oauth2/v3/userinfo", {
        headers: {
          Authorization:
            tokenResponse.token_type + " " + tokenResponse.access_token,
        },
      });

      props.signIn(res.data);
    },
  });

  const onButtonClick = () => {
    if (!props.isSigned) {
      login();
      return;
    }
    props.signOut();
  };

  return (
    <button
      className="ui button red"
      onClick={onButtonClick}
      style={{ textAlign: "right" }}
    >
      <i className="fa-brands fa-google"></i> Sign{" "}
      {props.isSigned ? "out" : "in"}
    </button>
  );
}

const mapStateToProps = (state) => {
  return { isSigned: state.auth.isSigned };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleSignIn);
