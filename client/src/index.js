import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import App from "./components/App";
import reducer from "./reducers";

import { GoogleOAuthProvider } from "@react-oauth/google";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider
    store={createStore(reducer, composeEnhancers(applyMiddleware(thunk)))}
  >
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY}>
      <App />
    </GoogleOAuthProvider>
    ;
  </Provider>
);
