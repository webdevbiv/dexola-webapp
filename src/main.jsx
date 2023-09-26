import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
//  import "react-t/dist/react-tooltip.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
