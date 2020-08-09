import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "../assets/scss/components/Login.scss";
import Input from "./Input";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username && this.state.password) {
      axios
        .post("http://localhost:9000/api/login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((res) => {
          if (res.data.valid) {
            this.props.handleLogin(res.data);
          }
        });
    }
  }

  render() {
    return (
      <div className="login">
        <div className="app__content">
          <form className="form" onSubmit={this.handleSubmit}>
            <Input
              label="Username:"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            ></Input>
            <Input
              label="Password:"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            ></Input>
            <button type="submit" className="button">
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
