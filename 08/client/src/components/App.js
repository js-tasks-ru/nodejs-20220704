import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import Chat from './Chat';
import Login from './Login';
import OAuth from './OAuth';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/chat" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/oauth/:provider" component={OAuth} />
        </Switch>
      </Router>
    );
  }
}
