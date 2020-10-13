import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie"

export class LoginForm extends LitElement {
  static get styles() {
    return css`

    `;
  }

  constructor(){
      super()
      this.username = ""
      this.password = ""
  }

  static get properties(){
    return{
        username: String,
        password: String
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
    .then((response) => response.json())
    .catch((error) => console.log(error))
  }

  render() {
    return html`
      <div class="login-form__container">
        <input @change=${(e) => this.username = e.target.value}>
        <input @change=${(e) => this.password = e.target.value}>
        <button @click=${this.login}>login</button>
      </div>
    `;
  }
}

customElements.define("login-form", LoginForm);
