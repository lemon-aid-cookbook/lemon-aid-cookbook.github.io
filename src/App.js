import SignIn from "pages/SignIn";
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignIn />
        </Route>
      </div>
    </Router>
  );
}

export default App;
