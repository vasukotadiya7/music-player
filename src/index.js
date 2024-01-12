import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Main from "./Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Online>
      <Main />
    </Online>
    <Offline>
      <div>
        <h1 style={{ color: "black" }}>YOU ARE OFFLINE '_'</h1>
      </div>
    </Offline>
  </BrowserRouter>

  // </React.StrictMode>
);
