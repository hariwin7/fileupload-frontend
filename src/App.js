import React from "react";

import Signup from "./components/Singup";
import Signin from "./components/Signin";
import Home from "./components/Home";

import GlobalContextProvider from "./context/globalContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Router>
          <div className="center">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
            </Switch>
          </div>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
