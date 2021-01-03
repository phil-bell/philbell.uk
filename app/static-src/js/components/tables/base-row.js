import { LitElement, html, css } from "lit-element";
import Cookies from "js-cookie";

export class BaseTableRow extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        display: -webkit-box;
        display: -ms-flexbox;
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
      .grid__cell--left {
        padding: 5px;
        -ms-flex-item-align: center;
        -ms-grid-row-align: center;
        align-self: center;
        overflow: hidden;
        white-space: nowrap;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        -ms-grid-column-align: start;
        justify-self: start;
      }
      [open] {
        height: 80px;
      }
      [fit-content] {
        height: auto;
        overflow: visible;
        white-space: normal;
        -o-text-overflow: unset;
        text-overflow: unset;
        line-height: 20px;
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
    this.fitContent = false;
  }

  static get properties() {
    return {
      open: {
        type: Boolean,
        attribute: "open",
      },
      fitContent: {
        type: Boolean,
      },
    };
  }
}

customElements.define("base-table-row", BaseTableRow);
