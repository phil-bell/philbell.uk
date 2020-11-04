import { LitElement, html, css } from "lit-element";

export class BaseTable extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
      }
      .grid {
        display: flex;
        flex-direction: column;
      }
    `;
  }

  constructor() {
    super();
    this._rows = [];
  }

  static get properties() {
    return {
      rows: { type: Object },
    };
  }

  updateTable(results) {
    this.rows = results.rows;
  }

  set rows(val) {
    let oldVal = this._rows;
    this._rows = Object.entries(val);
    this.requestUpdate("rows", oldVal);
  }

  get rows() {
    return this._rows;
  }
}

customElements.define("base-table", BaseTable);