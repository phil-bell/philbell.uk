import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";
import "../inputs/login-input"

export class LoginForm extends LitElement {
  static get styles() {
    return css`
      :host {
        margin-top: auto;
        width: 100%;
        display: flex;
        justify-content: center;
      }
      [hidden] {
        display: none !important;
      }      
      button {
        color: var(--secondary-color);
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        padding: 5px;
        font-size: 18px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        min-width: 74px;
        margin: auto;
        -webkit-transition: background-color 1000ms linear, border 1000ms linear;
        -ms-transition: background-color 1000ms linear, border 1000ms linear;
        transition: background-color 1000ms linear, border 1000ms linear;
     
      }
      button:hover {
        color: var(--hover-color);
      }
      button:active {
        outline: none;
      }
      button:focus {
        outline: none;
      }
      .form__container {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      .login-form__container {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `;
  }

  constructor() {
    super();
    this.username = "";
    this.password = "";
    this.authenticated = false;
  }

  static get properties() {
    return {
      username: String,
      password: String,
      authenticated: Boolean,
    };
  }

  async login(e) {
    e.preventDefault()
    await fetch(`/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify([...e.target.children]
        .filter((element) => element.tagName == "LOGIN-INPUT")
        .reduce((ob, el) => ({ ...ob, [el.name]: el.value }), {})),
    })
      .then((response) => {
        if (response.status == 200){
          this.authenticated = true
          document.querySelector("toast-card").show("login successful")
          window.location.reload();
        }
        else{
          this.authenticated = false
          document.querySelector("toast-card").show("login failed")

        }
      }
      )
      .then(
        this.dispatchEvent(
          new CustomEvent("reload-nav", {
            bubbles: true,
            composed: true,
          })
        )
      );
    
  }

  async logout() {
    await fetch(`/api/logout`)
      .then((this.authenticated = false))
      .then(window.location.reload());
  }

  render() {
    return html`
      <form class="login-form__container" .hidden=${this.authenticated} @submit=${this.login}>
        <login-input id="username" name="username" label="username" type="text" />
        </login-input>
        <login-input id="password" name="password" type="password" label="password" />
        </login-input>
        <button type="submit">login</button>
      </form>
      <div class="logout-form__countainer" .hidden=${!this.authenticated}>
        <button @click=${this.logout}>logout</button>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
