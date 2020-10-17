import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie"

export class LoginForm extends LitElement {
  static get styles() {
    return css`
      :host{
        margin-top: auto;
      }
      [hidden]{
        display: none !important;
      }
      input{
        font-size: 16px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        background: var(--bg-color);
        color: var(--font-color);
        border: 1px solid var(--font-color);
        border-radius: 8px;
        height: 30px;
        text-align: center;
        margin: auto;
        transition: border-color 0.25s ease-in-out;
        margin: 5px 0;
      }
      input:hover:not(:focus) {
        color: var(--hover-color);
      }
      input:focus {
        border: 1px solid var(--hover-color);
        outline: none;
      }
      input::placeholder {
        color: var(--font-color);
        font-size: 16px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
      }
      button{
        color: var(--font-color);
        background: var(--bg-color);
        border: 1px solid var(--bg-color);
        border-radius: 5px;
        padding: 5px;
        font-size: 18px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        min-width: 74px;
        margin: auto;
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
      .login-form__container{
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `;
  }

  constructor(){
      super()
      this.username = ""
      this.password = ""
      this.authenticated = false
  }

  static get properties(){
    return{
        username: String,
        password: String,
        authenticated: Boolean
    }

  }

  async login(){
    await fetch(`${window.location.origin}/api/login/`,{
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get('csrftoken')
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          }),
    })
    .then((response) => response.status === 200 ? this.authenticated = true : this.authenticated = false)
    .then(this.dispatchEvent(
      new CustomEvent("reload-nav", {
        bubbles: true,
        composed: true,
      })
    ))
    window.location.reload()
    
  }

  async logout(){
    await fetch(`${window.location.origin}/api/logout`)
    .then(this.authenticated = false)
    .then(window.location.reload())
  }


  render() {
    return html`
      <div class="login-form__container" .hidden=${this.authenticated}>
        <input placeholder="username" @change=${(e) => this.username = e.target.value}>
        <input placeholder="password" type="password" @change=${(e) => this.password = e.target.value}>
        <button @click=${this.login}>login</button>
      </div>
      <div class="logout-form__countainer" .hidden=${!this.authenticated}>
        <button @click=${this.logout}>logout</button>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
