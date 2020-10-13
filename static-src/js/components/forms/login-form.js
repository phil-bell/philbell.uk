import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie"

export class LoginForm extends LitElement {
  static get styles() {
    return css`
      [hidden]{
        display: none;
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
  }

  async logout(){
    await fetch(`${window.location.origin}/api/logout`)
    .then(this.authenticated = false)
  }


  render() {
    return html`
      <div class="login-form__container" .hidden=${this.authenticated}>
        <input @change=${(e) => this.username = e.target.value}>
        <input @change=${(e) => this.password = e.target.value}>
        <button @click=${this.login}>login</button>
      </div>
      <div class="logout-form__countainer" .hidden=${!this.authenticated}>
        <button @click=${this.logout}>logout</button>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
