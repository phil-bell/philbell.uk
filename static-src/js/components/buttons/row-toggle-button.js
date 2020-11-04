import { LitElement, html, css } from "lit-element";

export class RowToggleButton extends LitElement {
  static get styles() {
    return css`
      button {
        color: var(--font-color);
        background: var(--bg-color);
        border: 1px solid var(--bg-color);
        border-radius: 5px;
        padding: 5px;
        font-family: var(--font-family);
        -webkit-font-smoothing: antialiased;
        font-weight: 500;
        min-width: 74px;
      }
      button:hover {
        border: 1px solid var(--hover-color);
      }
      button:active {
        color: var(--hover-color);
        outline: none;
      }
      button:focus {
        outline: none;
      }
    `;
  }

  render() {
    return html` <button><slot></slot></button> `;
  }
}

customElements.define("row-toggle-button", RowToggleButton);
