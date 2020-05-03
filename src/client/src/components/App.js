import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../assets/scss/components/App.scss';
import Sidebar from './Sidebar';
import Container from './Container';
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
        <div className="app__page">
          <Route exact path="/" component={Home} />
          <Route path="/admin" component={Admin} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/resume" component={Resume} />
        </div>
      </div>
    </Router>
  );
}

export default App;
