import { LitElement, html, css } from "lit-element";
import "../forms/login-form";
import "../inputs/toggle-input";

export class SideBar extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 0;
      }
      body {
        margin: 0;
        padding: 0;
        width: 0;
        background: var(--primary-color);
        color: var(--secondary-color);
        font-family: var(--font-family);
      }

      .menu__toggle {
        display: block;
        position: relative;
        top: 50px;
        left: 25px;
        z-index: 1;
        -webkit-user-select: none;
        user-select: none;
      }

      .menu__toggle input:hover ~ span {
        background: var(--hover-color);
      }

      .menu__toggle a {
        text-decoration: none;
        color: var(--secondary-color);
        transition: color 0.3s ease;
      }

      .menu__toggle a:hover {
        color: var(--hover-color);
      }

      .menu__toggle input {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: -7px;
        left: -5px;
        cursor: pointer;
        opacity: 0;
        z-index: 2;
        -webkit-touch-callout: none;
      }

      .menu__toggle span {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        background: var(--secondary-color);
        border-radius: 3px;
        z-index: 1;
        transform-origin: 4px 0px;
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      }

      .menu__toggle input:hover > span {
        background: var(--hover-color);
      }

      .menu__toggle span:first-child {
        transform-origin: 0% 0%;
      }

      .menu__toggle span:nth-last-child(2) {
        transform-origin: 0% 100%;
      }

      .menu__toggle input:checked ~ span {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
      }

      .menu__toggle input:checked ~ span:nth-last-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }

      .menu__toggle input:checked ~ span:nth-last-child(2) {
        transform: rotate(-45deg) translate(0, -1px);
      }

      .menu__list {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        position: absolute;
        width: auto;
        height: 85vh;
        margin: -100px 0 0 -50px;
        padding: 50px;
        padding-top: 125px;
        background: var(--primary-color);
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        transform-origin: 0% 0%;
        transform: translate(-100%, 0);
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
          background-color 1000ms linear;
      }

      .menu__list li {
        padding: 10px 0;
        font-size: 22px;
      }

      .menu__toggle input:checked ~ div {
        transform: none;
      }
      
      .menu__list toggle-input{
        margin-top: auto;
      }

    `;
  }

  constructor() {
    super();
    this.navConfig = [];
    this.addEventListener("reload-nav", () => {
      this.reload();
    });
  }

  static get properties() {
    return {
      navConfig: Array,
    };
  }

  async connectedCallback() {
    this.navConfig = await fetch(`/api/nav-config/`).then((response) =>
      response.json()
    );
    super.connectedCallback();
  }

  async reload() {
    this.navConfig = await fetch(`/api/nav-config/`).then(
      (response) => (this.navConfig = response.json())
    );
  }

  render() {
    return html`
      <nav role="navigation">
        <div class="menu__toggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <div class="menu__list">
            ${this.navConfig.nav.map((item) => {
              if (item.show) {
                return html`<a href="${item.url}"><li>${item.name}</li></a>`;
              }
            })}
            <toggle-input></toggle-input>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("side-bar", SideBar);
