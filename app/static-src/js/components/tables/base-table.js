import { LitElement, html, css } from "lit-element";

export class BaseTable extends LitElement {
  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        height: 90vh;
        overflow-y: scroll;
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
    this.loading = false;
  }

  static get properties() {
    return {
      rows: { type: Object },
      loading: { type: Boolean },
    };
  }

  updateTable(results) {
    console.log(results)
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
