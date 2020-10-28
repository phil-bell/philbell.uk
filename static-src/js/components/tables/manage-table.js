import { LitElement, html, css } from "lit-element";

export class ManageTable extends LitElement {
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
    this._formRow = {};
  }

  static get properties() {
    return {
      rows: { type: Object },
    };
  }

  async getList(){
    await fetch("/get-list/")
    .then((response) => this.rows = response.json())
  }

  connectedCallback() {
    this.getList();
    super.connectedCallback();
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

  render() {
    return html`
      <div class="grid">
        ${this.rows.map((row) => {
            return html`
                <div>${row.name}</div>
                <div>${row.state}</div>
                <div>${row.progress}</div>
            `
        })}
      </div>
    `;
  }
}

customElements.define("manage-table", ResultsTable);
