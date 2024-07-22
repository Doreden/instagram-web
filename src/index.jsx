import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RootCmp } from "./RootCmp";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./assets/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)
