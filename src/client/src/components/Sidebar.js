import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/components/Sidebar.scss";

export default class Sidebar extends React.Component {

  firstUpper(string) {
    return string.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
      match.toUpperCase()
    );
  }

  logout() {
    localStorage.removeItem = "username";
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <Link className="sidebar__link" to="/">
            Home
          </Link>
          <Link className="sidebar__link" to="/resume">
            Resume
          </Link>
          <Link className="sidebar__link" to="/admin">
            Admin
          </Link>
        </div>
        <div className="sidebar__bot">
          <Link
            className="sidebar__link"
            to="/login"
            hidden={false}
          >
            Login - {this.props.loggedIn}
          </Link>
          <Link
            className="sidebar__link"
            to="/profile"
            hidden={true}
          >
            {this.props.user.username}
          </Link>
          <Link
            className="sidebar__link"
            to="/login"
            onClick={this.logout}
            hidden={true}
          >
            Logout
          </Link>
          <Link className="sidebar__link" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    );
  }
}
