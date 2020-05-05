import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import '../assets/scss/components/App.scss';
import Sidebar from './Sidebar';
import Home from './Home';
import Admin from './Admin';
import Contact from './Contact';
import Login from './Login';
import Resume from './Resume';


function App() {

  return (
    <Router>
      <div className="app">
        <Sidebar></Sidebar>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/resume" component={Resume}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
