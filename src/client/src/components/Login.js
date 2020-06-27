import React from "react";
import axios from "axios"
import "../assets/scss/components/Login.scss";

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
    this.setState({ username: event.target.username, password: event.target.password });
  }

  handleSubmit(event) {
    event.preventDefault()
    axios
      .post("localhost:9000/login", {
        username: this.state.username,
        password: this.state.passowrd,
      })
      .then(function (response) {
        alert(response)
      });
  }

  render() {
    return (
      <div className="login">
        <div className="app__content">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.username} onChange={this.handleChange}></input>
            <input value={this.state.password} onChange={this.handleChange}></input>
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
  }
}
