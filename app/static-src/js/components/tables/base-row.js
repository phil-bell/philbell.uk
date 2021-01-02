import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";

export class BaseTableRow extends LitElement {
  static get styles() {
    return css`
      :host {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .grid__row {
        display: -ms-grid;
        display: grid;
        grid-auto-flow: row;
        -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
        border-bottom: 1px solid var(--primary-color);
        overflow: hidden;
        -o-transition: 0.2s ease all;
        transition: 0.2s ease all;
        -moz-transition: 0.2s ease all;
        -webkit-transition: 0.2s ease all;
        height: 40px;
      }
      .grid__row__info {
        display: -ms-grid;
        display: grid;
        grid-auto-flow: column;
        -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
        height: 40px;
      }
      .grid__row__form {
        display: -ms-grid;
        display: grid;
        justify-items: end;
        grid-auto-flow: column;
        -ms-grid-columns: 1fr;
        grid-template-columns: 1fr;
        height: 40px;
      }

      .grid__cell {
        padding: 5px;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
      }
      [open] {
        height: 80px;
      }
      .only-mobile {
        display: none;
      }

      @media only screen and (max-width: 725px) {
        .no-mobile {
          display: none;
        }
        .only-mobile {
          display: block;
        }
      }
    `;
  }

  constructor() {
    super();
    this.open = false;
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
      },
    };
  }
}

customElements.define("base-table-row", BaseTableRow);
