import { LitElement, html, css } from "lit-element";

export class SideBar extends LitElement {
  static get styles() {
    return css`
      body {
        margin: 0;
        padding: 0;
        background: var(--bg-color);
        color: var(--font-color);
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
        color: var(--font-color);
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
        background: var(--font-color);
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
        position: absolute;
        width: auto;
        margin: -100px 0 0 -50px;
        padding: 50px;
        padding-top: 125px;
        background: transparent;
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        transform-origin: 0% 0%;
        transform: translate(-100%, 0);
        transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      }

      .menu__list li {
        padding: 10px 0;
        font-size: 22px;
      }

      .menu__toggle input:checked ~ ul {
        transform: none;
      }
    `;
  }

  constructor() {
    super();
    this.navConfig = [];
  }

  async connectedCallback() {
    this.navConfig = await fetch(
      `${window.location.origin}/get-nav-config`
    ).then((response) => response.json());
    super.connectedCallback();
  }

  render() {
    return html`
      <nav role="navigation">
        <div class="menu__toggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul class="menu__list">
            ${this.navConfig.map(
              (item) => html`<a href="${item.url}"><li>${item.name}</li></a>`
            )}
          </ul>
        </div>
      </nav>
    `;
  }
}

customElements.define("side-bar", SideBar);
