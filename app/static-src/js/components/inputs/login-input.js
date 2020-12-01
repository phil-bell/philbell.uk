import { LitElement, html, css } from "lit-element";

export class LoginInput extends LitElement {
  static get styles() {
    return css`
      :host {
        overflow: hidden;
      }
      label {
        font-size: 16px;
        position: relative;
        bottom: 27px;
        margin: auto;
        left: 42px;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
      }
      input {
        font-size: 16px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        background: var(--primary-color);
        color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
        border-radius: 8px;
        height: 35px;
        width: 150px;
        text-align: center;
        margin: auto;
        transition: border-color 0.25s ease-in-out;
      }
      input:hover:not(:focus) {
        color: var(--hover-color);
      }
      input:hover ~ label {
        color: var(--hover-color);
      }
      input:focus {
        border: 1px solid var(--hover-color);
        outline: none;
      }
      input:focus ~ label {
        left: 160px;
        color: var(--secondary-color);
      }
      input:not(:placeholder-shown) ~ label {
        left: 160px;
        color: var(--secondary-color);
        cursor: pointer;
      }
      label:hover {
        color: var(--hover-color) !important;
      }
    `;
  }

  constructor() {
    super();
    this.value = "";
  }

  static get properties() {
    return {
      label: {
        type: String,
        attribute: "label",
      },
      id: {
        type: String,
        attribute: "id",
      },
      name: {
        type: String,
        attribute: "name",
      },
      type: {
        type: String,
        attribute: "type",
      },
      class: {
        type: String,
        attribute: "class",
      },
      value: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <input
        id=${this.id}
        name=${this.name}
        type=${this.type}
        class=${this.class}
        placeholder=" "
        .value=${this.value}
        @keyup=${(e) => (this.value = e.target.value)}
      />
      <label for=${this.id}>${this.label}</label>
    `;
  }
}

customElements.define("login-input", LoginInput);
