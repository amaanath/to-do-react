import React from "react";
import "./App.css";
import { Login } from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodosLayout } from "./TodosLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <TodosLayout />
        </Route>
        <Route path="/">
          <div className="app">
            <Login />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
