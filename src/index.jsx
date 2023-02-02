import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { CartCountProviderWrapper } from "./context/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <CartCountProviderWrapper>
      <AuthProviderWrapper>
        <App />
      </AuthProviderWrapper>
    </CartCountProviderWrapper>
  </Router>
);
