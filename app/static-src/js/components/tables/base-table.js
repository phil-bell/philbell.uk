import { LitElement, html, css } from "lit-element";

export class BaseTable extends LitElement {
  static get styles() {
    return css`
      :host {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 90vh;
        overflow-y: scroll;
        padding: 0 5px;
      }
      .grid {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
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

  updateTable(term, results) {
    this.term = term
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
