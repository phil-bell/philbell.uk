import { css, html, LitElement } from "lit-element";

export class ToastCard extends LitElement {
  static get styles() {
    return css`
      div {
        max-width: 230px;
        position: absolute;
        padding: 10px;
        right: 10px;
        bottom: var(--bottom, -100px);
        border: 1px solid;
        border-radius: 5px;
        -o-transition: 0.5s ease all;
        transition: 0.5s ease all;
        -moz-transition: 0.5s ease all;
        -webkit-transition: 0.5s ease all;
      }
    `;
  }

  static get properties() {
    return {
      message: String,
      type: String,
    };
  }

  constructor() {
    super();
    this.message = "";
    this.type = "";
    this.showBottom = "10px";
    this.hideBottom = "-100px";
  }

  show(message = false) {
    if (message) {
      this.message = message;
    }
    this.style.setProperty("--bottom", this.showBottom);
  }

  hide() {
    this.style.setProperty("--bottom", this.hideBottom);
  }

  render() {
    return html` <div @click=${this.hide}>${this.message}</div> `;
  }
}

customElements.define("toast-card", ToastCard);
