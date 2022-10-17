import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppState from "./Context/AppState";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppState>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppState>
  </Provider>
);
