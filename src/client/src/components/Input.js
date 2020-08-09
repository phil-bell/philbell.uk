import React from "react";
import "../assets/scss/components/Input.scss";

export default class Input extends React.Component {
  render() {
    return (
      <div className="input__container">
        <label className="input__label" htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          id={this.props.id}
          name={this.props.name}
          type={this.props.type}
          className={"input " + this.props.class}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {this.props.children}
        </input>
      </div>
    );
  }
}
