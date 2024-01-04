import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Offline, Online } from "react-detect-offline";
import Auth from "./Components/Auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Online>
      <Auth />
    </Online>
    <Offline>
      <div>
        <h1 style={{ color: "black" }}>YOU ARE OFFLINE '_'</h1>
      </div>
    </Offline>
  </React.StrictMode>
);
