import { LitElement, html, css } from "lit-element";
import "./results-table-row";

export class ResultsTable extends LitElement {
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
            <results-table-row
              file-name=${row[0]}
              seeds=${row[1].seeds}
              magnet=${row[1].link}
            ></results-table-row>
          `;
        })}
      </div>
    `;
  }
}

customElements.define("results-table", ResultsTable);
