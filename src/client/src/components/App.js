import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../assets/scss/components/App.scss";
import Sidebar from "./Sidebar";
import Page from "./Page";
import Home from "./Home";
import Admin from "./Admin";
import Contact from "./Contact";
import Login from "./Login";
import Resume from "./Resume";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      user: {},
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      user: {},
    });
  }

  handleLogin(data) {
    console.log(data);
    this.setState({
      loggedIn: true,
      user: data.user,
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Sidebar
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            user={this.state.user}
            loggedIn={this.state.loggedIn}
            // user={this.state.user}
          />
          <Page>
            <Switch>()
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/login">
                <Login handleLogin={this.handleLogin} />
              </Route>
              <Route path="/resume">
                <Resume />
              </Route>
            </Switch>
          </Page>
        </div>
      </Router>
    );
  }
}
